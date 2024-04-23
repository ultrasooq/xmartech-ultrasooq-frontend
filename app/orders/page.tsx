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
import { initialOrderState, useOrderStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateOrder,
  useCreateOrderUnAuth,
} from "@/apis/queries/orders.queries";
import { useRouter } from "next/navigation";

const OrdersPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const hasAccessToken = !!getCookie(PUREMOON_TOKEN_KEY);
  const deviceId = getOrCreateDeviceId() || "";
  const orders = useOrderStore();

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
  const createOrder = useCreateOrder();
  const createOrderUnAuth = useCreateOrderUnAuth();

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

  const handleCreateOrder = async () => {
    if (hasAccessToken) {
      let data = {};
      if (orders.orders) {
        data = orders.orders;
      }
      const response = await createOrder.mutateAsync(data);

      if (response?.data) {
        toast({
          title: "Order Placed Successfully",
          description:
            "Your order has been placed successfully. You can check your order status in My Orders section",
          variant: "success",
        });

        orders.setOrders(initialOrderState.orders);

        router.push("/my-orders");
      }
    } else {
      console.log(orders.orders);

      let data = {};
      if (orders.orders) {
        data = orders.orders;
      }
      const response = await createOrderUnAuth.mutateAsync(data);

      if (response?.data) {
        toast({
          title: "Order Placed Successfully",
          description:
            "Your order has been placed successfully. Kindly login to continue. You can check your order status in My Orders section",
          variant: "success",
        });

        orders.setOrders(initialOrderState.orders);

        router.push("/login");
      }
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
          <PaymentForm
            onCreateOrder={handleCreateOrder}
            isLoading={createOrder.isPending}
          />

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
