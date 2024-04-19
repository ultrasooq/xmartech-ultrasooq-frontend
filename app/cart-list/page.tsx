"use client";
import {
  useCartListByUserId,
  useDeleteCartItem,
  useUpdateCartWithLogin,
} from "@/apis/queries/cart.queries";
import ProductCard from "@/components/modules/cartList/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { CartItem } from "@/utils/types/cart.types";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

const CartListPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const cartListByUser = useCartListByUserId({
    page: 1,
    limit: 10,
  });
  const updateCartWithLogin = useUpdateCartWithLogin();
  const deleteCartItem = useDeleteCartItem();

  const memoizedCartList = useMemo(() => {
    return cartListByUser.data?.data || [];
  }, [cartListByUser.data?.data]);

  const calculateTotalAmount = () => {
    if (cartListByUser.data?.data?.length) {
      return cartListByUser.data?.data?.reduce(
        (
          acc: number,
          curr: {
            productDetails: {
              offerPrice: string;
            };
            quantity: number;
          },
        ) => {
          return acc + +curr.productDetails.offerPrice * curr.quantity;
        },
        0,
      );
    }
  };

  const handleAddToCart = async (
    quantity: number,
    productId: number,
    actionType: "add" | "remove",
  ) => {
    console.log("add to cart:", quantity, productId, actionType);
    // return;
    const response = await updateCartWithLogin.mutateAsync({
      productId,
      quantity,
    });

    if (response.status) {
      toast({
        title: `Item ${actionType === "add" ? "added to" : actionType === "remove" ? "removed from" : ""} cart`,
        description: "Check your cart for more details",
        variant: "success",
      });
    }
  };

  const handleRemoveItemFromCart = async (cartId: number) => {
    console.log("cart id:", cartId);
    // return;
    const response = await deleteCartItem.mutateAsync({ cartId });
    if (response.status) {
      toast({
        title: "Item removed from cart",
        description: "Check your cart for more details",
        variant: "success",
      });
    }
  };

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
                  {!memoizedCartList.length && !cartListByUser.isLoading ? (
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
                  </div>
                  {memoizedCartList?.map((item: CartItem) => (
                    <ProductCard
                      key={item.id}
                      cartId={item.id}
                      productId={item.productId}
                      productName={item.productDetails.productName}
                      offerPrice={item.productDetails.offerPrice}
                      productQuantity={item.quantity}
                      productImages={item.productDetails.productImages}
                      onAdd={handleAddToCart}
                      onRemove={handleRemoveItemFromCart}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartListPage;
