import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import AttachIcon from "@/public/images/attach.svg";
import SmileIcon from "@/public/images/smile.svg";
import Link from "next/link";
import SendIcon from "@/public/images/send-button.png";
import OfferPriceCard from "@/components/modules/rfqRequest/OfferPriceCard";
import { useAllRfqQuotesUsersBySellerId } from "@/apis/queries/rfq.queries";
import { useSocket } from "@/context/SocketContext";
import { findRoomId, getChatHistory } from "@/apis/requests/chat.requests";
import RequestProductCard from "@/components/modules/rfqRequest/RequestProductCard";
import SellerChatHistory from "./SellerChatHistory";
import { useToast } from "@/components/ui/use-toast";


interface SellerChatProps {

}

const SellerChat: React.FC<SellerChatProps> = () => {
    const [activeSellerId, setActiveSellerId] = useState<number | undefined>();
    const [quoteProducts, setQuoteProducts] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any>("");
    const [chatHistoryLoading, setChatHistoryLoading] = useState<boolean>(false)
    const [selectedChatHistory, setSelectedChatHistory] = useState<any>([]);
    const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
    const [message, setMessage] = useState<string>('');
    const { sendMessage, cratePrivateRoom, newMessage, newRoom, errorMessage, clearErrorMessage } = useSocket()
    const { toast } = useToast();

    const allRfqQuotesQuery = useAllRfqQuotesUsersBySellerId({
        page: 1,
        limit: 10,
    });
    const rfqQuotesDetails = allRfqQuotesQuery.data?.data;

    useEffect(() => {
        const rfqQuotesDetails = allRfqQuotesQuery.data?.data;

        if (rfqQuotesDetails?.length > 0) {
            setActiveSellerId(rfqQuotesDetails[0]?.id);
            setSelectedProduct(rfqQuotesDetails[0])
            setQuoteProducts(
                rfqQuotesDetails[0]?.rfqQuotesUser_rfqQuotes?.rfqQuotesProducts.map(
                    (i: any) => ({
                        ...i,
                        address:
                            rfqQuotesDetails[0]?.rfqQuotesUser_rfqQuotes
                                ?.rfqQuotes_rfqQuoteAddress?.address,
                        deliveryDate:
                            rfqQuotesDetails[0]?.rfqQuotesUser_rfqQuotes
                                ?.rfqQuotes_rfqQuoteAddress?.rfqDate,
                    }),
                ) || [],
            );
        }
    }, [allRfqQuotesQuery.data?.data]);

    // check room id
    useEffect(() => {
        if (selectedProduct?.sellerID && selectedProduct?.buyerID) {
            checkRoomId()
        }
    }, [selectedProduct]);

    // get chat history
    useEffect(() => {
        if (selectedRoom) {
            handleChatHistory()
        }
    }, [selectedRoom]);

    // receive a messaage
    useEffect(() => {
        if (newMessage) handleNewMessage(newMessage)
    }, [newMessage]);

    // if new room crated
    useEffect(() => {
        if (newRoom) {
            setSelectedRoom(newRoom)
        }
    }, [newRoom])

    // if any error exception
    useEffect(() => {
        if (errorMessage) {
            toast({
                title: "Chat",
                description: errorMessage,
                variant: "danger",
            });
            clearErrorMessage()
        }
    }, [errorMessage])

    const handleNewMessage = (message: any) => {
        const chatHistory = [...selectedChatHistory]
        chatHistory.push(message);
        setSelectedChatHistory(chatHistory)
    }

    const handleSendMessage = async () => {
        try {
            if (message) {
                if (selectedRoom) {
                    sendNewMessage(selectedRoom)
                } else if (!selectedRoom && selectedProduct?.sellerID && selectedProduct?.buyerID) {
                    handleCreateRoom();
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

    const sendNewMessage = (roomId: number) => {
        const msgPayload = {
            roomId: roomId,
            content: message,
            rfqId: selectedProduct?.rfqQuotesId
        }
        sendMessage(msgPayload)
    }

    const handleCreateRoom = async () => {
        try {
            const payload = {
                participants: [selectedProduct?.sellerID, selectedProduct?.buyerID],
                content: message,
                rfqId: selectedProduct?.rfqQuotesId
            }
            cratePrivateRoom(payload);
        } catch (error) {
            return ""
        }
    }

    const checkRoomId = async () => {
        try {
            const payloadRoomFind = {
                rfqId: selectedProduct?.rfqQuotesId,
                userId: selectedProduct?.buyerID
            }
            const room = await findRoomId(payloadRoomFind);
            if (room?.data?.roomId) {
                setSelectedRoom(room?.data?.roomId)
            } else {
                setSelectedRoom(null)
                setChatHistoryLoading(false)
                setSelectedChatHistory([])
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

    const handleSendMessageKeyDown = (e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div>
            <div className="flex w-full rounded-sm border border-solid border-gray-300">
                <div className="w-[30%] border-r border-solid border-gray-300">
                    <div className="flex h-[55px] min-w-full items-center border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
                        <span>Request for RFQ</span>
                    </div>
                    <div className="max-h-[720px] w-full overflow-y-auto p-2">
                        {allRfqQuotesQuery?.isLoading ? (
                            <div className="my-2 space-y-2">
                                {Array.from({ length: 2 }).map((_, i) => (
                                    <Skeleton key={i} className="h-24 w-full" />
                                ))}
                            </div>
                        ) : null}

                        {!allRfqQuotesQuery?.isLoading && !rfqQuotesDetails?.length ? (
                            <div className="my-2 space-y-2">
                                <p className="text-center text-sm font-normal text-gray-500">
                                    No data found
                                </p>
                            </div>
                        ) : null}

                        {rfqQuotesDetails?.map(
                            (item: {
                                id: number;
                                offerPrice: string;
                                buyerIDDetail: {
                                    firstName: string;
                                    lastName: string;
                                    profilePicture: string;
                                };
                                rfqQuotesUser_rfqQuotes: {
                                    rfqQuotesProducts: {
                                        rfqProductDetails: {
                                            productImages: {
                                                id: number;
                                                image: string;
                                            }[];
                                        };
                                    }[];
                                    rfqQuotes_rfqQuoteAddress: {
                                        address: string;
                                        rfqDate: string;
                                    };
                                };
                            }) => (
                                <RequestProductCard
                                    key={item?.id}
                                    rfqId={item?.id}
                                    // name={`${item?.buyerIDDetail?.firstName} ${item?.buyerIDDetail?.lastName}`}
                                    // profilePicture={item?.buyerIDDetail?.profilePicture}
                                    // offerPrice={item?.offerPrice}
                                    onClick={() => {
                                        setSelectedProduct(item)
                                        setActiveSellerId(item?.id);
                                        setQuoteProducts(
                                            item?.rfqQuotesUser_rfqQuotes?.rfqQuotesProducts.map(
                                                (i: any) => ({
                                                    ...i,
                                                    address:
                                                        item?.rfqQuotesUser_rfqQuotes
                                                            ?.rfqQuotes_rfqQuoteAddress?.address,
                                                    deliveryDate:
                                                        item?.rfqQuotesUser_rfqQuotes
                                                            ?.rfqQuotes_rfqQuoteAddress?.rfqDate,
                                                }),
                                            ) || [],
                                        );
                                    }}
                                    isSelected={activeSellerId === item?.id}
                                    productImages={item?.rfqQuotesUser_rfqQuotes?.rfqQuotesProducts
                                        ?.map(
                                            (item: any) => item?.rfqProductDetails?.productImages,
                                        )
                                        ?.map((item: any) => item?.[0])}
                                />
                            ),
                        )}
                    </div>
                </div>
                <div className="w-[70%] border-r border-solid border-gray-300">
                    <div className="flex min-h-[55px] w-full items-center justify-between border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
                        <span>
                            Offering Price{" "}
                            <b className="text-[#679A03]">
                                {rfqQuotesDetails?.[0]?.offerPrice
                                    ? `$${rfqQuotesDetails?.[0]?.offerPrice}`
                                    : "-"}
                            </b>
                        </span>
                        <Link
                            href="#"
                            className="inline-block rounded-sm bg-dark-orange px-3 py-2 text-xs font-bold capitalize text-white"
                        >
                            checkout
                        </Link>
                    </div>
                    <div className="flex w-full flex-wrap p-[20px]">
                        <div className="mb-5 max-h-[300px] w-full overflow-y-auto">
                            <div className="w-full rounded-sm border border-solid border-gray-300">
                                <div className="flex w-full border-b border-solid border-gray-300">
                                    <div className="w-[25%] px-1.5 py-3 text-sm font-normal text-gray-500">
                                        Product
                                    </div>
                                    <div className="w-[15%] px-1.5 py-3 text-sm font-normal text-gray-500">
                                        Delivery Date
                                    </div>
                                    <div className="w-[10%] px-1.5 py-3 text-sm font-normal text-gray-500">
                                        Brand
                                    </div>
                                    <div className="w-[20%] px-1.5 py-3 text-sm font-normal text-gray-500">
                                        Number Of Piece
                                    </div>
                                    <div className="w-[10%] px-1.5 py-3 text-sm font-normal text-gray-500">
                                        Price
                                    </div>
                                    <div className="w-[20%] px-1.5 py-3 text-sm font-normal text-gray-500">
                                        Address
                                    </div>
                                </div>
                                {allRfqQuotesQuery.isLoading ? (
                                    <div className="m-2 space-y-2">
                                        {Array.from({ length: 2 }).map((_, i) => (
                                            <Skeleton key={i} className="h-24 w-full" />
                                        ))}
                                    </div>
                                ) : null}

                                {!allRfqQuotesQuery?.isLoading && !quoteProducts?.length ? (
                                    <div className="my-2 space-y-2 py-10">
                                        <p className="text-center text-sm font-normal text-gray-500">
                                            No data found
                                        </p>
                                    </div>
                                ) : null}

                                {quoteProducts?.map(
                                    (item: {
                                        id: number;
                                        offerPrice: string;
                                        note: string;
                                        quantity: number;
                                        rfqProductDetails: {
                                            productName: string;
                                            productImages: {
                                                id: number;
                                                image: string;
                                            }[];
                                        };
                                        address: string;
                                        deliveryDate: string;
                                    }) => (
                                        <OfferPriceCard
                                            key={item?.id}
                                            offerPrice={item?.offerPrice}
                                            note={item?.note}
                                            quantity={item?.quantity}
                                            address={item?.address}
                                            deliveryDate={item?.deliveryDate}
                                            productImage={
                                                item?.rfqProductDetails?.productImages[0]?.image
                                            }
                                            productName={item?.rfqProductDetails?.productName}
                                        />
                                    ),
                                )}
                            </div>
                        </div>
                        {rfqQuotesDetails?.length > 0 ? (
                            <SellerChatHistory
                                roomId={selectedRoom}
                                selectedChatHistory={selectedChatHistory}
                                chatHistoryLoading={chatHistoryLoading}
                            />
                        ) : ""}

                    </div>
                    {rfqQuotesDetails?.length > 0 ? (
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
                                        onChange={(e) => setMessage(e.target.value)}
                                        value={message}
                                        placeholder="Type your message...."
                                        className="h-[32px] w-full resize-none text-sm focus:outline-none"
                                        onKeyDown={handleSendMessageKeyDown}
                                    ></textarea>
                                </div>
                                <div className="flex w-[72px] items-center justify-between">
                                    <div className="w-auto">
                                        <Image src={SmileIcon} alt="smile-icon" />
                                    </div>
                                    <div className="flex w-auto">
                                        <button onClick={handleSendMessage} type="button" className="">
                                            <Image src={SendIcon} alt="send-icon" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ""}
                </div>
            </div>
        </div>
    )
}

export default SellerChat;