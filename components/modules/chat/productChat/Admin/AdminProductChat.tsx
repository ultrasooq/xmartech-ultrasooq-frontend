import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import AttachIcon from "@/public/images/attach.svg";
import { useToast } from "@/components/ui/use-toast";
import SmileIcon from "@/public/images/smile.svg";
import SendIcon from "@/public/images/send-button.png";
import ProductChatHistory from "../ProductChatHistory";
import { useSocket } from "@/context/SocketContext";
import { getChatHistory, getProductMessages, updateUnreadMessages } from "@/apis/requests/chat.requests";
import { useAuth } from "@/context/AuthContext";
import ProductMessage from "./ProductMessage";
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface ProductMessageProps {
  user: {
    firstName: string;
    lastName: string;
    profilePicture: string;
  },
  room: {
    id: number
  },
  content: string,
  createdAt: string,
  unreadMsgCount: string
}

interface AdminProductChatProps {
  productId: number;
  sellerId: number;
  productDetails: any
}

const AdminProductChat: React.FC<AdminProductChatProps> = ({ productId, productDetails, sellerId }) => {
  const [message, setMessage] = useState<string>('');
  const [chatHistoryLoading, setChatHistoryLoading] = useState<boolean>(false)
  const [selectedChatHistory, setSelectedChatHistory] = useState<any>([]);
  const [productMessages, setProductMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [selectedProductMessage, setSelectedProductMessage] = useState<any>(null);
  const [showEmoji, setShowEmoji] = useState<boolean>(false)

  const { sendMessage, cratePrivateRoom, newMessage } = useSocket()
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (productId && sellerId) handleGetProductMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedRoomId) {
      handleChatHistory()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoomId]);

  // receive a message
  useEffect(() => {
    if (newMessage) {
      handleNewMessage(newMessage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  const handleGetProductMessages = async () => {
    try {
      setLoading(true)
      const res = await getProductMessages(productId, sellerId);
      if (res?.data?.status === 200) {
        if (res?.data?.data?.length > 0) {
          const roomId: number = res?.data?.data[0]?.room?.id
          setSelectedRoomId(roomId)
          setSelectedProductMessage(res?.data?.data[0]);
        }
        setProductMessages(res.data.data)
      } else {
        toast({
          title: "Chat",
          description: "Failed to get Product Messages",
          variant: "danger",
        });
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast({
        title: "Chat",
        description: "Failed to get Product Messages",
        variant: "danger",
      });
    }
  }

  const handleChatHistory = async () => {
    try {
      setChatHistoryLoading(true)
      const payload = {
        roomId: selectedRoomId
      }
      const res = await getChatHistory(payload);
      if (res?.data?.status === 200) {
        setSelectedChatHistory(res.data.data)
      }
      setChatHistoryLoading(false)
    } catch (error) {
      setChatHistoryLoading(false)
    }
  }

  const handleSendMessage = async () => {
    try {
      if (message) {
        if (selectedRoomId) {
          sendNewMessage(selectedRoomId, message)
        } else {
          handleCreateRoom(message);
        }
        setMessage("");
        setShowEmoji(false);
      } else {
        toast({
          title: "Chat",
          description: "Please type your message",
          variant: "danger",
        });
      }
    } catch (error) {
      toast({
        title: "Chat",
        description: "Failed!",
        variant: "danger",
      });
    }
  }

  const sendNewMessage = (roomId: number, content: string, rfqQuoteProductId?: number, sellerUserId?: number, requestedPrice?: number) => {
    const msgPayload = {
      roomId: roomId,
      content,
      rfqId: productDetails?.id,
      requestedPrice,
      rfqQuoteProductId,
      sellerId: sellerUserId,
      rfqQuotesUserId: null
    }
    sendMessage(msgPayload)
  }

  const handleNewMessage = (message: any) => {
    try {
      const index = productMessages.findIndex((pMessage: any) => pMessage?.roomId === message?.roomId);
      const pList = [...productMessages];
      if (index !== -1) {
        const [item] = pList.splice(index, 1);
        let newItem = {
          ...item,
          content: message.content,
          createdAt: message.createdAt
        }
        if (selectedRoomId !== message?.roomId) {
          newItem = {
            ...newItem,
            unreadMsgCount: newItem?.unreadMsgCount ? newItem?.unreadMsgCount + 1 : 1,
          }
        }
        pList.unshift(newItem);
        setProductMessages(pList);
      } else {
        const newUser = {
          ...message,
          user: message.user,
          room: {
            id: message.roomId
          },
          userId: message.userId,
          unreadMsgCount: 1
        }
        pList.unshift(newUser);
        setProductMessages(pList);
        if (!selectedProductMessage) {
          setSelectedProductMessage(newUser)
        }
      }

      if (selectedRoomId === message?.roomId || !selectedRoomId) {
        const chatHistory = [...selectedChatHistory]
        chatHistory.push(message);
        setSelectedChatHistory(chatHistory)
      } if (!selectedRoomId) {
        setSelectedRoomId(message.roomId)
      }
      // UPDATE UNREAD MESSAGE
      handleUpdateNewMessageStatus(message)
    } catch (error) { }
  }

  const handleUpdateNewMessageStatus = async (message: any) => {
    try {
      if (selectedRoomId !== null && message?.userId === selectedProductMessage?.user.id) {
        const payload = {
          userId: selectedProductMessage?.user?.id,
          roomId: selectedRoomId
        }
        await updateUnreadMessages(payload)
      }
    } catch (error) {

    }
  }

  const updateMessageCount = () => {
    const index = productMessages.findIndex((pMessage) => pMessage.userId === selectedProductMessage?.userId);
    if (index !== -1) {
      const pList = [...productMessages];
      pList[index]["unreadMsgCount"] = 0;
      setProductMessages(pList)
    }
  }

  const handleSendMessageKeyDown = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCreateRoom = async (content: string, rfqQuoteProductId?: number, sellerUserId?: number, requestedPrice?: number) => {
    try {
      if (sellerId && user) {
        const payload = {
          participants: [user?.id, sellerId],
          content,
          rfqId: productDetails?.id,
          requestedPrice,
          rfqQuoteProductId,
          sellerId: sellerUserId,
          rfqQuotesUserId: null
        }
        cratePrivateRoom(payload);
      }
    } catch (error) {
      return ""
    }
  }

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setMessage(prevMessage => prevMessage + emojiObject.emoji);
  }

  return (
    <>
      <div className="w-[20%] border-r border-solid border-gray-300">
        <div className="flex h-[55px] min-w-full items-center border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
          <span>Messages</span>
        </div>
        <div className="w-full overflow-y-auto p-4">
          {loading ? (
            <div className="my-2 space-y-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : null}

          {!loading && !productMessages?.length ? (
            <div className="my-2 space-y-2">
              <p className="text-center text-sm font-normal text-gray-500">
                No message found
              </p>
            </div>
          ) : null}

          {productMessages?.map(
            (item: ProductMessageProps, index) => (
              <ProductMessage
                key={index}
                message={item}
                isSelected={selectedRoomId === item?.room?.id}
                onClick={() => {
                  setSelectedRoomId(item?.room?.id)
                  setSelectedProductMessage(item)
                }}
              />
            )
          )}
        </div>
      </div>
      <div className="w-[65%] border-r border-solid border-gray-300">
        <div className="flex w-full flex-wrap p-[20px]">
          <ProductChatHistory
            selectedChatHistory={selectedChatHistory}
            chatHistoryLoading={chatHistoryLoading}
            buyerId={selectedProductMessage?.user?.id}
            roomId={selectedRoomId}
            unreadMsgCount={selectedProductMessage?.unreadMsgCount}
            updateMessageCount={updateMessageCount}
          />
        </div>
        {productDetails && productMessages?.length > 0 ? (
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
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  onKeyDown={handleSendMessageKeyDown}
                ></textarea>
              </div>
              <div className="flex w-[72px] items-center justify-between">
                <div className="w-auto">
                  <Image src={SmileIcon} alt="smile-icon" onClick={() => setShowEmoji(!showEmoji)} />
                </div>
                <div className="flex w-auto">
                  <button type="button" className="">
                    <Image src={SendIcon} alt="send-icon" onClick={handleSendMessage} />
                  </button>
                </div>
              </div>
            </div>
            {showEmoji && (
              <div className="w-full mt-2 border-t border-solid">
                <EmojiPicker onEmojiClick={onEmojiClick} className="mt-2" />
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AdminProductChat;
