import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import React from "react";
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
  return (
    <div className="product-view-s1-left">
      <div className="grid grid-cols-4 gap-4">
        <div className="order-2 col-span-3 max-h-[500px] space-y-4 bg-gray-100">
          {productDetails?.productImages?.[0]?.image ? (
            <div className="relative min-h-[500px] w-full">
              <Image
                src={
                  productDetails?.productImages?.[0]?.image &&
                  validator.isURL(productDetails.productImages[0].image)
                    ? productDetails?.productImages?.[0]?.image
                    : "/images/product-placeholder.png"
                }
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

          {productDetails?.productImages?.map((item: any, index: number) =>
            index !== 0 ? (
              <div className="relative h-28 w-28 bg-gray-100" key={item?.id}>
                <Image
                  src={
                    item?.image && validator.isURL(item.image)
                      ? item.image
                      : "/images/product-placeholder.png"
                  }
                  alt="primary-image"
                  fill
                  className="object-contain"
                />
              </div>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImagesCard;
