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
import {
  useAllRfqQuotesUsersByBuyerId,
  useFindOneRfqQuotesUsersByBuyerID,
} from "@/apis/queries/rfq.queries";
import { Skeleton } from "@/components/ui/skeleton";
import ChatSection from "@/components/modules/rfqRequest/ChatSection";

const RfqRequestPage = () => {
  const [rfqQuoteId, setRfqQuoteId] = useState<number | undefined>();
  const [activeSellerId, setActiveSellerId] = useState<number | undefined>();

  const allRfqQuotesQuery = useAllRfqQuotesUsersByBuyerId(
    {
      page: 1,
      limit: 10,
      rfqQuotesId: rfqQuoteId ?? 0,
    },
    !!rfqQuoteId,
  );
  const rfqQuotesUsersByBuyerIdQuery = useFindOneRfqQuotesUsersByBuyerID({
    rfqQuotesId: rfqQuoteId ?? 0,
  });
  const rfqQuotesDetails = allRfqQuotesQuery.data?.data;
  const rfqQuoteDetailsById = rfqQuotesUsersByBuyerIdQuery.data?.data;

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    let rfqQuotesId = params.get("rfqQuotesId");

    if (rfqQuotesId) {
      setRfqQuoteId(Number(rfqQuotesId));
    }
  }, [allRfqQuotesQuery.data?.data]);

  return (
    <section className="m-auto flex w-full max-w-[1530px] py-8">
      <div className="w-[15%]">
        <div className="w-full px-4 py-10 shadow-lg">
          <ul>
            <li className="w-full py-4">
              <Link
                href="/"
                className="flex items-center justify-start rounded-xl p-3"
              >
                <div className="flex h-[33px] w-[33px] items-center justify-center ">
                  <Image src={TaskIcon} alt="Task Icon" />
                </div>
                <div className="text-md pl-3 font-medium text-[#828593]">
                  Puremoon
                </div>
              </Link>
            </li>
            <li className="w-full py-4">
              <Link
                href="/user-chat"
                className="flex items-center justify-start rounded-xl p-3"
              >
                <div className="flex h-[33px] w-[33px] items-center justify-center ">
                  <Image src={TaskIcon} alt="Task Icon" />
                </div>
                <div className="text-md pl-3 font-medium text-[#828593]">
                  Puremoon
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-[85%] px-2">
        <div className="flex w-full rounded-sm border border-solid border-gray-300">
          <div className="w-[22%] border-r border-solid border-gray-300">
            <div className="flex min-h-[85px] w-full items-center border-b border-solid border-gray-300 px-[20px] py-[20px] text-lg font-normal text-[#333333]">
              <span>Request for RFQ</span>
            </div>
            <RequestProductCard />
          </div>
          <div className="w-[20%] border-r border-solid border-gray-300">
            <div className="flex h-[85px] min-w-full items-center border-b border-solid border-gray-300 px-[20px] py-[20px] text-lg font-normal text-[#333333]">
              <span>Vendor Lists</span>
            </div>
            <div className="max-h-[426px] w-full overflow-y-auto p-4">
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
                  sellerIDDetail: {
                    firstName: string;
                    lastName: string;
                    profilePicture: string;
                  };
                }) => (
                  <VendorCard
                    key={item?.id}
                    name={`${item?.sellerIDDetail?.firstName} ${item?.sellerIDDetail?.lastName}`}
                    profilePicture={item?.sellerIDDetail?.profilePicture}
                    offerPrice={item?.offerPrice}
                    onClick={() => setActiveSellerId(item?.id)}
                    isSelected={activeSellerId === item?.id}
                  />
                ),
              )}
            </div>
          </div>
          <div className="w-[58%] border-r border-solid border-gray-300">
            <div className="flex min-h-[85px] w-full items-center justify-between border-b border-solid border-gray-300 px-[20px] py-[20px] text-lg font-normal text-[#333333]">
              <span>
                Offering Price{" "}
                <b className="text-[#679A03]">
                  {rfqQuotesDetails?.[0]?.offerPrice
                    ? `$${rfqQuotesDetails?.[0]?.offerPrice}`
                    : "-"}
                </b>
              </span>
              <Link
                href="/user-chat"
                className="inline-block rounded-sm bg-dark-orange px-6 py-3 text-sm font-bold capitalize text-white"
              >
                checkout
              </Link>
            </div>
            <div className="flex w-full flex-wrap p-[20px]">
              <div className="w-full">
                <div className="w-full rounded-sm border border-solid border-gray-300">
                  <div className="flex w-full border-b border-solid border-gray-300">
                    <div className="w-[25%] p-4 text-xs font-normal text-gray-500">
                      Product
                    </div>
                    <div className="w-[15%] p-4 text-xs font-normal text-gray-500">
                      Delivery Date
                    </div>
                    <div className="w-[10%] p-4 text-xs font-normal text-gray-500">
                      Brand
                    </div>
                    <div className="w-[20%] p-4 text-xs font-normal text-gray-500">
                      Number Of Piece
                    </div>
                    <div className="w-[10%] p-4 text-xs font-normal text-gray-500">
                      Price
                    </div>
                    <div className="w-[20%] p-4 text-xs font-normal text-gray-500">
                      Address
                    </div>
                  </div>
                  {rfqQuoteDetailsById?.rfqQuotesProducts?.map(
                    (item: {
                      id: number;
                      offerPrice: string;
                      note: string;
                      quantity: number;
                      rfqProductDetails: {
                        productName: string;
                      };
                    }) => (
                      <OfferPriceCard
                        key={item?.id}
                        offerPrice={item?.offerPrice}
                        note={item?.note}
                        quantity={item?.quantity}
                        address={
                          rfqQuoteDetailsById?.rfqQuotes_rfqQuoteAddress
                            ?.address
                        }
                        productName={item?.rfqProductDetails?.productName}
                      />
                    ),
                  )}
                </div>
              </div>
              <ChatSection />
            </div>
            <div className="mt-6 flex w-full flex-wrap border-t border-solid border-gray-300 p-[20px]">
              <div className="flex w-full items-center">
                <div className="relative flex h-[32px] w-[32px] items-center">
                  <input type="file" className="hidden opacity-0" />
                  <div className="absolute left-0 top-0 w-auto">
                    <Image src={AttachIcon} alt="attach-icon" />
                  </div>
                </div>
                <div className="flex w-[calc(100%-6.5rem)] items-center">
                  <textarea
                    placeholder="Type your message...."
                    className="h-[32px] w-full resize-none focus:outline-none"
                  ></textarea>
                </div>
                <div className="flex w-[72px] items-center justify-between">
                  <div className="w-auto">
                    <Image src={SmileIcon} alt="smile-icon" />
                  </div>
                  <div className="w-auto">
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

export default RfqRequestPage;
