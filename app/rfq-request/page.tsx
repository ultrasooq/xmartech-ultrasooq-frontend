"use client";
import React from "react";
import Image from "next/image";
import TaskIcon from "@/public/images/task-icon.svg";
import ProIcon from "@/public/images/pro-2.png";
import UserChatIcon from "@/public/images/user-chat.png";
import AttachIcon from "@/public/images/attach.svg";
import SmileIcon from "@/public/images/smile.svg";
import SendIcon from "@/public/images/send-button.png";
import OfferPriceCard from "@/components/modules/rfqRequest/OfferPriceCard";
import VendorCard from "@/components/modules/rfqRequest/VendorCard";
import RequestProductCard from "@/components/modules/rfqRequest/RequestProductCard";
import Link from "next/link";
import { useAllRfqQuotesUsersByBuyerId } from "@/apis/queries/rfq.queries";

const RfqRequestPage = () => {
  const allRfqQuotesQuery = useAllRfqQuotesUsersByBuyerId({
    page: 1,
    limit: 10,
    quoteId: 25,
  });

  console.log(allRfqQuotesQuery.data?.data);

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
            <div className="w-full p-4">
              <VendorCard />
              <VendorCard />
              <VendorCard />
              <VendorCard />
            </div>
          </div>
          <div className="w-[58%] border-r border-solid border-gray-300">
            <div className="flex min-h-[85px] w-full items-center justify-between border-b border-solid border-gray-300 px-[20px] py-[20px] text-lg font-normal text-[#333333]">
              <span>
                Offering Price <b className="text-[#679A03]">$500</b>
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
                  <OfferPriceCard />
                  <OfferPriceCard />
                  <OfferPriceCard />
                  <OfferPriceCard />
                  <div className="w-full p-4">
                    <div className="flex w-full">
                      <div className="w-[25%] text-xs font-normal text-gray-500">
                        <div className="flex w-full flex-wrap">
                          <div className="border-color-[#DBDBDB] h-auto w-[48px] border border-solid p-1">
                            <Image src={ProIcon} alt="pro-icon" />
                          </div>
                          <div className="font-nromal flex w-[calc(100%-3rem)] items-center justify-start pl-3  text-xs text-black">
                            Lorem Ipsum is simply dummy text..
                          </div>
                        </div>
                      </div>
                      <div className="w-[15%] p-4 text-xs font-normal text-black">
                        Oct 21, 2024
                      </div>
                      <div className="w-[10%] p-4 text-xs font-normal text-black">
                        New
                      </div>
                      <div className="w-[20%] p-4 text-xs font-normal text-black">
                        1
                      </div>
                      <div className="w-[10%] p-4 text-xs font-normal text-black">
                        $100.00
                      </div>
                      <div className="w-[20%] p-4 text-xs font-normal text-black">
                        Address
                      </div>
                    </div>
                    <div className="mt-3 flex w-full flex-wrap rounded-lg border border-solid border-gray-300 p-4">
                      <span className="mb-2 text-sm font-normal text-gray-500">
                        Vendor Note:
                      </span>
                      <p className="text-sm font-normal text-black">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry&apos;s standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="d-flex w-full">
                  <div className="mt-5 flex w-full flex-wrap items-end">
                    <div className="h-[32px] w-[32px] rounded-full">
                      <Image src={UserChatIcon} alt="user-chat-icon" />
                    </div>
                    <div className="w-[calc(100%-2rem)] pl-2">
                      <div className="mb-1 w-full rounded-xl bg-[#F1F2F6] p-3 text-sm">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex..
                        </p>
                      </div>
                      <div className="w-full text-left text-sm font-normal text-[#AEAFB8]">
                        <span>Message seen 1:22pm</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex w-full flex-wrap items-end">
                    <div className="w-[calc(100%-2rem)] pr-2 text-right">
                      <div className="mb-1 inline-block w-auto rounded-xl bg-[#0086FF] p-3 text-right text-sm text-white">
                        <p>
                          cillum dolore eu fugiat nulla pariatur. Excepteur sint
                          occaecat.
                        </p>
                      </div>
                      <div className="mb-1 inline-block w-auto rounded-xl bg-[#0086FF] p-3 text-right text-sm text-white">
                        <p>
                          Sed ut perspiciatis unde omnis iste natus error sit
                          voluptatem accusantium doloremque laudantium, totam
                          rem aperiam, eaque ipsa quae ab...
                        </p>
                      </div>
                      <div className="w-full text-right text-sm font-normal text-[#AEAFB8]">
                        <span>Message seen 1:22pm</span>
                      </div>
                    </div>
                    <div className="h-[32px] w-[32px] rounded-full">
                      <Image src={UserChatIcon} alt="user-chat-icon" />
                    </div>
                  </div>
                </div>
              </div>
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
