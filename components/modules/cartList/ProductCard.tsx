import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MinusIcon from "@/public/images/upDownBtn-minus.svg";
import PlusIcon from "@/public/images/upDownBtn-plus.svg";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { useTranslations } from "next-intl";
import { toast } from "@/components/ui/use-toast";
import {
  useUpdateCartByDevice,
  useUpdateCartWithLogin,
} from "@/apis/queries/cart.queries";
import { getOrCreateDeviceId } from "@/utils/helper";
import { useAuth } from "@/context/AuthContext";

type ProductCardProps = {
  cartId: number;
  productId: number;
  productPriceId: number;
  productName: string;
  offerPrice: string;
  productQuantity: number;
  productImages: { id: number; image: string }[];
  onRemove: (args0: number) => void;
  onWishlist: (args0: number) => void;
  haveAccessToken: boolean;
  consumerDiscount: number;
  minQuantity?: number;
  maxQuantity?: number;
};

const ProductCard: React.FC<ProductCardProps> = ({
  cartId,
  productId,
  productPriceId,
  productName,
  offerPrice,
  productQuantity,
  productImages,
  onRemove,
  onWishlist,
  haveAccessToken,
  consumerDiscount,
  minQuantity,
  maxQuantity,
}) => {
  const t = useTranslations();
  const { langDir, currency } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const deviceId = getOrCreateDeviceId() || "";
  const updateCartWithLogin = useUpdateCartWithLogin();
  const updateCartByDevice = useUpdateCartByDevice();

  const calculateDiscountedPrice = () => {
    const price = offerPrice ? Number(offerPrice) : 0;
    const discount = consumerDiscount || 0;
    return Number((price - (price * discount) / 100).toFixed(2));
  };

  useEffect(() => {
    setQuantity(productQuantity);
  }, [productQuantity]);

  const handleAddToCart = async (
    newQuantity: number,
    actionType: "add" | "remove",
  ) => {
    if (actionType == "add" && minQuantity && minQuantity > newQuantity) {
      toast({
        description: t("min_quantity_must_be_n", { n: minQuantity }),
        variant: "danger",
      });
      return;
    }

    if (maxQuantity && maxQuantity < newQuantity) {
      toast({
        description: t("max_quantity_must_be_n", { n: maxQuantity }),
        variant: "danger",
      });
      setQuantity(maxQuantity);
      return;
    }

    if (actionType == "remove" && minQuantity && minQuantity > newQuantity) {
      newQuantity = 0;
    }

    if (haveAccessToken) {
      if (!productPriceId) {
        toast({
          title: t("something_went_wrong"),
          description: t("product_price_id_not_found"),
          variant: "danger",
        });
        return;
      }

      if (actionType == "add" && quantity == 0) {
        newQuantity = minQuantity ?? 1;
      }

      const response = await updateCartWithLogin.mutateAsync({
        productPriceId,
        quantity: newQuantity,
      });

      if (response.status) {
        setQuantity(newQuantity);
        toast({
          title:
            actionType == "add"
              ? t("item_added_to_cart")
              : t("item_removed_from_cart"),
          description: t("check_your_cart_for_more_details"),
          variant: "success",
        });
        return response.status;
      }
    } else {
      if (!productPriceId) {
        toast({
          title: t("something_went_wrong"),
          description: t("product_price_id_not_found"),
          variant: "danger",
        });
        return;
      }
      const response = await updateCartByDevice.mutateAsync({
        productPriceId,
        quantity,
        deviceId,
      });
      if (response.status) {
        setQuantity(quantity);
        toast({
          title:
            actionType == "add"
              ? t("item_added_to_cart")
              : t("item_removed_from_cart"),
          description: t("check_your_cart_for_more_details"),
          variant: "success",
        });
        return response.status;
      }
    }
  };

  const handleQuantityChange = () => {
    if (quantity == 0) {
      if (productQuantity != 0) {
        toast({
          description: t("quantity_can_not_be_0"),
          variant: "danger",
        });
      }
      setQuantity(productQuantity);
      return;
    }

    if (minQuantity && minQuantity > quantity) {
      toast({
        description: t("min_quantity_must_be_n", { n: minQuantity }),
        variant: "danger",
      });
      setQuantity(productQuantity);
      return;
    }

    if (maxQuantity && maxQuantity < quantity) {
      toast({
        description: t("max_quantity_must_be_n", { n: maxQuantity }),
        variant: "danger",
      });
      setQuantity(productQuantity);
      return;
    }

    const action = quantity > productQuantity ? "add" : "remove";
    if (quantity != productQuantity) handleAddToCart(quantity, action);
  };

  return (
    <div className="cart-item-list-col">
      <figure>
        <div className="image-container">
          <Image
            src={productImages?.[0]?.image || PlaceholderImage}
            alt="product-image"
            height={108}
            width={108}
          />
        </div>
        <figcaption>
          <h4 className="!text-lg !font-bold">{productName}</h4>
          <div className="custom-form-group">
            <label dir={langDir}>{t("quantity")}</label>
            <div className="qty-up-down-s1-with-rgMenuAction">
              <div className="flex items-center gap-x-1">
                <Button
                  variant="outline"
                  className="relative border border-solid border-gray-300 hover:shadow-sm"
                  onClick={() => {
                    setQuantity(quantity - 1);
                    handleAddToCart(quantity - 1, "remove");
                  }}
                  disabled={
                    quantity === 0 ||
                    updateCartByDevice?.isPending ||
                    updateCartWithLogin?.isPending
                  }
                >
                  <Image
                    src={MinusIcon}
                    alt="minus-icon"
                    fill
                    className="p-3"
                  />
                </Button>
                <input
                  type="text"
                  value={quantity}
                  className="h-auto w-[35px] border-none bg-transparent text-center focus:border-none focus:outline-none"
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setQuantity(isNaN(value) ? productQuantity : value);
                  }}
                  onBlur={handleQuantityChange}
                />
                <Button
                  variant="outline"
                  className="relative border border-solid border-gray-300 hover:shadow-sm"
                  onClick={() => {
                    setQuantity(quantity + 1);
                    handleAddToCart(quantity + 1, "add");
                  }}
                  disabled={
                    updateCartByDevice?.isPending ||
                    updateCartWithLogin?.isPending
                  }
                >
                  <Image src={PlusIcon} alt="plus-icon" fill className="p-3" />
                </Button>
              </div>
              <ul className="rgMenuAction-lists">
                <li>
                  <Button
                    variant="ghost"
                    className="px-2 underline"
                    onClick={() => onRemove(cartId)}
                    dir={langDir}
                  >
                    {t("remove")}
                  </Button>
                </li>
                {haveAccessToken ? (
                  <li>
                    <Button
                      variant="ghost"
                      className="px-2 underline"
                      onClick={() => onWishlist(productId)}
                      dir={langDir}
                    >
                      {t("move_to_wishlist")}
                    </Button>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </figcaption>
      </figure>
      <div className="right-info">
        <h6 dir={langDir}>{t("price")}</h6>
        <h5 dir={langDir}>
          {currency.symbol}
          {quantity * calculateDiscountedPrice()}
        </h5>
      </div>
    </div>
  );
};

export default ProductCard;
