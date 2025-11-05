"use client";
import DealsCard from "@/components/modules/home/DealsCard";
import ProductCardHome from "@/components/modules/home/ProductCard";
import TrendingCard from "@/components/modules/home/TrendingCard";
import TrendingOptionCard from "@/components/modules/home/TrendingOptionCard";
import TrendingCategories from "@/components/modules/home/TrendingCategories";
import ProductCard from "@/components/modules/trending/ProductCard";
import Footer from "@/components/shared/Footer";
import {
  bestSellerList,
  camerasVideosList,
  computerTechnologyList,
  dealsList,
  homeElectronicsList,
  trendingList,
  trendingTopicList,
} from "@/utils/dummyDatas";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import HeadphoneImage from "@/public/images/big-headphone.png";
import AdBannerOne from "@/public/images/hs-1.png";
import AdBannerTwo from "@/public/images/hs-2.png";
import AdBannerThree from "@/public/images/hs-3.png";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  useAllBuyGroupProducts,
  useAllProducts,
} from "@/apis/queries/product.queries";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMe } from "@/apis/queries/user.queries";
import { TrendingProduct } from "@/utils/types/common.types";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAddToWishList,
  useDeleteFromWishList,
} from "@/apis/queries/wishlist.queries";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import {
  useCartListByDevice,
  useCartListByUserId,
} from "@/apis/queries/cart.queries";
import { getOrCreateDeviceId } from "@/utils/helper";
import { useCategoryStore } from "@/lib/categoryStore";
import { useRouter } from "next/navigation";
import { useCategory } from "@/apis/queries/category.queries";
import { TrendingUp, ArrowRight } from "lucide-react";
// @ts-ignore
import { startDebugger } from "remove-child-node-error-debugger";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Home",
// };

function HomePage() {
  const t = useTranslations();
  const { currency, langDir } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const categoryStore = useCategoryStore();
  const [cartList, setCartList] = useState<any[]>();
  const deviceId = getOrCreateDeviceId() || "";
  const [haveAccessToken, setHaveAccessToken] = useState(false);
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);

  const addToWishlist = useAddToWishList();
  const deleteFromWishlist = useDeleteFromWishList();

  const me = useMe();

  useEffect(() => {
    if (accessToken) {
      setHaveAccessToken(true);
    } else {
      setHaveAccessToken(false);
    }
  }, [accessToken]);

  const categoryQuery = useCategory("4");

  const memoizedCategories = useMemo(() => {
    let tempArr: any = [];
    if (categoryQuery.data?.data) {
      tempArr = categoryQuery.data.data?.children;
    }
    return tempArr || [];
  }, [categoryQuery?.data?.data]);

  // Helper function to transform product data
  const transformProductData = useCallback((item: any, includeSold = false) => {
    let sold = 0;
    if (includeSold && item.orderProducts?.length) {
      item.orderProducts.forEach((product: any) => {
        sold += product?.orderQuantity || 0;
      });
    }

    return {
      id: item.id,
      productName: item?.productName || "-",
      productPrice: item?.productPrice || 0,
      offerPrice: item?.offerPrice || 0,
      productImage: item?.product_productPrice?.[0]
        ?.productPrice_productSellerImage?.length
        ? item?.product_productPrice?.[0]
          ?.productPrice_productSellerImage?.[0]?.image
        : item?.productImages?.[0]?.image,
      categoryName: item?.category?.name || "-",
      skuNo: item?.skuNo,
      brandName: item?.brand?.brandName || "-",
      productReview: item?.productReview || [],
      productWishlist: item?.product_wishlist || [],
      inWishlist: item?.product_wishlist?.find(
        (ele: any) => ele?.userId === me.data?.data?.id,
      ),
      shortDescription: item?.product_productShortDescription?.length
        ? item?.product_productShortDescription?.[0]?.shortDescription
        : "-",
      productProductPriceId: item?.product_productPrice?.[0]?.id,
      productProductPrice: item?.product_productPrice?.[0]?.offerPrice,
      consumerDiscount: item?.product_productPrice?.[0]?.consumerDiscount,
      askForPrice: item?.product_productPrice?.[0]?.askForPrice,
      productPrices: item?.product_productPrice,
      sold: includeSold ? sold : undefined,
    };
  }, [me.data?.data?.id]);

  const buyGroupProductsQuery = useAllBuyGroupProducts({
    page: 1,
    limit: 4,
    sort: "desc",
  });

  const memoizedBuyGroupProducts = useMemo(() => {
    return (
      buyGroupProductsQuery?.data?.data?.map((item: any) => transformProductData(item, true)) || []
    );
  }, [buyGroupProductsQuery?.data?.data, transformProductData]);

  const homeDecorProductsQuery = useAllProducts({
    page: 1,
    limit: 4,
    sort: "desc",
    categoryIds: "203",
  });

  const memoizedHomeDecorProducts = useMemo(() => {
    return (
      homeDecorProductsQuery?.data?.data?.map((item: any) => transformProductData(item)) || []
    );
  }, [homeDecorProductsQuery?.data?.data, transformProductData]);

  const fashionBeautyProductsQuery = useAllProducts({
    page: 1,
    limit: 4,
    sort: "desc",
    categoryIds: "258",
  });

  const memoizedFashionBeautyProducts = useMemo(() => {
    return (
      fashionBeautyProductsQuery?.data?.data?.map((item: any) => transformProductData(item)) || []
    );
  }, [fashionBeautyProductsQuery?.data?.data, transformProductData]);

  const consumerElectronicsProductsQuery = useAllProducts({
    page: 1,
    limit: 4,
    sort: "desc",
    categoryIds: "269,270",
  });

  const memoizedConsumerElectronicsProducts = useMemo(() => {
    return (
      consumerElectronicsProductsQuery?.data?.data?.map((item: any) => transformProductData(item)) || []
    );
  }, [consumerElectronicsProductsQuery?.data?.data, transformProductData]);

  // New Product Sections - Fetch all products for different sections
  const allProductsForSectionsQuery = useAllProducts({
    page: 1,
    limit: 100,
    sort: "desc",
  });

  // Top Rated Products (by average rating)
  const memoizedTopRatedProducts = useMemo(() => {
    if (!allProductsForSectionsQuery?.data?.data) return [];
    const products = allProductsForSectionsQuery.data.data
      .map((item: any) => ({
        ...transformProductData(item),
        averageRating: item.productReview?.length > 0
          ? item.productReview.reduce((acc: number, review: any) => acc + (review.rating || 0), 0) / item.productReview.length
          : 0,
        reviewCount: item.productReview?.length || 0,
      }))
      .filter((item: any) => item.reviewCount >= 3 && item.averageRating >= 4)
      .sort((a: any, b: any) => b.averageRating - a.averageRating);
    return products.slice(0, 10);
  }, [allProductsForSectionsQuery?.data?.data, transformProductData]);

  // Best Sellers (by sold quantity)
  const memoizedBestSellers = useMemo(() => {
    if (!buyGroupProductsQuery?.data?.data) return [];
    const products = buyGroupProductsQuery.data.data
      .map((item: any) => {
        let sold = 0;
        if (item.orderProducts?.length) {
          item.orderProducts.forEach((product: any) => {
            sold += product?.orderQuantity || 0;
          });
        }
        return { ...transformProductData(item, true), sold };
      })
      .filter((item: any) => item.sold > 0)
      .sort((a: any, b: any) => b.sold - a.sold);
    return products.slice(0, 10);
  }, [buyGroupProductsQuery?.data?.data, transformProductData]);

  // New Arrivals (already sorted by newest from API since we use sort: "desc")
  const memoizedNewArrivals = useMemo(() => {
    if (!allProductsForSectionsQuery?.data?.data) return [];
    return allProductsForSectionsQuery.data.data
      .map((item: any) => transformProductData(item))
      .slice(0, 10);
  }, [allProductsForSectionsQuery?.data?.data, transformProductData]);

  // Hot Deals (high discount products)
  const memoizedHotDeals = useMemo(() => {
    if (!allProductsForSectionsQuery?.data?.data) return [];
    const products = allProductsForSectionsQuery.data.data
      .map((item: any) => transformProductData(item))
      .filter((item: any) => item.consumerDiscount && item.consumerDiscount > 0)
      .sort((a: any, b: any) => (b.consumerDiscount || 0) - (a.consumerDiscount || 0));
    return products.slice(0, 10);
  }, [allProductsForSectionsQuery?.data?.data, transformProductData]);

  // Highly Reviewed Products
  const memoizedHighlyReviewed = useMemo(() => {
    if (!allProductsForSectionsQuery?.data?.data) return [];
    const products = allProductsForSectionsQuery.data.data
      .map((item: any) => ({
        ...transformProductData(item),
        reviewCount: item.productReview?.length || 0,
        averageRating: item.productReview?.length > 0
          ? item.productReview.reduce((acc: number, review: any) => acc + (review.rating || 0), 0) / item.productReview.length
          : 0,
      }))
      .filter((item: any) => item.reviewCount > 10)
      .sort((a: any, b: any) => b.reviewCount - a.reviewCount);
    return products.slice(0, 10);
  }, [allProductsForSectionsQuery?.data?.data, transformProductData]);

  const handleDeleteFromWishlist = async (productId: number) => {
    const response = await deleteFromWishlist.mutateAsync({
      productId,
    });
    if (response.status) {
      toast({
        title: t("item_removed_from_wishlist"),
        description: t("check_your_wishlist_for_more_details"),
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [
          "product-by-id",
          { productId: String(productId), userId: me.data?.data?.id },
        ],
      });
    } else {
      toast({
        title: t("item_not_removed_from_wishlist"),
        description: t("check_your_wishlist_for_more_details"),
        variant: "danger",
      });
    }
  };

  const handleAddToWishlist = async (
    productId: number,
    wishlistArr?: any[],
  ) => {
    const wishlistObject = wishlistArr?.find(
      (item) => item.userId === me.data?.data?.id,
    );
    // return;
    if (wishlistObject) {
      handleDeleteFromWishlist(wishlistObject?.productId);
      return;
    }

    const response = await addToWishlist.mutateAsync({
      productId,
    });
    if (response.status) {
      toast({
        title: t("item_added_to_wishlist"),
        description: t("check_your_wishlist_for_more_details"),
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [
          "product-by-id",
          { productId: String(productId), userId: me.data?.data?.id },
        ],
      });
    } else {
      toast({
        title: response.message || t("item_not_added_to_wishlist"),
        description: t("check_your_wishlist_for_more_details"),
        variant: "danger",
      });
    }
  };

  const cartListByDeviceQuery = useCartListByDevice(
    {
      page: 1,
      limit: 100,
      deviceId,
    },
    !haveAccessToken,
  );

  const cartListByUser = useCartListByUserId(
    {
      page: 1,
      limit: 100,
    },
    haveAccessToken,
  );

  useEffect(() => {
    if (cartListByUser.data?.data) {
      setCartList((cartListByUser.data?.data || []).map((item: any) => item));
    } else if (cartListByDeviceQuery.data?.data) {
      setCartList(
        (cartListByDeviceQuery.data?.data || []).map((item: any) => item),
      );
    }
  }, [cartListByUser.data?.data, cartListByDeviceQuery.data?.data]);

  startDebugger();
  return (
    <>
      {/* Hero Banner Section */}
      <section className="w-full py-6 sm:py-10 lg:py-12 px-4 sm:px-8 lg:px-12 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {/* Main Banner */}
            <div className="lg:col-span-1 order-1">
              <div className="group relative h-72 sm:h-80 lg:h-[420px] w-full overflow-hidden rounded-3xl border border-gray-200">
                <Image
                  src={AdBannerOne}
                  className="absolute inset-0 h-full w-full object-cover"
                  alt="hs-1"
                  fill
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative h-full flex items-center p-8 sm:p-10 lg:p-12">
                  <div className="max-w-lg">
                    <span className="inline-block px-4 py-1.5 bg-white text-gray-900 text-xs sm:text-sm font-bold rounded-full mb-4 tracking-wide">
                      SAMSUNG
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 leading-tight">
                      Sed Do Eiusmod Tempor Incididunt
                    </h3>
                    <div className="mb-6 sm:mb-8">
                      <p className="text-white/80 text-sm sm:text-base mb-2 font-medium">Only 2 days:</p>
                      <h5 className="text-xl sm:text-2xl font-bold text-white bg-white/10 backdrop-blur-sm inline-block px-4 py-2 rounded-lg">
                        21/10 &amp; 22/10
                      </h5>
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base"
                    >
                      Shop Now
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Banners */}
            <div className="lg:col-span-1 order-2 flex flex-col gap-5 sm:gap-6 lg:gap-8">
              {/* Speaker Banner */}
              <div className="group relative h-48 sm:h-44 lg:h-[200px] w-full overflow-hidden rounded-3xl border border-gray-200">
                <Image
                  src={AdBannerTwo}
                  className="absolute inset-0 h-full w-full object-cover"
                  alt="hs-2"
                  fill
                />
                <div className="absolute inset-0 bg-blue-900/60" />
                <div className="relative h-full flex items-center p-6 sm:p-8">
                  <div className="max-w-sm">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3">
                      <span className="text-yellow-300">Fluence</span> Minimal Speaker
                    </h3>
                    <p className="text-white/70 text-sm sm:text-base mb-2 font-medium">Just Price</p>
                    <h5 className="text-3xl sm:text-4xl font-bold text-white" translate="no">
                      {currency.symbol}159.99
                    </h5>
                  </div>
                </div>
              </div>

              {/* Camera Banner */}
              <div className="group relative h-48 sm:h-44 lg:h-[200px] w-full overflow-hidden rounded-3xl border border-gray-200">
                <Image
                  src={AdBannerThree}
                  className="absolute inset-0 h-full w-full object-cover"
                  alt="hs-3"
                  fill
                />
                <div className="absolute inset-0 bg-purple-900/60" />
                <div className="relative h-full flex items-center p-6 sm:p-8">
                  <div className="max-w-sm">
                    <span className="inline-block px-3 py-1 bg-white text-gray-900 text-xs sm:text-sm font-bold rounded-full mb-3 tracking-wide">
                      CAMERA
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3">
                      <span className="text-yellow-300">Camera</span> Sale
                    </h3>
                    <span className="inline-block px-4 py-2 bg-red-600 text-white text-lg sm:text-2xl font-bold rounded-xl mb-3">
                      20% OFF
                    </span>
                    <p className="text-white/70 text-sm sm:text-base mb-2 font-medium">Just Price</p>
                    <h5 className="text-2xl sm:text-3xl font-bold text-white" translate="no">
                      {currency.symbol}159.99
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="mb-8 sm:mb-12" dir={langDir}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  {t("explore_categories")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
                  {t("browse_categories_to_find_trending_products")}
                </p>
              </div>
              <Link
                href="/trending"
                className="group inline-flex items-center gap-2 bg-gray-900 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base border border-gray-900"
              >
                <TrendingUp className="h-5 w-5" />
                <span className="hidden sm:inline">{t("view_trending_products")}</span>
                <span className="sm:hidden">{t("trending")}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="w-full">
            <TrendingCategories />
          </div>
        </div>
      </section>

      {memoizedBuyGroupProducts?.length > 0 ? (
        <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-orange-50 to-white">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3" translate="no">
                    {t("deal_of_the_day")}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 max-w-2xl" translate="no">
                    {t("explore_all_best_deals_for_limited_time")}
                  </p>
                </div>
                <Link
                  href="/buygroup"
                  className="group inline-flex items-center gap-2 bg-orange-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base border border-orange-600"
                  translate="no"
                >
                  {t("view_all")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
                {memoizedBuyGroupProducts.map((item: TrendingProduct) => {
                  const cartItem =  cartList?.find((el: any) => el.productId == item.id);
                  let relatedCart: any = null;
                  if (cartItem) {
                    relatedCart = cartList
                      ?.filter((c: any) => c.serviceId && c.cartProductServices?.length)
                      .find((c: any) => {
                          return !!c.cartProductServices
                              .find((r: any) => r.relatedCartType == 'PRODUCT' && r.productId == item.id);
                      });
                  }
                  return (
                    <ProductCard
                      key={item.id}
                      item={item}
                      onWishlist={() =>
                        handleAddToWishlist(item.id, item?.productWishlist)
                      }
                      inWishlist={item?.inWishlist}
                      haveAccessToken={haveAccessToken}
                      isInteractive
                      cartId={cartItem?.id}
                      productQuantity={cartItem?.quantity}
                      productVariant={cartItem?.object}
                      isAddedToCart={cartItem ? true : false}
                      relatedCart={relatedCart}
                      sold={item.sold}
                    />
                  );
                })}
            </div>
          </div>
        </section>
      ) : null}

      {/* <section className="w-full py-8">
        <div className="container m-auto px-3">
          <div className="flex flex-wrap">
            <div className="flex w-full flex-wrap items-center justify-between border-b border-solid border-gray-300 bg-neutral-100 px-3.5 py-3.5">
              <div className="flex flex-wrap items-center justify-start">
                <h4 className="mr-3 whitespace-nowrap text-lg font-normal capitalize text-color-dark md:mr-6 md:text-2xl">
                  Best Seller In The Last Month
                </h4>
              </div>
              <div className="flex flex-wrap items-center justify-start sm:justify-end">
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:mr-0"
                >
                  Iphone
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Ipad
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Samsung
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  View all
                </a>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 pt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {bestSellerList.map((item: any) => (
                <ProductCard key={uuidv4()} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Promotional Section */}
      <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-indigo-600 border border-indigo-700">
            <div className="absolute inset-0 bg-black/5" />
            
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 p-8 sm:p-12 lg:p-16 items-center">
              {/* Text Content */}
              <div className="md:col-span-6 lg:col-span-6 z-10">
                <div className="space-y-5 sm:space-y-7" dir={langDir}>
                  <span className="inline-block px-5 py-2 bg-white text-indigo-600 text-xs sm:text-sm font-bold rounded-full tracking-wide">
                    SPECIAL OFFER
                  </span>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                    Contrary To Popular Belief, Lorem Ipsum Is Not..
                  </h3>
                  <p className="text-lg sm:text-xl text-white/80 max-w-lg leading-relaxed">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </p>
                </div>
              </div>

              {/* Price & CTA Section */}
              <div className="md:col-span-6 lg:col-span-6 z-10" dir={langDir}>
                <div className="bg-white rounded-3xl p-8 sm:p-10">
                  <div className="mb-6">
                    <p className="text-gray-600 text-sm mb-2 font-medium">Original Price</p>
                    <p className="text-gray-400 text-2xl font-semibold line-through mb-4" translate="no">
                      {currency.symbol}332.38
                    </p>
                    <p className="text-gray-900 text-base mb-2 font-bold">Special Price</p>
                    <h4 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-indigo-600 mb-8" translate="no">
                      {currency.symbol}219.05
                    </h4>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-3 w-full justify-center bg-indigo-600 text-white px-8 py-5 rounded-2xl font-bold text-base sm:text-lg"
                  >
                    Shop Now
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Limited time offer - Hurry up!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {memoizedHomeDecorProducts?.length > 0 ? (
        <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 bg-white">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900" translate="no">
                    {t("home_decor")}
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {/* <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:mr-0"
                >
                  Laptop
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Desktop PC
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Smartphone
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Mainboars
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  PC Gaming
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Accessories
                </a> */}
                  <a
                    onClick={() => {
                      const categoryId = 203;
                      const subCategoryIndex = memoizedCategories.findIndex(
                        (item: any) => item.id == categoryId,
                      );
                      const item = memoizedCategories.find(
                        (item: any) => item.id == categoryId,
                      );
                      categoryStore.setSubCategories(
                        memoizedCategories?.[subCategoryIndex]?.children,
                      );
                      categoryStore.setCategoryId(categoryId.toString());
                      categoryStore.setSubCategoryIndex(subCategoryIndex);
                      categoryStore.setSubCategoryParentName(item?.name);
                      categoryStore.setSubSubCategoryParentName(
                        memoizedCategories?.[subCategoryIndex]?.children?.[0]
                          ?.name,
                      );
                      categoryStore.setSubSubCategories(
                        memoizedCategories?.[subCategoryIndex]?.children?.[0]
                          ?.children,
                      );
                      categoryStore.setSecondLevelCategoryIndex(0);
                      categoryStore.setCategoryIds(categoryId.toString());
                      router.push("/trending");
                    }}
                    className="group inline-flex items-center gap-2 bg-green-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base border border-green-600 cursor-pointer"
                    translate="no"
                  >
                    {t("view_all")}
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:gap-7 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
                {memoizedHomeDecorProducts.map((item: TrendingProduct) => {
                  const cartItem = cartList?.find((el: any) => el.productId == item.id);
                  let relatedCart: any = null;
                  if (cartItem) {
                    relatedCart = cartList
                      ?.filter((c: any) => c.serviceId && c.cartProductServices?.length)
                      .find((c: any) => {
                        return !!c.cartProductServices
                          .find((r: any) => r.relatedCartType == 'PRODUCT' && r.productId == item.id);
                      });
                  }
                  return (
                    <ProductCard
                      key={item.id}
                      item={item}
                      onWishlist={() =>
                        handleAddToWishlist(item.id, item?.productWishlist)
                      }
                      inWishlist={item?.inWishlist}
                      haveAccessToken={haveAccessToken}
                      isInteractive
                      cartId={cartItem?.id}
                      productQuantity={cartItem?.quantity}
                      productVariant={cartItem?.object}
                      isAddedToCart={cartItem ? true : false}
                      relatedCart={relatedCart}
                    />
                  );
                })}
            </div>
          </div>
        </section>
      ) : null}

      {memoizedFashionBeautyProducts?.length > 0 ? (
        <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-pink-50 to-white">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900" translate="no">
                    {t("fashion_n_beauty")}
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {/* <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:mr-0"
                >
                  Smart
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  TV LED
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Air Conditions
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Sony Speakers
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Panasonic Refrigerations
                </a> */}
                  <a
                    onClick={() => {
                      const categoryId = 258;
                      const subCategoryIndex = memoizedCategories.findIndex(
                        (item: any) => item.id == categoryId,
                      );
                      const item = memoizedCategories.find(
                        (item: any) => item.id == categoryId,
                      );
                      categoryStore.setSubCategories(
                        memoizedCategories?.[subCategoryIndex]?.children,
                      );
                      categoryStore.setCategoryId(categoryId.toString());
                      categoryStore.setSubCategoryIndex(subCategoryIndex);
                      categoryStore.setSubCategoryParentName(item?.name);
                      categoryStore.setSubSubCategoryParentName(
                        memoizedCategories?.[subCategoryIndex]?.children?.[0]
                          ?.name,
                      );
                      categoryStore.setSubSubCategories(
                        memoizedCategories?.[subCategoryIndex]?.children?.[0]
                          ?.children,
                      );
                      categoryStore.setSecondLevelCategoryIndex(0);
                      categoryStore.setCategoryIds(categoryId.toString());
                      router.push("/trending");
                    }}
                    className="group inline-flex items-center gap-2 bg-pink-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base border border-pink-600 cursor-pointer"
                    translate="no"
                  >
                    {t("view_all")}
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:gap-7 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
                {memoizedFashionBeautyProducts.map((item: TrendingProduct) => {
                  const cartItem = cartList?.find((el: any) => el.productId == item.id);
                  let relatedCart: any = null;
                  if (cartItem) {
                    relatedCart = cartList
                      ?.filter((c: any) => c.serviceId && c.cartProductServices?.length)
                      .find((c: any) => {
                        return !!c.cartProductServices
                          .find((r: any) => r.relatedCartType == 'PRODUCT' && r.productId == item.id);
                      });
                  }
                  return (
                    <ProductCard
                      key={item.id}
                      item={item}
                      onWishlist={() =>
                        handleAddToWishlist(item.id, item?.productWishlist)
                      }
                      inWishlist={item?.inWishlist}
                      haveAccessToken={haveAccessToken}
                      isInteractive
                      cartId={cartItem?.id}
                      productQuantity={cartItem?.quantity}
                      productVariant={cartItem?.object}
                      isAddedToCart={cartItem ? true : false}
                      relatedCart={relatedCart}
                    />
                  );
                })}
            </div>
          </div>
        </section>
      ) : null}

      {memoizedConsumerElectronicsProducts.length > 0 ? (
        <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 bg-white">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900" translate="no">
                    {t("consumer_electronics")}
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {/* <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:mr-0"
                >
                  Videos
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Projectors
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Digital Cameras
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Printers & Scanners
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Accessories
                </a> */}
                  <a
                    onClick={() => {
                      const categoryId = 269;
                      const subCategoryId = 270;
                      const categoryIds = "269,270";
                      const subCategoryIndex = memoizedCategories.findIndex(
                        (item: any) => item.id == categoryId,
                      );
                      const item = memoizedCategories.find(
                        (item: any) => item.id == categoryId,
                      );
                      const children =
                        memoizedCategories?.[subCategoryIndex]?.children || [];
                      categoryStore.setSubCategories(children);
                      categoryStore.setSubCategoryIndex(subCategoryIndex);
                      categoryStore.setSubCategoryParentName(item?.name);
                      const itemSubCategory = children.find(
                        (item: any) => item.id == subCategoryId,
                      );
                      categoryStore.setSubSubCategoryParentName(
                        itemSubCategory?.name,
                      );
                      categoryStore.setSubSubCategories(
                        itemSubCategory?.children,
                      );
                      categoryStore.setSecondLevelCategoryIndex(
                        children.findIndex(
                          (item: any) => item.id == subCategoryId,
                        ),
                      );
                      categoryStore.setCategoryId(subCategoryId.toString());
                      categoryStore.setCategoryIds(categoryIds);
                      router.push("/trending");
                    }}
                    className="group inline-flex items-center gap-2 bg-blue-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base border border-blue-600 cursor-pointer"
                    translate="no"
                  >
                    {t("view_all")}
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:gap-7 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
                {memoizedConsumerElectronicsProducts.map(
                  (item: TrendingProduct) => {
                    const cartItem = cartList?.find((el: any) => el.productId == item.id);
                    let relatedCart: any = null;
                    if (cartItem) {
                      relatedCart = cartList
                        ?.filter((c: any) => c.serviceId && c.cartProductServices?.length)
                        .find((c: any) => {
                          return !!c.cartProductServices
                            .find((r: any) => r.relatedCartType == 'PRODUCT' && r.productId == item.id);
                        });
                    }
                    return (
                      <ProductCard
                        key={item.id}
                        item={item}
                        onWishlist={() =>
                          handleAddToWishlist(item.id, item?.productWishlist)
                        }
                        inWishlist={item?.inWishlist}
                        haveAccessToken={haveAccessToken}
                        isInteractive
                        cartId={cartItem?.id}
                        productQuantity={cartItem?.quantity}
                        productVariant={cartItem?.object}
                        isAddedToCart={cartItem ? true : false}
                        relatedCart={relatedCart}
                      />
                    );
                  },
                )}
            </div>
          </div>
        </section>
      ) : null}

      {/* Top Rated Products Section */}
      {memoizedTopRatedProducts?.length > 0 ? (
        <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-yellow-50 to-white">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3" translate="no">
                    Top Rated Products
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 max-w-2xl" translate="no">
                    Products with the highest customer ratings
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:gap-7 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
              {memoizedTopRatedProducts.slice(0, 8).map((item: any) => {
                const cartItem = cartList?.find((el: any) => el.productId == item.id);
                let relatedCart: any = null;
                if (cartItem) {
                  relatedCart = cartList
                    ?.filter((c: any) => c.serviceId && c.cartProductServices?.length)
                    .find((c: any) => {
                      return !!c.cartProductServices
                        .find((r: any) => r.relatedCartType == 'PRODUCT' && r.productId == item.id);
                    });
                }
                return (
                  <ProductCard
                    key={item.id}
                    item={item}
                    onWishlist={() =>
                      handleAddToWishlist(item.id, item?.productWishlist)
                    }
                    inWishlist={item?.inWishlist}
                    haveAccessToken={haveAccessToken}
                    isInteractive
                    cartId={cartItem?.id}
                    productQuantity={cartItem?.quantity}
                    productVariant={cartItem?.object}
                    isAddedToCart={cartItem ? true : false}
                    relatedCart={relatedCart}
                  />
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Best Sellers Section */}
      {memoizedBestSellers?.length > 0 ? (
        <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 bg-white">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3" translate="no">
                    Best Sellers
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 max-w-2xl" translate="no">
                    Most popular products purchased by customers
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:gap-7 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
              {memoizedBestSellers.slice(0, 8).map((item: any) => {
                const cartItem = cartList?.find((el: any) => el.productId == item.id);
                let relatedCart: any = null;
                if (cartItem) {
                  relatedCart = cartList
                    ?.filter((c: any) => c.serviceId && c.cartProductServices?.length)
                    .find((c: any) => {
                      return !!c.cartProductServices
                        .find((r: any) => r.relatedCartType == 'PRODUCT' && r.productId == item.id);
                    });
                }
                return (
                  <ProductCard
                    key={item.id}
                    item={item}
                    onWishlist={() =>
                      handleAddToWishlist(item.id, item?.productWishlist)
                    }
                    inWishlist={item?.inWishlist}
                    haveAccessToken={haveAccessToken}
                    isInteractive
                    cartId={cartItem?.id}
                    productQuantity={cartItem?.quantity}
                    productVariant={cartItem?.object}
                    isAddedToCart={cartItem ? true : false}
                    relatedCart={relatedCart}
                    sold={item.sold}
                  />
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* New Arrivals Section */}
      {memoizedNewArrivals?.length > 0 ? (
        <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-green-50 to-white">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3" translate="no">
                    New Arrivals
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 max-w-2xl" translate="no">
                    Latest products added to our collection
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:gap-7 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
              {memoizedNewArrivals.slice(0, 8).map((item: any) => {
                const cartItem = cartList?.find((el: any) => el.productId == item.id);
                let relatedCart: any = null;
                if (cartItem) {
                  relatedCart = cartList
                    ?.filter((c: any) => c.serviceId && c.cartProductServices?.length)
                    .find((c: any) => {
                      return !!c.cartProductServices
                        .find((r: any) => r.relatedCartType == 'PRODUCT' && r.productId == item.id);
                    });
                }
                return (
                  <ProductCard
                    key={item.id}
                    item={item}
                    onWishlist={() =>
                      handleAddToWishlist(item.id, item?.productWishlist)
                    }
                    inWishlist={item?.inWishlist}
                    haveAccessToken={haveAccessToken}
                    isInteractive
                    cartId={cartItem?.id}
                    productQuantity={cartItem?.quantity}
                    productVariant={cartItem?.object}
                    isAddedToCart={cartItem ? true : false}
                    relatedCart={relatedCart}
                  />
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Hot Deals Section */}
      {memoizedHotDeals?.length > 0 ? (
        <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 bg-white">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3" translate="no">
                    Hot Deals
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 max-w-2xl" translate="no">
                    Best discounts and special offers
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:gap-7 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
              {memoizedHotDeals.slice(0, 8).map((item: any) => {
                const cartItem = cartList?.find((el: any) => el.productId == item.id);
                let relatedCart: any = null;
                if (cartItem) {
                  relatedCart = cartList
                    ?.filter((c: any) => c.serviceId && c.cartProductServices?.length)
                    .find((c: any) => {
                      return !!c.cartProductServices
                        .find((r: any) => r.relatedCartType == 'PRODUCT' && r.productId == item.id);
                    });
                }
                return (
                  <ProductCard
                    key={item.id}
                    item={item}
                    onWishlist={() =>
                      handleAddToWishlist(item.id, item?.productWishlist)
                    }
                    inWishlist={item?.inWishlist}
                    haveAccessToken={haveAccessToken}
                    isInteractive
                    cartId={cartItem?.id}
                    productQuantity={cartItem?.quantity}
                    productVariant={cartItem?.object}
                    isAddedToCart={cartItem ? true : false}
                    relatedCart={relatedCart}
                  />
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Highly Reviewed Products Section */}
      {memoizedHighlyReviewed?.length > 0 ? (
        <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-purple-50 to-white">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3" translate="no">
                    Highly Reviewed
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 max-w-2xl" translate="no">
                    Products with most customer reviews
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:gap-7 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
              {memoizedHighlyReviewed.slice(0, 8).map((item: any) => {
                const cartItem = cartList?.find((el: any) => el.productId == item.id);
                let relatedCart: any = null;
                if (cartItem) {
                  relatedCart = cartList
                    ?.filter((c: any) => c.serviceId && c.cartProductServices?.length)
                    .find((c: any) => {
                      return !!c.cartProductServices
                        .find((r: any) => r.relatedCartType == 'PRODUCT' && r.productId == item.id);
                    });
                }
                return (
                  <ProductCard
                    key={item.id}
                    item={item}
                    onWishlist={() =>
                      handleAddToWishlist(item.id, item?.productWishlist)
                    }
                    inWishlist={item?.inWishlist}
                    haveAccessToken={haveAccessToken}
                    isInteractive
                    cartId={cartItem?.id}
                    productQuantity={cartItem?.quantity}
                    productVariant={cartItem?.object}
                    isAddedToCart={cartItem ? true : false}
                    relatedCart={relatedCart}
                  />
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <Footer />
    </>
  );
}

export default HomePage;
