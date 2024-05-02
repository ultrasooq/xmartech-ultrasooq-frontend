"use client";
import React, { useEffect, useState } from "react";
import { BiSolidCircle } from "react-icons/bi";
import { PiStarFill } from "react-icons/pi";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdHelpCenter } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOrderById } from "@/apis/queries/orders.queries";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import OtherItemCard from "@/components/modules/myOrderDetails/OtherItemCard";
import UpdateProductStatusForm from "@/components/modules/myOrderDetails/UpdateProductStatusForm";
import { useMe } from "@/apis/queries/user.queries";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/shared/Footer";
import Link from "next/link";

const MyOrderDetailsPage = ({}) => {
  const searchParams = useParams();
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [progress, setProgress] = useState(13);

  const handleToggleStatusModal = () =>
    setIsStatusModalOpen(!isStatusModalOpen);

  const me = useMe();
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

  useEffect(() => {
    if (orderDetails?.orderProductStatus) {
      switch (orderDetails?.orderProductStatus) {
        case "CONFIRMED":
          setProgress(25);
          break;
        case "SHIPPED":
          setProgress(50);
          break;
        case "OFD":
          setProgress(75);
          break;
        case "DELIVERED":
          setProgress(100);
          break;
        case "CANCELLED":
          setProgress(0);
          break;
        default:
          break;
      }
    }
  }, [orderDetails?.orderProductStatus]);

  return (
    <>
      <div className="my-order-main">
        <div className="container m-auto px-3">
          <div className="my-order-wrapper">
            <div className="right-div mx-w-100">
              <div className="my-order-lists for-delivery-address">
                {orderByIdQuery.isLoading ? (
                  <Skeleton className="h-52" />
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
                  <Skeleton className="h-40" />
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
                            {/* <ul>
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
                            <li className="current">
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
                            <li>
                              <div className="orderStatusText">Shipped</div>
                              <div className="dot">
                                <small></small>
                              </div>
                              <div className="orderDateText">-</div>
                            </li>
                            <li>
                              <div className="orderStatusText">
                                Out for delivery
                              </div>
                              <div className="dot">
                                <small></small>
                              </div>
                              <div className="orderDateText">-</div>
                            </li>
                            <li>
                              <div className="orderStatusText">Delivered</div>
                              <div className="dot">
                                <small></small>
                              </div>
                              <div className="orderDateText">-</div>
                            </li>
                          </ul> */}

                            <div className="my-4">
                              <div className="orderStatusText mb-2">Status</div>
                              <Progress value={progress} className="w-[80%]" />
                            </div>
                          </div>
                        </div>
                        <div className="right-info">
                          <a href="#" className="ratingLink mt-0">
                            <PiStarFill />
                            Rate & Review Product
                          </a>
                          <a href="#" className="ratingLink">
                            <MdHelpCenter />
                            Need Help?
                          </a>
                          {me?.data?.data?.tradeRole !== "BUYER" ? (
                            <div className="more-actions">
                              <button
                                type="button"
                                className="theme-primary-btn update-status-btn"
                                onClick={handleToggleStatusModal}
                              >
                                Update Status
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      {/* <div className="my-order-box">
                      <figure>
                        <div className="image-container">
                          <img src="/images/iphone.png" alt=""></img>
                        </div>
                        <figcaption>
                          <h3>Iphone 5 (Black)</h3>
                          <p>Color: B.A.E Black</p>
                          <p className="mt-1">Seller: Mythsx-Retail</p>
                          <h4 className="mt-1">₹65,000</h4>
                        </figcaption>
                      </figure>
                      <div className="center-div">
                        <h4>
                          Coupon Code - <strong>FLTBPIPGL7UBTF</strong>, claim
                          before Jun 30,2024
                        </h4>
                        <a href="#" className="ratingLink">
                          How To claim?
                        </a>
                      </div>
                      <div className="right-info">
                        <a href="#" className="ratingLink">
                          <PiStarFill />
                          Rate & Review Product
                        </a>
                        <a href="#" className="ratingLink">
                          <MdHelpCenter />
                          Need Help?
                        </a>
                      </div>
                    </div> */}
                      {/* <p className="mt-2">Return policy ended on Mar 28</p> */}
                    </div>
                  </div>
                )}

                {orderByIdQuery.isLoading ? (
                  <Skeleton className="h-40" />
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
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Dialog open={isStatusModalOpen} onOpenChange={handleToggleStatusModal}>
        <DialogContent className="customModal-s1">
          <DialogHeader className="modal-header">
            <DialogTitle className="modal-title">
              Update Delivery Status
            </DialogTitle>
          </DialogHeader>

          <UpdateProductStatusForm
            orderProductId={searchParams?.id as string}
            onClose={handleToggleStatusModal}
            orderProductStatus={orderDetails?.orderProductStatus}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyOrderDetailsPage;
