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
import { useVendorBusinessCategories } from "@/hooks/useVendorBusinessCategories";
import { checkCategoryConnection } from "@/utils/categoryConnection";
import { useCategory } from "@/apis/queries/category.queries";
import { useCurrentAccount } from "@/apis/queries/auth.queries";

type ProducTableProps = {
  list: TrendingProduct[];
};

const ProductTable: React.FC<ProducTableProps> = ({ list }) => {
  const t = useTranslations();
  const { user, langDir, currency } = useAuth();
  const currentAccount = useCurrentAccount();
  const vendorBusinessCategoryIds = useVendorBusinessCategories();

  // Get the current account's trade role (for multi-account system)
  const currentTradeRole = currentAccount?.data?.data?.account?.tradeRole || user?.tradeRole;

  const calculateDiscountedPrice = ({ item }: { item: TrendingProduct }) => {
    const price = item.productProductPrice ? Number(item.productProductPrice) : 0;
    
    // Normalize consumerType to uppercase and handle both "VENDOR" and "VENDORS"
    const rawConsumerType = item.consumerType || "CONSUMER";
    const consumerType = typeof rawConsumerType === "string" 
      ? rawConsumerType.toUpperCase().trim() 
      : "CONSUMER";
    
    // Check if it's a vendor type (VENDOR or VENDORS)
    const isVendorType = consumerType === "VENDOR" || consumerType === "VENDORS";
    const isConsumerType = consumerType === "CONSUMER";
    const isEveryoneType = consumerType === "EVERYONE";
    
    // For ProductTable, we can't fetch category for each item efficiently
    // So we'll use a simplified check - if categoryId matches any vendor business category
    // This is a fallback - ideally categoryConnections should be checked
    const isCategoryMatch = item.categoryId && vendorBusinessCategoryIds.includes(item.categoryId);
    
    let discount = 0;
    let discountType: string | undefined;
    
    // Apply discount logic based on your table
    if (currentTradeRole && currentTradeRole !== "BUYER") {
      // VENDOR (V) or EVERYONE (E) as vendor
      if (isCategoryMatch) {
        // Same relation - Vendor gets vendor discount
        if (item.vendorDiscount && item.vendorDiscount > 0) {
          discount = item.vendorDiscount;
          discountType = item.vendorDiscountType;
        } else {
          // No vendor discount available, no discount
          discount = 0;
        }
      } else {
        // Not same relation
        if (isEveryoneType) {
          // E + Not Same relation → Consumer Discount
          discount = item.consumerDiscount || 0;
          discountType = item.consumerDiscountType;
        } else {
          // VENDORS or CONSUMER + Not Same relation → No Discount
          discount = 0;
        }
      }
    } else {
      // CONSUMER (BUYER) - Gets consumer discount if consumerType is CONSUMER or EVERYONE
      // NO discount if consumerType is VENDOR or VENDORS
      if (isConsumerType || isEveryoneType) {
        discount = item.consumerDiscount || 0;
        discountType = item.consumerDiscountType;
      } else {
        // consumerType is VENDOR/VENDORS - no discount for buyers
        discount = 0;
      }
    }
    
    // Calculate final price
    if (discount > 0 && discountType) {
      if (discountType === "PERCENTAGE") {
        return Number((price - (price * discount) / 100).toFixed(2));
      } else if (discountType === "FLAT") {
        return Number((price - discount).toFixed(2));
      }
    }
    
    return price;
  };

  return (
    <CardContent className="main-content w-full">
      <Card className="main-content-card p-0! shadow-none">
        <div className="table-responsive theme-table-s1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead dir={langDir} translate="no">{t("product")}</TableHead>
                <TableHead dir={langDir} translate="no">{t("category")}</TableHead>
                {/* <TableHead>SKU No</TableHead> */}
                <TableHead dir={langDir} translate="no">{t("brand")}</TableHead>
                <TableHead dir={langDir} translate="no">{t("price")}</TableHead>
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
                          translate="no"
                        >
                          {t("ask_vendor_for_price")}
                        </button>
                      </Link>
                    ) : (
                      `${currency.symbol}${calculateDiscountedPrice({ item })}`
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
