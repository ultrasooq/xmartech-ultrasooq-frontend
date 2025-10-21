"use client";
import {
  useCartListByDevice,
  useCartListByUserId,
  useDeleteCartItem,
  useDeleteServiceFromCart,
  useUpdateCartByDevice,
  useUpdateCartWithLogin,
} from "@/apis/queries/cart.queries";
import { useAddToWishList } from "@/apis/queries/wishlist.queries";
import ProductCard from "@/components/modules/cartList/ProductCard";
import ServiceCard from "@/components/modules/cartList/ServiceCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getOrCreateDeviceId } from "@/utils/helper";
import { CartItem } from "@/utils/types/cart.types";
import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";

const CartListPage = () => {
  const t = useTranslations();
  const { user, langDir, currency } = useAuth()
  const router = useRouter();
  const { toast } = useToast();
  const [haveAccessToken, setHaveAccessToken] = useState(false);
  const deviceId = getOrCreateDeviceId() || "";
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const cartListByDeviceQuery = useCartListByDevice(
    {
      page: 1,
      limit: 10,
      deviceId,
    },
    !haveAccessToken,
  );
  const cartListByUser = useCartListByUserId(
    {
      page: 1,
      limit: 10,
    },
    haveAccessToken,
  );
  const updateCartWithLogin = useUpdateCartWithLogin();
  const updateCartByDevice = useUpdateCartByDevice();
  const deleteCartItem = useDeleteCartItem();
  const deleteServiceFromCart = useDeleteServiceFromCart();
  const addToWishlist = useAddToWishList();

  const memoizedCartList = useMemo(() => {
    setLoading(false);
    if (cartListByUser.data?.data) {
      return cartListByUser.data?.data || [];
    } else if (cartListByDeviceQuery.data?.data) {
      return cartListByDeviceQuery.data?.data || [];
    }
    return [];
  }, [cartListByUser.data?.data, cartListByDeviceQuery.data?.data]);

  const calculateDiscountedPrice = (
    offerPrice: string | number,
    discount: number,
    discountType?: string
  ) => {
    const price = offerPrice ? Number(offerPrice) : 0;
    if (discountType == 'PERCENTAGE') {
      return Number((price - (price * discount) / 100).toFixed(2));
    } else if (discountType == 'FIXED' || discountType == 'FLAT') {
      return Number((price - discount).toFixed(2));
    }
    // If no discount type is specified, treat as fixed discount
    return Number((price - discount).toFixed(2));
  };

  const calculateTotalAmount = () => {
    if (cartListByUser.data?.data?.length) {
      return cartListByUser.data?.data?.reduce(
        (
          acc: number,
          curr: {
            cartType: "DEFAULT" | "SERVICE";
            productPriceDetails: {
              offerPrice: string;
              consumerDiscount?: number;
              consumerDiscountType?: string;
              vendorDiscount?: number;
              vendorDiscountType?: string;
            };
            quantity: number;
            cartServiceFeatures: any[];
            service: {
              eachCustomerTime: number;
            }
          },
        ) => {
          if (curr.cartType == "DEFAULT") {
            // Always use consumer discount for cart total - this is what customers see
            const discount = curr?.productPriceDetails?.consumerDiscount || 0;
            const discountType = curr?.productPriceDetails?.consumerDiscountType || '';
            
            const calculatedDiscount = calculateDiscountedPrice(
              curr.productPriceDetails?.offerPrice ?? 0,
              discount,
              discountType
            );
            
            return (
              Number((acc + calculatedDiscount * curr.quantity).toFixed(2))
            );
          }

          if (!curr.cartServiceFeatures?.length) return acc;

          let amount = 0;
          for (let feature of curr.cartServiceFeatures) {
            if (feature.serviceFeature?.serviceCostType == "FLAT") {
              amount += Number(feature.serviceFeature?.serviceCost || '') * (feature.quantity || 1);
            } else {
              amount += Number(feature?.serviceFeature?.serviceCost || '') * (feature.quantity || 1) * curr.service.eachCustomerTime;
            }
          }

          return Number((acc + amount).toFixed(2));
        },
        0,
      );
    } else if (cartListByDeviceQuery.data?.data?.length) {
      return cartListByDeviceQuery.data?.data?.reduce(
        (
          acc: number,
          curr: {
            cartType: "DEFAULT" | "SERVICE";
            productPriceDetails: {
              offerPrice: string;
              consumerDiscount?: number;
              consumerDiscountType?: string;
              vendorDiscount?: number;
              vendorDiscountType?: string;
            };
            quantity: number;
            cartServiceFeatures: any[];
            service: {
              eachCustomerTime: number;
            }
          },
        ) => {
          if (curr.cartType == "DEFAULT") {
            // Always use consumer discount for device-based cart - this is what customers see
            const discount = curr?.productPriceDetails?.consumerDiscount || 0;
            const discountType = curr?.productPriceDetails?.consumerDiscountType || '';
            
            const calculatedDiscount = calculateDiscountedPrice(
              curr.productPriceDetails?.offerPrice ?? 0,
              discount,
              discountType
            );
            return (
              Number((acc + calculatedDiscount * curr.quantity).toFixed(2))
            );
          }

          if (!curr.cartServiceFeatures?.length) return acc;

          let amount = 0;
          for (let feature of curr.cartServiceFeatures) {
            if (feature.serviceFeature?.serviceCostType == "FLAT") {
              amount += Number(feature.serviceFeature?.serviceCost || '') * (feature.quantity || 1);
            } else {
              amount += Number(feature?.serviceFeature?.serviceCost || '') * (feature.quantity || 1) * curr.service.eachCustomerTime;
            }
          }

          return Number((acc + amount).toFixed(2));
        },
        0,
      );
    } else {
      return 0;
    }
  };

  const handleRemoveProductFromCart = async (cartId: number) => {
    const response = await deleteCartItem.mutateAsync({ cartId });
    if (response.status) {
      setLoading(true);
      toast({
        title: t("item_removed_from_cart"),
        description: t("check_your_cart_for_more_details"),
        variant: "success",
      });
    } else {
      toast({
        title: t("item_not_removed_from_cart"),
        description: t("check_your_cart_for_more_details"),
        variant: "danger",
      });
    }
  };

  const handleRemoveServiceFromCart = async (cartId: number, serviceFeatureId: number) => {
    const cartItem = memoizedCartList.find((item: any) => item.id == cartId);
    let payload: any = { cartId };
    if (cartItem?.cartServiceFeatures?.length > 1) {
      payload.serviceFeatureId = serviceFeatureId;
    }
    const response = await deleteServiceFromCart.mutateAsync(payload);
    if (response.status) {
      setLoading(true);
      toast({
        title: t("item_removed_from_cart"),
        description: t("check_your_cart_for_more_details"),
        variant: "success",
      });
    } else {
      toast({
        title: response.message || t("item_not_removed_from_cart"),
        description: response.message || t("check_your_cart_for_more_details"),
        variant: "danger",
      });
    }
  };

  const handleAddToWishlist = async (productId: number) => {
    const response = await addToWishlist.mutateAsync({ productId });
    if (response.status) {
      toast({
        title: t("item_added_to_wishlist"),
        description: t("check_your_wishlist_for_more_details"),
        variant: "success",
      });
    } else {
      toast({
        title: response.message || t("item_not_added_to_wishlist"),
        description: t("check_your_wishlist_for_more_details"),
        variant: "danger",
      });
    }
  };

  useEffect(() => {
    if (accessToken) {
      setHaveAccessToken(true);
    } else {
      setHaveAccessToken(false);
    }
  }, [accessToken]);

  useEffect(() => {
    setTotalAmount(calculateTotalAmount());
  }, [memoizedCartList]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" dir={langDir} translate="no">
              {t("my_cart")}
            </h1>
            <p className="mt-2 text-gray-600" dir={langDir} translate="no">
              {memoizedCartList.length} {memoizedCartList.length === 1 ? t("item") : t("items")} in your cart
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900" dir={langDir} translate="no">
                {t("cart_items")}
              </h2>
            </div>
            
            <div className="space-y-4">
                {/* Empty Cart State */}
                {haveAccessToken &&
                !cartListByUser.data?.data?.length &&
                !cartListByUser.isLoading ? (
                  <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <ShoppingBag className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2" translate="no">{t("no_cart_items")}</h3>
                    <p className="text-gray-500 mb-6" translate="no">Add some products to get started</p>
                    <Button 
                      onClick={() => router.push('/trending')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                ) : null}

                {!haveAccessToken &&
                !cartListByDeviceQuery.data?.data?.length &&
                !cartListByDeviceQuery.isLoading ? (
                  <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <ShoppingBag className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2" translate="no">{t("no_cart_items")}</h3>
                    <p className="text-gray-500 mb-6" translate="no">Add some products to get started</p>
                    <Button 
                      onClick={() => router.push('/trending')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                ) : null}

                {/* Loading States */}
                {cartListByUser.isLoading || loading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <Skeleton className="h-20 w-20 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-4 w-1/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {!haveAccessToken && (cartListByDeviceQuery.isLoading || loading) ? (
                  <div className="space-y-4">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <Skeleton className="h-20 w-20 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-4 w-1/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {/* Cart Items */}
                {!loading ? (
                  <div className="space-y-4">
                    {memoizedCartList?.map((item: CartItem) => {
                      if (item.cartType == "DEFAULT") {
                        let relatedCart = memoizedCartList
                          ?.filter((c: any) => c.serviceId && c.cartProductServices?.length)
                          .find((c: any) => {
                              return !!c.cartProductServices
                                  .find((r: any) => r.relatedCartType == 'PRODUCT' && r.productId == item.productId);
                          });
                        return (
                          <ProductCard
                            key={item.id}
                              cartId={item.id}
                              productId={item.productId}
                              productPriceId={item.productPriceId}
                              productName={item.productPriceDetails?.productPrice_product?.productName}
                              offerPrice={item.productPriceDetails?.offerPrice}
                              productQuantity={item.quantity}
                              productVariant={item.object}
                              productImages={item.productPriceDetails?.productPrice_product?.productImages}
                              consumerDiscount={item.productPriceDetails?.consumerDiscount || 0}
                              consumerDiscountType={item.productPriceDetails?.consumerDiscountType}
                              vendorDiscount={item.productPriceDetails?.vendorDiscount || 0}
                              vendorDiscountType={item.productPriceDetails?.vendorDiscountType}
                              onRemove={handleRemoveProductFromCart}
                              onWishlist={handleAddToWishlist}
                              haveAccessToken={haveAccessToken}
                              minQuantity={item?.productPriceDetails?.minQuantityPerCustomer}
                              maxQuantity={item?.productPriceDetails?.maxQuantityPerCustomer}
                              relatedCart={relatedCart}
                            />
                        )
                      }

                      if (!item.cartServiceFeatures?.length) return null;

                      const features = item.cartServiceFeatures.map((feature: any) => ({
                        id: feature.id,
                        serviceFeatureId: feature.serviceFeatureId,
                        quantity: feature.quantity
                      }));

                      let relatedCart: any = memoizedCartList
                        ?.filter((c: any) => c.productId && c.cartProductServices?.length)
                        .find((c: any) => {
                            return !!c.cartProductServices
                                .find((r: any) => r.relatedCartType == 'SERVICE' && r.serviceId == item.serviceId);
                        });

                      return item.cartServiceFeatures.map((feature: any) => {
                        return (
                          <div key={feature.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <ServiceCard 
                              cartId={item.id}
                              serviceId={item.serviceId}
                              serviceFeatureId={feature.serviceFeatureId}
                              serviceFeatureName={feature.serviceFeature.name}
                              serviceCost={Number(feature.serviceFeature.serviceCost)}
                              cartQuantity={feature.quantity}
                              serviceFeatures={features}
                              relatedCart={relatedCart}
                              onRemove={() => {
                                handleRemoveServiceFromCart(item.id, feature.id);
                              }}
                            />
                          </div>
                        );
                      });
                    })}
                  </div>
                ) : null}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-8">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-900" dir={langDir} translate="no">
                  {t("price_details")}
                </h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600" dir={langDir} translate="no">{t("subtotal")}</span>
                    <span className="font-semibold text-gray-900">{currency.symbol}{totalAmount}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600" dir={langDir} translate="no">{t("shipping")}</span>
                    <span className="text-green-600 font-semibold" translate="no">{t("free")}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900" dir={langDir} translate="no">{t("total_amount")}</span>
                      <span className="text-xl font-bold text-gray-900">{currency.symbol}{totalAmount}</span>
                    </div>
                  </div>
                </div>


                {/* Place Order Button */}
                <div className="mt-8">
                  <Button
                    onClick={() => router.push("/checkout")}
                    disabled={!memoizedCartList?.length}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    dir={langDir}
                    translate="no"
                  >
                    {t("place_order")}
                  </Button>
                  
                  {memoizedCartList?.length > 0 && (
                    <Button
                      onClick={() => router.push("/trending")}
                      variant="outline"
                      className="w-full mt-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Continue Shopping
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartListPage;