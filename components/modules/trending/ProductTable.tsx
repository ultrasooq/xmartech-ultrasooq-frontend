import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import validator from "validator";
import { TrendingProduct } from "@/utils/types/common.types";
import Link from "next/link";
import PlaceholderImage from "@/public/images/product-placeholder.png";

type ProducTableProps = {
  list: TrendingProduct[];
};

const ProductTable: React.FC<ProducTableProps> = ({ list }) => {
  return (
    <CardContent className="main-content w-full">
      <Card className="main-content-card !p-0 shadow-none">
        <div className="table-responsive theme-table-s1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                {/* <TableHead>SKU No</TableHead> */}
                <TableHead>Brand</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list?.map((item: TrendingProduct) => (
                <TableRow key={item.id}>
                  <TableCell th-name="Product">
                    <Link href={`/trending/${item.id}`}>
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
                    </Link>
                  </TableCell>
                  <TableCell th-name="Category">{item?.categoryName}</TableCell>
                  {/* <TableCell th-name="SKU No">{item?.skuNo}</TableCell> */}
                  <TableCell th-name="Brand">{item?.brandName}</TableCell>
                  <TableCell th-name="Price">
                    ${item?.productProductPrice}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </CardContent>
  );
};

export default ProductTable;
