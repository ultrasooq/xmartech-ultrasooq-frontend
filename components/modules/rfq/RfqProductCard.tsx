import { Button } from "@/components/ui/button";
// import { useCartStore } from "@/lib/rfqStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import validator from "validator";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { FaCircleCheck } from "react-icons/fa6";

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
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(productQuantity || 1);
  }, [productQuantity]);

  return (
    <div className="product_list_part">
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
      <div className="product_list_content">
        <p>{productName}</p>
        {haveAccessToken ? (
          <div className="quantity_wrap mb-2">
            <label>Quantity</label>
            <div className="qty-up-down-s1-with-rgMenuAction">
              <div className="flex items-center gap-x-4">
                <Button
                  variant="outline"
                  className="relative hover:shadow-sm"
                  onClick={() => {
                    setQuantity(quantity - 1);
                    onAdd(quantity - 1, id, "remove");
                    // cart.updateCart({
                    //   quantity: quantity - 1,
                    //   rfqProductId: id,
                    // });
                  }}
                  disabled={quantity === 1}
                >
                  <Image
                    src="/images/upDownBtn-minus.svg"
                    alt="minus-icon"
                    fill
                    className="p-3"
                  />
                </Button>
                <p className="!text-black">{quantity}</p>
                <Button
                  variant="outline"
                  className="relative hover:shadow-sm"
                  onClick={() => {
                    setQuantity(quantity + 1);
                    onAdd(quantity + 1, id, "add");
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
                <Button variant="ghost" onClick={() => onEdit(id)}>
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
                disabled
              >
                <FaCircleCheck color="#00C48C" />
                Added to RFQ Cart
              </button>
            ) : (
              <button
                type="button"
                className="add_to_cart_button"
                onClick={() => {
                  onAdd(1, id, "add");
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
