import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import validator from "validator";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PlaceholderImage from "@/public/images/product-placeholder.png";
// import WishlistIcon from "@/public/images/wishlist.svg";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import ReactPlayer from "react-player/lazy";
import { imageExtensions, videoExtensions } from "@/utils/constants";

type ProductImagesCardProps = {
  productDetails: any;
  onAdd: () => void;
  onToCart: () => void;
  onToCheckout: () => void;
  hasItem: boolean;
  isLoading: boolean;
  onWishlist: () => void;
  haveAccessToken: boolean;
  inWishlist?: boolean;
  askForPrice?: string;
};

const ProductImagesCard: React.FC<ProductImagesCardProps> = ({
  productDetails,
  onAdd,
  onToCart,
  onToCheckout,
  hasItem,
  isLoading,
  onWishlist,
  haveAccessToken,
  inWishlist,
  askForPrice,
}) => {
  const [previewImages, setPreviewImages] = useState<any[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isVideo = (path: string) => {
    if (typeof path === "string") {
      const extension = path.split(".").pop()?.toLowerCase();
      if (extension) {
        if (videoExtensions.includes(extension)) {
          return true;
        }
      }
      return false;
    }
  };

  const isImage = (path: any) => {
    if (typeof path === "string") {
      const extension = path.split(".").pop()?.toLowerCase();
      if (extension) {
        if (imageExtensions.includes(extension)) {
          return true;
        }
      }
      return false;
    }
  };

  useEffect(() => {
    if (!productDetails?.productImages?.length) return;

    setPreviewImages(
      productDetails?.productImages?.map((item: any) =>
        item?.image && validator.isURL(item.image)
          ? item.image
          : item?.video && validator.isURL(item.video)
            ? item.video
            : PlaceholderImage,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetails?.productImages?.length]);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", (emblaApi) => {
      // Do something on select.
      const index = emblaApi.selectedScrollSnap();
      setCurrentImageIndex(index);
    });
  }, [api]);

  return (
    <div className="product-view-s1-left">
      <div className="grid grid-cols-4 gap-4">
        <div className="relative order-2 col-span-3 max-h-[500px] space-y-4 bg-gray-100">
          {!isLoading && haveAccessToken ? (
            <button
              type="button"
              className="absolute right-2.5 top-2.5 z-10 rounded-full bg-white p-2"
              onClick={onWishlist}
            >
              {inWishlist ? <FaHeart color="red" /> : <FaRegHeart />}
            </button>
          ) : null}
          {!isLoading && previewImages?.length ? (
            <Carousel
              className="w-full"
              opts={{ align: "start", loop: true }}
              setApi={setApi}
            >
              <CarouselContent className="-ml-1">
                {previewImages?.map((item, index) => (
                  <CarouselItem key={index} className="basis pl-1">
                    <div className="p-1">
                      <div className="relative min-h-[500px] w-full">
                        {isImage(item) ? (
                          <Image
                            src={item}
                            alt="primary-image"
                            fill
                            className="object-contain"
                          />
                        ) : isVideo(item) ? (
                          <div className="player-wrapper !py-[30%]">
                            <ReactPlayer
                              url={item}
                              width="100%"
                              height="100%"
                              // playing
                              controls
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          ) : null}

          {!isLoading && !previewImages?.length ? (
            <div className="relative min-h-[500px] w-full">
              <Image
                src={PlaceholderImage}
                alt="primary-image"
                fill
                className="object-contain"
              />
            </div>
          ) : null}

          {isLoading ? <Skeleton className="min-h-[500px] w-full" /> : null}

          {!isLoading && askForPrice === "true" ? (
            <Button
              type="button"
              className="h-14 w-full flex-1 rounded-none bg-color-yellow text-base"
            >
              Message
            </Button>
          ) : null}
          {!isLoading && askForPrice !== "true" ? (
            <div className="flex w-full gap-x-3 self-end">
              <Button
                type="button"
                onClick={hasItem ? onToCart : onAdd}
                className="h-14 flex-1 rounded-none bg-color-yellow text-base"
              >
                {hasItem ? "Send To Cart" : "Add To Cart"}
              </Button>
              <Button
                type="button"
                onClick={onToCheckout}
                className="h-14 flex-1 rounded-none bg-dark-orange text-base"
              >
                Buy Now
              </Button>
            </div>
          ) : null}
        </div>

        <div className="col-span-1 m-auto flex !h-full flex-col gap-4 self-start">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton className="h-28 w-28" key={index} />
              ))
            : null}

          {productDetails?.productImages?.map((item: any, index: number) => (
            <Button
              variant="ghost"
              className={cn(
                previewImages[currentImageIndex] === item?.image ||
                  previewImages[currentImageIndex] === item?.video
                  ? "border-2 border-red-500"
                  : "",
                "relative h-28 w-28 rounded-none bg-gray-100",
              )}
              key={item?.id}
              onClick={() => api?.scrollTo(index)}
            >
              <Image
                src={
                  item?.image && validator.isURL(item.image)
                    ? item.image
                    : PlaceholderImage
                }
                alt="primary-image"
                fill
                className="rounded-none object-contain"
              />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImagesCard;
