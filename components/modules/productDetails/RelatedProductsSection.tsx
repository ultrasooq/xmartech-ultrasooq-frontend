import React, { useMemo } from "react";
import ProductCard from "./ProductCard";
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

type RelatedProductsSectionProps = {
  calculateTagIds: string;
};

const RelatedProductsSection: React.FC<RelatedProductsSectionProps> = ({
  calculateTagIds,
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const me = useMe();
  const addToWishlist = useAddToWishList();
  const deleteFromWishlist = useDeleteFromWishList();
  const relatedProductsQuery = useRelatedProducts(
    {
      page: 1,
      limit: 10,
      tagIds: calculateTagIds,
    },
    !!calculateTagIds,
  );

  const memoizedRelatedProductList = useMemo(() => {
    return (
      relatedProductsQuery?.data?.data?.map((item: any) => ({
        ...item,
        productWishlist: item?.product_wishlist || [],
        inWishlist: item?.product_wishlist?.find(
          (ele: any) => ele?.userId === me.data?.data?.id,
        ),
      })) || []
    );
  }, [
    relatedProductsQuery?.data?.data,
    me.data?.data?.id,
    relatedProductsQuery?.isFetched,
    calculateTagIds,
  ]);

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
        queryKey: ["related-products"],
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
        queryKey: ["related-products"],
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
    <section className="w-full py-8">
      <div className="container m-auto">
        <div className="products-header-filter">
          <div className="le-info">
            <h3>Related products</h3>
          </div>
        </div>

        {relatedProductsQuery?.isFetched &&
        memoizedRelatedProductList?.length ? (
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-1">
              {memoizedRelatedProductList?.map((item: any) => (
                <CarouselItem
                  key={item?.id}
                  className="max-w-[260px] pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
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
                      productPrice={item?.productPrice}
                      productReview={item?.productReview}
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
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : null}
      </div>
    </section>
  );
};

export default RelatedProductsSection;
