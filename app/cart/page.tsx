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
import CartProductCardWrapper from "@/components/modules/cartList/CartProductCardWrapper";
import ServiceCard from "@/components/modules/cartList/ServiceCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useVendorBusinessCategories } from "@/hooks/useVendorBusinessCategories";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getOrCreateDeviceId } from "@/utils/helper";
import { checkCategoryConnection } from "@/utils/categoryConnection";
import { CartItem } from "@/utils/types/cart.types";
import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCurrentAccount } from "@/apis/queries/auth.queries";
import { useAllProducts } from "@/apis/queries/product.queries";
import { useCategory } from "@/apis/queries/category.queries";

const CartListPage = () => {
  const t = useTranslations();
  const { user, langDir, currency } = useAuth();
  const currentAccount = useCurrentAccount();
  const currentTradeRole = currentAccount?.data?.data?.account?.tradeRole || user?.tradeRole;
  const vendorBusinessCategoryIds = useVendorBusinessCategories();
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

  // Get unique product IDs from cart for calculateTotalAmount
  const uniqueProductIds = useMemo(() => {
    const productIds = new Set<number>();
    memoizedCartList.forEach((item: CartItem) => {
      if (item.cartType === "DEFAULT" && item.productId) {
        productIds.add(item.productId);
      }
    });
    return Array.from(productIds);
  }, [memoizedCartList]);

  // Fetch all products that are in the cart to get consumerType for calculateTotalAmount
  // Note: This is a workaround - ideally the backend should include consumerType in cart response
  const allProductsQuery = useAllProducts(
    {
      page: 1,
      limit: 1000, // Fetch enough to cover all cart items
    },
    haveAccessToken && uniqueProductIds.length > 0
  );

  // Get unique category IDs from products in cart
  const uniqueCategoryIds = useMemo(() => {
    const categoryIds = new Set<number>();
    if (allProductsQuery?.data?.data) {
      allProductsQuery.data.data.forEach((product: any) => {
        if (uniqueProductIds.includes(product.id)) {
          const categoryId = product?.categoryId ?? product?.category?.id;
          if (categoryId) {
            categoryIds.add(categoryId);
          }
        }
      });
    }
    return Array.from(categoryIds);
  }, [allProductsQuery?.data?.data, uniqueProductIds]);

  // Fetch category data for the first category (if vendor)
  // Note: We fetch one category at a time to avoid hooks rule violations
  // In practice, most carts will have products from the same category
  const firstCategoryId = uniqueCategoryIds.length > 0 ? uniqueCategoryIds[0] : undefined;
  const firstCategoryQuery = useCategory(
    firstCategoryId?.toString(),
    !!(currentTradeRole && currentTradeRole !== "BUYER" && firstCategoryId)
  );

  // For now, we'll use the category connections from the product query
  // but prioritize fresh data from category query if available
  // This is a limitation - ideally we'd fetch all categories, but that requires
  // either a batch API or individual components for each category

  // Create a map of productId -> pricing metadata required for discount calculation
  const productPricingInfoMap = useMemo(() => {
    const map = new Map<
      number,
      {
        consumerType?: string;
        vendorDiscount?: number;
        vendorDiscountType?: string;
        consumerDiscount?: number;
        consumerDiscountType?: string;
        categoryId?: number;
        categoryLocation?: string;
        categoryConnections?: any[];
      }
    >();

    if (allProductsQuery?.data?.data) {
      allProductsQuery.data.data.forEach((product: any) => {
        if (uniqueProductIds.includes(product.id)) {
          const activePriceEntry =
            product?.product_productPrice?.find((pp: any) => pp?.status === "ACTIVE") ||
            product?.product_productPrice?.[0];

          const categoryId = product?.categoryId ?? product?.category?.id;
          
          // Get fresh category connections - prioritize from category query if it matches
          // Otherwise fall back to product query data
          let freshCategoryConnections: any[] = [];
          if (categoryId === firstCategoryId && firstCategoryQuery?.data?.data?.category_categoryIdDetail) {
            freshCategoryConnections = firstCategoryQuery.data.data.category_categoryIdDetail;
          } else if (product?.category?.category_categoryIdDetail) {
            freshCategoryConnections = product.category.category_categoryIdDetail;
          }

          map.set(product.id, {
            consumerType: activePriceEntry?.consumerType,
            vendorDiscount: activePriceEntry?.vendorDiscount,
            vendorDiscountType: activePriceEntry?.vendorDiscountType,
            consumerDiscount: activePriceEntry?.consumerDiscount,
            consumerDiscountType: activePriceEntry?.consumerDiscountType,
            categoryId: categoryId,
            categoryLocation: product?.categoryLocation ?? product?.category?.categoryLocation,
            categoryConnections: freshCategoryConnections,
          });
        }
      });
    }

    return map;
  }, [allProductsQuery?.data?.data, uniqueProductIds, firstCategoryId, firstCategoryQuery?.data?.data]);

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
          curr: CartItem,
        ) => {
          if (curr.cartType == "DEFAULT") {
            const productPriceDetails: any = curr?.productPriceDetails || {};
            const productInfo = productPricingInfoMap.get(curr.productId);

            const rawConsumerType =
              productInfo?.consumerType || productPriceDetails?.consumerType || "";
            const normalizedConsumerType =
              typeof rawConsumerType === "string"
                ? rawConsumerType.toUpperCase().trim()
                : "";
            const isVendorType = normalizedConsumerType === "VENDOR" || normalizedConsumerType === "VENDORS";
            const isConsumerType = normalizedConsumerType === "CONSUMER";
            const isEveryoneType = normalizedConsumerType === "EVERYONE";

            const categoryId = Number(productInfo?.categoryId || 0);
            const categoryLocation = productInfo?.categoryLocation;
            const categoryConnections = productInfo?.categoryConnections;

            const isCategoryMatch = checkCategoryConnection(
              vendorBusinessCategoryIds,
              categoryId,
              categoryLocation,
              categoryConnections,
            );

            const vendorDiscountValue = Number(
              productInfo?.vendorDiscount ?? productPriceDetails?.vendorDiscount ?? 0,
            );
            const vendorDiscountType = productInfo?.vendorDiscountType || productPriceDetails?.vendorDiscountType;
            const normalizedVendorDiscountType = vendorDiscountType
              ? vendorDiscountType.toString().toUpperCase().trim()
              : undefined;

            const consumerDiscountValue = Number(
              productInfo?.consumerDiscount ?? productPriceDetails?.consumerDiscount ?? 0,
            );
            const consumerDiscountType =
              productInfo?.consumerDiscountType || productPriceDetails?.consumerDiscountType;
            const normalizedConsumerDiscountType = consumerDiscountType
              ? consumerDiscountType.toString().toUpperCase().trim()
              : undefined;

            let discount = 0;
            let applicableDiscountType: string | undefined;

            if (currentTradeRole && currentTradeRole !== "BUYER") {
              // VENDOR user
              if (isVendorType || isEveryoneType) {
                // consumerType is VENDOR/VENDORS or EVERYONE - vendor can get vendor discount
                // BUT category match is REQUIRED for vendor discounts
                if (isCategoryMatch) {
                  // Same relation - Vendor gets vendor discount if available
                  if (vendorDiscountValue > 0 && normalizedVendorDiscountType) {
                    discount = vendorDiscountValue;
                    applicableDiscountType = normalizedVendorDiscountType;
                  } else {
                    // No vendor discount available, no discount
                    discount = 0;
                  }
                } else {
                  // Not same relation - No vendor discount
                  // If consumerType is EVERYONE, fallback to consumer discount
                  if (isEveryoneType) {
                    if (consumerDiscountValue > 0 && normalizedConsumerDiscountType) {
                      discount = consumerDiscountValue;
                      applicableDiscountType = normalizedConsumerDiscountType;
                    } else {
                      discount = 0;
                    }
                  } else {
                    // consumerType is VENDOR/VENDORS but no category match - no discount
                    discount = 0;
                  }
                }
              } else {
                // consumerType is CONSUMER - vendors get no discount
                discount = 0;
              }
            } else {
              if (isConsumerType || isEveryoneType) {
                if (consumerDiscountValue > 0 && normalizedConsumerDiscountType) {
                  discount = consumerDiscountValue;
                  applicableDiscountType = normalizedConsumerDiscountType;
                }
              }
            }

            const calculatedDiscount = calculateDiscountedPrice(
              productPriceDetails?.offerPrice ?? 0,
              discount,
              applicableDiscountType,
            );

            return Number((acc + calculatedDiscount * curr.quantity).toFixed(2));
          }

          if (!curr.cartServiceFeatures?.length) return acc;

          let amount = 0;
          const cartItemAny = curr as any;
          for (let feature of curr.cartServiceFeatures) {
            if (feature.serviceFeature?.serviceCostType == "FLAT") {
              amount += Number(feature.serviceFeature?.serviceCost || '') * (feature.quantity || 1);
            } else {
              amount += Number(feature?.serviceFeature?.serviceCost || '') * (feature.quantity || 1) * (cartItemAny.service?.eachCustomerTime || 1);
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
          curr: CartItem,
        ) => {
          if (curr.cartType == "DEFAULT") {
            const productPriceDetails: any = curr?.productPriceDetails || {};
            const productInfo = productPricingInfoMap.get(curr.productId);

            const rawConsumerType =
              productInfo?.consumerType || productPriceDetails?.consumerType || "";
            const normalizedConsumerType =
              typeof rawConsumerType === "string"
                ? rawConsumerType.toUpperCase().trim()
                : "";
            const isConsumerType = normalizedConsumerType === "CONSUMER";
            const isEveryoneType = normalizedConsumerType === "EVERYONE";

            const consumerDiscountValue = Number(
              productInfo?.consumerDiscount ?? productPriceDetails?.consumerDiscount ?? 0,
            );
            const consumerDiscountType =
              productInfo?.consumerDiscountType || productPriceDetails?.consumerDiscountType;
            const normalizedConsumerDiscountType = consumerDiscountType
              ? consumerDiscountType.toString().toUpperCase().trim()
              : undefined;

            let discount = 0;
            let applicableDiscountType: string | undefined;

            if (isConsumerType || isEveryoneType) {
              if (consumerDiscountValue > 0 && normalizedConsumerDiscountType) {
                discount = consumerDiscountValue;
                applicableDiscountType = normalizedConsumerDiscountType;
              }
            }

            const calculatedDiscount = calculateDiscountedPrice(
              productPriceDetails?.offerPrice ?? 0,
              discount,
              applicableDiscountType,
            );
            return (
              Number((acc + calculatedDiscount * curr.quantity).toFixed(2))
            );
          }

          if (!curr.cartServiceFeatures?.length) return acc;

          let amount = 0;
          const cartItemAny = curr as any;
          for (let feature of curr.cartServiceFeatures) {
            if (feature.serviceFeature?.serviceCostType == "FLAT") {
              amount += Number(feature.serviceFeature?.serviceCost || '') * (feature.quantity || 1);
            } else {
              amount += Number(feature?.serviceFeature?.serviceCost || '') * (feature.quantity || 1) * (cartItemAny.service?.eachCustomerTime || 1);
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
  }, [memoizedCartList, currentTradeRole, productPricingInfoMap, vendorBusinessCategoryIds]);

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
                          <CartProductCardWrapper
                            key={item.id}
                            item={item}
                            onRemove={handleRemoveProductFromCart}
                            onWishlist={handleAddToWishlist}
                            haveAccessToken={haveAccessToken}
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