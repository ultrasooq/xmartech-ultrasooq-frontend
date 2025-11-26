import React, { useEffect, useRef } from "react";
import moment from "moment";
import { useAuth } from "@/context/AuthContext";
import { RfqProductPriceRequestStatus } from "@/utils/types/chat.types";
import { useSocket } from "@/context/SocketContext";
import { updateUnreadMessages } from "@/apis/requests/chat.requests";
import DownloadIconButton from "../DownloadIconButton";
import { useTranslations } from "next-intl";

interface SellerChatHistoryProps {
  roomId: number | null;
  selectedChatHistory: any[];
  chatHistoryLoading: boolean;
  updateRfqMessageCount: () => void;
  buyerId: number | undefined;
  rfqUserId: number;
  unreadMsgCount: number | 0;
  isUploadingCompleted?: boolean | null;
}

const SellerChatHistory: React.FC<SellerChatHistoryProps> = ({
  roomId,
  selectedChatHistory,
  chatHistoryLoading,
  updateRfqMessageCount,
  buyerId,
  unreadMsgCount,
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

  // Helper function to get user initials
  const getUserInitials = (chatUser: any) => {
    if (!chatUser) return "";
    
    // Prioritize accountName (new account system)
    if (chatUser.accountName) {
      const cleanAccountName = chatUser.accountName.trim();
      if (cleanAccountName.length > 0) {
        // Get first letter, or first two letters if single word
        const words = cleanAccountName.split(/\s+/).filter(w => w.length > 0);
        if (words.length >= 2) {
          return `${words[0][0]}${words[1][0]}`.toUpperCase();
        } else if (words.length === 1) {
          return words[0][0].toUpperCase();
        }
      }
    }
    
    // Fallback to firstName + lastName
    if (chatUser.firstName || chatUser.lastName) {
      const firstInitial = chatUser.firstName?.[0] || "";
      const lastInitial = chatUser.lastName?.[0] || "";
      return `${firstInitial}${lastInitial}`.toUpperCase();
    }
    
    // Fallback to email
    if (chatUser.email) {
      return chatUser.email[0].toUpperCase();
    }
    
    return "U"; // Default fallback
  };

  return (
    <div className="flex flex-col">
      {/* Chat Header */}
      <div className="flex min-h-[60px] items-center border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
            <svg
              className="h-5 w-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-gray-900" translate="no">
            {t("messages") || "Messages"}
          </h3>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div ref={chatContainerRef} className="h-[500px] w-full overflow-y-auto bg-gray-50 px-6 py-6">
        <div className="d-flex w-full space-y-1">
        {selectedChatHistory.length > 0 ? (
          <div>
            {selectedChatHistory.map((chat: any, index: number) => (
              <div key={index}>
                {chat?.userId === user?.id ? (
                  <div className="mb-5 flex w-full items-end justify-end gap-3">
                    {/* Message Content */}
                    <div className="flex min-w-0 max-w-[75%] flex-col items-end gap-1.5">
                      {chat?.attachments?.length > 0 ? (
                        <div className="mb-2 w-full space-y-2">
                          {chat?.attachments.map((file: any, index: any) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                            >
                              <div className="flex-1">
                                {file?.fileType.includes("imag") &&
                                file?.presignedUrl ? (
                                  <img
                                    src={file?.presignedUrl}
                                    className="h-auto w-full max-w-sm rounded-lg"
                                  />
                                ) : (
                                  file?.fileType.includes("video") &&
                                  file?.presignedUrl ? (
                                    <video
                                      src={file?.presignedUrl}
                                      className="h-auto w-full max-w-sm rounded-lg"
                                      controls
                                    />
                                  ) : null
                                )}
                                <p className="mt-1 truncate text-sm font-medium text-gray-700">
                                  {file.fileName}
                                </p>
                                {file?.status === "UPLOADING" ? (
                                  <p className="truncate text-xs italic text-gray-500" translate="no">
                                    {t("uploading")}
                                  </p>
                                ) : (
                                  <p className="truncate text-xs italic text-gray-500">
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
                      {chat?.content ? (
                        <div className="rounded-2xl rounded-br-sm bg-blue-600 px-4 py-3 text-sm text-white shadow-lg ring-1 ring-blue-700/20">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: chat?.content,
                            }}
                          />

                          {chat?.rfqProductPriceRequest ? (
                            <div className="mt-3 space-y-2 rounded-lg bg-blue-700/40 p-3 ring-1 ring-blue-500/30">
                              <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-500/50">
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
                                <p className="text-xs font-medium text-blue-100" translate="no">
                                  {t("requested_for_offer_price")}
                                </p>
                              </div>
                              <p className="text-base font-bold text-white" translate="no">
                                {t("requested_price")}: {currency.symbol}
                                {chat.rfqProductPriceRequest?.requestedPrice}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-blue-100" translate="no">
                                  {t("status")}:
                                </span>
                                {chat.rfqProductPriceRequest?.status ===
                                "APPROVED" ? (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-green-500/90 px-2.5 py-0.5 text-xs font-semibold text-white ring-1 ring-green-400/50" translate="no">
                                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    {t("approved")}
                                  </span>
                                ) : chat.rfqProductPriceRequest?.status ===
                                  "REJECTED" ? (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-red-500/90 px-2.5 py-0.5 text-xs font-semibold text-white ring-1 ring-red-400/50" translate="no">
                                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    {t("rejected")}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2.5 py-0.5 text-xs font-semibold text-white ring-1 ring-amber-400/50" translate="no">
                                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    {t("pending")}
                                  </span>
                                )}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                      {/* Timestamp */}
                      <div className="mr-1 text-xs font-normal text-gray-400">
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
                    {/* Avatar */}
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-semibold text-white shadow-md ring-2 ring-white">
                      {getUserInitials(chat?.user)}
                    </div>
                  </div>
                ) : (
                  (chat?.attachments?.length > 0 || chat?.content) ? (
                    <div className="mb-5 flex w-full items-start gap-3">
                      {/* Avatar */}
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-sm font-semibold text-white shadow-md ring-2 ring-white">
                        {getUserInitials(chat?.user)}
                      </div>
                      
                      {/* Message Content */}
                      <div className="flex min-w-0 max-w-[65%] flex-col gap-1.5">
                        {chat?.attachments?.length > 0 ? (
                          <div className="mb-2 w-full space-y-2">
                            {chat?.attachments.map(
                              (file: any, index: any) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                                >
                                  <div className="flex-1">
                                    {file?.fileType.includes("imag") &&
                                    file?.presignedUrl ? (
                                      <img
                                        src={file?.presignedUrl}
                                        className="h-auto w-full max-w-sm rounded-lg"
                                      />
                                    ) : (
                                      file?.fileType.includes("video") &&
                                      file?.presignedUrl ? (
                                        <video
                                          src={file?.presignedUrl}
                                          className="h-auto w-full max-w-sm rounded-lg"
                                          controls
                                        />
                                      ) : null
                                    )}
                                    <p className="mt-1 truncate text-sm font-medium text-gray-700">
                                      {file.fileName}
                                    </p>
                                    {file?.status === "UPLOADING" ? (
                                      <p className="truncate text-xs italic text-gray-500" translate="no">
                                        {t("uploading")}
                                      </p>
                                    ) : (
                                      <p className="truncate text-xs italic text-gray-500">
                                        {file?.status}
                                      </p>
                                    )}
                                  </div>
                                  <DownloadIconButton
                                    attachmentId={file?.id}
                                    filePath={file?.filePath}
                                  />
                                </div>
                              ),
                            )}
                          </div>
                        ) : null}
                        
                        {/* Regular Message or Price Request */}
                        {chat?.content ? (
                          chat?.rfqProductPriceRequest ? (
                            /* Price Request Card */
                            <div className="overflow-hidden rounded-2xl rounded-tl-sm bg-white shadow-md ring-1 ring-gray-200">
                              {/* Price Request Content */}
                              {chat?.content && !chat?.content.match(/^\s*$/) && (
                                <div className="border-b border-gray-100 px-4 py-3">
                                  <p
                                    className="text-sm text-gray-800"
                                    dangerouslySetInnerHTML={{
                                      __html: chat?.content,
                                    }}
                                  />
                                </div>
                              )}
                              
                              {/* Price Request Details */}
                              <div className="bg-gradient-to-br from-gray-50 to-white p-4">
                                <div className="mb-3 flex items-center gap-2">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                                    <svg
                                      className="h-5 w-5 text-blue-600"
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
                                  <p className="text-sm font-semibold text-gray-900" translate="no">
                                    {t("requested_for_offer_price")}
                                  </p>
                                </div>
                                
                                <div className="mb-3 rounded-lg bg-white p-3 shadow-sm">
                                  <p className="mb-1 text-xs font-medium text-gray-500" translate="no">
                                    {t("requested_price")}
                                  </p>
                                  <p className="text-xl font-bold text-gray-900" translate="no">
                                    {currency.symbol}
                                    {chat.rfqProductPriceRequest?.requestedPrice}
                                  </p>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-gray-600" translate="no">
                                      {t("status")}:
                                    </span>
                                    {chat.rfqProductPriceRequest?.status ===
                                    "APPROVED" ? (
                                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-green-200" translate="no">
                                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {t("approved")}
                                      </span>
                                    ) : chat.rfqProductPriceRequest?.status ===
                                      "REJECTED" ? (
                                      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-200" translate="no">
                                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        {t("rejected")}
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200" translate="no">
                                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        {t("pending")}
                                      </span>
                                    )}
                                  </div>
                                  
                                  {/* Action Buttons for Pending Status - Only show if current user is NOT the one who requested */}
                                  {chat.rfqProductPriceRequest?.status ===
                                    "PENDING" &&
                                    chat.rfqProductPriceRequest?.requestedById !== user?.id ? (
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() =>
                                          handlePriceStatus(
                                            chat.rfqProductPriceRequest,
                                            RfqProductPriceRequestStatus.APPROVED,
                                          )
                                        }
                                        type="button"
                                        className="flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md"
                                        translate="no"
                                      >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {t("accept")}
                                      </button>
                                      <button
                                        onClick={() =>
                                          handlePriceStatus(
                                            chat.rfqProductPriceRequest,
                                            RfqProductPriceRequestStatus.REJECTED,
                                          )
                                        }
                                        type="button"
                                        className="flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-red-700 hover:shadow-md"
                                        translate="no"
                                      >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        {t("reject")}
                                      </button>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* Regular Text Message */
                            <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm text-gray-800 shadow-sm ring-1 ring-gray-200">
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: chat?.content,
                                }}
                              />
                            </div>
                          )
                        ) : null}
                        
                        {/* Timestamp */}
                        <div className="ml-1 text-xs font-normal text-gray-400">
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
                  ) : null
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 flex w-full flex-wrap items-end" dir={langDir} translate="no">
            {chatHistoryLoading ? t("loading") : t("no_chat_history_found")}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default SellerChatHistory;
