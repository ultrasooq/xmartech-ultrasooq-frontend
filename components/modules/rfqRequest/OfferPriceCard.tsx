import React, { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { capitalizeWord, formatDate, formatPrice } from "@/utils/helper";

type OfferPriceCardProps = {
  offerPrice: string;
  note: string;
  quantity: number;
  address: string;
  deliveryDate: string;
  productImage: string;
  productName: string;
  productId: number;
  onRequestPrice: (productId: number, requestedPrice: number) => void;
  priceRequest: any
};

const OfferPriceCard: React.FC<OfferPriceCardProps> = ({
  offerPrice,
  note,
  quantity,
  address,
  deliveryDate,
  productImage,
  productName,
  productId,
  onRequestPrice,
  priceRequest
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOfferPrice, setEditedOfferPrice] = useState("");

  useEffect(() => {
    setEditedOfferPrice(offerPrice)
  }, [offerPrice, priceRequest])

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onRequestPrice(productId, parseInt(editedOfferPrice))
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedOfferPrice(offerPrice)
  };

  return (
    <div className="w-full border-b border-solid border-gray-300 p-4">
      <div className="flex w-full">
        <div className="w-[25%] text-xs font-normal text-gray-500">
          <div className="flex w-full flex-wrap">
            <div className="border-color-[#DBDBDB] relative h-[48px] w-[48px] border border-solid p-2">
              <Image
                src={productImage || PlaceholderImage}
                alt="preview"
                fill
              />
            </div>
            <div className="font-nromal flex w-[calc(100%-3rem)] items-center justify-start pl-3 text-xs text-black">
              {productName || "-"}
            </div>
          </div>
        </div>
        <div className="w-[15%] p-4 text-xs font-normal text-black">
          {formatDate(deliveryDate) || "-"}
        </div>
        <div className="w-[10%] p-4 text-xs font-normal text-black">-</div>
        <div className="w-[20%] p-4 text-xs font-normal text-black">
          {quantity}
        </div>
        <div className="w-[10%] p-4 text-xs font-normal text-black">
          {isEditing ? (
            <div className="w-full">
              <input
                value={editedOfferPrice}
                onChange={(e) => setEditedOfferPrice(e.target.value)}
                className="border rounded p-1 w-full"
                type="number"
              />
              <div className="flex gap-1 mt-1">
                <button onClick={handleSaveClick} className="text-blue-500">Save</button>
                <button onClick={handleCancelClick} className="text-red-500">Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              {editedOfferPrice ? `$${editedOfferPrice}` : "-"}
              <button onClick={handleEditClick} className="ml-2 text-blue-500">Edit</button>
            </div>
          )}
        </div>
        <div className="w-[20%] p-4 text-xs font-normal text-black">
          {address || "-"}
        </div>
      </div>
      {priceRequest?.status === "PENDING" && (
        <div className="mt-3 flex w-full flex-wrap rounded-lg border border-solid border-gray-300 p-4">
          <p className="mb-2 text-sm font-normal text-gray-500">
            Requested for Offer Price change:
            <span className="mx-7">Requested Price: {formatPrice(priceRequest?.requestedPrice)}</span>
            <span className="mr-7">Status: {capitalizeWord(priceRequest?.status)}</span>
            <span>Date: {moment(priceRequest?.updatedAt).format('YYYY-MM-DD HH:mm A')}</span>
          </p>
        </div>
      )}
      <div className="mt-3 flex w-full flex-wrap rounded-lg border border-solid border-gray-300 p-4">
        <span className="mb-2 text-sm font-normal text-gray-500">
          Vendor Note:
        </span>
        <p className="text-sm font-normal text-black"> {note || "-"}</p>
      </div>
    </div>
  );
};

export default OfferPriceCard;
