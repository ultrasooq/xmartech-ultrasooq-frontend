import React, { useEffect, useRef } from "react";
import moment from "moment";
import { useAuth } from "@/context/AuthContext";
import { useSocket } from "@/context/SocketContext";
import { RfqProductPriceRequestStatus } from "@/utils/types/chat.types";
import { updateUnreadMessages } from "@/apis/requests/chat.requests";
import DownloadIconButton from "../DownloadIconButton";
import { useTranslations } from "next-intl";

interface RfqRequestChatHistoryProps {
  roomId: number | null;
  selectedChatHistory: any[];
  chatHistoryLoading: boolean;
  activeSellerId: number | undefined;
  unreadMsgCount: number | 0;
  rfqUserId: number;
  updateVendorMessageCount: () => void;
  isUploadingCompleted?: boolean | null;
}

const RfqRequestChatHistory: React.FC<RfqRequestChatHistoryProps> = ({
  roomId,
  selectedChatHistory,
  chatHistoryLoading,
  activeSellerId,
  unreadMsgCount,
  updateVendorMessageCount,
  rfqUserId,
  isUploadingCompleted,
}) => {
  const t = useTranslations();
  const { user, currency, langDir } = useAuth();
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
  }, [activeSellerId, roomId]);

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
      if (user?.id && roomId && activeSellerId) {
        const payload = {
          userId: activeSellerId,
          roomId: roomId,
        };
        await updateUnreadMessages(payload);
        updateVendorMessageCount();
      }
    } catch (error) {}
  };

  return (
    <div
      ref={chatContainerRef}
      className="h-[500px] w-full overflow-y-auto px-4 py-4"
    >
      <div className="d-flex w-full">
        {selectedChatHistory.length > 0 ? (
          <div>
            {selectedChatHistory.map((chat: any, index: number) => (
              <div key={index}>
                {chat?.userId === user?.id ? (
                  <div className="mt-5 flex w-full flex-wrap items-end">
                    <div className="w-[calc(100%-2rem)] pr-2 text-right">
                      <div className="mb-1 inline-block w-auto rounded-xl p-3 text-right text-sm">
                        {chat?.attachments?.length > 0 ? (
                          <div className="mb-2 w-full">
                            {chat?.attachments.map((file: any, index: any) => (
                              <div
                                key={index}
                                className="mb-2 flex items-center justify-between rounded-md border border-gray-300 p-2"
                              >
                                <div className="flex-1">
                                  {file?.fileType.includes("imag") &&
                                  file?.presignedUrl ? (
                                    <img
                                      src={file?.presignedUrl}
                                      className="h-auto w-full max-w-sm"
                                    />
                                  ) : file?.fileType.includes("video") &&
                                    file?.presignedUrl ? (
                                    <video
                                      src={file?.presignedUrl}
                                      className="h-auto w-full max-w-sm"
                                      controls
                                    />
                                  ) : null}
                                  <p className="mr-2 truncate">
                                    {file.fileName}
                                  </p>
                                  {file?.status === "UPLOADING" ? (
                                    <p
                                      className="mr-2 truncate text-xs italic"
                                      translate="no"
                                    >
                                      {t("uploading")}
                                    </p>
                                  ) : (
                                    <p className="mr-2 truncate text-xs italic">
                                      {file?.status}
                                    </p>
                                  )}
                                </div>
                                <DownloadIconButton
                                  attachmentId={file?.id}
                                  filePath={file?.filePath}
                                />
                              </div>
                            ))}
                          </div>
                        ) : null}
                        <span translate="no">
                          {isUploadingCompleted
                            ? t("attachments_uploading")
                            : ""}
                        </span>
                        {chat?.content ? (
                          <div className="inline-block w-auto rounded-xl bg-blue-600 p-3 text-right text-sm text-white shadow-md">
                            <p
                              dangerouslySetInnerHTML={{
                                __html: chat?.content,
                              }}
                            />
                          </div>
                        ) : null}

                        {chat?.rfqProductPriceRequest ? (
                          <div className="mt-3 rounded-xl border-2 border-gray-200 bg-gray-50 p-4 shadow-md">
                            <div className="mb-3 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 shadow-sm">
                                  <svg
                                    className="h-4 w-4 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <p
                                    className="text-xs font-medium text-gray-500"
                                    translate="no"
                                  >
                                    {t("requested_price")}
                                  </p>
                                  <p
                                    className="text-lg font-bold text-gray-900"
                                    translate="no"
                                  >
                                    {currency.symbol}
                                    {
                                      chat.rfqProductPriceRequest
                                        ?.requestedPrice
                                    }
                                  </p>
                                </div>
                              </div>
                              {chat.rfqProductPriceRequest?.status ===
                              "APPROVED" ? (
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1.5 shadow-lg shadow-green-500/30">
                                  <svg
                                    className="h-4 w-4 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span
                                    className="text-xs font-bold text-white"
                                    translate="no"
                                  >
                                    {t("approved")}
                                  </span>
                                </div>
                              ) : chat.rfqProductPriceRequest?.status ===
                                "REJECTED" ? (
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 shadow-lg shadow-red-500/30">
                                  <svg
                                    className="h-4 w-4 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span
                                    className="text-xs font-bold text-white"
                                    translate="no"
                                  >
                                    {t("rejected")}
                                  </span>
                                </div>
                              ) : (
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-1.5 shadow-lg shadow-amber-500/30">
                                  <svg
                                    className="h-4 w-4 animate-pulse text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span
                                    className="text-xs font-bold text-white"
                                    translate="no"
                                  >
                                    {t("pending")}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : null}
                      </div>

                      <div className="w-full text-right text-xs font-normal text-[#AEAFB8]">
                        {chat?.status === "SD" ? (
                          <span translate="no">{t("sending")}</span>
                        ) : (
                          <span>
                            {chat.createdAt
                              ? moment(chat.createdAt)
                                  .startOf("seconds")
                                  .fromNow()
                              : ""}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="h-[32px] w-[32px] rounded-full bg-[#F1F2F6]">
                      <span className="flex h-full w-full items-center justify-center">
                        {`${chat?.user?.firstName?.[0] ?? ""}${chat?.user?.lastName?.[0] ?? ""}`}
                      </span>
                    </div>
                  </div>
                ) : chat?.attachments?.length > 0 || chat?.content ? (
                  <div className="mt-5 flex w-full flex-wrap items-end">
                    <div className="h-[32px] w-[32px] rounded-full bg-[#F1F2F6]">
                      <span className="flex h-full w-full items-center justify-center">
                        {`${chat?.user?.firstName?.[0] ?? ""}${chat?.user?.lastName?.[0] ?? ""}`}
                      </span>
                    </div>
                    <div className="w-[calc(100%-2rem)] pl-2">
                      <div className="mb-1 inline-block w-auto rounded-xl p-3 text-left text-sm">
                        {chat?.attachments?.length > 0 ? (
                          <div className="mb-2 w-full">
                            {chat?.attachments.map((file: any, index: any) => (
                              <div
                                key={index}
                                className="mb-2 flex items-center justify-between rounded-md border border-gray-300 p-2"
                              >
                                <div className="flex-1">
                                  {file?.fileType.includes("imag") &&
                                  file?.presignedUrl ? (
                                    <img
                                      src={file?.presignedUrl}
                                      className="h-auto w-full max-w-sm"
                                    />
                                  ) : file?.fileType.includes("video") &&
                                    file?.presignedUrl ? (
                                    <video
                                      src={file?.presignedUrl}
                                      className="h-auto w-full max-w-sm"
                                      controls
                                    />
                                  ) : null}
                                  <p className="mr-2 truncate">
                                    {file.fileName}
                                  </p>
                                  {file?.status === "UPLOADING" ? (
                                    <p className="mr-2 truncate text-xs italic">
                                      {t("uploading")}
                                    </p>
                                  ) : (
                                    <p className="mr-2 truncate text-xs italic">
                                      {file?.status}
                                    </p>
                                  )}
                                </div>
                                <DownloadIconButton
                                  attachmentId={file?.id}
                                  filePath={file?.filePath}
                                />
                              </div>
                            ))}
                          </div>
                        ) : null}
                        <span translate="no">
                          {isUploadingCompleted
                            ? t("attachments_uploading")
                            : ""}
                        </span>
                        {chat?.content ? (
                          <div className="inline-block w-auto rounded-xl border border-gray-300 bg-gray-200 p-3 text-left text-sm text-gray-800 shadow-sm">
                            <p
                              dangerouslySetInnerHTML={{
                                __html: chat?.content,
                              }}
                            />
                          </div>
                        ) : null}

                        {chat?.rfqProductPriceRequest ? (
                          <div className="mt-3 rounded-xl border-2 border-gray-200 bg-gray-50 p-4 shadow-md">
                            <div className="mb-3 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 shadow-sm">
                                  <svg
                                    className="h-4 w-4 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <p
                                    className="text-xs font-medium text-gray-500"
                                    translate="no"
                                  >
                                    {t("requested_price")}
                                  </p>
                                  <p
                                    className="text-lg font-bold text-gray-900"
                                    translate="no"
                                  >
                                    {currency.symbol}
                                    {
                                      chat.rfqProductPriceRequest
                                        ?.requestedPrice
                                    }
                                  </p>
                                </div>
                              </div>
                              {chat.rfqProductPriceRequest?.status ===
                              "APPROVED" ? (
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1.5 shadow-lg shadow-green-500/30">
                                  <svg
                                    className="h-4 w-4 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span
                                    className="text-xs font-bold text-white"
                                    translate="no"
                                  >
                                    {t("approved")}
                                  </span>
                                </div>
                              ) : chat.rfqProductPriceRequest?.status ===
                                "REJECTED" ? (
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 shadow-lg shadow-red-500/30">
                                  <svg
                                    className="h-4 w-4 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span
                                    className="text-xs font-bold text-white"
                                    translate="no"
                                  >
                                    {t("rejected")}
                                  </span>
                                </div>
                              ) : (
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-1.5 shadow-lg shadow-amber-500/30">
                                  <svg
                                    className="h-4 w-4 animate-pulse text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span
                                    className="text-xs font-bold text-white"
                                    translate="no"
                                  >
                                    {t("pending")}
                                  </span>
                                </div>
                              )}
                            </div>
                            {/* Action Buttons for Pending Status - Only show if current user is NOT the one who requested */}
                            {/* First vendor price is auto-approved, so it won't show as PENDING */}
                            {chat.rfqProductPriceRequest?.status ===
                            "PENDING" &&
                            chat.rfqProductPriceRequest?.requestedById &&
                            chat.rfqProductPriceRequest?.requestedById !== user?.id ? (
                              <div className="mt-3 flex gap-2">
                                <button
                                  onClick={() =>
                                    handlePriceStatus(
                                      chat.rfqProductPriceRequest,
                                      RfqProductPriceRequestStatus.APPROVED,
                                    )
                                  }
                                  type="button"
                                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
                                >
                                  <svg
                                    className="h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  {t("accept") || "Accept"}
                                </button>
                                <button
                                  onClick={() =>
                                    handlePriceStatus(
                                      chat.rfqProductPriceRequest,
                                      RfqProductPriceRequestStatus.REJECTED,
                                    )
                                  }
                                  type="button"
                                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
                                >
                                  <svg
                                    className="h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  {t("reject") || "Reject"}
                                </button>
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                      <div className="w-full text-left text-xs font-normal text-[#AEAFB8]">
                        {chat?.status === "SD" ? (
                          <span translate="no">{t("sending")}</span>
                        ) : (
                          <span>
                            {chat.createdAt
                              ? moment(chat.createdAt)
                                  .startOf("seconds")
                                  .fromNow()
                              : ""}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div
            className="mt-5 flex w-full flex-wrap items-end"
            dir={langDir}
            translate="no"
          >
            {chatHistoryLoading ? t("loading") : t("no_chat_history_found")}
          </div>
        )}
      </div>
    </div>
  );
};

export default RfqRequestChatHistory;
