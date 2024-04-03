import Image from "next/image";
import React from "react";

type ProductImagesCardProps = {
  productDetails: any;
};

const ProductImagesCard: React.FC<ProductImagesCardProps> = ({
  productDetails,
}) => {
  return (
    <div className="product-view-s1-left">
      <div className="product-view-s1">
        <div className="product-view-s1-big-image">
          <div className="relative h-full w-full">
            <Image
              src={productDetails?.productImages?.[0]?.image}
              alt="primary-image"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex gap-4">
          {productDetails?.productImages?.map((item: any, index: number) =>
            index !== 0 ? (
              <div className="relative h-36 w-36">
                <Image
                  src={item?.image}
                  alt="primary-image"
                  fill
                  className="object-cover"
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
