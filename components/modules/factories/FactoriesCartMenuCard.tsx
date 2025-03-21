import { Button } from "@/components/ui/button";
// import { useCartStore } from "@/lib/rfqStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import validator from "validator";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { useAddFactoriesProduct, useUpdateFactoriesCartWithLogin } from "@/apis/queries/rfq.queries";
import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "next-intl";

type FactoriesCartMenuCardProps = {
  factoriesCartId: number;
  customizeProductId: number;
  productId: number;
  productName: string;
  productQuantity: number;
  productImages: {
    image: string;
  }[];
  customizeProductImages: {
    link: string;
  }[];
  onRemove: (args0: number) => void;
  offerPrice: number;
  note: string;
};

const FactoriesCartMenuCard: React.FC<FactoriesCartMenuCardProps> = ({
  factoriesCartId,
  customizeProductId,
  productId,
  productName,
  productQuantity,
  productImages,
  customizeProductImages,
  onRemove,
  offerPrice,
  note,
}) => {
  const t = useTranslations();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const updateFactoriesCartWithLogin = useUpdateFactoriesCartWithLogin();
  const addFactoriesProduct = useAddFactoriesProduct();

  useEffect(() => {
    setQuantity(productQuantity);
  }, [productQuantity]);

  const handleAddToCart = async (
    quantity: number,
    action: "add" | "remove",
    productId: number,
    customizeProductId: number,
  ) => {
    const response = await updateFactoriesCartWithLogin.mutateAsync({
      productId,
      quantity,
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
  };

  return (
    <div className="rfq_cart_wrap !pb-0">
      <div className="rfq_cart_wrap_image relative">
      {customizeProductImages?.[0]?.link
             ? 
             <Image
             src={
                customizeProductImages?.[0]?.link &&
               validator.isURL(customizeProductImages?.[0]?.link)
                 ? customizeProductImages[0].link
                 : PlaceholderImage
             }
             alt="pro-6"
             fill
           /> 
            : 
            <Image
            src={
              productImages?.[0]?.image &&
              validator.isURL(productImages?.[0]?.image)
                ? productImages[0].image
                : PlaceholderImage
            }
            alt="pro-6"
            fill
          />
            }
      </div>
      <div className="rfq_cart_wrap_content">
        <div className="rfq_cart_wrap_content_top">
          <p>{productName}</p>
        </div>
        <div className="rfq_cart_wrap_content_top_bottom flex-wrap gap-3">
          <div className="qty-up-down-s1-with-rgMenuAction">
            <div className="flex items-center gap-x-4">
              <Button
                variant="outline"
                className="relative hover:shadow-sm"
                onClick={() => {
                  if (quantity > 0) {
                    const newQuantity = quantity - 1;
                    setQuantity(newQuantity);
                    handleAddToCart(newQuantity, "remove", productId, customizeProductId);
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
              <p className="!text-black">{quantity}</p>
              <Button
                variant="outline"
                className="relative hover:shadow-sm"
                onClick={() => {
                  const newQuantity = quantity + 1;
                  setQuantity(newQuantity);
                  handleAddToCart(newQuantity, "add", productId, customizeProductId);
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
          <Button
            variant="link"
            className="relative hover:shadow-sm"
            onClick={() => {
              onRemove(factoriesCartId);
            }}
          >
            {t("remove")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FactoriesCartMenuCard;
