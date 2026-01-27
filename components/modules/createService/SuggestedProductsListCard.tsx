/**
 * @file SuggestedProductsListCard.tsx
 * @description Static / placeholder suggested products list card for the service
 * creation form. Displays hardcoded product items (e.g., iPhone 13 Pro Max)
 * with export icons. Not yet connected to dynamic product data from the API.
 * Intended to suggest related products when creating a service.
 */

import React from "react";
import IphoneIcon from "@/public/images/iphone.png";
import ExportIcon from "@/public/images/export.png";
import Image from "next/image";

/**
 * Placeholder component displaying a static list of suggested products.
 * Currently uses hardcoded data; intended to be replaced with dynamic API data.
 *
 * @returns A card with a "Product Found" heading and hardcoded product entries.
 */
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
