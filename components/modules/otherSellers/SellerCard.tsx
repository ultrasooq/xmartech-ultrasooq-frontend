import React from "react";

type SellerCardProps = {
  productId: number;
  sellerName: string;
  offerPrice: string;
  productPrice: string;
  onAdd: () => void;
  onToCheckout: () => void;
  productProductPrice?: string;
  consumerDiscount?: number;
  askForPrice?: string;
  askForStock?: string;
};

const SellerCard: React.FC<SellerCardProps> = ({
  productId,
  sellerName,
  offerPrice,
  productPrice,
  onAdd,
  onToCheckout,
  productProductPrice,
  consumerDiscount,
  askForPrice,
  askForStock,
}) => {
  const calculateDiscountedPrice = () => {
    const price = productProductPrice ? Number(productProductPrice) : 0;
    const discount = consumerDiscount || 0;
    return price - (price * discount) / 100;
  };

  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-3 border-b border-solid border-gray-300">
        <div>
          <div className="h-[57px] w-full border-b border-solid border-gray-300 px-3 py-4">
            <span>Seller</span>
          </div>
          <div className="w-full px-3 py-4">
            <h4 className="text-base font-medium text-dark-orange">
              {sellerName}
            </h4>
            <ul>
              <li className="relative my-2 pl-4 text-sm font-normal before:absolute before:left-0 before:top-[7px] before:h-[6px] before:w-[6px] before:rounded before:bg-slate-400 before:content-['']">
                Cash On Delivery available
              </li>
              <li className="relative my-2 pl-4 text-sm font-normal before:absolute before:left-0 before:top-[7px] before:h-[6px] before:w-[6px] before:rounded before:bg-slate-400 before:content-['']">
                7 Days Replacement Policy
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="h-[57px] w-full border-b border-solid border-gray-300 px-3 py-4">
            <span>Price</span>
          </div>
          <div className="w-full px-3 py-4">
            <div className="flex w-full items-end">
              <span className="text-md font-medium text-black">
                {calculateDiscountedPrice
                  ? `$${calculateDiscountedPrice()}`
                  : `$${0}`}
              </span>
              <span className="ml-2 text-sm font-medium text-light-gray line-through">
                {productProductPrice ? `$${productProductPrice}` : `$${0}`}
              </span>
            </div>
            <div className="flex w-full">
              <ul>
                <li className="relative my-2 pl-4 text-sm font-normal before:absolute before:left-0 before:top-[7px] before:h-[6px] before:w-[6px] before:rounded before:bg-slate-400 before:content-['']">
                  Get ₹50 instant discount on first Flipkart UPI txn on order of
                  ₹200 and above
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className="h-[57px] w-full border-b border-solid border-gray-300 px-3 py-4">
            <span>Delivery</span>
          </div>
          <div className="w-full px-3 py-4">
            <div className="my-2 flex w-full text-sm font-medium">
              <p>FREE Delivery by Tomorrow, Friday if ordered before 5:05 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-b border-solid border-gray-300 p-3">
        {askForPrice !== "true" && askForStock !== "true" ? (
          <div className="flex w-full items-center justify-end gap-2 text-sm font-medium">
            <button
              onClick={onAdd}
              className="inline-block rounded-sm bg-dark-orange px-6 py-3 text-sm font-bold capitalize text-white"
            >
              ADD TO CART
            </button>
            <button
              onClick={onToCheckout}
              className="inline-block rounded-sm bg-color-yellow px-6 py-3 text-sm font-bold capitalize text-white"
            >
              BUY NOW
            </button>
          </div>
        ) : (
          <div className="flex w-full items-center justify-end gap-2 text-sm font-medium">
            <button className="inline-block rounded-sm bg-color-yellow px-6 py-3 text-sm font-bold capitalize text-white">
              MESSAGE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerCard;
