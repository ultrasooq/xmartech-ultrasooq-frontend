"use client";
import React from "react";
import {
  useCartListByDevice,
  useCartListByUserId,
} from "@/apis/queries/cart.queries";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getOrCreateDeviceId } from "@/utils/helper";
import PaymentForm from "@/components/modules/orders/PaymentForm";

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
          <PaymentForm />

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
