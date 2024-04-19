"use client";
import React, { useMemo } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useCartListByDevice,
  useCartListByUserId,
} from "@/apis/queries/cart.queries";
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getOrCreateDeviceId } from "@/utils/helper";

const OrdersPage = () => {
  const hasAccessToken = !!getCookie(PUREMOON_TOKEN_KEY);
  const deviceId = getOrCreateDeviceId() || "";

  const cartListByDeviceQuery = useCartListByDevice(
    {
      page: 1,
      limit: 10,
      deviceId,
    },
    !hasAccessToken,
  );
  const cartListByUser = useCartListByUserId(
    {
      page: 1,
      limit: 10,
    },
    hasAccessToken,
  );

  // const memoizedCartList = useMemo(() => {
  //   return cartListByUser.data?.data || [];
  // }, [cartListByUser.data?.data]);

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
    } else if (cartListByDeviceQuery.data?.data?.length) {
      return cartListByDeviceQuery.data?.data?.reduce(
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

  return (
    <div className="cart-page">
      <div className="container m-auto px-3">
        <div className="headerPart">
          <div className="lediv">
            <h3>Make payment</h3>
          </div>
        </div>
        <div className="cart-page-wrapper">
          <div className="cart-page-left">
            <div className="bodyPart">
              <div className="card-item card-payment-form px-5 pb-5 pt-3">
                <div className="flex flex-wrap">
                  <div className="mb-4 w-full space-y-2">
                    <label
                      className="text-sm font-medium 
                    leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Card Holder name
                    </label>
                    <div className="relative">
                      <input
                        className="theme-form-control-s1 flex h-9 w-full rounded-md border
                       border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors 
                       file:border-0 file:bg-transparent file:text-sm file:font-medium 
                       placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                       disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="card holder name"
                      />
                    </div>
                  </div>
                  <div className="mb-4 w-full space-y-2">
                    <label
                      className="text-sm font-medium 
                    leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        className="theme-form-control-s1 flex h-9
                       w-full rounded-md border border-input bg-transparent px-3
                        py-1 text-sm shadow-sm transition-colors file:border-0 
                        file:bg-transparent file:text-sm file:font-medium 
                        placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 
                        focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="card Number"
                        id=":Rj2nnjkq:-form-item"
                      />
                    </div>
                  </div>
                  <div className="grid w-full grid-cols-2 gap-4">
                    <div className="mb-4 space-y-2 ">
                      <label
                        className="text-sm font-medium 
                    leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Valid through (MM/yY)
                      </label>
                      <div className="relative">
                        <input
                          className="theme-form-control-s1 flex h-9 w-full rounded-md 
                      border border-input bg-transparent px-3 py-1 text-sm
                       shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm
                        file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
                        focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Valid through (MM/YY)"
                        />
                      </div>
                    </div>
                    <div className="mb-4 space-y-2 ">
                      <label
                        className="text-sm font-medium 
                    leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        CVV
                      </label>
                      <div className="relative">
                        <input
                          className="theme-form-control-s1 flex h-9 w-full rounded-md 
                      border border-input bg-transparent px-3 py-1 text-sm
                       shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm
                        file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
                        focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="CVV"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-action-btn">
                  <Button disabled className="theme-primary-btn order-btn">
                    Payment
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
