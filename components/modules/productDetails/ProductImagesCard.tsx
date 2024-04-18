import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import validator from "validator";

type ProductImagesCardProps = {
  productDetails: any;
  onAdd: () => void;
  onNavigate: () => void;
  hasItem: boolean;
};

const ProductImagesCard: React.FC<ProductImagesCardProps> = ({
  productDetails,
  onAdd,
  onNavigate,
  hasItem,
}) => {
  return (
    <div className="product-view-s1-left">
      <div className="grid grid-cols-4 gap-4">
        <div className="order-2 col-span-3 max-h-[500px] space-y-4 bg-gray-100">
          <div className="relative h-full w-full">
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

          <div className="flex w-full gap-x-3">
            <Button
              onClick={hasItem ? onNavigate : onAdd}
              className="h-14 flex-1 rounded-none bg-color-yellow text-base"
            >
              {hasItem ? "Go To Cart" : "Add To Cart"}
            </Button>
            <Button className="h-14 flex-1 rounded-none bg-dark-orange text-base">
              Buy Now
            </Button>
          </div>
        </div>

        <div className="col-span-1 m-auto flex flex-col gap-4">
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
      {/* <div className="cart-actions">
        <button type="button" className="custom-btn cart-btn">
          Add To Cart
        </button>
        <button type="button" className="custom-btn theme-primary-btn">
          Buy Now
        </button>
      </div> */}
    </div>
  );
};

export default ProductImagesCard;
