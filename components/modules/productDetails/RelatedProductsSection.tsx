import React, { useEffect, useMemo, useState, useRef } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { stripHTML } from "@/utils/helper";
import { useMe } from "@/apis/queries/user.queries";
import {
  useAddToWishList,
  useDeleteFromWishList,
} from "@/apis/queries/wishlist.queries";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRelatedProducts } from "@/apis/queries/product.queries";
import {
  useUpdateCartByDevice,
  useUpdateCartWithLogin,
} from "@/apis/queries/cart.queries";
import { getOrCreateDeviceId } from "@/utils/helper";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

type RelatedProductsSectionProps = {
  calculateTagIds: string;
  productId?: string;
};

const RelatedProductsSection: React.FC<RelatedProductsSectionProps> = ({
  calculateTagIds,
  productId,
}) => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const deviceId = getOrCreateDeviceId() || "";
  const [haveAccessToken, setHaveAccessToken] = useState(false);
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);
  const sliderRef = useRef<Slider>(null);

  const me = useMe();
  const updateCartWithLogin = useUpdateCartWithLogin();
  const updateCartByDevice = useUpdateCartByDevice();
  const addToWishlist = useAddToWishList();
  const deleteFromWishlist = useDeleteFromWishList();
  const relatedProductsQuery = useRelatedProducts(
    {
      page: 1,
      limit: 10,
      tagIds: calculateTagIds,
      userId: me.data?.data?.id,
      productId,
    },
    !!calculateTagIds,
  );

  const memoizedRelatedProductList = useMemo(() => {
    return (
      relatedProductsQuery?.data?.data?.map((item: any) => ({
        ...item,
        productImages: item?.product_productPrice?.[0]
          ?.productPrice_productSellerImage?.length
          ? item?.product_productPrice?.[0]?.productPrice_productSellerImage
          : item?.productImages,
        shortDescription: item?.product_productShortDescription?.length
          ? item?.product_productShortDescription?.[0]?.shortDescription
          : "-",
        productWishlist: item?.product_wishlist || [],
        inWishlist: item?.product_wishlist?.find(
          (ele: any) => ele?.userId === me.data?.data?.id,
        ),
        productProductPriceId: item?.product_productPrice?.[0]?.id,
        productProductPrice: item?.product_productPrice?.[0]?.offerPrice,
        consumerDiscount: item?.product_productPrice?.[0]?.consumerDiscount,
        consumerDiscountType: item?.product_productPrice?.[0]?.consumerDiscountType,
        vendorDiscount: item?.product_productPrice?.[0]?.vendorDiscount,
        vendorDiscountType: item?.product_productPrice?.[0]?.vendorDiscountType,
        askForPrice: item?.product_productPrice?.[0]?.askForPrice,
      })) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    relatedProductsQuery?.data?.data,
    me.data?.data?.id,
    relatedProductsQuery?.isFetched,
    calculateTagIds,
  ]);

  const handleAddToCart = async (quantity: number, productPriceId?: number) => {
    if (haveAccessToken) {
      if (!productPriceId) {
        toast({
          title: t("something_went_wrong"),
          description: t("product_price_id_not_found"),
          variant: "danger",
        });
        return;
      }
      const response = await updateCartWithLogin.mutateAsync({
        productPriceId,
        quantity,
      });

      if (response.status) {
        toast({
          title: t("item_added_to_cart"),
          description: t("check_your_cart_for_more_details"),
          variant: "success",
        });
      }
    } else {
      if (!productPriceId) {
        toast({
          title: t("something_went_wrong"),
          description: t("product_price_id_not_found"),
          variant: "danger",
        });
        return;
      }
      const response = await updateCartByDevice.mutateAsync({
        productPriceId,
        quantity,
        deviceId,
      });
      if (response.status) {
        toast({
          title: t("item_added_to_cart"),
          description: t("check_your_cart_for_more_details"),
          variant: "success",
        });
        return response.status;
      }
    }
  };

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

  useEffect(() => {
    if (accessToken) {
      setHaveAccessToken(true);
    } else {
      setHaveAccessToken(false);
    }
  }, [accessToken]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false, // We're using custom arrows
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
        },
      },
    ],
  };

  return (
    <section className="w-full py-12">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">

        {/* Products Carousel */}
        {relatedProductsQuery?.isFetched &&
        memoizedRelatedProductList?.length ? (
          <div className="relative">
            <Slider ref={sliderRef} className="related_slider w-full" {...settings}>
              {memoizedRelatedProductList?.map((item: any) => (
                <div className="px-2" key={item?.id}>
                  <ProductCard
                    id={item?.id}
                    productName={item?.productName}
                    productImages={item?.productImages}
                    shortDescription={
                      item?.shortDescription
                        ? stripHTML(item?.shortDescription)
                        : "-"
                    }
                    offerPrice={item?.offerPrice}
                    productProductPrice={item?.productProductPrice}
                    productPrice={item?.productPrice}
                    productReview={item?.productReview}
                    onAdd={() => handleAddToCart(-1, item?.productProductPriceId)}
                    onWishlist={() =>
                      handleAddToWishlist(item.id, item?.productWishlist)
                    }
                    inWishlist={item?.inWishlist}
                    haveAccessToken={haveAccessToken}
                    consumerDiscount={item?.consumerDiscount}
                    consumerDiscountType={item?.consumerDiscountType}
                    vendorDiscount={item?.vendorDiscount}
                    vendorDiscountType={item?.vendorDiscountType}
                    askForPrice={item?.askForPrice}
                  />
                </div>
              ))}
            </Slider>
            
            {/* Custom Navigation Arrows */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4">
              <button 
                onClick={() => sliderRef.current?.slickPrev()}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-110"
              >
                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
              <button 
                onClick={() => sliderRef.current?.slickNext()}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-110"
              >
                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ) : relatedProductsQuery?.isFetched && !memoizedRelatedProductList?.length ? (
          <div className="py-16 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2" dir={langDir} translate="no">
              {t("no_related_products_found")}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto" dir={langDir} translate="no">
              {t("explore_more_products_from_our_catalog")}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default RelatedProductsSection;
