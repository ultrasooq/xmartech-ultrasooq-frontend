import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import Image from "next/image";
import validator from "validator";
// import { cn } from "@/lib/utils";
import EditIcon from "@/public/images/edit-rfq.png";
// import { Button } from "@/components/ui/button";
import Link from "next/link";

type ManageProductCardProps = {
  selectedIds?: number[];
  onSelectedId?: (args0: boolean | string, args1: number) => void;
  id: number;
  productId: number;
  status: string;
  askForPrice: string;
  askForStock: string;
  productImage: string | null;
  productName: string;
  productPrice: string;
  offerPrice: string;
  deliveryAfter: number;
  productLocation: string;
  stock: number;
  consumerType: string;
  sellType: string;
  timeOpen: number | null;
  timeClose: number | null;
  vendorDiscount: number | null;
  consumerDiscount: number | null;
  minQuantity: number | null;
  maxQuantity: number | null;
  minCustomer: number | null;
  maxCustomer: number | null;
  minQuantityPerCustomer: number | null;
  maxQuantityPerCustomer: number | null;
  productCondition: string;
};

const ManageProductCard: React.FC<ManageProductCardProps> = ({
  selectedIds,
  onSelectedId,
  id,
  productId,
  status,
  askForPrice,
  askForStock,
  productImage,
  productName,
  productPrice,
  offerPrice,
  deliveryAfter,
  productLocation,
  stock,
  consumerType,
  sellType,
  timeOpen,
  timeClose,
  vendorDiscount,
  consumerDiscount,
  minQuantity,
  maxQuantity,
  minCustomer,
  maxCustomer,
  minQuantityPerCustomer,
  maxQuantityPerCustomer,
  productCondition,
}) => {
  return (
    <div className="existing-product-add-item">
      <div className="existing-product-add-box">
        <div className="existing-product-add-box-row">
          <div className="leftdiv">
            <div className="image-container">
              <div className="existing_product_checkbox z-10">
                <Checkbox
                  className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                  checked={selectedIds?.includes(id)}
                  onCheckedChange={(checked) => onSelectedId?.(checked, id)}
                />
              </div>
              <div className="relative mx-auto h-[100%] w-[100%]">
                <Image
                  src={
                    productImage && validator.isURL(productImage)
                      ? productImage
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
              {/* TODO: remove for now */}
              {/* <div
                className={cn(
                  status === "ACTIVE" ? "bg-green-500" : "bg-red-500",
                  "absolute right-0 top-0 rounded-md px-2 py-1 shadow-md",
                )}
              >
                <p className="text-xs font-semibold text-white">{status}</p>
              </div> */}
              {productCondition === "OLD" ? (
                <div className="absolute right-0 top-0 z-10">
                  <Link href={`/product/${productId}`}>
                    <Image
                      src={EditIcon}
                      alt="review-dot-icon"
                      height={21}
                      width={21}
                    />
                  </Link>
                </div>
              ) : null}
            </div>
            <div className="text-container">
              <h3>{productName || "-"}</h3>
            </div>
            <div className="form-container">
              <div className="mb-2 grid w-full grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2">
                <div className="space-y-1 rounded bg-[#f1f1f1] p-1">
                  <div className="text-with-checkagree">
                    <label className="text-col" htmlFor="setUpPriceCheck">
                      Stock
                    </label>
                  </div>
                  <div className="theme-inputValue-picker-upDown">
                    <span>
                      {askForStock === "true"
                        ? "Ask for Stock"
                        : stock
                          ? stock
                          : "-"}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 rounded bg-[#f1f1f1] p-1">
                  <div className="text-with-checkagree">
                    <label className="text-col" htmlFor="setUpPriceCheck">
                      Price
                    </label>
                  </div>
                  <div className="theme-inputValue-picker-upDown">
                    <span>
                      {askForPrice === "true"
                        ? "Ask for the Price"
                        : offerPrice || "-"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-2 grid w-full grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2">
                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <Label>Deliver After</Label>
                  <span>
                    {deliveryAfter
                      ? `${deliveryAfter === 1 ? `${deliveryAfter} day` : `${deliveryAfter} days`}`
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <Label>Product Location</Label>
                  <span>{productLocation || "-"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rightdiv">
            <div className="form-container">
              <div className="mb-2 grid w-full grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2">
                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label>Time Open</label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>{timeOpen || "-"}</span>
                  </div>
                </div>

                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label>Time Close</label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>{timeClose || "-"}</span>
                  </div>
                </div>
              </div>

              <div className="mb-2 grid w-full grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2">
                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Consumer Type
                  </label>
                  <span>{consumerType || "-"}</span>
                </div>
                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Sell Type
                  </label>
                  <span>{sellType || "-"}</span>
                </div>
              </div>

              <div className="mb-2 grid w-full grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2">
                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Vendor Discount
                  </label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>
                      {vendorDiscount ? `${vendorDiscount}%` : "-" || "-"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Consumer Discount
                  </label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>
                      {consumerDiscount ? `${consumerDiscount}%` : "-" || "-"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Min Quantity
                  </label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>{minQuantity || "-"}</span>
                  </div>
                </div>
                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Max Quantity
                  </label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>{maxQuantity || "-"}</span>
                  </div>
                </div>

                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Min Consumer
                  </label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>{minCustomer || "-"}</span>
                  </div>
                </div>
                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Max Consumer
                  </label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>{maxCustomer || "-"}</span>
                  </div>
                </div>

                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Min Qty Consumer
                  </label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>{minQuantityPerCustomer || "-"}</span>
                  </div>
                </div>
                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Max Qty Consumer
                  </label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>{maxQuantityPerCustomer || "-"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProductCard;
