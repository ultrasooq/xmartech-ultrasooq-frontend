import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import validator from "validator";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { FaCircleCheck } from "react-icons/fa6";
import ShoppingIcon from "@/components/icons/ShoppingIcon";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { useUpdateCartWithLogin } from "@/apis/queries/cart.queries";
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
  onAdd: () => void;
  onWishlist: () => void;
  isCreatedByMe: boolean;
  isAddedToCart: boolean;
  isAddedToFactoryCart: boolean;
  inWishlist?: boolean;
  haveAccessToken: boolean;
  productPrices?: any[];
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
  onWishlist,
  isCreatedByMe,
  isAddedToCart,
  isAddedToFactoryCart,
  inWishlist,
  haveAccessToken,
  productPrices,
}) => {
  const t = useTranslations();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(productQuantity || 0);
  }, [productQuantity]);

  const updateCartWithLogin = useUpdateCartWithLogin();

  const handleAddToCart = async (
    quantity: number,
    action: "add" | "remove",
  ) => {
    const minQuantity = productPrices?.length ? productPrices[0]?.minQuantityPerCustomer : null;
    if (action == "add" && minQuantity && minQuantity > quantity) {
      toast({
        description: t("min_quantity_must_be_n", { n: minQuantity }),
        variant: "danger",
      })
      return;
    }

    const maxQuantity = productPrices?.length ? productPrices[0]?.maxQuantityPerCustomer : null; 
    if (maxQuantity && maxQuantity < quantity) {
      toast({
        description: t("max_quantity_must_be_n", { n: maxQuantity }),
        variant: "danger",
      })
      return;
    }

    if (action == "remove" && minQuantity && minQuantity > quantity) {
      quantity = 0;
    }

    if (haveAccessToken) {
      if (!productPrices?.length || !productPrices?.[0]?.id) {
        toast({
          title: t("something_went_wrong"),
          description: t("product_price_id_not_found"),
          variant: "danger",
        });
        return;
      }
      const response = await updateCartWithLogin.mutateAsync({
        productPriceId: productPrices?.[0]?.id,
        quantity,
      });

      if (response.status) {
        if (action === "add" && quantity === 0) {
          setQuantity(1);
        } else {
          setQuantity(quantity);
        }
        toast({
          title: action == "add" ? t("item_added_to_cart") : t("item_removed_from_cart"),
          description: t("check_your_cart_for_more_details"),
          variant: "success",
        });
        return response.status;
      }
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
          onClick={() => handleAddToCart(quantity + 1, "add")}
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
        <label>{t("quantity")}</label>
        <div className="qty-up-down-s1-with-rgMenuAction">
          <div className="flex items-center gap-x-3 md:gap-x-4">
            <Button
              type="button"
              variant="outline"
              className="relative hover:shadow-sm"
              onClick={() => {
                if (isAddedToCart) {
                  handleAddToCart(quantity - 1, "remove");
                } else {
                  setQuantity(quantity - 1);
                }
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
                if (isAddedToCart) {
                  handleAddToCart(quantity + 1, "add");
                } else {
                  setQuantity(quantity + 1);
                }
              }}
            >
              <Image
                src="/images/upDownBtn-plus.svg"
                alt="plus-icon"
                fill
                className="p-3"
              />
            </Button>
            {!isAddedToFactoryCart && <Button
              type="button"
              variant="ghost"
              onClick={onAdd}
            >
              <div className="relative h-6 w-6">
                <Image
                  src="/images/edit-rfq.png"
                  alt="edit-rfq-icon"
                  fill
                />
              </div>
            </Button>}
          </div>
        </div>
      </div>

      <div className="cart_button">
        {isAddedToCart && <button
          type="button"
          className="flex items-center justify-evenly gap-x-2 rounded-sm border border-[#E8E8E8] p-[10px] text-[15px] font-bold leading-5 text-[#7F818D]"
        >
          <FaCircleCheck color="#00C48C" />
          {t("added_to_cart")}
        </button>}
        {!isAddedToCart && <button
          type="button"
          className="add_to_cart_button"
          onClick={() => handleAddToCart(quantity, "add")}
          disabled={quantity == 0}
        >
          {t("add_to_cart")}
        </button>}
      </div>
    </div>
  );
};

export default FactoriesProductCard;
