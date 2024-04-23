"use client";
import React from "react";
import { useOrders } from "@/apis/queries/orders.queries";

const MyOrdersPage = () => {
  const ordersQuery = useOrders({
    page: 1,
    limit: 20,
  });

  console.log(ordersQuery.data);

  return <div>My Orders Page</div>;
};

export default MyOrdersPage;
