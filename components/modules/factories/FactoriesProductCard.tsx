import { Button } from "@/components/ui/button";
// import { useCartStore } from "@/lib/rfqStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import validator from "validator";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { FaCircleCheck } from "react-icons/fa6";
import Link from "next/link";
// import Link from "next/link";

type RfqProductCardProps = {
  id: number;
  productType: "F" | "P";
  productName: string;
  productNote: string;
  productStatus: string;
  productImages: {
    image: string;
  }[];
  productQuantity: number;
  onAdd: (args0: number) => void;
  onToCart: () => void;
  // onEdit: (args0: number) => void;
  isCreatedByMe: boolean;
  isAddedToCart: boolean;
  haveAccessToken: boolean;
};

const FactoriesProductCard: React.FC<RfqProductCardProps> = ({
  id,
  productType,
  productName,
  productNote,
  productStatus,
  productImages,
  productQuantity,
  onAdd,
  onToCart,
  // onEdit,
  isCreatedByMe,
  isAddedToCart,
  haveAccessToken,
}) => {
  // const cart = useCartStore();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(productQuantity || 0);
  }, [productQuantity]);

  return (
    <div className="product_list_part">
      {/* FIXME:  link disabled due to TYPE R product. error in find one due to no price */}
      <Link href={`/trending/${id}`}>
      <div className="product_list_image relative">
        <Image
          alt="pro-5"
          className="p-3"
          src={
            productImages?.[0]?.image &&
            validator.isURL(productImages?.[0]?.image)
              ? productImages[0].image
              : PlaceholderImage
          }
          fill
        />
      </div>
      </Link>
      <div className="product_list_content">
        <Link href={`/trending/${id}`}>
        <p>{productName}</p>
        </Link>
        {/* {haveAccessToken ? (
          <div className="quantity_wrap mb-2">
            <label>Quantity</label>
            <div className="qty-up-down-s1-with-rgMenuAction">
              <div className="flex items-center gap-x-4">
                <Button
                  type="button"
                  variant="outline"
                  className="relative hover:shadow-sm"
                  onClick={() => {
                    setQuantity(quantity - 1);
                    
                  }}
                  disabled={quantity === 0}
                >
                  <Image
                    src="/images/upDownBtn-minus.svg"
                    alt="minus-icon"
                    fill
                    className="p-3"
                  />
                </Button>
                <p className="!mb-0 !text-black">{quantity}</p>
                <Button
                  type="button"
                  variant="outline"
                  className="relative hover:shadow-sm"
                  onClick={() => {
                    setQuantity(quantity + 1);
                   
                  }}
                >
                  <Image
                    src="/images/upDownBtn-plus.svg"
                    alt="plus-icon"
                    fill
                    className="p-3"
                  />
                </Button>
               
              </div>
            </div>
          </div>
        ) : null} */}

        {/* {haveAccessToken ? (
          <div className="cart_button">
            {productType === 'F' ? (
              <button
                type="button"
                className="flex items-center justify-evenly gap-x-2 rounded-sm border border-[#E8E8E8] p-[10px] text-[15px] font-bold leading-5 text-[#7F818D]"
                disabled={true}
                // onClick={() => {
                //   onAdd(quantity, id, "add");
                // }}
              >
                <FaCircleCheck color="#00C48C" />
                Added to Factories
              </button>
            ) : (
              <button
                type="button"
                className="add_to_cart_button"
                // disabled={quantity === 0}
                onClick={() => {
                  onAdd(id);
                }}
              >
                Add To Factories
              </button>
            )}
          </div>
        ) : null} */}
      </div>
    </div>
  );
};

export default FactoriesProductCard;
