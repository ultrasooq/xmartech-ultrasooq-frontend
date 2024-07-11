"use client";
import {
  useCartListByDevice,
  useCartListByUserId,
  useDeleteCartItem,
  useUpdateCartByDevice,
  useUpdateCartWithLogin,
} from "@/apis/queries/cart.queries";
import { useAddToWishList } from "@/apis/queries/wishlist.queries";
import ProductCard from "@/components/modules/cartList/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getOrCreateDeviceId } from "@/utils/helper";
import { CartItem } from "@/utils/types/cart.types";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const CartListPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [haveAccessToken, setHaveAccessToken] = useState(false);
  const deviceId = getOrCreateDeviceId() || "";
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);

  const cartListByDeviceQuery = useCartListByDevice(
    {
      page: 1,
      limit: 10,
      deviceId,
    },
    !haveAccessToken,
  );
  const cartListByUser = useCartListByUserId(
    {
      page: 1,
      limit: 10,
    },
    haveAccessToken,
  );
  const updateCartWithLogin = useUpdateCartWithLogin();
  const updateCartByDevice = useUpdateCartByDevice();
  const deleteCartItem = useDeleteCartItem();
  const addToWishlist = useAddToWishList();

  const memoizedCartList = useMemo(() => {
    if (cartListByUser.data?.data) {
      return cartListByUser.data?.data || [];
    } else if (cartListByDeviceQuery.data?.data) {
      return cartListByDeviceQuery.data?.data || [];
    }
    return [];
  }, [cartListByUser.data?.data, cartListByDeviceQuery.data?.data]);

  const calculateDiscountedPrice = (
    offerPrice: string,
    consumerDiscount: number,
  ) => {
    const price = offerPrice ? Number(offerPrice) : 0;
    const discount = consumerDiscount || 0;
    return price - (price * discount) / 100;
  };

  const calculateTotalAmount = () => {
    if (cartListByUser.data?.data?.length) {
      return cartListByUser.data?.data?.reduce(
        (
          acc: number,
          curr: {
            productPriceDetails: {
              offerPrice: string;
              consumerDiscount: number;
            };
            quantity: number;
          },
        ) => {
          return (
            acc +
            +calculateDiscountedPrice(
              curr.productPriceDetails?.offerPrice ?? 0,
              curr?.productPriceDetails?.consumerDiscount,
            ) *
              curr.quantity
          );
        },
        0,
      );
    } else if (cartListByDeviceQuery.data?.data?.length) {
      return cartListByDeviceQuery.data?.data?.reduce(
        (
          acc: number,
          curr: {
            productPriceDetails: {
              offerPrice: string;
            };
            quantity: number;
          },
        ) => {
          return (
            acc + +(curr.productPriceDetails?.offerPrice ?? 0) * curr.quantity
          );
        },
        0,
      );
    }
  };

  const handleAddToCart = async (
    quantity: number,
    actionType: "add" | "remove",
    productPriceId: number,
  ) => {
    if (haveAccessToken) {
      const response = await updateCartWithLogin.mutateAsync({
        productPriceId,
        quantity,
      });

      if (response.status) {
        toast({
          title: `Item ${actionType === "add" ? "added to" : actionType === "remove" ? "removed from" : ""} cart`,
          description: "Check your cart for more details",
          variant: "success",
        });
      }
    } else {
      const response = await updateCartByDevice.mutateAsync({
        productPriceId,
        quantity,
        deviceId,
      });
      if (response.status) {
        toast({
          title: `Item ${actionType === "add" ? "added to" : actionType === "remove" ? "removed from" : ""} cart`,
          description: "Check your cart for more details",
          variant: "success",
        });
      }
    }
  };

  const handleRemoveItemFromCart = async (cartId: number) => {
    const response = await deleteCartItem.mutateAsync({ cartId });
    if (response.status) {
      toast({
        title: "Item removed from cart",
        description: "Check your cart for more details",
        variant: "success",
      });
    } else {
      toast({
        title: "Item not removed from cart",
        description: "Check your cart for more details",
        variant: "danger",
      });
    }
  };

  const handleAddToWishlist = async (productId: number) => {
    const response = await addToWishlist.mutateAsync({ productId });
    if (response.status) {
      toast({
        title: "Item added to wishlist",
        description: "Check your wishlist for more details",
        variant: "success",
      });
    } else {
      toast({
        title: response.message || "Item not added to wishlist",
        description: "Check your wishlist for more details",
        variant: "danger",
      });
    }
  };

  useEffect(() => {
    if (accessToken) {
      setHaveAccessToken(true);
    } else {
      setHaveAccessToken(false);
    }
  }, [accessToken]);

  return (
    <div className="cart-page">
      <div className="container m-auto px-3">
        <div className="headerPart">
          <div className="lediv">
            <h3>My Cart</h3>
          </div>
        </div>
        <div className="cart-page-wrapper">
          <div className="cart-page-left">
            <div className="bodyPart">
              <div className="card-item cart-items">
                <div className="card-inner-headerPart">
                  <div className="lediv">
                    <h3>Cart items</h3>
                  </div>
                </div>
                <div className="cart-item-lists">
                  {haveAccessToken &&
                  !cartListByUser.data?.data?.length &&
                  !cartListByUser.isLoading ? (
                    <div className="px-3 py-6">
                      <p className="my-3 text-center">No items in cart</p>
                    </div>
                  ) : null}

                  {!haveAccessToken &&
                  !cartListByDeviceQuery.data?.data?.length &&
                  !cartListByDeviceQuery.isLoading ? (
                    <div className="px-3 py-6">
                      <p className="my-3 text-center">No items in cart</p>
                    </div>
                  ) : null}

                  <div className="px-3">
                    {cartListByUser.isLoading ? (
                      <div className="my-3 space-y-3">
                        {Array.from({ length: 2 }).map((_, i) => (
                          <Skeleton key={i} className="h-28 w-full" />
                        ))}
                      </div>
                    ) : null}

                    {!haveAccessToken && cartListByDeviceQuery.isLoading ? (
                      <div className="my-3 space-y-3">
                        {Array.from({ length: 2 }).map((_, i) => (
                          <Skeleton key={i} className="h-28 w-full" />
                        ))}
                      </div>
                    ) : null}
                  </div>

                  {memoizedCartList?.map((item: CartItem) => (
                    <ProductCard
                      key={item.id}
                      cartId={item.id}
                      productId={item.productId}
                      productPriceId={item.productPriceId}
                      productName={
                        item.productPriceDetails?.productPrice_product
                          ?.productName
                      }
                      offerPrice={item.productPriceDetails?.offerPrice}
                      productQuantity={item.quantity}
                      productImages={
                        item.productPriceDetails?.productPrice_product
                          ?.productImages
                      }
                      consumerDiscount={
                        item.productPriceDetails?.consumerDiscount
                      }
                      onAdd={handleAddToCart}
                      onRemove={handleRemoveItemFromCart}
                      onWishlist={handleAddToWishlist}
                      haveAccessToken={haveAccessToken}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="cart-page-right">
            <div className="card-item priceDetails">
              <div className="card-inner-headerPart">
                <div className="lediv">
                  <h3>Price Details</h3>
                </div>
              </div>
              <div className="priceDetails-body">
                <ul>
                  <li>
                    <p>Subtotal</p>
                    <h5>${calculateTotalAmount() || 0}</h5>
                  </li>
                  <li>
                    <p>Shipping</p>
                    <h5>Free</h5>
                  </li>
                </ul>
              </div>
              <div className="priceDetails-footer">
                <h4>Total Amount</h4>
                <h4 className="amount-value">${calculateTotalAmount() || 0}</h4>
              </div>
            </div>
            <div className="order-action-btn">
              <Button
                onClick={() => router.push("/checkout")}
                disabled={!memoizedCartList?.length}
                className="theme-primary-btn order-btn"
              >
                Place Order
              </Button>
              {/* <Link
                href="/checkout"
                className="theme-primary-btn order-btn"
              >
                Place Order
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartListPage;
