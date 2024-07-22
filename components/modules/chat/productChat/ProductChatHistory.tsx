import React, { useEffect, useRef } from "react";
import moment from "moment";
import { useAuth } from "@/context/AuthContext";
import { updateUnreadMessages } from "@/apis/requests/chat.requests";

interface ProductChatHistoryProps {
  roomId?: number | null;
  selectedChatHistory: any[];
  chatHistoryLoading?: boolean;
  buyerId?: number | undefined;
  unreadMsgCount?: number | 0;
  updateMessageCount: () => void
}

const ProductChatHistory: React.FC<ProductChatHistoryProps> = ({
  roomId,
  selectedChatHistory,
  chatHistoryLoading,
  buyerId,
  unreadMsgCount,
  updateMessageCount
}) => {
  const { user } = useAuth();
  const chatContainerRef = useRef<HTMLDivElement>(null);

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

  const handleUnreadMessages = async () => {
    try {
      if (user?.id && roomId && buyerId) {
        const payload = {
          userId: buyerId,
          roomId: roomId,
        };
        await updateUnreadMessages(payload);
        updateMessageCount()
      }
    } catch (error) { }
  };

  return (
    <div ref={chatContainerRef} className="h-[300px] w-full overflow-y-auto">
      <div className="d-flex w-full">
        {selectedChatHistory?.length > 0 ? (
          <div>
            {selectedChatHistory?.map((chat: any, index: number) => (
              <div key={index}>
                {chat?.userId === user?.id ? (
                  <div className="mt-5 flex w-full flex-wrap items-end">
                    <div className="w-[calc(100%-2rem)] pr-2 text-right">
                      <div className="mb-1 inline-block w-auto rounded-xl bg-[#0086FF] p-3 text-right text-sm text-white">
                        <p>{chat.content}</p>
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

export default ProductChatHistory;
