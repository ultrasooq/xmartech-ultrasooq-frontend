import React, { useState, useEffect } from "react";
import { useGetProductDetails } from "@/apis/queries/chat.queries";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import AttachIcon from "@/public/images/attach.svg";
import { useToast } from "@/components/ui/use-toast";
import SmileIcon from "@/public/images/smile.svg";
import SendIcon from "@/public/images/send-button.png";
import ProductChatHistory from "./ProductChatHistory";
import { useSocket } from "@/context/SocketContext";
import { findRoomId, getChatHistory } from "@/apis/requests/chat.requests";
import { useAuth } from "@/context/AuthContext";
import AdminProductChat from "./Admin/AdminProductChat";

interface ProductChatProps {
  productId: number;
}

const ProductChat: React.FC<ProductChatProps> = ({ productId }) => {
  const [message, setMessage] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [chatHistoryLoading, setChatHistoryLoading] = useState<boolean>(false)
  const [selectedChatHistory, setSelectedChatHistory] = useState<any>([]);
  const { sendMessage, cratePrivateRoom, newMessage } = useSocket()
  const { toast } = useToast();
  const { user } = useAuth();

  const product = useGetProductDetails(productId);
  const productDetails = product?.data?.data;
  const sellerId = productDetails?.product_productPrice?.length > 0 ?
    productDetails?.product_productPrice[0].adminDetail?.id : null;

  // check room id
  useEffect(() => {
    if (sellerId && user?.id !== sellerId) {
      checkRoomId()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellerId]);

  useEffect(() => {
    if (selectedRoom && user?.id !== sellerId) {
      handleChatHistory()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoom]);

  // receive a messaage
  useEffect(() => {
    if (newMessage) {
      handleNewMessage(newMessage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  const checkRoomId = async () => {
    try {
      if (user?.id) {
        const payloadRoomFind = {
          userId: user?.id,
          rfqId: productDetails?.id
        }
        const room = await findRoomId(payloadRoomFind);
        if (room?.data?.roomId) {
          setSelectedRoom(room?.data?.roomId)
        } else {
          setSelectedRoom(null)
          setChatHistoryLoading(false)
          setSelectedChatHistory([])
        }
      }
    } catch (error) {
      setChatHistoryLoading(false)
    }
  }

  const handleChatHistory = async () => {
    try {
      setChatHistoryLoading(true)
      const payload = {
        roomId: selectedRoom
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
        if (selectedRoom) {
          sendNewMessage(selectedRoom, message)
        } else {
          handleCreateRoom(message);
        }
        setMessage("")
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
      const chatHistory = [...selectedChatHistory]
      chatHistory.push(message);
      setSelectedChatHistory(chatHistory)
      if(!selectedRoom) {
        setSelectedRoom(message?.roomId)
      }
    } catch (error) { }
  }

  const handleSendMessageKeyDown = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  const handleCreateRoom = async (content: string, rfqQuoteProductId?: number, sellerUserId?: number, requestedPrice?: number) => {
    try {
      if (sellerId) {
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

  return (
    <div>
      <div className="flex w-full rounded-sm border border-solid border-gray-300">
        <div className="w-[15%] border-r border-solid border-gray-300">
          <div className="flex h-[55px] min-w-full items-center border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
            <span>Product</span>
          </div>
          {productDetails && (
            <a
              target="_blank"
              href={`/trending/${productDetails?.id}`}
              className="max-h-[720px] w-full overflow-y-auto p-2"
            >
              <div className="px-4">
                <div className="flex w-full">
                  <div className="text-xs font-normal text-gray-500">
                    <div className="flex w-full flex-wrap">
                      <div className="border-color-[#DBDBDB] relative h-[48px] w-[48px] border border-solid p-2">
                        {productDetails?.productImages?.map((img: any) => (
                          <Image
                            key={img?.id}
                            src={img?.image}
                            fill
                            alt="preview"
                          />
                        ))}
                      </div>
                      <div className="font-nromal flex w-[calc(100%-3rem)] items-center justify-start pl-3 text-xs text-black">
                        {productDetails?.productName}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 w-[calc(100%-4rem)] items-center justify-start text-sm font-normal text-[#1D77D1]">
                  <span className="text-[#828593]">
                    SKU NO: {productDetails?.skuNo}
                  </span>
                </div>
              </div>
            </a>
          )}

          <div className="max-h-[720px] w-full overflow-y-auto p-2">
            {product?.isPending ? (
              <div className="my-2 space-y-2">
                {Array.from({ length: 1 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : null}

            {!product?.isPending && !productDetails ? (
              <div className="my-2 space-y-2">
                <p className="text-center text-sm font-normal text-gray-500">
                  No data found
                </p>
              </div>
            ) : null}
          </div>
        </div>
        {user?.id === sellerId ? (
          <AdminProductChat
            productId={productId}
            productDetails={productDetails}
            sellerId={sellerId}
          />
        ) : (
          <div className="w-[65%] border-r border-solid border-gray-300">
            <div className="flex w-full flex-wrap p-[20px]">
              <div className="mb-5 max-h-[300px] w-full overflow-y-auto">
              </div>
              <ProductChatHistory
                selectedChatHistory={selectedChatHistory}
              />
            </div>
            {productDetails && (
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
                      <Image src={SmileIcon} alt="smile-icon" />
                    </div>
                    <div className="flex w-auto">
                      <button type="button" className="">
                        <Image src={SendIcon} alt="send-icon" onClick={handleSendMessage} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div >
        )}

      </div >
    </div >
  );
};

export default ProductChat;
