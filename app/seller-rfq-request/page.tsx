"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TaskIcon from "@/public/images/task-icon.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SellerChat from "@/components/modules/chat/seller/SellerChat";
import ProductChat from "@/components/modules/chat/productChat/ProductChat";
import VendorOperations from "@/components/modules/vendorOperations/VendorOperations";

const SellerRfqRequestPage = () => {
  const [currentTab, setCurrentTab] = useState<string>("RFQ");
  const [productId, setProductId] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    let pId = params.get("product_id");
    if (pId) {
      setProductId(parseInt(pId));
      setCurrentTab("MSG");
    }
  }, []);

  return (
    <section className="m-auto flex w-full max-w-[1400px] flex-wrap py-8">
      <div className="w-full md:w-[15%]">
        <div className="w-full px-0 py-0 shadow-lg">
          <ul>
            <li className="w-full py-1">
              <Link
                href="#"
                className="flex items-center justify-start rounded-xl p-2"
              >
                <div className="flex h-[20px] w-[20px] items-center justify-center ">
                  <Image src={TaskIcon} alt="Task Icon" />
                </div>
                <div className="pl-1 text-sm font-medium text-[#828593]">
                  Ultrasooq
                </div>
              </Link>
            </li>
            <li
              onClick={() => setCurrentTab("RFQ")}
              className={cn(
                currentTab === "RFQ"
                  ? "bg-dark-orange text-white"
                  : "bg-gray-50 text-black",
                "w-full py-1",
              )}
            >
              <button className="flex items-center justify-start rounded-xl p-2">
                <div className="flex h-[20px] w-[20px] items-center justify-center">
                  <Image
                    src={TaskIcon}
                    alt="Task Icon"
                    className="brightness-0 invert"
                  />
                </div>
                <div className="pl-1 text-sm font-medium">RFQ</div>
              </button>
            </li>
            <li
              onClick={() => setCurrentTab("Vendor Operations")}
              className={cn(
                currentTab === "Vendor Operations"
                  ? "bg-dark-orange text-white"
                  : "bg-gray-50 text-black",
                "w-full py-1",
              )}
            >
              <button className="flex items-center justify-start rounded-xl p-2">
                <div className="flex h-[20px] w-[20px] items-center justify-center">
                  <Image
                    src={TaskIcon}
                    alt="Task Icon"
                    className="brightness-0 invert"
                  />
                </div>
                <div className="pl-1 text-sm font-medium">
                  Vendor Operations
                </div>
              </button>
            </li>
            {productId && (
              <li
                onClick={() => setCurrentTab("MSG")}
                className={cn(
                  currentTab === "MSG"
                    ? "bg-dark-orange text-white"
                    : "bg-gray-50 text-black",
                  "w-full py-1",
                )}
              >
                <button className="flex items-center justify-start rounded-xl p-2">
                  <div className="flex h-[20px] w-[20px] items-center justify-center ">
                    <Image
                      src={TaskIcon}
                      alt="Task Icon"
                      className="brightness-0 invert"
                    />
                  </div>
                  <div className="pl-1 text-sm font-medium">Messages</div>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="w-full px-2 md:w-[85%]">
        {currentTab === "RFQ" ? (
          <SellerChat />
        ) : productId ? (
          <ProductChat productId={productId} />
        ) : null}
        {currentTab === "Vendor Operations" && <VendorOperations />}
      </div>
    </section>
  );
};

export default SellerRfqRequestPage;
