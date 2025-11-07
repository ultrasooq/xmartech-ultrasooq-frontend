"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { useProductById } from "@/apis/queries/product.queries";
import { CartItem } from "@/utils/types/cart.types";

type CartProductCardWrapperProps = {
  item: CartItem;
  onRemove: (cartId: number) => void;
  onWishlist: (productId: number) => void;
  haveAccessToken: boolean;
  relatedCart?: any;
};

const CartProductCardWrapper: React.FC<CartProductCardWrapperProps> = ({
  item,
  onRemove,
  onWishlist,
  haveAccessToken,
  relatedCart,
}) => {
  // Fetch product data to get consumerType
  const productQuery = useProductById(
    { productId: item.productId.toString() },
    haveAccessToken && item.productId > 0
  );

  // Get consumerType from product data
  const consumerType = React.useMemo(() => {
    if (productQuery?.data?.data?.product_productPrice?.[0]) {
      const activePriceEntry = productQuery.data.data.product_productPrice.find(
        (pp: any) => pp?.status === "ACTIVE"
      ) || productQuery.data.data.product_productPrice[0];
      return activePriceEntry?.consumerType;
    }
    return undefined;
  }, [productQuery?.data?.data]);

  return (
    <ProductCard
      cartId={item.id}
      productId={item.productId}
      productPriceId={item.productPriceId}
      productName={item.productPriceDetails?.productPrice_product?.productName}
      offerPrice={item.productPriceDetails?.offerPrice}
      productQuantity={item.quantity}
      productVariant={item.object}
      productImages={item.productPriceDetails?.productPrice_product?.productImages}
      consumerDiscount={item.productPriceDetails?.consumerDiscount || 0}
      consumerDiscountType={item.productPriceDetails?.consumerDiscountType}
      vendorDiscount={item.productPriceDetails?.vendorDiscount || 0}
      vendorDiscountType={item.productPriceDetails?.vendorDiscountType}
      consumerType={consumerType}
      onRemove={onRemove}
      onWishlist={onWishlist}
      haveAccessToken={haveAccessToken}
      minQuantity={item?.productPriceDetails?.minQuantityPerCustomer}
      maxQuantity={item?.productPriceDetails?.maxQuantityPerCustomer}
      relatedCart={relatedCart}
    />
  );
};

export default CartProductCardWrapper;

