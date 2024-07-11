import React, { useEffect, useRef } from "react";
import moment from "moment";
import { useAuth } from "@/context/AuthContext";
import { RfqProductPriceRequestStatus } from "@/utils/types/chat.types";
import { useSocket } from "@/context/SocketContext";
import { updateUnreadMessages } from "@/apis/requests/chat.requests";

interface SellerChatHistoryProps {
  roomId: number | null;
  selectedChatHistory: any[];
  chatHistoryLoading: boolean;
  updateRfqMessageCount: () => void;
  buyerId: number | undefined;
  rfqUserId: number;
  unreadMsgCount: number | 0;
}

const SellerChatHistory: React.FC<SellerChatHistoryProps> = ({
  roomId,
  selectedChatHistory,
  chatHistoryLoading,
  updateRfqMessageCount,
  buyerId,
  unreadMsgCount,
  rfqUserId,
}) => {
  const { user } = useAuth();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { updateRfqRequestStatus } = useSocket();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [selectedChatHistory]);

  useEffect(() => {
    if (unreadMsgCount) handleUnreadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyerId, roomId]);

  const handlePriceStatus = async (
    chat: { id: number; requestedPrice: number; rfqQuoteProductId: number },
    status: RfqProductPriceRequestStatus,
  ) => {
    try {
      const payload = {
        id: chat.id,
        status,
        roomId: roomId,
        rfqUserId,
        requestedPrice: chat.requestedPrice,
        rfqQuoteProductId: chat.rfqQuoteProductId,
      };
      updateRfqRequestStatus(payload);
    } catch (error) {}
  };

  const handleUnreadMessages = async () => {
    try {
      if (user?.id && roomId && buyerId) {
        const payload = {
          userId: buyerId,
          roomId: roomId,
        };
        await updateUnreadMessages(payload);
        updateRfqMessageCount();
      }
    } catch (error) {}
  };

  return (
    <div ref={chatContainerRef} className="h-[300px] w-full overflow-y-auto">
      <div className="d-flex w-full">
        {selectedChatHistory.length > 0 ? (
          <div>
            {selectedChatHistory.map((chat: any, index: number) => (
              <div key={index}>
                {chat?.userId === user?.id ? (
                  <div className="mt-5 flex w-full flex-wrap items-end">
                    <div className="w-[calc(100%-2rem)] pr-2 text-right">
                      <div className="mb-1 inline-block w-auto rounded-xl bg-[#0086FF] p-3 text-right text-sm text-white">
                        <p>{chat.content}</p>

                        {chat?.rfqProductPriceRequest && (
                          <div>
                            <p>
                              Requested Price: $
                              {chat.rfqProductPriceRequest?.requestedPrice}
                            </p>
                            <p>
                              status:
                              {chat.rfqProductPriceRequest?.status ===
                              "APPROVED" ? (
                                <span className="rounded-sm bg-blue-700 p-0.5 text-white">
                                  Approved
                                </span>
                              ) : chat.rfqProductPriceRequest?.status ===
                                "REJECTED" ? (
                                <span className="rounded-sm bg-red-600 p-0.5 text-white">
                                  Rejected
                                </span>
                              ) : (
                                <span className="rounded-sm bg-yellow-600 p-0.5 text-white">
                                  Pending
                                </span>
                              )}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="w-full text-right text-xs font-normal text-[#AEAFB8]">
                        <span>
                          {chat.createdAt
                            ? moment(chat.createdAt)
                                .startOf("seconds")
                                .fromNow()
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="h-[32px] w-[32px] rounded-full bg-[#F1F2F6]">
                      <span className="flex h-full w-full items-center justify-center">
                        {`${chat?.user?.firstName?.[0] ?? ""}${chat?.user?.lastName?.[0] ?? ""}`}
                      </span>
                      {/* <Image src={UserChatIcon} alt="user-chat-icon" /> */}
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 flex w-full flex-wrap items-end">
                    <div className="h-[32px] w-[32px] rounded-full bg-[#F1F2F6]">
                      <span className="flex h-full w-full items-center justify-center">
                        {`${chat?.user?.firstName?.[0] ?? ""}${chat?.user?.lastName?.[0] ?? ""}`}
                      </span>
                    </div>
                    <div className="w-[calc(100%-2rem)] pl-2">
                      <div className="mb-1 w-full rounded-xl bg-[#F1F2F6] p-3 text-sm">
                        <p>{chat.content}</p>
                        {chat?.rfqProductPriceRequest && (
                          <div>
                            <p>
                              Requested Price: $
                              {chat.rfqProductPriceRequest?.requestedPrice}
                            </p>
                            <p>
                              status:
                              {chat.rfqProductPriceRequest?.status ===
                              "APPROVED" ? (
                                <span className="rounded-sm bg-blue-700 p-0.5 text-white">
                                  Approved
                                </span>
                              ) : chat.rfqProductPriceRequest?.status ===
                                "REJECTED" ? (
                                <span className="rounded-sm bg-red-600 p-0.5 text-white">
                                  Rejected
                                </span>
                              ) : (
                                <span className="rounded-sm bg-yellow-700 p-0.5 text-white">
                                  Pending
                                </span>
                              )}
                            </p>
                            {chat.rfqProductPriceRequest?.status ===
                              "PENDING" && (
                              <div className="mt-2">
                                <button
                                  onClick={() =>
                                    handlePriceStatus(
                                      chat.rfqProductPriceRequest,
                                      RfqProductPriceRequestStatus.APPROVED,
                                    )
                                  }
                                  type="button"
                                  className="me-2 rounded-lg bg-blue-700 px-2 py-2 text-white hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() =>
                                    handlePriceStatus(
                                      chat.rfqProductPriceRequest,
                                      RfqProductPriceRequestStatus.REJECTED,
                                    )
                                  }
                                  type="button"
                                  className="me-2 rounded-lg bg-red-700 px-2 py-2 text-white hover:bg-red-800 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="w-full text-left text-xs font-normal text-[#AEAFB8]">
                        <span>
                          {chat.createdAt
                            ? moment(chat.createdAt)
                                .startOf("seconds")
                                .fromNow()
                            : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 flex w-full flex-wrap items-end">
            {chatHistoryLoading ? "Loading..." : "No chat history found"}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerChatHistory;
