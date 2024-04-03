import React from "react";

const ProductCard = () => {
  return (
    <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
      <div className="absolute right-2.5 top-2.5 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
        <span>-6%</span>
      </div>
      <div className="flex h-40 w-full items-center justify-center lg:h-52">
        <img src="/images/pro-mobile4.png" />
      </div>
      <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
        <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
          young shop
        </h6>
        <div className="mt-2.5 w-full">
          <h4 className="font-lg font-normal uppercase text-olive-green">
            $55.99
          </h4>
        </div>
        <p>
          <a href="#">Lorem Ipsum is simply dummy text..</a>
        </p>
        <img src="images/star.png" className="mt-3" />
        <span className="w-auto text-base font-normal text-light-gray">
          $332.38
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
