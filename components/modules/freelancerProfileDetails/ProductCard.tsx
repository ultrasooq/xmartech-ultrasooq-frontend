import { TrendingProduct } from "@/utils/types/common.types";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import validator from "validator";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PlaceholderImage from "@/public/images/product-placeholder.png";
// import ShoppingIcon from "@/public/images/shopping-icon.svg";
// import EyeIcon from "@/public/images/eye-icon.svg";
// import CompareIcon from "@/public/images/compare-icon.svg";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import ShoppingIcon from "@/components/icons/ShoppingIcon";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { FaCircleCheck } from "react-icons/fa6";
import { toast } from "@/components/ui/use-toast";
import { useUpdateCartWithLogin } from "@/apis/queries/cart.queries";

type ProductCardProps = {
  item: TrendingProduct;
  onWishlist: () => void;
  inWishlist?: boolean;
  haveAccessToken: boolean;
  isSeller?: boolean;
  isAddedToCart?: boolean;
  cartQuantity?: number;
};

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  onWishlist,
  inWishlist,
  haveAccessToken,
  isSeller,
  isAddedToCart,
  cartQuantity = 0,
}) => {
  const t = useTranslations();
  const { langDir, currency } = useAuth();

  const [quantity, setQuantity] = useState<number>(cartQuantity);
  const updateCartWithLogin = useUpdateCartWithLogin();

  const calculateDiscountedPrice = () => {
    const price = item.productProductPrice
      ? Number(item.productProductPrice)
      : 0;
    const discount = item.consumerDiscount || 0;
    return price - (price * discount) / 100;
  };

  const calculateAvgRating = useMemo(() => {
    const totalRating = item.productReview?.reduce(
      (acc: number, item: { rating: number }) => {
        return acc + item.rating;
      },
      0,
    );

    const result = totalRating / item.productReview?.length;
    return !isNaN(result) ? Math.floor(result) : 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.productReview?.length]);

  const calculateRatings = useMemo(
    () => (rating: number) => {
      const stars: Array<React.ReactNode> = [];
      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          stars.push(<FaStar key={i} color="#FFC107" size={20} />);
        } else {
          stars.push(<FaRegStar key={i} color="#FFC107" size={20} />);
        }
      }
      return stars;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item.productReview?.length],
  );

  const handleAddToCart = async (
    newQuantity: number,
    actionType: "add" | "remove",
  ) => {
    const minQuantity = item.productPrices?.length ? item.productPrices[0]?.minQuantityPerCustomer : null;
    const maxQuantity = item.productPrices?.length ? item.productPrices[0]?.maxQuantityPerCustomer : null;

    if (actionType == 'add' && newQuantity == -1) {
      newQuantity = minQuantity && quantity < minQuantity ? minQuantity : quantity + 1;
    }

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
      return;
    }

    if (actionType == "remove" && minQuantity && minQuantity > newQuantity) {
      newQuantity = 0;
    }

    if (!item?.productProductPriceId) {
      toast({
        title: t("something_went_wrong"),
        description: t("product_price_id_not_found"),
        variant: "danger",
      });
      return;
    }
    const response = await updateCartWithLogin.mutateAsync({
      productPriceId: item?.productProductPriceId,
      quantity: newQuantity,
    });

    if (response.status) {
      if (actionType === "add" && newQuantity === 0) {
        setQuantity(1);
      } else {
        setQuantity(newQuantity);
      }
      toast({
        title: actionType == "add" ? t("item_added_to_cart") : t("item_removed_from_cart"),
        description: t("check_your_cart_for_more_details"),
        variant: "success"
      });
      return response.status;

    } else {
      toast({
        title: t("something_went_wrong"),
        description: response.message,
        variant: "danger",
      });
    }
    
  }

  return (
    <div
      className={cn(
        item.status === "INACTIVE" ? "opacity-50" : "",
        "product-list-s1-col border-[1px] !border-transparent border-slate-300 p-3 hover:!border-slate-200 hover:bg-slate-100",
      )}
    >
      <div className="product-list-s1-box relative cursor-pointer ">
        <Link href={`/trending/${item.id}`}>
          {item?.askForPrice !== "true" ? (
            item.consumerDiscount ? (
              <div className="absolute right-2.5 top-2.5 z-10 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                <span>{item.consumerDiscount || 0}%</span>
              </div>
            ) : null
          ) : null}
          <div className="relative mx-auto mb-4 h-36 w-36">
            <Image
              src={
                item?.productImage && validator.isURL(item.productImage)
                  ? item.productImage
                  : PlaceholderImage
              }
              alt="product-image"
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              className="object-contain"
              blurDataURL="/images/product-placeholder.png"
              placeholder="blur"
            />
          </div>
        </Link>

        {haveAccessToken ? (
          <div className="mb-3 flex flex-row items-center justify-center gap-x-3">
            {item?.askForPrice !== "true" ? (
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full p-0 shadow-md"
                onClick={() => handleAddToCart(-1, "add")}
                disabled={item.status === "INACTIVE"}
              >
                <ShoppingIcon />
              </Button>
            ) : null}

            <Link
              href={`/trending/${item.id}`}
              className="relative flex h-8 w-8 items-center justify-center rounded-full !shadow-md"
            >
              <FiEye size={18} />
            </Link>

            {!isSeller ? (
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full p-0 shadow-md"
                onClick={onWishlist}
                disabled={item.status === "INACTIVE"}
              >
                {inWishlist ? (
                  <FaHeart color="red" size={16} />
                ) : (
                  <FaRegHeart size={16} />
                )}
              </Button>
            ) : null}

            {/* <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full p-0 shadow-md"
              onClick={() => {
                console.log("shared");
              }}
            >
              <ShareIcon />
            </Button> */}
          </div>
        ) : null}

        <Link href={`/trending/${item.id}`}>
          <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
            <h4 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
              {item.productName}
            </h4>
            <p title={item.shortDescription} className="truncate">
              {item.shortDescription}
            </p>
            <div className="my-1 flex">
              {calculateRatings(calculateAvgRating)}
              <span className="ml-2">{item.productReview?.length}</span>
            </div>
          </div>
        </Link>
      </div>

      <div>
        {item?.askForPrice === "true" ? (
          <Link href={`/seller-rfq-request?product_id=${item?.id}`}>
            <button
              type="button"
              className="inline-block w-full rounded-sm bg-color-yellow px-3 py-1 text-sm font-bold text-white"
              dir={langDir}
            >
              {t("ask_vendor_for_price")}
            </button>
          </Link>
        ) : (
          <Link href={`/trending/${item.id}`}>
            <h5 className="py-1 text-[#1D77D1]">
              {currency.symbol}{calculateDiscountedPrice()}{" "}
              <span className="text-gray-500 !line-through">
                {currency.symbol}{item.productProductPrice}
              </span>
            </h5>
          </Link>
        )}
      </div>

      <div className="quantity_wrap mb-2">
        <label dir={langDir}>{t("quantity")}</label>
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
              disabled={quantity === 0 || item.status === "INACTIVE"}
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
                  const minQuantity = item.productPrices?.length ? item.productPrices[0]?.minQuantityPerCustomer : null;
                  if (!minQuantity || minQuantity === 0 || (minQuantity && quantity + 1 == minQuantity)) {
                    handleAddToCart(quantity + 1, "add");
                  }
                  setQuantity(quantity + 1);
                }
              }}
              disabled={item.status === "INACTIVE"}
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
        {isAddedToCart && <button
          type="button"
          className="flex items-center justify-evenly gap-x-2 rounded-sm border border-[#E8E8E8] p-[10px] text-[15px] font-bold leading-5 text-[#7F818D]"
          disabled={false}
          dir={langDir}
        >
          <FaCircleCheck color="#00C48C" />
          {t("added_to_cart")}
        </button>}
        {!isAddedToCart && <button
          type="button"
          className="add_to_cart_button"
          onClick={() => handleAddToCart(quantity, "add")}
          disabled={quantity == 0 || item.status === "INACTIVE"}
          dir={langDir}
        >
          {t("add_to_cart")}
        </button>}
      </div>
    </div>
  );
};

export default ProductCard;
