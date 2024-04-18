"use client";
import React, { useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/modules/checkout/ProductCard";
import {
  useCartListByUserId,
  useDeleteCartItem,
  useUpdateCartWithLogin,
} from "@/apis/queries/cart.queries";
import AddressCard from "@/components/modules/checkout/AddressCard";
import AddressForm from "@/components/modules/checkout/AddressForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const CheckoutPage = () => {
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const cartListByUser = useCartListByUserId({
    page: 1,
    limit: 10,
  });
  const updateCartWithLogin = useUpdateCartWithLogin();
  const deleteCartItem = useDeleteCartItem();

  const handleToggleAddModal = () => setIsAddModalOpen(!isAddModalOpen);

  const memoizedCartList = useMemo(() => {
    return cartListByUser.data?.data;
  }, [cartListByUser.data?.data]);

  const memoizedTotalAmount = useMemo(() => {
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
  }, [cartListByUser.data?.data?.length]);

  const handleAddToCart = async (
    quantity: number,
    productId: number,
    actionType: "add" | "remove",
  ) => {
    console.log("add to cart:", quantity, actionType);
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
        <div className="cart-page-wrapper">
          <div className="cart-page-left">
            <div className="bodyPart">
              <div className="card-item cart-items">
                <div className="card-inner-headerPart">
                  <div className="lediv">
                    <h3>cart items</h3>
                  </div>
                </div>

                <div className="cart-item-lists">
                  <div className="px-3">
                    {cartListByUser.isLoading ? (
                      <div className="my-3 space-y-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Skeleton key={i} className="h-28 w-full" />
                        ))}
                      </div>
                    ) : null}
                  </div>

                  {memoizedCartList?.map(
                    (item: {
                      id: number;
                      productId: number;
                      productDetails: {
                        productName: string;
                        offerPrice: string;
                        productImages: { id: number; image: string }[];
                      };
                      quantity: number;
                    }) => (
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
                    ),
                  )}
                </div>
              </div>
              <div className="card-item selected-address">
                <div className="card-inner-headerPart">
                  <div className="lediv">
                    <h3>Select Shipping address</h3>
                  </div>
                </div>
                <div className="selected-address-lists">
                  <AddressCard />
                  <AddressCard />
                </div>
              </div>

              <div className="card-item selected-address">
                <div className="card-inner-headerPart">
                  <div className="lediv">
                    <h3>Select Billing address</h3>
                  </div>
                  <div className="rgdiv">
                    <div className="textwithcheckbox">
                      <input
                        type="checkbox"
                        id="sameas"
                        className="custom-checkbox-s1"
                      ></input>
                      <label htmlFor="sameas">Same As Shipping address</label>
                    </div>
                  </div>
                </div>
                <div className="selected-address-lists">
                  <AddressCard />
                  <AddressCard />
                </div>
              </div>

              <div className="card-item cart-items for-add">
                <div className="top-heading">
                  <Button
                    variant="outline"
                    type="button"
                    className="add-new-address-btn border-none p-0 shadow-none"
                    onClick={handleToggleAddModal}
                  >
                    <img src="/images/addbtn.svg" alt="" /> add a new Address
                  </Button>
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
                    <h5>${memoizedTotalAmount}</h5>
                  </li>
                  <li>
                    <p>Shipping</p>
                    <h5>Free</h5>
                  </li>
                  {/* <li>
                    <button type="button" className="apply-code-btn">Add coupon code <img src="/images/arow01.svg" alt=""/></button>
                  </li> */}
                </ul>
              </div>
              <div className="priceDetails-footer">
                <h4>Total Amount</h4>
                <h4 className="amount-value">${memoizedTotalAmount}</h4>
              </div>
            </div>
            <div className="order-action-btn">
              <Link href="/orders" className="theme-primary-btn order-btn">
                Continue
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isAddModalOpen} onOpenChange={handleToggleAddModal}>
        <DialogContent className="add-new-address-modal gap-0 p-0">
          <AddressForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutPage;
