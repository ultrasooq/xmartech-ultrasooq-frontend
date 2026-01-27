/**
 * @file ChatSection.tsx
 * @description Static placeholder chat UI for the RFQ request detail page.
 * Renders hardcoded lorem ipsum chat messages in a scrollable container
 * with left-aligned (received) and right-aligned (sent) message bubbles.
 * Not yet connected to real chat data or messaging APIs.
 */

import Image from "next/image";
import React from "react";
import UserChatIcon from "@/public/images/user-chat.png";

/**
 * Placeholder chat section component. Displays static chat messages with
 * user avatars and timestamps. Intended to be replaced with a dynamic
 * chat implementation backed by real-time messaging.
 *
 * @returns A scrollable chat container with mock message bubbles.
 */
const ChatSection = () => {
  return (
    <div className="h-[300px] w-full overflow-y-auto">
      <div className="d-flex w-full">
        <div className="mt-5 flex w-full flex-wrap items-end">
          <div className="h-[32px] w-[32px] rounded-full">
            <Image src={UserChatIcon} alt="user-chat-icon" />
          </div>
          <div className="w-[calc(100%-2rem)] pl-2">
            <div className="mb-1 w-full rounded-xl bg-[#F1F2F6] p-3 text-sm">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex..
              </p>
            </div>
            <div className="w-full text-left text-xs font-normal text-[#AEAFB8]">
              <span>Message seen 1:22pm</span>
            </div>
          </div>
        </div>
        <div className="mt-5 flex w-full flex-wrap items-end">
          <div className="h-[32px] w-[32px] rounded-full">
            <Image src={UserChatIcon} alt="user-chat-icon" />
          </div>
          <div className="w-[calc(100%-2rem)] pl-2">
            <div className="mb-1 w-full rounded-xl bg-[#F1F2F6] p-3 text-sm">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex..
              </p>
            </div>
            <div className="w-full text-left text-xs font-normal text-[#AEAFB8]">
              <span>Message seen 1:22pm</span>
            </div>
          </div>
        </div>
        <div className="mt-5 flex w-full flex-wrap items-end">
          <div className="h-[32px] w-[32px] rounded-full">
            <Image src={UserChatIcon} alt="user-chat-icon" />
          </div>
          <div className="w-[calc(100%-2rem)] pl-2">
            <div className="mb-1 w-full rounded-xl bg-[#F1F2F6] p-3 text-sm">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex..
              </p>
            </div>
            <div className="w-full text-left text-xs font-normal text-[#AEAFB8]">
              <span>Message seen 1:22pm</span>
            </div>
          </div>
        </div>
        <div className="mt-5 flex w-full flex-wrap items-end">
          <div className="h-[32px] w-[32px] rounded-full">
            <Image src={UserChatIcon} alt="user-chat-icon" />
          </div>
          <div className="w-[calc(100%-2rem)] pl-2">
            <div className="mb-1 w-full rounded-xl bg-[#F1F2F6] p-3 text-sm">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex..
              </p>
            </div>
            <div className="w-full text-left text-xs font-normal text-[#AEAFB8]">
              <span>Message seen 1:22pm</span>
            </div>
          </div>
        </div>
        <div className="mt-5 flex w-full flex-wrap items-end">
          <div className="w-[calc(100%-2rem)] pr-2 text-right">
            <div className="mb-1 inline-block w-auto rounded-xl bg-[#0086FF] p-3 text-right text-sm text-white">
              <p>
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.
              </p>
            </div>
            <div className="mb-1 inline-block w-auto rounded-xl bg-[#0086FF] p-3 text-right text-sm text-white">
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab...
              </p>
            </div>
            <div className="w-full text-right text-xs font-normal text-[#AEAFB8]">
              <span>Message seen 1:22pm</span>
            </div>
          </div>
          <div className="h-[32px] w-[32px] rounded-full">
            <Image src={UserChatIcon} alt="user-chat-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
