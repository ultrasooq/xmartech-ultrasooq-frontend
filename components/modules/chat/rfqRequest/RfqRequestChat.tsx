import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import AttachIcon from "@/public/images/attach.svg";
import SmileIcon from "@/public/images/smile.svg";
import Link from "next/link";
import SendIcon from "@/public/images/send-button.png";
import OfferPriceCard from "@/components/modules/rfqRequest/OfferPriceCard";
import RequestProductCard from "@/components/modules/rfqRequest/RequestProductCard";
import { useAllRfqQuotesUsersByBuyerId, useFindOneRfqQuotesUsersByBuyerID } from "@/apis/queries/rfq.queries";
import { findRoomId, getChatHistory } from "@/apis/requests/chat.requests";
import RfqRequestChatHistory from "./RfqRequestChatHistory";
import RfqRequestVendorCard from "./RfqRequestVendorCard";
import { useSocket } from "@/context/SocketContext";
import { useToast } from "@/components/ui/use-toast";
import { CHAT_REQUEST_MESSAGE } from "@/utils/constants";

interface RfqRequestChatProps {
    rfqQuoteId: any
}

interface RfqRequestVendorDetailsProps {
    id: number;
    sellerID: number;
    buyerID: number;
    rfqQuotesId: number;
    offerPrice: string;
    sellerIDDetail: {
        firstName: string;
        lastName: string;
        profilePicture: string;
        unreadMsgCount: number;
        latestMessageContent: string;
        latestMessageCreatedAt: string;
    };
}

const RfqRequestChat: React.FC<RfqRequestChatProps> = ({ rfqQuoteId }) => {
    const [activeSellerId, setActiveSellerId] = useState<number>();
    const [selectedChatHistory, setSelectedChatHistory] = useState<any>([]);
    const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
    const [selectedVendor, setSelectedVendor] = useState<any>(null);
    const [chatHistoryLoading, setChatHistoryLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('');
    const [vendorList, setVendorList] = useState<any[]>([]);
    const { sendMessage, cratePrivateRoom, newMessage, newRoom, errorMessage, clearErrorMessage } = useSocket()
    const { toast } = useToast();

    const allRfqQuotesQuery = useAllRfqQuotesUsersByBuyerId(
        {
            page: 1,
            limit: 10,
            rfqQuotesId: rfqQuoteId ?? 0,
        },
        !!rfqQuoteId,
    );
    const rfqQuotesUsersByBuyerIdQuery = useFindOneRfqQuotesUsersByBuyerID(
        {
            rfqQuotesId: rfqQuoteId ? rfqQuoteId : undefined,
        },
        !!rfqQuoteId,
    );

    const rfqQuoteDetailsById = rfqQuotesUsersByBuyerIdQuery.data?.data;

    useEffect(() => {
        const rfqQuotesDetails = allRfqQuotesQuery.data?.data;

        if (rfqQuotesDetails) {
            setVendorList(rfqQuotesDetails)
            setSelectedVendor(rfqQuotesDetails[0])
            setActiveSellerId(rfqQuotesDetails[0]?.sellerID);
        }
    }, [allRfqQuotesQuery.data?.data]);


    // check room id
    useEffect(() => {
        if (selectedVendor?.sellerID && selectedVendor?.buyerID) {
            checkRoomId()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedVendor]);

    // receive a message
    useEffect(() => {
        if (newMessage?.rfqId === parseInt(rfqQuoteId)) {
            handleNewMessage(newMessage)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newMessage]);

    // get chat history
    useEffect(() => {
        if (selectedRoom) {
            handleChatHistory()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRoom]);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorMessage])

    const handleNewMessage = (message: any) => {
        const index = vendorList.findIndex((vendor: RfqRequestVendorDetailsProps) => message?.participants?.includes(vendor.sellerID));
        if (index !== -1) {
            const vList = [...vendorList];
            const [item] = vList.splice(index, 1);
            let newItem = {
                ...item,
                sellerIDDetail: {
                    ...item.sellerIDDetail,
                    latestMessageContent: message.content,
                    latestMessageCreatedAt: message.createdAt
                }
            }
            if (activeSellerId !== message?.userId) {
                newItem = {
                    ...newItem,
                    sellerIDDetail: {
                        ...newItem.sellerIDDetail,
                        unreadMsgCount: newItem.sellerIDDetail.unreadMsgCount + 1,
                    }
                }
            }
            vList.unshift(newItem);
            setVendorList(vList);
            if (message?.participants?.includes(activeSellerId)) {
                const chatHistory = [...selectedChatHistory]
                chatHistory.push(message);
                setSelectedChatHistory(chatHistory)
            }
        }
    }

    const checkRoomId = async () => {
        try {
            const payloadRoomFind = {
                rfqId: selectedVendor?.rfqQuotesId,
                userId: selectedVendor?.sellerID
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

    const handleSendMessage = async () => {
        try {
            if (message) {
                if (selectedRoom) {
                    sendNewMessage(selectedRoom, message)
                } else if (!selectedRoom && selectedVendor?.sellerID && selectedVendor?.buyerID) {
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

    const sendNewMessage = (roomId: number, content: string, rfqQuoteProductId?: number, buyerId?: number, requestedPrice?: number) => {
        const msgPayload = {
            roomId: roomId,
            content,
            rfqId: parseInt(rfqQuoteId),
            rfqQuoteProductId,
            buyerId,
            requestedPrice
        }
        sendMessage(msgPayload)
    }

    const handleCreateRoom = async (content: string, rfqQuoteProductId?: number, buyerId?: number, requestedPrice?: number) => {
        try {
            const payload = {
                participants: [selectedVendor?.sellerID, selectedVendor?.buyerID],
                content,
                rfqId: parseInt(rfqQuoteId),
                rfqQuoteProductId,
                buyerId,
                requestedPrice
            }
            cratePrivateRoom(payload);
        } catch (error) {
            toast({
                title: "Chat",
                description: "Failed!",
                variant: "danger",
            });
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

    const handleRequestPrice = (productId: number, requestedPrice: number) => {
        if (selectedRoom && requestedPrice) {
            sendNewMessage(selectedRoom, CHAT_REQUEST_MESSAGE.priceRequest.value, productId, selectedVendor?.buyerID, requestedPrice)
        } else if (!selectedRoom && requestedPrice && selectedVendor?.sellerID && selectedVendor?.buyerID) {
            handleCreateRoom(CHAT_REQUEST_MESSAGE.priceRequest.value, productId, selectedVendor?.buyerID, requestedPrice);
        }
    }

    return (
        <div>
            <div className="flex w-full rounded-sm border border-solid border-gray-300">
                <div className="w-[20%] border-r border-solid border-gray-300">
                    <div className="flex min-h-[55px] w-full items-center border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
                        <span>Request for RFQ</span>
                    </div>
                    <RequestProductCard
                        rfqId={rfqQuoteId}
                        productImages={rfqQuoteDetailsById?.rfqQuotesProducts
                            ?.map((item: any) => item?.rfqProductDetails?.productImages)
                            ?.map((item: any) => item?.[0])}
                    />
                </div>
                <div className="w-[18%] border-r border-solid border-gray-300">
                    <div className="flex h-[55px] min-w-full items-center border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
                        <span>Vendor Lists</span>
                    </div>
                    <div className="h-[720px] w-full overflow-y-auto p-4">
                        {allRfqQuotesQuery?.isLoading ? (
                            <div className="my-2 space-y-2">
                                {Array.from({ length: 2 }).map((_, i) => (
                                    <Skeleton key={i} className="h-24 w-full" />
                                ))}
                            </div>
                        ) : null}

                        {!allRfqQuotesQuery?.isLoading && !vendorList?.length ? (
                            <div className="my-2 space-y-2">
                                <p className="text-center text-sm font-normal text-gray-500">
                                    No data found
                                </p>
                            </div>
                        ) : null}

                        {vendorList?.map(
                            (item: RfqRequestVendorDetailsProps) => (
                                <RfqRequestVendorCard
                                    key={item?.id}
                                    name={`${item?.sellerIDDetail?.firstName} ${item?.sellerIDDetail?.lastName}`}
                                    profilePicture={item?.sellerIDDetail?.profilePicture}
                                    offerPrice={item?.offerPrice}
                                    onClick={() => {
                                        setActiveSellerId(item?.sellerID)
                                        setSelectedVendor(item)
                                    }}
                                    seller={item.sellerIDDetail}
                                    isSelected={activeSellerId === item?.sellerID}
                                />
                            ),
                        )}
                    </div>
                </div>
                <div className="w-[62%] border-r border-solid border-gray-300">
                    <div className="flex min-h-[55px] w-full items-center justify-between border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
                        <span>
                            Offering Price{" "}
                            <b className="text-[#679A03]">
                                {selectedVendor?.offerPrice
                                    ? `$${selectedVendor?.offerPrice}`
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
                                {rfqQuotesUsersByBuyerIdQuery.isLoading ? (
                                    <div className="m-2 space-y-2">
                                        {Array.from({ length: 2 }).map((_, i) => (
                                            <Skeleton key={i} className="h-24 w-full" />
                                        ))}
                                    </div>
                                ) : null}

                                {!rfqQuotesUsersByBuyerIdQuery?.isLoading &&
                                    !rfqQuoteDetailsById?.rfqQuotesProducts?.length ? (
                                    <div className="my-2 space-y-2 py-10">
                                        <p className="text-center text-sm font-normal text-gray-500">
                                            No data found
                                        </p>
                                    </div>
                                ) : null}

                                {rfqQuoteDetailsById?.rfqQuotesProducts?.map(
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
                                    }) => (
                                        <OfferPriceCard
                                            key={item?.id}
                                            productId={item?.id}
                                            offerPrice={item?.offerPrice}
                                            note={item?.note}
                                            quantity={item?.quantity}
                                            address={
                                                rfqQuoteDetailsById?.rfqQuotes_rfqQuoteAddress
                                                    ?.address
                                            }
                                            deliveryDate={
                                                rfqQuoteDetailsById?.rfqQuotes_rfqQuoteAddress
                                                    ?.rfqDate
                                            }
                                            productImage={
                                                item?.rfqProductDetails?.productImages[0]?.image
                                            }
                                            productName={item?.rfqProductDetails?.productName}
                                            onRequestPrice={handleRequestPrice}
                                        />
                                    ),
                                )}
                            </div>
                        </div>
                        <RfqRequestChatHistory
                            roomId={selectedRoom}
                            selectedChatHistory={selectedChatHistory}
                            chatHistoryLoading={chatHistoryLoading}
                        />
                    </div>
                    <div className="mt-2 flex w-full flex-wrap border-t border-solid border-gray-300 px-[15px] py-[10px]">
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
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
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
                </div>
            </div>
        </div>
    )
}

export default RfqRequestChat;