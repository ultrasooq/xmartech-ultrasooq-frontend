/**
 * @file SuggestedProductsListCard.tsx
 * @description A static placeholder/mockup component displaying a "Product Found"
 *   card with hardcoded Lorem Ipsum content and a placeholder iPhone image. This
 *   component appears to be a design-time stub that has not yet been connected
 *   to dynamic data.
 *
 * @props None
 *
 * @behavior
 *   - Renders a fixed card layout with a "Product Found" heading, placeholder
 *     description text, a product image (static iPhone), "Remove" link, and an
 *     export icon button.
 *   - No dynamic data, event handlers, or API integration -- purely visual.
 *
 * @dependencies
 *   - Static image imports (iphone.png, export.png).
 */
import React from "react";
import IphoneIcon from "@/public/images/iphone.png";
import ExportIcon from "@/public/images/export.png";
import Image from "next/image";

const SuggestedProductsListCard = () => {
  return (
    <div className="w-full rounded-lg border border-solid border-gray-300 bg-white p-2 shadow-xs">
      <div className="w-full rounded-lg bg-[#F8F6F6] px-4 py-6">
        <h3 className="mb-1 text-lg font-medium text-color-dark">
          Product Found
        </h3>
        <p className="text-sm font-normal text-[#7F818D]">
          Lorem ipsum dolor sit amet,{" "}
        </p>
      </div>
      <div className="w-full">
        <div className="mb-2 flex w-full items-start rounded-lg border border-solid border-gray-300 p-2">
          <div className="flex w-[calc(100%-2rem)] items-center py-2">
            <div className="flex h-[64px] w-[64px] items-center justify-center rounded-lg border border-solid border-gray-300 p-1">
              <Image
                src={IphoneIcon}
                className="max-h-full max-w-full"
                alt="iphone-icon"
              />
            </div>
            <div className="w-[calc(100%-4rem)] pl-3">
              <p className="mb-2.5 text-sm font-normal leading-4 text-[#1D77D1]">
                Lorem Ipsum is simply dummy text..
              </p>
              <a
                href="#"
                className="text-xs font-normal text-[#464151] underline underline-offset-1"
              >
                Remove
              </a>
            </div>
          </div>
          <div className="flex h-auto w-[32px] justify-end">
            <a
              href="#"
              className="flex h-[28px] w-[28px] items-center justify-center rounded-md bg-red-200"
            >
              <Image src={ExportIcon} alt="export-icon" />
            </a>
          </div>
        </div>
        <div className="mb-2 flex w-full items-start rounded-lg border border-solid border-gray-300 p-2">
          <div className="flex w-[calc(100%-2rem)] items-center py-2">
            <div className="flex h-[64px] w-[64px] items-center justify-center rounded-lg border border-solid border-gray-300 p-1">
              <Image
                src={IphoneIcon}
                className="max-h-full max-w-full"
                alt="iphone-icon"
              />
            </div>
            <div className="w-[calc(100%-4rem)] pl-3">
              <p className="mb-2.5 text-sm font-normal leading-4 text-[#1D77D1]">
                Lorem Ipsum is simply dummy text..
              </p>
              <a
                href="#"
                className="text-xs font-normal text-[#464151] underline underline-offset-1"
              >
                Remove
              </a>
            </div>
          </div>
          <div className="flex h-auto w-[32px] justify-end">
            <a
              href="#"
              className="flex h-[28px] w-[28px] items-center justify-center rounded-md bg-red-200"
            >
              <Image src={ExportIcon} alt="export-icon" />
            </a>
          </div>
        </div>
        <div className="mb-2 flex w-full items-start rounded-lg border border-solid border-gray-300 p-2">
          <div className="flex w-[calc(100%-2rem)] items-center py-2">
            <div className="flex h-[64px] w-[64px] items-center justify-center rounded-lg border border-solid border-gray-300 p-1">
              <Image
                src={IphoneIcon}
                className="max-h-full max-w-full"
                alt="iphone-icon"
              />
            </div>
            <div className="w-[calc(100%-4rem)] pl-3">
              <p className="mb-2.5 text-sm font-normal leading-4 text-[#1D77D1]">
                Lorem Ipsum is simply dummy text..
              </p>
              <a
                href="#"
                className="text-xs font-normal text-[#464151] underline underline-offset-1"
              >
                Remove
              </a>
            </div>
          </div>
          <div className="flex h-auto w-[32px] justify-end">
            <a
              href="#"
              className="flex h-[28px] w-[28px] items-center justify-center rounded-md bg-red-200"
            >
              <Image src={ExportIcon} alt="export-icon" />
            </a>
          </div>
        </div>
        <div className="mb-2 flex w-full items-start rounded-lg border border-solid border-gray-300 p-2">
          <div className="flex w-[calc(100%-2rem)] items-center py-2">
            <div className="flex h-[64px] w-[64px] items-center justify-center rounded-lg border border-solid border-gray-300 p-1">
              <Image
                src={IphoneIcon}
                className="max-h-full max-w-full"
                alt="iphone-icon"
              />
            </div>
            <div className="w-[calc(100%-4rem)] pl-3">
              <p className="mb-2.5 text-sm font-normal leading-4 text-[#1D77D1]">
                Lorem Ipsum is simply dummy text..
              </p>
              <a
                href="#"
                className="text-xs font-normal text-[#464151] underline underline-offset-1"
              >
                Remove
              </a>
            </div>
          </div>
          <div className="flex h-auto w-[32px] justify-end">
            <a
              href="#"
              className="flex h-[28px] w-[28px] items-center justify-center rounded-md bg-red-200"
            >
              <Image src={ExportIcon} alt="export-icon" />
            </a>
          </div>
        </div>
        <div className="mb-2 flex w-full items-start rounded-lg border border-solid border-gray-300 p-2">
          <div className="flex w-[calc(100%-2rem)] items-center py-2">
            <div className="flex h-[64px] w-[64px] items-center justify-center rounded-lg border border-solid border-gray-300 p-1">
              <Image
                src={IphoneIcon}
                className="max-h-full max-w-full"
                alt="iphone-icon"
              />
            </div>
            <div className="w-[calc(100%-4rem)] pl-3">
              <p className="mb-2.5 text-sm font-normal leading-4 text-[#1D77D1]">
                Lorem Ipsum is simply dummy text..
              </p>
              <a
                href="#"
                className="text-xs font-normal text-[#464151] underline underline-offset-1"
              >
                Remove
              </a>
            </div>
          </div>
          <div className="flex h-auto w-[32px] justify-end">
            <a
              href="#"
              className="flex h-[28px] w-[28px] items-center justify-center rounded-md bg-red-200"
            >
              <Image src={ExportIcon} alt="export-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedProductsListCard;
