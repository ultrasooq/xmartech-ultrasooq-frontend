"use client";
import React from "react";
import { BiSolidCircle, BiCircle } from "react-icons/bi";
import { PiStarFill } from "react-icons/pi";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdHelpCenter } from "react-icons/md";
import { useOrderById } from "@/apis/queries/orders.queries";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import OtherItemCard from "@/components/modules/myOrderDetails/OtherItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { formattedDate } from "@/utils/constants";
import { cn } from "@/lib/utils";

const MyOrderDetailsPage = ({}) => {
  const searchParams = useParams();

  const orderByIdQuery = useOrderById(
    {
      orderProductId: searchParams?.id ? (searchParams.id as string) : "",
    },
    !!searchParams?.id,
  );

  const orderDetails = orderByIdQuery.data?.data;
  const shippingDetails =
    orderByIdQuery.data?.data?.orderProduct_order?.order_orderAddress.find(
      (item: { addressType: "SHIPPING" | "BILLING" }) =>
        item?.addressType === "SHIPPING",
    );
  const billingDetails =
    orderByIdQuery.data?.data?.orderProduct_order?.order_orderAddress.find(
      (item: { addressType: "SHIPPING" | "BILLING" }) =>
        item?.addressType === "BILLING",
    );
  const otherOrderDetails =
    orderByIdQuery.data?.otherData?.[0]?.order_orderProducts;

  function formatDate(inputDate: string): string {
    const months: string[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dateObj = new Date(inputDate);
    const dayOfWeek = dateObj.toLocaleString("en", { weekday: "short" });
    const dayOfMonth = dateObj.getDate();
    const month = months[dateObj.getMonth()];

    // Function to add suffix to day of the month
    function getDaySuffix(day: number): string {
      if (day >= 11 && day <= 13) {
        return `${day}th`;
      }
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    }

    const dayWithSuffix = getDaySuffix(dayOfMonth);

    return `${dayOfWeek}, ${dayWithSuffix} ${month}`;
  }

  return (
    <>
      <div className="my-order-main">
        <div className="container m-auto px-3">
          <div className="my-order-wrapper">
            <div className="right-div mx-w-100">
              <div className="my-order-lists for-delivery-address">
                {orderByIdQuery.isLoading ? (
                  <Skeleton className="h-44" />
                ) : (
                  <div className="my-order-item">
                    <div className="my-order-card">
                      <div className="delivery-address">
                        <div className="delivery-address-col deliveryAddress">
                          <h2>Delivery Address</h2>
                          <h3>
                            {shippingDetails?.firstName}{" "}
                            {shippingDetails?.lastName}
                          </h3>
                          <address>
                            {shippingDetails?.address}, <br /> pin -{" "}
                            {shippingDetails?.postCode}
                          </address>
                          <p>
                            Phone Number{" "}
                            <span className="!text-red-500">
                              {shippingDetails?.phone}
                            </span>
                          </p>
                        </div>
                        <div className="delivery-address-col deliveryAddress">
                          <h2>Billing Address</h2>
                          <h3>
                            {billingDetails?.firstName}{" "}
                            {billingDetails?.lastName}
                          </h3>
                          <address>
                            {billingDetails?.address}, <br /> pin -{" "}
                            {billingDetails?.postCode}
                          </address>
                          <p>
                            Phone Number{" "}
                            <span className="!text-red-500">
                              {billingDetails?.phone}
                            </span>
                          </p>
                        </div>
                        {/* <div className='delivery-address-col yourRewards'>
                        <h2>Your Rewards</h2>
                      </div> */}
                        <div className="delivery-address-col moreActions">
                          <h2>More actions</h2>
                          <figure className="downloadInvoice">
                            <figcaption>
                              <Button className="downloadInvoice-btn theme-primary-btn">
                                <LiaFileInvoiceSolid /> Download Invoice
                              </Button>
                            </figcaption>
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {orderByIdQuery.isLoading ? (
                  <Skeleton className="h-44" />
                ) : (
                  <div className="my-order-item">
                    <div className="my-order-card">
                      <h5 className="mb-2">
                        Order ID:{" "}
                        <span className="font-semibold">
                          {orderDetails?.orderProduct_order?.orderNo}
                        </span>
                      </h5>
                      <div className="my-order-box">
                        <Link
                          href={`/trending/${orderDetails?.orderProduct_product?.id}`}
                        >
                          <figure>
                            <div className="image-container rounded border border-gray-300">
                              <Image
                                src={
                                  orderDetails?.orderProduct_product
                                    ?.productImages?.[0]?.image ||
                                  "/images/product-placeholder.png"
                                }
                                alt="preview-product"
                                width={120}
                                height={120}
                                placeholder="blur"
                                blurDataURL="/images/product-placeholder.png"
                              />
                            </div>
                            <figcaption>
                              <h3>
                                {
                                  orderDetails?.orderProduct_product
                                    ?.productName
                                }
                              </h3>
                              {/* <p>Color: B.A.E Black</p> */}
                              <p className="mt-1">
                                Seller:{" "}
                                {
                                  orderDetails?.orderProduct_product?.userBy
                                    ?.firstName
                                }{" "}
                                {
                                  orderDetails?.orderProduct_product?.userBy
                                    ?.lastName
                                }
                              </p>
                              <h4 className="mt-1">
                                $
                                {orderDetails?.orderProduct_product?.offerPrice}
                              </h4>
                            </figcaption>
                          </figure>
                        </Link>
                        <div className="center-div">
                          <div className="order-delivery-progess-s1">
                            <ul>
                              <li className="complted">
                                <div className="orderStatusText">
                                  Order Received
                                </div>
                                <div className="dot">
                                  <small></small>
                                </div>
                                <div className="orderDateText">
                                  {formatDate(orderDetails?.orderProductDate)}
                                </div>
                              </li>
                              <li
                                className={cn(
                                  orderDetails?.orderProductStatus ===
                                    "CANCELLED" ||
                                    orderDetails?.orderProductStatus ===
                                      "DELIVERED" ||
                                    orderDetails?.orderProductStatus ===
                                      "OFD" ||
                                    orderDetails?.orderProductStatus ===
                                      "SHIPPED"
                                    ? "complted"
                                    : orderDetails?.orderProductStatus ===
                                        "CONFIRMED"
                                      ? "current"
                                      : "",
                                )}
                              >
                                <div className="orderStatusText">
                                  Order Confirmed
                                </div>
                                <div className="dot">
                                  <small></small>
                                </div>
                                <div className="orderDateText">
                                  {formatDate(orderDetails?.orderProductDate)}
                                </div>
                              </li>
                              <li
                                className={cn(
                                  orderDetails?.orderProductStatus ===
                                    "CANCELLED" ||
                                    orderDetails?.orderProductStatus ===
                                      "DELIVERED" ||
                                    orderDetails?.orderProductStatus === "OFD"
                                    ? "complted"
                                    : orderDetails?.orderProductStatus ===
                                        "SHIPPED"
                                      ? "current"
                                      : "",
                                )}
                              >
                                <div className="orderStatusText">Shipped</div>
                                <div className="dot">
                                  <small></small>
                                </div>
                                <div className="orderDateText">
                                  {orderDetails?.orderProductStatus ===
                                  "SHIPPED"
                                    ? formatDate(orderDetails?.updatedAt)
                                    : "-"}
                                </div>
                              </li>
                              <li
                                className={cn(
                                  orderDetails?.orderProductStatus ===
                                    "CANCELLED" ||
                                    orderDetails?.orderProductStatus ===
                                      "DELIVERED"
                                    ? "complted"
                                    : orderDetails?.orderProductStatus === "OFD"
                                      ? "current"
                                      : "",
                                )}
                              >
                                <div className="orderStatusText">
                                  Out for delivery
                                </div>
                                <div className="dot">
                                  <small></small>
                                </div>
                                <div className="orderDateText">
                                  {orderDetails?.orderProductStatus === "OFD"
                                    ? formatDate(orderDetails?.updatedAt)
                                    : "-"}
                                </div>
                              </li>
                              <li
                                className={cn(
                                  orderDetails?.orderProductStatus ===
                                    "CANCELLED"
                                    ? "complted"
                                    : orderDetails?.orderProductStatus ===
                                        "DELIVERED"
                                      ? "complted"
                                      : "",
                                )}
                              >
                                <div
                                  className={cn(
                                    orderDetails?.orderProductStatus ===
                                      "CANCELLED"
                                      ? "orderStatusCancelledText"
                                      : "orderStatusText",
                                  )}
                                >
                                  {orderDetails?.orderProductStatus ===
                                  "CANCELLED"
                                    ? "Cancelled"
                                    : "Delivered"}
                                </div>
                                <div className="dot">
                                  <small
                                    className={cn(
                                      orderDetails?.orderProductStatus ===
                                        "CANCELLED"
                                        ? "!bg-red-500"
                                        : "",
                                    )}
                                  ></small>
                                </div>
                                <div className="orderDateText">
                                  {orderDetails?.orderProductStatus ===
                                    "CANCELLED" ||
                                  orderDetails?.orderProductStatus ===
                                    "DELIVERED"
                                    ? formatDate(orderDetails?.updatedAt)
                                    : "-"}
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="right-info">
                          <h4 className="mb-2">
                            {orderDetails?.orderProductStatus ===
                            "CONFIRMED" ? (
                              <>
                                <BiCircle color="green" />
                                Placed on{" "}
                                {orderDetails?.orderProductDate
                                  ? formattedDate(orderDetails.orderProductDate)
                                  : ""}
                              </>
                            ) : null}

                            {orderDetails?.orderProductStatus === "SHIPPED" ? (
                              <>
                                <BiCircle color="green" />
                                Shipped on{" "}
                                {orderDetails?.updatedAt
                                  ? formattedDate(orderDetails.updatedAt)
                                  : ""}
                              </>
                            ) : null}

                            {orderDetails?.orderProductStatus === "OFD" ? (
                              <>
                                <BiCircle color="green" /> Out for delivery{" "}
                                {orderDetails?.updatedAt
                                  ? formattedDate(orderDetails.updatedAt)
                                  : ""}
                              </>
                            ) : null}

                            {orderDetails?.orderProductStatus ===
                            "DELIVERED" ? (
                              <>
                                <BiSolidCircle color="green" /> Delivered on{" "}
                                {orderDetails?.updatedAt
                                  ? formattedDate(orderDetails.updatedAt)
                                  : ""}
                              </>
                            ) : null}

                            {orderDetails?.orderProductStatus ===
                            "CANCELLED" ? (
                              <>
                                <BiSolidCircle color="red" /> Cancelled on{" "}
                                {orderDetails?.updatedAt
                                  ? formattedDate(orderDetails.updatedAt)
                                  : ""}
                              </>
                            ) : null}
                          </h4>

                          {orderDetails?.orderProductStatus === "DELIVERED" ? (
                            <a href="#" className="ratingLink mt-0">
                              <PiStarFill />
                              Rate & Review Product
                            </a>
                          ) : null}
                          <a href="#" className="ratingLink">
                            <MdHelpCenter />
                            Need Help?
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {orderByIdQuery.isLoading ? (
                  <Skeleton className="h-52" />
                ) : null}

                {otherOrderDetails?.map((item: any) => (
                  <OtherItemCard
                    key={item?.id}
                    id={item?.id}
                    productName={item?.orderProduct_product?.productName}
                    offerPrice={item?.orderProduct_product?.offerPrice}
                    productImages={item?.orderProduct_product?.productImages}
                    sellerName={`${item?.orderProduct_product?.userBy?.firstName} ${item?.orderProduct_product?.userBy?.lastName}`}
                    orderNo={orderDetails?.orderProduct_order?.orderNo}
                    orderProductDate={item?.orderProductDate}
                    orderProductStatus={item?.orderProductStatus}
                    updatedAt={item?.updatedAt}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrderDetailsPage;
