import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import MinusIcon from "@/public/images/upDownBtn-minus.svg";
import PlusIcon from "@/public/images/upDownBtn-plus.svg";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { useTranslations } from "next-intl";
import { toast } from "@/components/ui/use-toast";
import {
  useDeleteCartItem,
  useUpdateCartByDevice,
  useUpdateCartWithLogin,
  useUpdateCartWithService,
} from "@/apis/queries/cart.queries";
import { getOrCreateDeviceId } from "@/utils/helper";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { IoCloseSharp } from "react-icons/io5";
import { useClickOutside } from "use-events";
import { Trash2 } from "lucide-react";

type ProductCardProps = {
  cartId: number;
  productId: number;
  productPriceId: number;
  productName: string;
  offerPrice: string;
  productQuantity: number;
  productVariant: any;
  productImages: { id: number; image: string }[];
  onRemove: (args0: number) => void;
  onWishlist: (args0: number) => void;
  haveAccessToken: boolean;
  consumerDiscount: number;
  consumerDiscountType?: string;
  vendorDiscount: number;
  vendorDiscountType?: string;
  minQuantity?: number;
  maxQuantity?: number;
  relatedCart?: any;
};

const ProductCard: React.FC<ProductCardProps> = ({
  cartId,
  productId,
  productPriceId,
  productName,
  offerPrice,
  productQuantity,
  productVariant,
  productImages,
  onRemove,
  onWishlist,
  haveAccessToken,
  consumerDiscount,
  consumerDiscountType,
  vendorDiscount,
  vendorDiscountType,
  minQuantity,
  maxQuantity,
  relatedCart
}) => {
  const t = useTranslations();
  const { user, langDir, currency } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedProductVariant, setSelectedProductVariant] = useState<any>();
  const deviceId = getOrCreateDeviceId() || "";
  const updateCartWithLogin = useUpdateCartWithLogin();
  const updateCartWithService = useUpdateCartWithService();
  const updateCartByDevice = useUpdateCartByDevice();
  const deleteCartItem = useDeleteCartItem();

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);
  const handleConfirmDialog = () => setIsConfirmDialogOpen(!isConfirmDialogOpen);
  const confirmDialogRef = useRef(null);
  const [isClickedOutsideConfirmDialog] = useClickOutside([confirmDialogRef], (event) => { onCancelRemove() });

  const calculateDiscountedPrice = () => {
    const price = offerPrice ? Number(offerPrice) : 0;
    
    // Always use consumer discount for cart display - this is what customers see
    const discount = consumerDiscount || 0;
    const discountType = consumerDiscountType || '';
    
    console.log('Cart ProductCard - Simple Discount Logic:', {
      productName,
      price,
      consumerDiscount,
      consumerDiscountType,
      discount,
      discountType
    });
    
    // Apply discount calculation
    if (discount > 0 && discountType) {
      if (discountType === 'PERCENTAGE') {
        const discountedPrice = Number((price - (price * discount) / 100).toFixed(2));
        console.log('✅ Percentage discount applied:', { originalPrice: price, discount, discountedPrice });
        return discountedPrice;
      } else if (discountType === 'FIXED' || discountType === 'FLAT') {
        const discountedPrice = Number((price - discount).toFixed(2));
        console.log('✅ Fixed discount applied:', { originalPrice: price, discount, discountedPrice });
        return discountedPrice;
      }
    }
    
    // If no discount, return original price
    console.log('❌ No discount applied, returning original price:', { originalPrice: price, discount, discountType });
    return price;
  };

  useEffect(() => {
    setQuantity(productQuantity);
  }, [productQuantity]);

  useEffect(() => {
    setSelectedProductVariant(productVariant);
  }, [productVariant]);

  const handleAddToCart = async (
    newQuantity: number,
    actionType: "add" | "remove",
  ) => {
    if (minQuantity && minQuantity > newQuantity) {
      toast({
        description: t("min_quantity_must_be_n", { n: minQuantity }),
        variant: "danger",
      });
      setQuantity(productQuantity);
      return;
    }

    if (maxQuantity && maxQuantity < newQuantity) {
      toast({
        description: t("max_quantity_must_be_n", { n: maxQuantity }),
        variant: "danger",
      });
      setQuantity(productQuantity);
      return;
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
        productVariant: selectedProductVariant
      });

      if (response.status) {
        setQuantity(newQuantity);
        toast({
          title: actionType == "add" ? t("item_added_to_cart") : t("item_removed_from_cart"),
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
        quantity: newQuantity,
        deviceId,
        productVariant: selectedProductVariant
      });
      if (response.status) {
        setQuantity(quantity);
        toast({
          title: actionType == "add" ? t("item_added_to_cart") : t("item_removed_from_cart"),
          description: t("check_your_cart_for_more_details"),
          variant: "success",
        });
        return response.status;
      }
    }
  };

  const handleQuantityChange = () => {
    if (quantity == 0 && productQuantity != 0) {
      toast({
        description: t("quantity_can_not_be_0"),
        variant: "danger",
      });
      setQuantity(productQuantity);
      return;
    }

    const action = quantity > productQuantity ? "add" : "remove";
    if (quantity != productQuantity) handleAddToCart(quantity, action);
  };

  const onConfirmRemove = () => {
    if (cartId) onRemove(cartId);
    setIsConfirmDialogOpen(false);
  };

  const onCancelRemove = () => {
    setQuantity(productQuantity);
    setIsConfirmDialogOpen(false);
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="relative w-28 h-28 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={productImages?.[0]?.image || PlaceholderImage}
            alt="product-image"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-lg font-semibold text-gray-900 truncate" dir={langDir}>
          {productName}
        </h4>
        
        {/* Quantity Controls */}
        <div className="mt-3 flex items-center space-x-3">
          <label className="text-sm font-medium text-gray-700" dir={langDir} translate="no">
            {t("quantity")}:
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100"
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
                width={16}
                height={16}
              />
            </Button>
            <input
              type="text"
              value={quantity}
              className="w-12 h-8 text-center border-0 bg-transparent focus:outline-none focus:ring-0"
              onChange={(e) => {
                const value = Number(e.target.value);
                setQuantity(isNaN(value) ? productQuantity : value);
              }}
              onBlur={handleQuantityChange}
            />
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100"
              onClick={() => {
                setQuantity(quantity + 1);
                handleAddToCart(quantity + 1, "add");
              }}
              disabled={
                updateCartByDevice?.isPending ||
                updateCartWithLogin?.isPending
              }
            >
              <Image 
                src={PlusIcon} 
                alt="plus-icon" 
                width={16}
                height={16}
              />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2 flex items-center space-x-1"
            onClick={() => setIsConfirmDialogOpen(true)}
            dir={langDir}
            translate="no"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t("remove")}</span>
          </Button>
          {haveAccessToken && (
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-0"
              onClick={() => onWishlist(productId)}
              dir={langDir}
              translate="no"
            >
              {t("move_to_wishlist")}
            </Button>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="flex-shrink-0 text-right">
        <div className="text-sm text-gray-500" dir={langDir} translate="no">
          {t("price")}
        </div>
        <div className="text-xl font-bold text-gray-900" dir={langDir}>
          {currency.symbol}{quantity * calculateDiscountedPrice()}
        </div>
      </div>
      <Dialog open={isConfirmDialogOpen} onOpenChange={handleConfirmDialog}>
        <DialogContent
          className="add-new-address-modal add_member_modal gap-0 p-0 md:max-w-2xl!"
          ref={confirmDialogRef}
        >
          <div className="modal-header justify-between!" dir={langDir}>
            <DialogTitle className="text-center text-xl text-dark-orange font-bold"></DialogTitle>
            <Button
              onClick={onCancelRemove}
              className={`${langDir == 'ltr' ? 'absolute' : ''} right-2 top-2 z-10 bg-white! text-black! shadow-none`}
            >
              <IoCloseSharp size={20} />
            </Button>
          </div>

          <div className="text-center mt-4 mb-4">
            <p className="text-dark-orange">Do you want to remove this item from cart?</p>
            <div>
              <Button
                type="button"
                className="bg-white text-red-500 mr-2"
                onClick={onCancelRemove}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="bg-red-500"
                onClick={onConfirmRemove}
              >
                Remove
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCard;
