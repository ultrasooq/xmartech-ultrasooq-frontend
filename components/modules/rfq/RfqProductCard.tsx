import { Button } from "@/components/ui/button";
// import { useCartStore } from "@/lib/rfqStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import validator from "validator";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { FaCircleCheck } from "react-icons/fa6";
// import Link from "next/link";

type RfqProductCardProps = {
  id: number;
  productType: "R" | "P";
  productName: string;
  productNote: string;
  productStatus: string;
  productImages: {
    image: string;
  }[];
  productQuantity: number;
  onAdd: (args0: number, args1: number, args2: "add" | "remove") => void;
  onToCart: () => void;
  onEdit: (args0: number) => void;
  isCreatedByMe: boolean;
  isAddedToCart: boolean;
  haveAccessToken: boolean;
};

const RfqProductCard: React.FC<RfqProductCardProps> = ({
  id,
  productType,
  productName,
  productNote,
  productStatus,
  productImages,
  productQuantity,
  onAdd,
  onToCart,
  onEdit,
  isCreatedByMe,
  isAddedToCart,
  haveAccessToken,
}) => {
  const router = useRouter();
  // const cart = useCartStore();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(productQuantity || 0);
  }, [productQuantity]);

  return (
    <div className="product_list_part">
      {/* FIXME:  link disabled due to TYPE R product. error in find one due to no price */}
      {/* <Link href={`/trending/${id}`}> */}
      <div className="product_list_image relative border border-gray-300">
        <Image
          alt="pro-5"
          src={
            productImages?.[0]?.image &&
            validator.isURL(productImages?.[0]?.image)
              ? productImages[0].image
              : PlaceholderImage
          }
          fill
        />
      </div>
      {/* </Link> */}
      <div className="product_list_content">
        {/* <Link href={`/trending/${id}`}> */}
        <p>{productName}</p>
        {/* </Link> */}
        {haveAccessToken ? (
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
                    // onAdd(quantity - 1, id, "remove");
                    // cart.updateCart({
                    //   quantity: quantity - 1,
                    //   rfqProductId: id,
                    // });
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
                    // onAdd(quantity + 1, id, "add");
                    // cart.updateCart({
                    //   quantity: quantity + 1,
                    //   rfqProductId: id,
                    // });
                  }}
                >
                  <Image
                    src="/images/upDownBtn-plus.svg"
                    alt="plus-icon"
                    fill
                    className="p-3"
                  />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onEdit(id)}
                >
                  <div className="relative h-6 w-6">
                    <Image
                      src="/images/edit-rfq.png"
                      alt="edit-rfq-icon"
                      fill
                    />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        {haveAccessToken ? (
          <div className="cart_button">
            {isAddedToCart ? (
              <button
                type="button"
                className="flex items-center justify-evenly gap-x-2 rounded-sm border border-[#E8E8E8] p-[10px] text-[15px] font-bold leading-5 text-[#7F818D]"
                disabled={quantity < 0}
                onClick={() => {
                  onAdd(quantity, id, "add");
                  // console.log(quantity, id, "add");
                  // cart.updateCart({ quantity: 1, rfqProductId: id });
                }}
              >
                <FaCircleCheck color="#00C48C" />
                Added to RFQ Cart
              </button>
            ) : (
              <button
                type="button"
                className="add_to_cart_button"
                disabled={quantity === 0}
                onClick={() => {
                  onAdd(quantity, id, "add");
                  // console.log(quantity, id, "add");
                  // cart.updateCart({ quantity: 1, rfqProductId: id });
                }}
              >
                Add To RFQ Cart
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default RfqProductCard;
