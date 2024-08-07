import React, { useEffect, useRef } from "react";
import moment from "moment";
import { useAuth } from "@/context/AuthContext";
import { useSocket } from "@/context/SocketContext";
import { RfqProductPriceRequestStatus } from "@/utils/types/chat.types";
import { updateUnreadMessages } from "@/apis/requests/chat.requests";

interface RfqRequestChatHistoryProps {
    roomId: number | null;
    selectedChatHistory: any[];
    chatHistoryLoading: boolean;
    activeSellerId: number | undefined;
    unreadMsgCount: number | 0;
    rfqUserId: number;
    updateVendorMessageCount: () => void;
}

const RfqRequestChatHistory: React.FC<RfqRequestChatHistoryProps> = ({ roomId, selectedChatHistory, chatHistoryLoading, activeSellerId, unreadMsgCount, updateVendorMessageCount, rfqUserId }) => {
    const { user } = useAuth();
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { updateRfqRequestStatus } = useSocket();

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [selectedChatHistory]);

    useEffect(() => {
        if (unreadMsgCount) handleUnreadMessages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeSellerId, roomId])

    const handlePriceStatus = async (chat: { id: number; requestedPrice: number; rfqQuoteProductId: number }, status: RfqProductPriceRequestStatus) => {
        try {
            const payload = {
                id: chat.id,
                status,
                roomId: roomId,
                rfqUserId,
                requestedPrice: chat.requestedPrice,
                rfqQuoteProductId: chat.rfqQuoteProductId
            }
            updateRfqRequestStatus(payload)
        } catch (error) {
        }
    }

    const handleUnreadMessages = async () => {
        try {
            if (user?.id && roomId && activeSellerId) {
                const payload = {
                    userId: activeSellerId,
                    roomId: roomId
                }
                await updateUnreadMessages(payload)
                updateVendorMessageCount()
            }
        } catch (error) {
        }
    }

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
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: chat?.content,
                                                    }}
                                                />
                                                {chat?.rfqProductPriceRequest && (
                                                    <div>
                                                        <p>Requested Price: ${chat.rfqProductPriceRequest?.requestedPrice}</p>
                                                        <p>status:
                                                            {chat.rfqProductPriceRequest?.status === "APPROVED" ?
                                                                <span className="text-white bg-blue-700 p-0.5 rounded-sm">Approved</span>
                                                                : chat.rfqProductPriceRequest?.status === "REJECTED" ?
                                                                    <span className="text-white bg-red-600 p-0.5 rounded-sm">Rejected</span> : <span className="text-white bg-yellow-700 p-0.5 rounded-sm">Pending</span>
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="w-full text-right text-xs font-normal text-[#AEAFB8]">
                                                {chat?.status === "SD" ?
                                                    <span>Sending...</span> :
                                                    <span>
                                                        {chat.createdAt
                                                            ? moment(chat.createdAt)
                                                                .startOf("seconds")
                                                                .fromNow()
                                                            : ""
                                                        }
                                                    </span>
                                                }
                                            </div>
                                        </div>
                                        <div className="h-[32px] w-[32px] rounded-full bg-[#F1F2F6]">
                                            <span className="flex items-center justify-center h-full w-full">
                                                {`${chat?.user?.firstName?.[0] ?? ''}${chat?.user?.lastName?.[0] ?? ''}`}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-5 flex w-full flex-wrap items-end">
                                        <div className="h-[32px] w-[32px] rounded-full bg-[#F1F2F6]">
                                            <span className="flex items-center justify-center h-full w-full">
                                                {`${chat?.user?.firstName?.[0] ?? ''}${chat?.user?.lastName?.[0] ?? ''}`}
                                            </span>
                                        </div>
                                        <div className="w-[calc(100%-2rem)] pl-2">
                                            <div className="mb-1 w-full rounded-xl bg-[#F1F2F6] p-3 text-sm">
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: chat?.content,
                                                    }}
                                                />
                                                {chat?.rfqProductPriceRequest && (
                                                    <div>
                                                        <p>Requested Price: ${chat.rfqProductPriceRequest?.requestedPrice}</p>
                                                        <p>status:
                                                            {chat.rfqProductPriceRequest?.status === "APPROVED" ?
                                                                <span className="text-white bg-blue-700 p-0.5 rounded-sm">Approved</span>
                                                                : chat.rfqProductPriceRequest?.status === "REJECTED" ?
                                                                    <span className="text-white bg-red-600 p-0.5 rounded-sm">Rejected</span> : <span className="text-white bg-yellow-700 p-0.5 rounded-sm">Pending</span>
                                                            }
                                                        </p>
                                                        {chat.rfqProductPriceRequest?.status === "PENDING" && (
                                                            <div className="mt-2">
                                                                <button onClick={() => handlePriceStatus(chat.rfqProductPriceRequest, RfqProductPriceRequestStatus.APPROVED)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-2 py-2 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Accept</button>
                                                                <button onClick={() => handlePriceStatus(chat.rfqProductPriceRequest, RfqProductPriceRequestStatus.REJECTED)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 rounded-lg px-2 py-2 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Reject</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="w-full text-left text-xs font-normal text-[#AEAFB8]">
                                                {chat?.status === "SD" ?
                                                    <span>Sending...</span> :
                                                    <span>
                                                        {chat.createdAt
                                                            ? moment(chat.createdAt)
                                                                .startOf("seconds")
                                                                .fromNow()
                                                            : ""
                                                        }
                                                    </span>
                                                }
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

export default RfqRequestChatHistory;
