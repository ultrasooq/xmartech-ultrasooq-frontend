import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import validator from "validator";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { useAddFactoriesProduct, useUpdateFactoriesCartWithLogin } from "@/apis/queries/rfq.queries";
import { FaCircleCheck } from "react-icons/fa6";
import ShoppingIcon from "@/components/icons/ShoppingIcon";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
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
  customizeProductId?: number;
  onAdd: (args0: number) => void;
  onToCart: () => void;
  onWishlist: () => void;
  isCreatedByMe: boolean;
  isAddedToCart: boolean;
  inWishlist?: boolean;
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
  customizeProductId,
  onAdd,
  onToCart,
  onWishlist,
  isCreatedByMe,
  isAddedToCart,
  inWishlist,
  haveAccessToken,
}) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(productQuantity || 0);
  }, [productQuantity]);

  const updateFactoriesCartWithLogin = useUpdateFactoriesCartWithLogin();
  const addFactoriesProduct = useAddFactoriesProduct();

  const handleAddToCart = async (
    newQuantity: number,
    action: "add" | "remove",
    productId: number,
    customizeProductId?: number,
  ) => {
    if (customizeProductId) {
      const response = await updateFactoriesCartWithLogin.mutateAsync({
        productId,
        quantity: newQuantity,
        customizeProductId
      });

      if (response.status) {
        toast({
          title: `Item ${action == "add" ? "added to" : "removed from"} cart`,
          description: "Check your cart for more details",
          variant: "success",
        });
      } else {
        toast({
          title: "Oops! Something went wrong",
          description: response.message,
          variant: "danger",
        });
      }

    } else {
      if (action == "add" && onAdd) onAdd(id);
    }
  };

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
      <div className="mb-3 flex flex-row items-center justify-center gap-x-3">
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full p-0 shadow-md"
          onClick={() => handleAddToCart(quantity + 1, "add", id, customizeProductId)}
        >
          <ShoppingIcon />
        </Button>
        <Link
          href={`/trending/${id}`}
          className="relative flex h-8 w-8 items-center justify-center rounded-full !shadow-md"
        >
          <FiEye size={18} />
        </Link>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full p-0 shadow-md"
          onClick={onWishlist}
        >
          {inWishlist ? (
            <FaHeart color="red" size={16} />
          ) : (
            <FaRegHeart size={16} />
          )}
        </Button>
      </div>
      <div className="product_list_content">
        <Link href={`/trending/${id}`}>
          <p>{productName}</p>
        </Link>
      </div>

      <div className="quantity_wrap mb-2">
        <label>Quantity</label>
        <div className="qty-up-down-s1-with-rgMenuAction">
          <div className="flex items-center gap-x-3 md:gap-x-4">
            <Button
              type="button"
              variant="outline"
              className="relative hover:shadow-sm"
              onClick={() => {
                const newQuantity = quantity - 1;
                setQuantity(newQuantity);
                handleAddToCart(newQuantity, "remove", id, customizeProductId);
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
                const newQuantity = quantity + 1;
                setQuantity(newQuantity);
                handleAddToCart(newQuantity, "add", id, customizeProductId);
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

      <div className="cart_button">
        {quantity > 0 && <button
          type="button"
          className="flex items-center justify-evenly gap-x-2 rounded-sm border border-[#E8E8E8] p-[10px] text-[15px] font-bold leading-5 text-[#7F818D]"
        >
          <FaCircleCheck color="#00C48C" />
          Added to Cart
        </button>}
        {quantity == 0 && <button
          type="button"
          className="add_to_cart_button"
          onClick={() => {
            if (onAdd) onAdd(id);
          }}
        >
          Add To Cart
        </button>}
      </div>
    </div>
  );
};

export default FactoriesProductCard;
