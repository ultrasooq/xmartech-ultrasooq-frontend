import React, { useMemo } from "react";
import ProductCard from "./ProductCard";
import { useMe } from "@/apis/queries/user.queries";
import { useProducts, useVendorProducts } from "@/apis/queries/product.queries";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateCartWithLogin } from "@/apis/queries/cart.queries";
import {
  useAddToWishList,
  useDeleteFromWishList,
} from "@/apis/queries/wishlist.queries";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

type ProductsSectionProps = {
  sellerId?: string;
};

const ProductsSection: React.FC<ProductsSectionProps> = ({ sellerId }) => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const me = useMe();
  const productsQuery = useProducts(
    {
      userId: String(me?.data?.data?.id),
      page: 1,
      limit: 10,
      status: "ALL",
    },
    !!me?.data?.data?.id && !sellerId,
  );

  const vendorProductsQuery = useVendorProducts(
    {
      adminId: sellerId || "",
      page: 1,
      limit: 10,
    },
    !!sellerId,
  );

  const updateCartWithLogin = useUpdateCartWithLogin();
  const addToWishlist = useAddToWishList();
  const deleteFromWishlist = useDeleteFromWishList();

  const memoizedProducts = useMemo(() => {
    return (
      productsQuery.data?.data?.map((item: any) => {
        return {
          id: item?.id,
          productName: item?.productName || "-",
          productPrice: item?.productPrice || 0,
          offerPrice: item?.offerPrice || 0,
          productImage: item?.productImages?.[0]?.image,
          categoryName: item?.category?.name || "-",
          skuNo: item?.skuNo,
          brandName: item?.brand?.brandName || "-",
          productReview: item?.productReview || [],
          shortDescription: item?.product_productShortDescription?.length
            ? item?.product_productShortDescription?.[0]?.shortDescription
            : "-",
          status: item?.status || "-",
          productWishlist: item?.product_wishlist || [],
          inWishlist: item?.product_wishlist?.find(
            (ele: any) => ele?.userId === me.data?.data?.id,
          ),
          productProductPriceId: item?.product_productPrice?.[0]?.id,
          productProductPrice: item?.product_productPrice?.[0]?.offerPrice,
          consumerDiscount: item?.product_productPrice?.[0]?.consumerDiscount,
          askForPrice: item?.product_productPrice?.[0]?.askForPrice,
        };
      }) || []
    );
  }, [productsQuery.data?.data, me.data?.data?.id]);

  const memoizedVendorProducts = useMemo(() => {
    return (
      vendorProductsQuery.data?.data?.map((item: any) => {
        return {
          id: item?.id,
          productName: item?.productName || "-",
          productPrice: item?.productPrice || 0,
          offerPrice: item?.offerPrice || 0,
          productImage: item?.productImages?.[0]?.image,
          categoryName: item?.category?.name || "-",
          skuNo: item?.skuNo,
          brandName: item?.brand?.brandName || "-",
          productReview: item?.productReview || [],
          shortDescription: item?.product_productShortDescription?.length
            ? item?.product_productShortDescription?.[0]?.shortDescription
            : "-",
          status: item?.status || "-",
          productWishlist: item?.product_wishlist || [],
          inWishlist: item?.product_wishlist?.find(
            (ele: any) => ele?.userId === me.data?.data?.id,
          ),
          productProductPriceId: item?.product_productPrice?.[0]?.id,
          productProductPrice: item?.product_productPrice?.[0]?.offerPrice,
          consumerDiscount: item?.product_productPrice?.[0]?.consumerDiscount,
          askForPrice: item?.product_productPrice?.[0]?.askForPrice,
        };
      }) || []
    );
  }, [vendorProductsQuery.data?.data, me.data?.data?.id]);

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

  const handleAddToCart = async (quantity: number, productPriceId?: number) => {
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

  return (
    <div>
      <h2
        className="left-8 mb-7 text-2xl font-semibold text-color-dark"
        dir={langDir}
      >
        {t("products")}
      </h2>

      {!sellerId && !memoizedProducts.length ? (
        <p
          className="p-4 text-center text-base font-medium text-color-dark"
          dir={langDir}
        >
          {t("no_product_found")}
        </p>
      ) : null}

      {sellerId && !memoizedVendorProducts.length ? (
        <p
          className="p-4 text-center text-base font-medium text-color-dark"
          dir={langDir}
        >
          {t("no_product_found")}
        </p>
      ) : null}

      <div className="profile_details_product flex flex-wrap gap-3 md:grid md:grid-cols-5">
        {!sellerId &&
          memoizedProducts.map((item: any) => (
            <ProductCard
              key={item.id}
              item={item}
              onAdd={() => handleAddToCart(-1, item?.productProductPriceId)}
              onWishlist={() =>
                handleAddToWishlist(item.id, item?.productWishlist)
              }
              inWishlist={item?.inWishlist}
              haveAccessToken={!!me.data?.data}
            />
          ))}

        {sellerId &&
          memoizedVendorProducts.map((item: any) => (
            <ProductCard
              key={item.id}
              item={item}
              onAdd={() => handleAddToCart(-1, item?.productProductPriceId)}
              onWishlist={() =>
                handleAddToWishlist(item.id, item?.productWishlist)
              }
              inWishlist={item?.inWishlist}
              haveAccessToken={!!me.data?.data}
              isSeller
            />
          ))}
      </div>
    </div>
  );
};

export default ProductsSection;
