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
import { useDeleteProduct, useProducts } from "@/apis/queries/product.queries";
import { IRenderProduct } from "@/utils/types/common.types";
import Image from "next/image";
import validator from "validator";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";
import DeleteContent from "@/components/shared/DeleteContent";
import { useToast } from "@/components/ui/use-toast";
import { useMe } from "@/apis/queries/user.queries";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineManageSearch } from "react-icons/md";
import { debounce } from "lodash";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Pagination from "@/components/shared/Pagination";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import Link from "next/link";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import AddProductContent from "@/components/modules/products/AddProductContent";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import EditIcon from "@/public/images/td-edit-icon.svg";
import TrashIcon from "@/public/images/td-trash-icon.svg";

const ProductListPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number>();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const me = useMe();

  const productsQuery = useProducts(
    {
      userId: String(me?.data?.data?.id),
      page,
      limit,
      term: searchTerm !== "" ? searchTerm : undefined,
      status: "ALL",
    },
    !!me?.data?.data?.id,
  );
  const deleteProduct = useDeleteProduct();

  const handleDebounce = debounce((event: any) => {
    setSearchTerm(event.target.value);
  }, 1000);

  const handleAddProductModal = () =>
    setIsAddProductModalOpen(!isAddProductModalOpen);

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
          productProductPriceId: item?.product_productPrice?.[0]?.id,
          productProductPrice: item?.product_productPrice?.[0]?.offerPrice,
          status: item?.status || "-",
          priceStatus: item?.product_productPrice?.[0]?.status,
          isOwner: item?.adminId === me?.data?.data?.id,
        };
      }) || []
    );
  }, [productsQuery.data?.data, me?.data?.data?.id]);

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
                <button
                  className="theme-primary-btn add-btn p-2"
                  onClick={handleAddProductModal}
                >
                  <IoMdAdd size={24} />
                  <span className="d-none-mobile">Add Product</span>
                </button>
              </li>
              <li>
                <Link
                  className="theme-primary-btn add-btn p-2"
                  href="/manage-products"
                >
                  <MdOutlineManageSearch size={24} />
                  <span className="d-none-mobile ml-1">Manage Products</span>
                </Link>
              </li>
            </ul>
          </CardHeader>

          <CardContent className="main-content">
            <Card className="main-content-card">
              <div className="table-responsive theme-table-s1 min-h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>SKU No</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Product Status</TableHead>
                      {/* <TableHead>Price Status</TableHead> */}
                      <TableHead className="text-center">Action</TableHead>
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
                                    : PlaceholderImage
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
                          ${item?.productProductPrice}
                        </TableCell>
                        <TableCell th-name="Status">
                          <Badge
                            className={cn(
                              item?.status === "ACTIVE"
                                ? "!bg-green-500"
                                : "!bg-red-500",
                            )}
                          >
                            {item?.status}
                          </Badge>
                        </TableCell>
                        {/* <TableCell th-name="Status">
                          <Badge
                            className={cn(
                              item?.priceStatus === "ACTIVE"
                                ? "!bg-green-500"
                                : "!bg-red-500",
                            )}
                          >
                            {item?.priceStatus}
                          </Badge>
                        </TableCell> */}
                        <TableCell th-name="Action">
                          <Menubar className="w-fit px-0">
                            <MenubarMenu>
                              <MenubarTrigger
                                disabled={!item?.isOwner}
                                className={!item?.isOwner ? "bg-gray-100" : ""}
                              >
                                <HiOutlineDotsCircleHorizontal size={24} />
                              </MenubarTrigger>
                              <MenubarContent className="min-w-0">
                                <MenubarItem>
                                  <Link
                                    href={`/product/${item?.id}`}
                                    className="td-dots-dropdown-item flex items-center gap-1"
                                  >
                                    <Image
                                      src={EditIcon}
                                      height={0}
                                      width={0}
                                      alt="edit-icon"
                                      className="mr-2 h-4 w-4"
                                    />
                                    Edit
                                  </Link>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem
                                  onClick={() => {
                                    handleToggleDeleteModal();
                                    setSelectedProductId(item?.id);
                                  }}
                                >
                                  <Image
                                    src={TrashIcon}
                                    height={0}
                                    width={0}
                                    alt="trash-icon"
                                    className="mr-2 h-4 w-4"
                                  />
                                  Delete
                                </MenubarItem>
                              </MenubarContent>
                            </MenubarMenu>
                          </Menubar>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {productsQuery?.isLoading ? (
                  <div className="my-2 space-y-2">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <Skeleton key={i} className="h-24 w-full" />
                    ))}
                  </div>
                ) : null}

                {!memoizedProducts.length && !productsQuery.isLoading ? (
                  <p className="py-10 text-center text-sm font-medium">
                    No Product Found
                  </p>
                ) : null}

                {productsQuery.data?.totalCount > 5 ? (
                  <Pagination
                    page={page}
                    setPage={setPage}
                    totalCount={productsQuery.data?.totalCount}
                    limit={limit}
                  />
                ) : null}
              </div>
            </Card>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDeleteModalOpen} onOpenChange={handleToggleDeleteModal}>
        <DeleteContent
          onClose={() => handleConfirmation(false)}
          onConfirm={() => handleConfirmation(true)}
          isLoading={deleteProduct.isPending}
        />
      </Dialog>

      <Dialog open={isAddProductModalOpen} onOpenChange={handleAddProductModal}>
        <AddProductContent />
      </Dialog>
    </section>
  );
};

export default ProductListPage;
