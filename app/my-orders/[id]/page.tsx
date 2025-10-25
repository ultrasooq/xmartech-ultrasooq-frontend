"use client";
import React from "react";
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  XCircle, 
  Star,
  Download,
  HelpCircle,
  MapPin,
  CreditCard,
  Calendar,
  User,
  Phone,
  ArrowLeft,
  ShoppingBag,
  FileText,
  RotateCcw
} from "lucide-react";
import { useOrderById } from "@/apis/queries/orders.queries";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OtherItemCard from "@/components/modules/myOrderDetails/OtherItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { MONTHS, formattedDate } from "@/utils/constants";
import { cn } from "@/lib/utils";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { convertDate, convertTime } from "@/utils/helper";

const MyOrderDetailsPage = () => {
  const t = useTranslations();
  const { langDir, currency } = useAuth();
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

  // Helper functions for status display
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PLACED":
        return <Clock className="h-4 w-4" />;
      case "CONFIRMED":
        return <CheckCircle className="h-4 w-4" />;
      case "SHIPPED":
        return <Truck className="h-4 w-4" />;
      case "OFD":
        return <Truck className="h-4 w-4" />;
      case "DELIVERED":
        return <CheckCircle className="h-4 w-4" />;
      case "CANCELLED":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PLACED":
        return "bg-gray-100 text-gray-800";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "SHIPPED":
        return "bg-purple-100 text-purple-800";
      case "OFD":
        return "bg-orange-100 text-orange-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  function formatDate(inputDate: string): string {
    const dateObj = new Date(inputDate);
    const dayOfWeek = dateObj.toLocaleString("en", { weekday: "short" });
    const dayOfMonth = dateObj.getDate();
    const month = MONTHS[dateObj.getMonth()];

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
      <div className="min-h-screen bg-gray-50">
        <div className="w-full px-6 lg:px-12 py-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/home" className="hover:text-gray-900 transition-colors" dir={langDir}>
                  {t("home")}
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <Link href="/my-orders" className="hover:text-gray-900 transition-colors" dir={langDir}>
                  {t("my_orders")}
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">
                  {orderDetails?.orderProduct_order?.orderNo || 'Loading...'}
                </span>
              </li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900" dir={langDir}>
                    Order Details
                  </h1>
                  <p className="text-gray-600 mt-1" dir={langDir}>
                    Order #{orderDetails?.orderProduct_order?.orderNo || 'Loading...'}
                  </p>
                </div>
              </div>
              {orderDetails?.orderProductStatus && (
                <Badge className={`${getStatusColor(orderDetails.orderProductStatus)} flex items-center gap-2 px-4 py-2 text-sm font-semibold`}>
                  {getStatusIcon(orderDetails.orderProductStatus)}
                  {orderDetails.orderProductStatus}
                </Badge>
              )}
            </div>
          </div>

          {/* Address Information */}
          {orderByIdQuery.isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Shipping Address */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <h3 className="font-semibold text-gray-900" dir={langDir}>
                        {shippingDetails?.firstName} {shippingDetails?.lastName}
                      </h3>
                    </div>
                    <address className="text-gray-600 not-italic leading-relaxed" dir={langDir}>
                      {shippingDetails?.address}
                      <br />
                      <span className="text-gray-500">Pin: {shippingDetails?.postCode}</span>
                    </address>
                    <div className="flex items-center gap-2 text-gray-600 pt-2 border-t">
                      <Phone className="h-4 w-4" />
                      <span dir={langDir}>{shippingDetails?.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    Billing Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <h3 className="font-semibold text-gray-900" dir={langDir}>
                        {billingDetails?.firstName} {billingDetails?.lastName}
                      </h3>
                    </div>
                    <address className="text-gray-600 not-italic leading-relaxed" dir={langDir}>
                      {billingDetails?.address}
                      <br />
                      <span className="text-gray-500">Pin: {billingDetails?.postCode}</span>
                    </address>
                    <div className="flex items-center gap-2 text-gray-600 pt-2 border-t">
                      <Phone className="h-4 w-4" />
                      <span dir={langDir}>{billingDetails?.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-600" />
                    Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline" size="lg">
                      <Download className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                    {orderDetails?.orderShippingDetail?.receipt && (
                      <Button className="w-full justify-start" variant="outline" size="lg">
                        <Download className="h-4 w-4 mr-2" />
                        Download Receipt
                      </Button>
                    )}
                    <Button className="w-full justify-start" variant="outline" size="lg">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Need Help ?
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Shipping & Product Details Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Shipping Details */}
            {orderDetails?.orderShippingDetail && orderDetails?.orderProductType != 'SERVICE' && (
              <Card className="shadow-md">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-orange-600" />
                    Shipping Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 flex items-center gap-2">
                        <Truck className="h-4 w-4 text-gray-500" />
                        Shipping Mode
                      </h4>
                      <p className="text-gray-600">{orderDetails?.orderShippingDetail?.orderShippingType}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 flex items-center gap-2">
                        <Package className="h-4 w-4 text-gray-500" />
                        Delivery Charge
                      </h4>
                      <p className="text-gray-600">{currency.symbol}{orderDetails?.orderShippingDetail?.shippingCharge}</p>
                    </div>
                    {orderDetails?.orderShippingDetail?.orderShippingType === "PICKUP" && (
                      <>
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900 flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            Shipping Date
                          </h4>
                          <p className="text-gray-600">{convertDate(orderDetails?.orderShippingDetail?.shippingDate)}</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900 flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            From Time
                          </h4>
                          <p className="text-gray-600">{convertTime(orderDetails?.orderShippingDetail?.fromTime)}</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900 flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            To Time
                          </h4>
                          <p className="text-gray-600">{convertTime(orderDetails?.orderShippingDetail?.toTime)}</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Product Details */}
            {orderByIdQuery.isLoading ? (
              <Card className="shadow-lg border-0 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex gap-6">
                    <Skeleton className="h-32 w-32 rounded-xl" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg border-0 overflow-hidden">
                <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Product Image & Basic Info */}
                  <div className="flex gap-6">
                    <Link href={`/trending/${orderDetails?.orderProduct_product?.id}`} className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white flex items-center justify-center">
                        {orderDetails?.orderProductType === 'SERVICE' ? (
                          <Image
                            src={PlaceholderImage}
                            alt="service-preview"
                            width={128}
                            height={128}
                            className="w-full h-full object-contain p-2"
                          />
                        ) : (
                          <Image
                            src={
                              orderDetails?.orderProduct_productPrice
                                ?.productPrice_product?.productImages?.[0]
                                ?.image || PlaceholderImage
                            }
                            alt="product-preview"
                            width={128}
                            height={128}
                            className="w-full h-full object-contain p-2"
                          />
                        )}
                      </div>
                    </Link>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {orderDetails?.orderProductType === 'SERVICE' 
                          ? orderDetails?.serviceFeatures?.serviceFeatures?.[0]?.name
                          : orderDetails?.orderProduct_productPrice?.productPrice_product?.productName
                        }
                      </h3>
                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          Quantity: {orderDetails?.orderQuantity || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(orderDetails?.orderProductDate)}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {currency.symbol}
                        {orderDetails?.orderProductType === 'SERVICE' 
                          ? Number(orderDetails?.purchasePrice || 0) * (orderDetails?.orderQuantity || 0)
                          : orderDetails?.orderProduct_productPrice?.offerPrice
                            ? Number(orderDetails?.orderProduct_productPrice?.offerPrice * orderDetails?.orderQuantity)
                            : 0
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            )}
          </div>

          {/* Order Tracking & Other Items Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Order Tracking Section */}
            {orderByIdQuery.isLoading ? (
              <Card className="shadow-lg border-0">
                <CardContent className="p-8">
                  <Skeleton className="h-64" />
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5 text-green-600" />
                  Order Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="relative">
                  {/* Timeline */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  <div className="space-y-6">
                    {/* Order Placed */}
                    <div className="relative flex items-start gap-6">
                      <div className="relative z-10 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shadow-md">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{t("placed")}</h4>
                        <p className="text-sm text-gray-600">{formatDate(orderDetails?.orderProductDate)}</p>
                      </div>
                    </div>

                    {/* Order Confirmed */}
                    <div className="relative flex items-start gap-6">
                      <div className={cn(
                        "relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-md",
                        ["CANCELLED", "DELIVERED", "OFD", "SHIPPED", "CONFIRMED"].includes(orderDetails?.orderProductStatus || '')
                          ? "bg-blue-100"
                          : "bg-gray-100"
                      )}>
                        {["CANCELLED", "DELIVERED", "OFD", "SHIPPED", "CONFIRMED"].includes(orderDetails?.orderProductStatus || '') ? (
                          <CheckCircle className="h-6 w-6 text-blue-600" />
                        ) : (
                          <Clock className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{t("order_confirmed")}</h4>
                        <p className="text-sm text-gray-600">
                          {["CANCELLED", "DELIVERED", "OFD", "SHIPPED", "CONFIRMED"].includes(orderDetails?.orderProductStatus || '')
                            ? formatDate(orderDetails?.orderProductDate)
                            : "Pending"}
                        </p>
                      </div>
                    </div>

                    {/* Shipped */}
                    <div className="relative flex items-start gap-6">
                      <div className={cn(
                        "relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-md",
                        ["CANCELLED", "DELIVERED", "OFD", "SHIPPED"].includes(orderDetails?.orderProductStatus || '')
                          ? "bg-purple-100"
                          : "bg-gray-100"
                      )}>
                        {["CANCELLED", "DELIVERED", "OFD", "SHIPPED"].includes(orderDetails?.orderProductStatus || '') ? (
                          <Truck className="h-6 w-6 text-purple-600" />
                        ) : (
                          <Clock className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{t("shipped")}</h4>
                        <p className="text-sm text-gray-600">
                          {["CANCELLED", "DELIVERED", "OFD", "SHIPPED"].includes(orderDetails?.orderProductStatus || '')
                            ? formatDate(orderDetails?.updatedAt)
                            : "Pending"}
                        </p>
                      </div>
                    </div>

                    {/* Out for Delivery */}
                    <div className="relative flex items-start gap-6">
                      <div className={cn(
                        "relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-md",
                        ["CANCELLED", "DELIVERED", "OFD"].includes(orderDetails?.orderProductStatus || '')
                          ? "bg-orange-100"
                          : "bg-gray-100"
                      )}>
                        {["CANCELLED", "DELIVERED", "OFD"].includes(orderDetails?.orderProductStatus || '') ? (
                          <Truck className="h-6 w-6 text-orange-600" />
                        ) : (
                          <Clock className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{t("out_for_delivery")}</h4>
                        <p className="text-sm text-gray-600">
                          {["CANCELLED", "DELIVERED", "OFD"].includes(orderDetails?.orderProductStatus || '')
                            ? formatDate(orderDetails?.updatedAt)
                            : "Pending"}
                        </p>
                      </div>
                    </div>

                    {/* Delivered/Cancelled */}
                    <div className="relative flex items-start gap-6">
                      <div className={cn(
                        "relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-md",
                        ["CANCELLED", "DELIVERED"].includes(orderDetails?.orderProductStatus || '')
                          ? orderDetails?.orderProductStatus === "CANCELLED"
                            ? "bg-red-100"
                            : "bg-green-100"
                          : "bg-gray-100"
                      )}>
                        {["CANCELLED", "DELIVERED"].includes(orderDetails?.orderProductStatus || '') ? (
                          orderDetails?.orderProductStatus === "CANCELLED" ? (
                            <XCircle className="h-6 w-6 text-red-600" />
                          ) : (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          )
                        ) : (
                          <Clock className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {orderDetails?.orderProductStatus === "CANCELLED" ? t("cancelled") : t("delivered")}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {["CANCELLED", "DELIVERED"].includes(orderDetails?.orderProductStatus || '')
                            ? formatDate(orderDetails?.updatedAt)
                            : "Pending"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            )}

            {/* Other Order Items */}
            {otherOrderDetails && otherOrderDetails.length > 0 && (
              <Card className="shadow-lg border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-indigo-600" />
                  Other Items in This Order
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {otherOrderDetails.map((item: any) => (
                    <div key={item?.id} className="flex gap-6 pb-6 border-b last:border-b-0 last:pb-0">
                      {/* Product Image */}
                      <Link href={`/my-orders/${item?.id}`} className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white flex items-center justify-center">
                          {item?.orderProductType === 'SERVICE' ? (
                            <Image
                              src={PlaceholderImage}
                              alt="service-preview"
                              width={96}
                              height={96}
                              className="w-full h-full object-contain p-2"
                            />
                          ) : (
                            <Image
                              src={
                                item?.orderProduct_productPrice?.productPrice_product?.productImages?.[0]?.image || PlaceholderImage
                              }
                              alt="product-preview"
                              width={96}
                              height={96}
                              className="w-full h-full object-contain p-2"
                            />
                          )}
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                          {item?.orderProductType === 'SERVICE' 
                            ? item?.serviceFeatures?.serviceFeatures?.[0]?.name
                            : item?.orderProduct_productPrice?.productPrice_product?.productName
                          }
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Package className="h-3 w-3" />
                            Qty: {item?.orderQuantity || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(item?.orderProductDate)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xl font-bold text-blue-600">
                            {currency.symbol}
                            {item?.orderProductType === 'SERVICE' 
                              ? Number(item?.purchasePrice || 0) * (item?.orderQuantity || 0)
                              : item?.orderProduct_productPrice?.offerPrice
                                ? Number(item?.orderProduct_productPrice?.offerPrice * item?.orderQuantity)
                                : Number(item?.purchasePrice || 0) * (item?.orderQuantity || 0)
                            }
                          </div>
                          <Badge className={`${getStatusColor(item?.orderProductStatus || '')} flex items-center gap-1`}>
                            {getStatusIcon(item?.orderProductStatus || '')}
                            {item?.orderProductStatus || 'Loading...'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyOrderDetailsPage;
