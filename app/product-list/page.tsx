"use client";
import React, { useMemo } from "react";
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
import { useProducts } from "@/apis/queries/product.queries";
import { IRenderProduct } from "@/utils/types/common.types";
import Image from "next/image";
import validator from "validator";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

const ProductListPage = () => {
  const router = useRouter();
  const productsQuery = useProducts();

  const handleAddProductPage = () => router.push("/create-product");

  console.log(productsQuery.data?.data);

  const memoizedProducts = useMemo(() => {
    return productsQuery.data?.data.map((item: any) => {
      return {
        id: item?.id,
        productImage: item?.productImages?.[0]?.image,
        productName: item?.productName,
        categoryName: item?.category?.name,
        skuNo: item?.skuNo,
        brandName: item?.brand?.brandName,
        productPrice: item?.productPrice,
      };
    });
  }, [productsQuery.data?.data]);

  // console.log(memoizedProducts);
  return (
    <section className="body-content-s1">
      <div className="custom-container-s1">
        <Card className="body-content-s1-card">
          <div className="text-right">
            <Button
              type="submit"
              onClick={handleAddProductPage}
              className="mb-4 h-8 rounded bg-dark-orange text-center text-base font-bold leading-6 text-white hover:bg-dark-orange hover:opacity-90"
            >
              Add Product
            </Button>
          </div>
          <CardHeader className="body-content-s1-search">
            <Input
              type="email"
              placeholder="Search Product"
              className="search-box"
            />
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
              </div>
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
                  <Button type="button">2</Button>
                </li>
                <li>
                  <Button type="button">3</Button>
                </li>
                <li>
                  <Button type="button">4</Button>
                </li>
                <li>
                  <Button type="button">5</Button>
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
            </Card>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProductListPage;
