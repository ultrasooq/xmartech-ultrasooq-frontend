"use client";
import {
  useCartListByUserId,
  useDeleteCartItem,
  useUpdateCartWithLogin,
} from "@/apis/queries/cart.queries";
import ProductCard from "@/components/modules/cartList/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import React, { useMemo } from "react";

const CartListPage = () => {
  const { toast } = useToast();

  const cartListByUser = useCartListByUserId({
    page: 1,
    limit: 10,
  });
  const updateCartWithLogin = useUpdateCartWithLogin();
  const deleteCartItem = useDeleteCartItem();

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
  console.log(memoizedCartList);

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
              <div className="card-item selected-address">
                <div className="selected-address-lists">
                  <div className="selected-address-item">
                    {/* <div className="selectTag-lists">
                      <div className="selectTag">Home</div>
                    </div> */}
                    <div className="left-address-with-right-btn">
                      <div className="left-address">
                        <h4>John Doe</h4>
                        <ul>
                          <li>
                            <p>
                              <span className="icon-container">
                                <img src="/images/phoneicon.svg" alt="" />
                              </span>
                              <span className="text-container">
                                +1 000 0000 0000
                              </span>
                            </p>
                          </li>
                          <li>
                            <p>
                              <span className="icon-container">
                                <img src="/images/locationicon.svg" alt="" />
                              </span>
                              <span className="text-container">
                                2207 Jericho Turnpike Commack North Dakota 11725
                              </span>
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div className="right-action">
                        <a href="#" className="changebtn">
                          Change
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-item cart-items">
                <div className="card-inner-headerPart">
                  <div className="lediv">
                    <h3>Cart items</h3>
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
              <Link href="/checkout" className="theme-primary-btn order-btn">
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartListPage;
