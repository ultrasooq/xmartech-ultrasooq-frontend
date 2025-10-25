"use client";
import React, { useRef, useState } from "react";
import { useOrders } from "@/apis/queries/orders.queries";
import { 
  Search, 
  Filter, 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  XCircle, 
  X,
  Calendar,
  ShoppingBag,
  TrendingUp
} from "lucide-react";
import OrderCard from "@/components/modules/myOrders/OrderCard";
import { debounce } from "lodash";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import Pagination from "@/components/shared/Pagination";

const MyOrdersPage = () => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(40);
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [orderTime, setOrderTime] = useState<string>("");

  const getYearDates = (
    input: string,
  ): { startDate: string; endDate: string } => {
    const currentDate = new Date();

    if (input === "last30") {
      const startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - 30);
      const endDate = currentDate;

      return {
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10) + " 23:59:59",
      };
    }

    if (input === "older") {
      const startDate = new Date(currentDate.getFullYear() - 20, 0, 1);
      const endDate = new Date(currentDate.getFullYear() - 1, 11, 31);

      return {
        startDate: `${startDate.getFullYear()}-01-01`,
        endDate: `${endDate.getFullYear()}-12-31`,
      };
    }

    const yearNumber = Number(input);
    if (isNaN(yearNumber) || yearNumber < 1000 || yearNumber > 9999) {
      return { startDate: "", endDate: "" };
    }

    const startDate = `${yearNumber}-01-01`;
    const endDate = `${yearNumber}-12-31`;

    return {
      startDate,
      endDate,
    };
  };

  const ordersQuery = useOrders({
    page: page,
    limit: limit,
    term: searchTerm !== "" ? searchTerm : undefined,
    orderProductStatus: orderStatus,
    startDate: getYearDates(orderTime).startDate,
    endDate: getYearDates(orderTime).endDate,
  });

  const handleDebounce = debounce((event: any) => {
    setSearchTerm(event.target.value);
  }, 1000);

  const handleClearSearch = () => {
    if (searchRef.current) {
      searchRef.current.value = "";
    }
    setSearchTerm("");
  };

  const handleClearFilter = () => {
    setOrderStatus("");
    setOrderTime("");
  };

  // Get status icon and color
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <CheckCircle className="h-4 w-4" />;
      case 'SHIPPED':
        return <Truck className="h-4 w-4" />;
      case 'OFD':
        return <Truck className="h-4 w-4" />;
      case 'DELIVERED':
        return <Package className="h-4 w-4" />;
      case 'CANCELLED':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800';
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-800';
      case 'OFD':
        return 'bg-orange-100 text-orange-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-6 lg:px-12 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/home" className="hover:text-gray-900 transition-colors" dir={langDir}>
                {t("home")}
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">{t("my_orders")}</span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3" dir={langDir}>
                <ShoppingBag className="h-8 w-8 text-blue-600" />
                {t("my_orders")}
              </h1>
              <p className="text-gray-600 mt-2" dir={langDir}>
                Track and manage your orders
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                {ordersQuery?.data?.totalCount || 0} Orders
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  {t("filter")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Status Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    {t("order_status")}
                  </h3>
                  <RadioGroup
                    className="space-y-3"
                    value={orderStatus}
                    onValueChange={setOrderStatus}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="" id="ALL" />
                      <Label htmlFor="ALL" className="text-sm font-medium cursor-pointer">
                        {t("all")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="CONFIRMED" id="CONFIRMED" />
                      <Label htmlFor="CONFIRMED" className="text-sm font-medium cursor-pointer">
                        {t("confirmed")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="SHIPPED" id="SHIPPED" />
                      <Label htmlFor="SHIPPED" className="text-sm font-medium cursor-pointer">
                        {t("shipped")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="OFD" id="OFD" />
                      <Label htmlFor="OFD" className="text-sm font-medium cursor-pointer">
                        {t("on_the_way")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="DELIVERED" id="DELIVERED" />
                      <Label htmlFor="DELIVERED" className="text-sm font-medium cursor-pointer">
                        {t("delivered")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="CANCELLED" id="CANCELLED" />
                      <Label htmlFor="CANCELLED" className="text-sm font-medium cursor-pointer">
                        {t("cancelled")}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="border-t pt-6">
                  {/* Order Time Filter */}
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {t("order_time")}
                  </h3>
                  <RadioGroup
                    className="space-y-3"
                    value={orderTime}
                    onValueChange={setOrderTime}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="last30" id="last30" />
                      <Label htmlFor="last30" className="text-sm font-medium cursor-pointer">
                        {t("last_30_days")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="2024" id="2024" />
                      <Label htmlFor="2024" className="text-sm font-medium cursor-pointer">
                        2024
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="2023" id="2023" />
                      <Label htmlFor="2023" className="text-sm font-medium cursor-pointer">
                        2023
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="2022" id="2022" />
                      <Label htmlFor="2022" className="text-sm font-medium cursor-pointer">
                        2022
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="2021" id="2021" />
                      <Label htmlFor="2021" className="text-sm font-medium cursor-pointer">
                        2021
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="2020" id="2020" />
                      <Label htmlFor="2020" className="text-sm font-medium cursor-pointer">
                        2020
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="older" id="older" />
                      <Label htmlFor="older" className="text-sm font-medium cursor-pointer">
                        {t("older")}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="border-t pt-6">
                  <Button 
                    variant="outline" 
                    onClick={handleClearFilter} 
                    className="w-full"
                  >
                    <X className="h-4 w-4 mr-2" />
                    {t("clean_filter")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder={t("search_orders")}
                      onChange={handleDebounce}
                      ref={searchRef}
                      className="pl-10"
                      dir={langDir}
                    />
                    {searchTerm !== "" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                        onClick={handleClearSearch}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Orders List */}
            <div className="space-y-6">
              {ordersQuery.isLoading ? (
                Array.from({ length: 3 }, (_, i) => (
                  <Card key={i} className="p-6 mb-2">
                    <div className="flex gap-4">
                      <Skeleton className="h-24 w-24 rounded-lg" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                    </div>
                  </Card>
                ))
              ) : !ordersQuery?.data?.data?.length ? (
                <Card className="p-12 text-center">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t("no_orders_found")}
                  </h3>
                  <p className="text-gray-600">
                    No orders match your current filters
                  </p>
                </Card>
              ) : (
                ordersQuery?.data?.data?.map((item: any) => (
                  <Link key={item.id} href={`/my-orders/${item.id}`}>
                    <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer mb-2">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          {/* Product Image */}
                          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            {item.orderProduct_productPrice?.productPrice_product?.productImages?.[0]?.image ? (
                              <img
                                src={item.orderProduct_productPrice.productPrice_product.productImages[0].image}
                                alt={item.orderProduct_productPrice?.productPrice_product?.productName}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <Package className="h-8 w-8 text-gray-400" />
                            )}
                          </div>

                          {/* Order Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
                                  {item.orderProduct_productPrice?.productPrice_product?.productName || 'Unknown Product'}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                  <span>Order #{item.orderProduct_order?.orderNo}</span>
                                  <span>Qty: {item.orderQuantity}</span>
                                  <span>${item.purchasePrice}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={`${getStatusColor(item.orderProductStatus)} flex items-center gap-1`}>
                                    {getStatusIcon(item.orderProductStatus)}
                                    {item.orderProductStatus}
                                  </Badge>
                                  <span className="text-sm text-gray-500">
                                    {new Date(item.orderProductDate).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              )}
            </div>

            {/* Pagination */}
            {ordersQuery?.data?.totalCount > limit && (
              <div className="mt-8">
                <Pagination
                  page={page}
                  setPage={setPage}
                  totalCount={ordersQuery?.data?.totalCount}
                  limit={limit}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
