import React, { useMemo } from "react";
import SameBrandProductCard from "./SameBrandProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { stripHTML } from "@/utils/helper";
import { Skeleton } from "@/components/ui/skeleton";
import { useSameBrandProducts } from "@/apis/queries/product.queries";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useMe } from "@/apis/queries/user.queries";
import {
  useAddToWishList,
  useDeleteFromWishList,
} from "@/apis/queries/wishlist.queries";
import { useUpdateCartWithLogin } from "@/apis/queries/cart.queries";

type SameBrandSectionProps = {
  productDetails: any;
};

const SameBrandSection: React.FC<SameBrandSectionProps> = ({
  productDetails,
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const me = useMe();
  const updateCartWithLogin = useUpdateCartWithLogin();
  const addToWishlist = useAddToWishList();
  const deleteFromWishlist = useDeleteFromWishList();
  const sameBrandProductsQuery = useSameBrandProducts(
    {
      page: 1,
      limit: 10,
      brandIds: productDetails?.brandId,
      userId: me.data?.data?.id,
    },
    !!productDetails?.brandId,
  );

  const memoizedSameBrandProductList = useMemo(() => {
    return (
      sameBrandProductsQuery?.data?.data?.map((item: any) => ({
        ...item,
        productWishlist: item?.product_wishlist || [],
        inWishlist: item?.product_wishlist?.find(
          (ele: any) => ele?.userId === me.data?.data?.id,
        ),
      })) || []
    );
  }, [
    sameBrandProductsQuery?.data?.data,
    me.data?.data?.id,
    sameBrandProductsQuery?.isFetched,
    productDetails?.brandId,
  ]);

  const handleAddToCart = async (
    quantity: number,
    productId: number,
    actionType: "add" | "remove",
  ) => {
    const response = await updateCartWithLogin.mutateAsync({
      productId,
      quantity,
    });

    if (response.status) {
      toast({
        title: `Item ${actionType === "add" ? "added to" : actionType === "remove" ? "removed from" : ""} cart`,
        description: "Check your cart for more details",
        variant: "success",
      });
    }
  };

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
        queryKey: ["product-by-id", { productId, userId: me.data?.data?.id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["same-brand-products"],
      });
    } else {
      toast({
        title: "Item not removed from wishlist",
        description: "Check your wishlist for more details",
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
        title: "Item added to wishlist",
        description: "Check your wishlist for more details",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["product-by-id", { productId, userId: me.data?.data?.id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["same-brand-products"],
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
    <div className="suggestion-list-s1-col">
      <div className="suggestion-same-branch-lists-s1">
        <div className="title-headerpart">
          <h3>Same Brand</h3>
        </div>
        <div className="contnet-bodypart min-h-[460px]">
          {!sameBrandProductsQuery?.isFetched ? (
            <Skeleton className="h-[420px] w-full" />
          ) : null}

          <div className="product-list-s1 outline-style">
            {sameBrandProductsQuery?.isFetched &&
            memoizedSameBrandProductList?.length ? (
              <Carousel
                opts={{ align: "start", loop: true }}
                orientation="vertical"
                className="w-full max-w-xs"
              >
                <CarouselContent className="-mt-1 h-[420px]">
                  {memoizedSameBrandProductList?.map((item: any) => (
                    <CarouselItem key={item?.id} className="pt-1 md:basis-1/2">
                      <div className="p-1">
                        <SameBrandProductCard
                          id={item?.id}
                          productName={item?.productName}
                          productImages={item?.productImages}
                          shortDescription={
                            item?.shortDescription
                              ? stripHTML(item?.shortDescription)
                              : "-"
                          }
                          offerPrice={item?.offerPrice}
                          productPrice={item?.productPrice}
                          productReview={item?.productReview}
                          onAdd={() => handleAddToCart(-1, item.id, "add")}
                          onWishlist={() =>
                            handleAddToWishlist(item.id, item?.productWishlist)
                          }
                          inWishlist={item?.inWishlist}
                          haveAccessToken={!!me.data?.data}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="top-0" />
                <CarouselNext className="bottom-0" />
              </Carousel>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SameBrandSection;
