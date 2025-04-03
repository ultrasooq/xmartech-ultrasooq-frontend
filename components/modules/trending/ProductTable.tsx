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
import Image from "next/image";
import validator from "validator";
import { TrendingProduct } from "@/utils/types/common.types";
import Link from "next/link";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

type ProducTableProps = {
  list: TrendingProduct[];
};

const ProductTable: React.FC<ProducTableProps> = ({ list }) => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const calculateDiscountedPrice = ({ item }: { item: any }) => {
    const price = item.productProductPrice
      ? Number(item.productProductPrice)
      : 0;
    const discount = item.consumerDiscount || 0;
    return price - (price * discount) / 100;
  };

  return (
    <CardContent className="main-content w-full">
      <Card className="main-content-card !p-0 shadow-none">
        <div className="table-responsive theme-table-s1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead dir={langDir}>{t("product")}</TableHead>
                <TableHead dir={langDir}>{t("category")}</TableHead>
                {/* <TableHead>SKU No</TableHead> */}
                <TableHead dir={langDir}>{t("brand")}</TableHead>
                <TableHead dir={langDir}>{t("price")}</TableHead>
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
                    {item?.askForPrice === "true" ? (
                      <Link href={`/seller-rfq-request?product_id=${item?.id}`}>
                        <button
                          type="button"
                          className="inline-block rounded-sm bg-color-yellow px-3 py-1 text-sm font-bold text-white"
                          dir={langDir}
                        >
                          {t("ask_vendor_for_price")}
                        </button>
                      </Link>
                    ) : (
                      `$${calculateDiscountedPrice({ item })}`
                    )}
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
