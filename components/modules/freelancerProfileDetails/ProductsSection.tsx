import React, { useMemo } from "react";
import ProductCard from "./ProductCard";
import { useMe } from "@/apis/queries/user.queries";
import { useProducts } from "@/apis/queries/product.queries";
import { stripHTML } from "@/utils/helper";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateCartWithLogin } from "@/apis/queries/cart.queries";
import {
  useAddToWishList,
  useDeleteFromWishList,
} from "@/apis/queries/wishlist.queries";

type ProductsSectionProps = {};

const ProductsSection: React.FC<ProductsSectionProps> = () => {
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
    !!me?.data?.data?.id,
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

  const handleDeleteFromWishlist = async (productId: number) => {
    const response = await deleteFromWishlist.mutateAsync({
      productId,
    });
    if (response.status) {
      toast({
        title: "Item removed from wishlist",
        description: "Check your wishlist for more details",
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
        title: "Item not removed from wishlist",
        description: "Check your wishlist for more details",
        variant: "danger",
      });
    }
  };

  const handleAddToCart = async (quantity: number, productPriceId?: number) => {
    if (!productPriceId) {
      toast({
        title: `Oops! Something went wrong`,
        description: "Product Price Id not found",
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
        title: `Item added to cart`,
        description: "Check your cart for more details",
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
        title: "Item added to wishlist",
        description: "Check your wishlist for more details",
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
        title: response.message || "Item not added to wishlist",
        description: "Check your wishlist for more details",
        variant: "danger",
      });
    }
  };

  return (
    <div>
      <h2 className="left-8 mb-7 text-2xl font-semibold text-color-dark">
        Products
      </h2>

      {!memoizedProducts.length ? (
        <p className="p-4 text-center text-base font-medium text-color-dark">
          No Products Found
        </p>
      ) : null}

      <div className="grid grid-cols-5 gap-3">
        {memoizedProducts.map((item: any) => (
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
      </div>
    </div>
  );
};

export default ProductsSection;
