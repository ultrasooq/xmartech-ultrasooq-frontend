"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TaskIcon from "@/public/images/task-icon.svg";
import AttachIcon from "@/public/images/attach.svg";
import SmileIcon from "@/public/images/smile.svg";
import SendIcon from "@/public/images/send-button.png";
import OfferPriceCard from "@/components/modules/rfqRequest/OfferPriceCard";
import VendorCard from "@/components/modules/rfqRequest/VendorCard";
import RequestProductCard from "@/components/modules/rfqRequest/RequestProductCard";
import Link from "next/link";
import { useAllRfqQuotesUsersBySellerId } from "@/apis/queries/rfq.queries";
import { Skeleton } from "@/components/ui/skeleton";
import ChatSection from "@/components/modules/rfqRequest/ChatSection";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const SellerRfqRequestPage = () => {
  const pathname = usePathname();
  const [activeSellerId, setActiveSellerId] = useState<number | undefined>();
  const [quoteProducts, setQuoteProducts] = useState<any[]>([]);

  const allRfqQuotesQuery = useAllRfqQuotesUsersBySellerId({
    page: 1,
    limit: 10,
  });

  const rfqQuotesDetails = allRfqQuotesQuery.data?.data;

  useEffect(() => {
    const rfqQuotesDetails = allRfqQuotesQuery.data?.data;

    if (rfqQuotesDetails) {
      setActiveSellerId(rfqQuotesDetails[0]?.id);
      setQuoteProducts(
        rfqQuotesDetails[0]?.rfqQuotesUser_rfqQuotes?.rfqQuotesProducts.map(
          (i: any) => ({
            ...i,
            address:
              rfqQuotesDetails[0]?.rfqQuotesUser_rfqQuotes
                ?.rfqQuotes_rfqQuoteAddress.address,
          }),
        ) || [],
      );
    }
  }, [allRfqQuotesQuery.data?.data]);

  return (
    <section className="m-auto flex w-full max-w-[1530px] py-8">
      <div className="w-[10%]">
        <div className="w-full px-1 py-1 shadow-lg">
          <ul>
            <li className="w-full py-1">
              <Link
                href="/"
                className="flex items-center justify-start rounded-xl p-1"
              >
                <div className="flex h-[20px] w-[20px] items-center justify-center ">
                  <Image src={TaskIcon} alt="Task Icon" />
                </div>
                <div className="pl-1 text-sm font-medium text-[#828593]">
                  Puremoon
                </div>
              </Link>
            </li>
            <li
              className={cn(
                pathname?.includes("seller-rfq-request") ? "bg-gray-100" : "",
                "w-full py-1",
              )}
            >
              <Link
                href="/user-chat"
                className="flex items-center justify-start rounded-xl p-1"
              >
                <div className="flex h-[20px] w-[20px] items-center justify-center ">
                  <Image src={TaskIcon} alt="Task Icon" />
                </div>
                <div className="pl-1 text-sm font-medium text-[#828593]">
                  RFQ
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-[90%] px-2">
        <div className="flex w-full rounded-sm border border-solid border-gray-300">
          {/* <div className="w-[20%] border-r border-solid border-gray-300">
            <div className="flex min-h-[55px] w-full items-center border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
              <span>Request for RFQ</span>
            </div>
            <RequestProductCard />
          </div> */}
          <div className="w-[40%] border-r border-solid border-gray-300">
            <div className="flex h-[55px] min-w-full items-center border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
              <span>Request for RFQ</span>
            </div>
            <div className="max-h-[720px] w-full overflow-y-auto p-2">
              {allRfqQuotesQuery?.isLoading ? (
                <div className="my-2 space-y-2">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              ) : null}

              {rfqQuotesDetails?.map(
                (item: {
                  id: number;
                  offerPrice: string;
                  buyerIDDetail: {
                    firstName: string;
                    lastName: string;
                    profilePicture: string;
                  };
                  rfqQuotesUser_rfqQuotes: {
                    rfqQuotesProducts: any[];
                    rfqQuotes_rfqQuoteAddress: {
                      address: string;
                    };
                  };
                }) => (
                  <VendorCard
                    key={item?.id}
                    name={`${item?.buyerIDDetail?.firstName} ${item?.buyerIDDetail?.lastName}`}
                    profilePicture={item?.buyerIDDetail?.profilePicture}
                    offerPrice={item?.offerPrice}
                    onClick={() => {
                      setActiveSellerId(item?.id);
                      setQuoteProducts(
                        item?.rfqQuotesUser_rfqQuotes?.rfqQuotesProducts.map(
                          (i: any) => ({
                            ...i,
                            address:
                              item?.rfqQuotesUser_rfqQuotes
                                ?.rfqQuotes_rfqQuoteAddress.address,
                          }),
                        ) || [],
                      );
                    }}
                    isSelected={activeSellerId === item?.id}
                  />
                ),
              )}
            </div>
          </div>
          <div className="w-[60%] border-r border-solid border-gray-300">
            <div className="flex min-h-[55px] w-full items-center justify-between border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
              <span>
                Offering Price{" "}
                <b className="text-[#679A03]">
                  {rfqQuotesDetails?.[0]?.offerPrice
                    ? `$${rfqQuotesDetails?.[0]?.offerPrice}`
                    : "-"}
                </b>
              </span>
              <Link
                href="#"
                className="inline-block rounded-sm bg-dark-orange px-3 py-2 text-xs font-bold capitalize text-white"
              >
                checkout
              </Link>
            </div>
            <div className="flex w-full flex-wrap p-[20px]">
              <div className="mb-5 max-h-[300px] w-full overflow-y-auto">
                <div className="w-full rounded-sm border border-solid border-gray-300">
                  <div className="flex w-full border-b border-solid border-gray-300">
                    <div className="w-[25%] px-3 py-3 text-sm font-normal text-gray-500">
                      Product
                    </div>
                    <div className="w-[15%] px-3 py-3 text-sm font-normal text-gray-500">
                      Delivery Date
                    </div>
                    <div className="w-[10%] px-3 py-3 text-sm font-normal text-gray-500">
                      Brand
                    </div>
                    <div className="w-[20%] px-3 py-3 text-sm font-normal text-gray-500">
                      Number Of Piece
                    </div>
                    <div className="w-[10%] px-3 py-3 text-sm font-normal text-gray-500">
                      Price
                    </div>
                    <div className="w-[20%] px-3 py-3 text-sm font-normal text-gray-500">
                      Address
                    </div>
                  </div>
                  {quoteProducts?.map(
                    (item: {
                      id: number;
                      offerPrice: string;
                      note: string;
                      quantity: number;
                      rfqProductDetails: {
                        productName: string;
                      };
                      address: string;
                    }) => (
                      <OfferPriceCard
                        key={item?.id}
                        offerPrice={item?.offerPrice}
                        note={item?.note}
                        quantity={item?.quantity}
                        address={item?.address}
                        productName={item?.rfqProductDetails?.productName}
                      />
                    ),
                  )}
                </div>
              </div>
              <ChatSection />
            </div>
            <div className="mt-2 flex w-full flex-wrap border-t border-solid border-gray-300 px-[15px] py-[10px]">
              <div className="flex w-full items-center">
                <div className="relative flex h-[32px] w-[32px] items-center">
                  <input type="file" className="z-10 hidden opacity-0" />
                  <div className="absolute left-0 top-0 w-auto">
                    <Image src={AttachIcon} alt="attach-icon" />
                  </div>
                </div>
                <div className="flex w-[calc(100%-6.5rem)] items-center">
                  <textarea
                    placeholder="Type your message...."
                    className="h-[32px] w-full resize-none text-sm focus:outline-none"
                  ></textarea>
                </div>
                <div className="flex w-[72px] items-center justify-between">
                  <div className="w-auto">
                    <Image src={SmileIcon} alt="smile-icon" />
                  </div>
                  <div className="flex w-auto">
                    <button type="button" className="">
                      <Image src={SendIcon} alt="send-icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerRfqRequestPage;
