"use client";
import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useDeleteProduct, useProducts } from "@/apis/queries/product.queries";
import { IRenderProduct } from "@/utils/types/common.types";
import Image from "next/image";
import validator from "validator";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DeleteContent from "@/components/shared/DeleteContent";
import { useToast } from "@/components/ui/use-toast";
import { useMe } from "@/apis/queries/user.queries";
import AddIcon from "@mui/icons-material/Add";
import { debounce } from "lodash";

const ProductListPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number>();
  const [searchTerm, setSearchTerm] = useState("");
  const userDetails = useMe();

  const productsQuery = useProducts(
    {
      userId: String(userDetails?.data?.data?.id),
      page: 1,
      limit: 10,
      term: searchTerm !== "" ? searchTerm : undefined,
    },
    !!userDetails?.data?.data?.id,
  );
  const deleteProduct = useDeleteProduct();

  const handleDebounce = debounce((event: any) => {
    setSearchTerm(event.target.value);
  }, 1000);

  const handleAddProductPage = () => router.push("/create-product");
  const handleEditProductPage = (id: number) =>
    router.push(`/create-product?productId=${id}`);
  const handleToggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
    setSelectedProductId(undefined);
  };

  const memoizedProducts = useMemo(() => {
    return (
      productsQuery.data?.data?.map((item: any) => {
        return {
          id: item?.id,
          productImage: item?.productImages?.[0]?.image,
          productName: item?.productName || "-",
          categoryName: item?.category?.name || "-",
          skuNo: item?.skuNo || "-",
          brandName: item?.brand?.brandName || "-",
          productPrice: item?.productPrice || "-",
        };
      }) || []
    );
  }, [productsQuery.data?.data]);

  const handleConfirmation = async (isConfirmed: boolean) => {
    if (!isConfirmed) {
      setIsDeleteModalOpen(false);
      setSelectedProductId(undefined);
      return;
    }

    if (!selectedProductId) return;

    const response = await deleteProduct.mutateAsync({
      productId: String(selectedProductId),
    });
    if (response.status && response.data) {
      setIsDeleteModalOpen(false);
    }
    if (response.status && response.data) {
      toast({
        title: "Product Delete Successful",
        description: response.message,
        variant: "success",
      });
      setIsDeleteModalOpen(false);
      setSelectedProductId(undefined);
    } else {
      toast({
        title: "Product Delete Failed",
        description: response.message,
        variant: "danger",
      });
    }
  };

  return (
    <section className="body-content-s1">
      <div className="custom-container-s1">
        <Card className="body-content-s1-card">
          <CardHeader className="body-content-s1-search">
            <ul className="right-filter-lists">
              <li>
                <Input
                  type="text"
                  placeholder="Search Product"
                  className="search-box"
                  onChange={handleDebounce}
                />
              </li>
              <li>
                <Button
                  type="submit"
                  onClick={handleAddProductPage}
                  className="theme-primary-btn add-btn"
                >
                  <AddIcon />
                  <span className="d-none-mobile">Add Product</span>
                </Button>
              </li>
            </ul>
          </CardHeader>

          <CardContent className="main-content">
            <Card className="main-content-card">
              <div className="table-responsive theme-table-s1">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>SKU No</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {memoizedProducts?.map((item: IRenderProduct) => (
                      <TableRow key={item?.id}>
                        <TableCell th-name="Product">
                          <figure className="product-image-with-text">
                            <div className="image-container rounded-lg">
                              <Image
                                src={
                                  item?.productImage &&
                                  validator.isURL(item.productImage)
                                    ? item.productImage
                                    : "/images/product-placeholder.png"
                                }
                                alt="product-image"
                                height={80}
                                width={80}
                              />
                            </div>
                            <figcaption>{item?.productName}</figcaption>
                          </figure>
                        </TableCell>
                        <TableCell th-name="Category">
                          {item?.categoryName}
                        </TableCell>
                        <TableCell th-name="SKU No">{item?.skuNo}</TableCell>
                        <TableCell th-name="Brand">{item?.brandName}</TableCell>
                        <TableCell th-name="Price">
                          ${item?.productPrice}
                        </TableCell>
                        <TableCell th-name="Action">
                          <div className="td-action-btns">
                            <Button
                              type="button"
                              onClick={() => handleEditProductPage(item?.id)}
                              className="td-circle-btn edit"
                            >
                              <Image
                                src="/images/td-edit-icon.svg"
                                alt="edit-icon"
                                height={18}
                                width={18}
                              />
                            </Button>
                            <Button
                              type="button"
                              onClick={() => {
                                handleToggleDeleteModal();
                                setSelectedProductId(item?.id);
                              }}
                              className="td-circle-btn trash"
                            >
                              <Image
                                src="/images/td-trash-icon.svg"
                                alt="trash-icon"
                                height={18}
                                width={18}
                              />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {!memoizedProducts.length && !memoizedProducts.isLoading ? (
                  <p className="py-10 text-center text-sm font-medium">
                    No Product Found
                  </p>
                ) : null}
              </div>
              {memoizedProducts.length ? (
                <ul className="theme-pagination-s1">
                  <li>
                    <Button type="button" className="theme-primary-btn first">
                      <Image
                        src="/images/pagination-first.svg"
                        alt="next-icon"
                        height={10}
                        width={7}
                      />
                      First
                    </Button>
                  </li>
                  <li>
                    <Button type="button" className="nextPrev">
                      <Image
                        src="/images/pagination-prev.svg"
                        alt="prev-icon"
                        height={12}
                        width={8}
                      />
                    </Button>
                  </li>
                  <li>
                    <Button type="button" className="current">
                      1
                    </Button>
                  </li>

                  <li>
                    <Button type="button" className="nextPrev">
                      <Image
                        src="/images/pagination-next.svg"
                        alt="next-icon"
                        height={12}
                        width={8}
                      />
                    </Button>
                  </li>
                  <li>
                    <Button type="button" className="theme-primary-btn last">
                      Last
                      <Image
                        src="/images/pagination-last.svg"
                        alt="next-icon"
                        height={10}
                        width={7}
                      />
                    </Button>
                  </li>
                </ul>
              ) : null}
            </Card>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDeleteModalOpen} onOpenChange={handleToggleDeleteModal}>
        <DialogContent className="gap-0 p-0">
          <DeleteContent
            onClose={() => handleConfirmation(false)}
            onConfirm={() => handleConfirmation(true)}
            isLoading={deleteProduct.isPending}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductListPage;
