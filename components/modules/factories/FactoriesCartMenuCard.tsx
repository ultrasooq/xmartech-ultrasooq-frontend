import { Button } from "@/components/ui/button";
// import { useCartStore } from "@/lib/rfqStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import validator from "validator";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { useUpdateFactoriesCartWithLogin } from "@/apis/queries/rfq.queries";
import { useToast } from "@/components/ui/use-toast";

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
//   onAdd: (
//     args0: number,
//     args1: number,
//     args2: "add" | "remove",
//     args3: number,
//     args4: string,
//   ) => void;
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
//   onAdd,
  onRemove,
  offerPrice,
  note,
}) => {
  const { toast } = useToast();
  // const cart = useCartStore();
  const [quantity, setQuantity] = useState(1);

   const updateFactoriesCartWithLogin = useUpdateFactoriesCartWithLogin();

  useEffect(() => {
    setQuantity(productQuantity);
  }, [productQuantity]);

  const handleAddToCart = async (
    quantity: number,
    productId: number,
    customizeProductId: number,
    // offerPrice: number,
    // note: string,
  ) => {
    const response = await updateFactoriesCartWithLogin.mutateAsync({
      productId,
      quantity,
      customizeProductId
      // offerPrice,
      // note,
    });

    if (response.status) {
      toast({
        title: "Item added to cart",
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
          {/* <div className="pen_gray_icon">
            <img src="images/pen-gray-icon.png" alt="pen-gray-icon" />
          </div> */}
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
                    handleAddToCart(newQuantity, productId, customizeProductId);
                  }
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
                  const newQuantity = quantity + 1;
                  setQuantity(newQuantity);
                  handleAddToCart(newQuantity, productId, customizeProductId);
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
              // cart.deleteCartItem(rfqProductId);
            }}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FactoriesCartMenuCard;
