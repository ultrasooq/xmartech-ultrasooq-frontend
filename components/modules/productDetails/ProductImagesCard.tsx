import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect } from "react";
import validator from "validator";

type ProductImagesCardProps = {
  productDetails: any;
  onAdd: () => void;
  onToCart: () => void;
  onToCheckout: () => void;
  hasItem: boolean;
  isLoading: boolean;
};

const ProductImagesCard: React.FC<ProductImagesCardProps> = ({
  productDetails,
  onAdd,
  onToCart,
  onToCheckout,
  hasItem,
  isLoading,
}) => {
  const [previewImages, setPreviewImages] = React.useState<any>([]);

  useEffect(() => {
    if (!productDetails?.productImages?.length) return;

    setPreviewImages(
      productDetails?.productImages?.[0]?.image &&
        validator.isURL(productDetails.productImages[0].image)
        ? productDetails?.productImages?.[0]?.image
        : "/images/product-placeholder.png",
    );
  }, [productDetails?.productImages?.length]);

  return (
    <div className="product-view-s1-left">
      <div className="grid grid-cols-4 gap-4">
        <div className="order-2 col-span-3 max-h-[500px] space-y-4 bg-gray-100">
          {productDetails?.productImages?.length ? (
            <div className="relative min-h-[500px] w-full">
              <Image
                src={previewImages}
                alt="primary-image"
                fill
                className="object-contain"
              />
            </div>
          ) : !isLoading ? (
            <div className="relative min-h-[500px] w-full">
              <Image
                src="/images/product-placeholder.png"
                alt="primary-image"
                fill
                className="object-contain"
              />
            </div>
          ) : null}

          {isLoading ? <Skeleton className="min-h-[500px] w-full" /> : null}

          <div className="flex w-full gap-x-3 self-end">
            <Button
              onClick={hasItem ? onToCart : onAdd}
              className="h-14 flex-1 rounded-none bg-color-yellow text-base"
            >
              {hasItem ? "Go To Cart" : "Add To Cart"}
            </Button>
            <Button
              onClick={onToCheckout}
              className="h-14 flex-1 rounded-none bg-dark-orange text-base"
            >
              Buy Now
            </Button>
          </div>
        </div>

        <div className="col-span-1 m-auto flex !h-full flex-col gap-4 self-start">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton className="h-28 w-28" key={index} />
              ))
            : null}

          {productDetails?.productImages?.map((item: any) => (
            <Button
              variant="ghost"
              className={cn(
                item?.image === previewImages ? "border-2 border-red-500" : "",
                "relative h-28 w-28 rounded-none bg-gray-100",
              )}
              key={item?.id}
              onClick={() => setPreviewImages(item?.image)}
            >
              <Image
                src={
                  item?.image && validator.isURL(item.image)
                    ? item.image
                    : "/images/product-placeholder.png"
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
