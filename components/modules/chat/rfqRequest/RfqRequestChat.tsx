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
import { findRoomId, getChatHistory, updateUnreadMessages, uploadAttachment } from "@/apis/requests/chat.requests";
import RfqRequestChatHistory from "./RfqRequestChatHistory";
import RfqRequestVendorCard from "./RfqRequestVendorCard";
import { newAttachmentType, useSocket } from "@/context/SocketContext";
import { useToast } from "@/components/ui/use-toast";
import { CHAT_REQUEST_MESSAGE } from "@/utils/constants";
import { useAuth } from "@/context/AuthContext";
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { generateUniqueNumber } from "@/utils/helper";

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
    };
    lastUnreadMessage: {
        content: string;
        createdAt: string
    },
    unreadMsgCount: number
}

const RfqRequestChat: React.FC<RfqRequestChatProps> = ({ rfqQuoteId }) => {
    const [activeSellerId, setActiveSellerId] = useState<number>();
    const [selectedChatHistory, setSelectedChatHistory] = useState<any>([]);
    const [rfqQuotesUserId, setRfqQuotesUserId] = useState<number>();
    const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
    const [selectedVendor, setSelectedVendor] = useState<any>(null);
    const [chatHistoryLoading, setChatHistoryLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('');
    const [vendorList, setVendorList] = useState<any[]>([]);
    const [showEmoji, setShowEmoji] = useState<boolean>(false)
    const [attachments, setAttachments] = useState<any>([]);
    const [isAttachmentUploading, setIsAttachmentUploading] = useState<boolean>(false)
    const { sendMessage, cratePrivateRoom, newMessage, newRoom, errorMessage, clearErrorMessage, rfqRequest, newAttachment } = useSocket()
    const { toast } = useToast();
    const { user } = useAuth();

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
            setVendorList(rfqQuotesDetails);
            handleRfqProducts(rfqQuotesDetails[0])
            setActiveSellerId(rfqQuotesDetails[0]?.sellerID);
            setRfqQuotesUserId(rfqQuotesDetails[0]?.id)
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

    // update the new message status
    useEffect(() => {
        if (newMessage?.rfqId === parseInt(rfqQuoteId)) {
            handleUpdateNewMessageStatus(newMessage)
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
        if (newRoom?.roomId && (newRoom?.creatorId === activeSellerId || newRoom?.creatorId === user?.id)) {
            setSelectedRoom(newRoom?.roomId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // if rfqRequest
    useEffect(() => {
        if (rfqRequest) {
            handleRfqRequest(rfqRequest)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rfqRequest])

    // Update attachment status
    useEffect(() => {
        if (newAttachment) {
            handleUpdateAttachmentStatus(newAttachment);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newAttachment])

    const handleUpdateAttachmentStatus = (attach: newAttachmentType) => {
        try {
            setSelectedChatHistory((prevChatHistory: any[]) =>
                prevChatHistory.map((item1: any) => ({
                    ...item1,
                    attachments: item1?.attachments?.map((item2: any) =>
                        item2.uniqueId === attach.uniqueId
                            ? { ...item2, status: attach.status }
                            : item2
                    )
                }))
            );
        } catch (error) {
            toast({
                title: "Chat",
                description: "Failed to update the attachment status",
                variant: "danger",
            });
        }
    }

    const handleUpdateNewMessageStatus = async (message: any) => {
        try {
            if (rfqQuotesUserId === message?.rfqQuotesUserId && message?.userId !== user?.id) {
                if (activeSellerId && selectedRoom) {
                    const payload = {
                        userId: activeSellerId,
                        roomId: selectedRoom
                    }
                    await updateUnreadMessages(payload)
                }
            }
        } catch (error) {

        }
    }

    const updateVendorMessageCount = () => {
        const index = vendorList.findIndex((vendor: RfqRequestVendorDetailsProps) => vendor.sellerID === activeSellerId);
        if (index !== -1) {
            const vList = [...vendorList];
            vList[index]["unreadMsgCount"] = 0;
            setVendorList(vList)
        }
    }

    const handleNewMessage = (message: any) => {
        try {
            const index = vendorList.findIndex((vendor: RfqRequestVendorDetailsProps) => message?.participants?.includes(vendor.sellerID));
            if (index !== -1) {
                const vList = [...vendorList];
                const [item] = vList.splice(index, 1);
                let newItem = {
                    ...item,
                    lastUnreadMessage: {
                        content: message.content,
                        createdAt: message.createdAt
                    }
                }

                if (rfqQuotesUserId !== message?.rfqQuotesUserId) {
                    newItem = {
                        ...newItem,
                        unreadMsgCount: newItem?.unreadMsgCount + 1,
                    }

                    if (message?.rfqProductPriceRequest) {
                        const rList = newItem.rfqProductPriceRequests;
                        rList.push(message?.rfqProductPriceRequest);
                        newItem = {
                            ...newItem,
                            rfqProductPriceRequests: rList
                        }
                    }
                }
                vList.unshift(newItem);
                setVendorList(vList);
                if (selectedRoom === message?.roomId) {
                    const chatHistory = [...selectedChatHistory]
                    const index = chatHistory.findIndex((chat) => chat?.uniqueId === message?.uniqueId);
                    if (index !== -1) {
                        // upload attachment once the message saved in draft mode, if attachments are selected
                        if (chatHistory[index]?.attachments?.length) handleUploadedFile();

                        const nMessage = {
                            ...message,
                            attachments: chatHistory[index]?.attachments || [],
                            status: "sent"
                        }
                        chatHistory[index] = nMessage;
                    } else {
                        const nMessage = {
                            ...message,
                            attachments: [],
                            status: "sent"
                        }
                        chatHistory.push(nMessage)
                    }
                    setSelectedChatHistory(chatHistory)
                }
                if (message?.rfqProductPriceRequest) {
                    updateRFQProduct(message?.rfqProductPriceRequest)
                }
            }
        } catch (error) { }

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
            if (message || attachments.length) {
                if (selectedRoom) {
                    sendNewMessage(selectedRoom, message)
                } else if (!selectedRoom && selectedVendor?.sellerID && selectedVendor?.buyerID) {
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

    const sendNewMessage = (roomId: number, content: string, rfqQuoteProductId?: number, buyerId?: number, requestedPrice?: number) => {
        const uniqueId = generateUniqueNumber();
        const attach = attachments.map((att: any) => {
            const extension = att?.name.split('.').pop();
            return {
                fileType: att?.type,
                fileName: att?.name,
                fileSize: att?.size,
                filePath: "",
                fileExtension: extension,
                uniqueId: att.uniqueId,
                status: "UPLOADING"
            }
        });

        const newMessage = {
            roomId: "",
            rfqId: "",
            content: message,
            userId: user?.id,
            user: {
                firstName: user?.firstName,
                lastName: user?.lastName
            },
            rfqQuotesUserId: null,
            attachments: attach,
            uniqueId,
            status: "SD",
            createdAt: new Date()
        }
        const chatHistory = [...selectedChatHistory]
        chatHistory.push(newMessage);
        setSelectedChatHistory(chatHistory)

        const msgPayload = {
            roomId: roomId,
            content,
            rfqId: parseInt(rfqQuoteId),
            rfqQuoteProductId,
            buyerId,
            requestedPrice,
            rfqQuotesUserId: selectedVendor?.id,
            userId: activeSellerId,
            uniqueId,
            attachments: attach,
        }
        sendMessage(msgPayload)
    }

    const handleCreateRoom = async (content: string, rfqQuoteProductId?: number, buyerId?: number, requestedPrice?: number) => {
        try {
            const uniqueId = generateUniqueNumber();
            const attach = attachments.map((att: any) => {
                const extension = att?.name.split('.').pop();
                return {
                    fileType: att?.type,
                    fileName: att?.name,
                    fileSize: att?.size,
                    filePath: "",
                    fileExtension: extension,
                    status: "UPLOADING"
                }
            });

            const newMessage = {
                roomId: "",
                rfqId: "",
                content: message,
                userId: user?.id,
                user: {
                    firstName: user?.firstName,
                    lastName: user?.lastName
                },
                rfqQuotesUserId: null,
                attachments: attach,
                uniqueId,
                status: "SD",
                createdAt: new Date()
            }
            const chatHistory = [...selectedChatHistory]
            chatHistory.push(newMessage);
            setSelectedChatHistory(chatHistory)

            const payload = {
                participants: [selectedVendor?.sellerID, selectedVendor?.buyerID],
                content,
                rfqId: parseInt(rfqQuoteId),
                rfqQuoteProductId,
                buyerId,
                requestedPrice,
                rfqQuotesUserId: selectedVendor?.id,
                uniqueId,
                attachments: attach,
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

    const handleRfqRequest = (rRequest: {
        id: number;
        messageId: number;
        requestedPrice: number;
        rfqQuoteProductId: number;
        status: string;
        requestedById: number;
        newTotalOfferPrice: number;
    }) => {
        const chatHistory = [...selectedChatHistory]
        const index = chatHistory.findIndex((chat) => chat.id === rRequest.messageId);
        if (index !== -1) {
            const currentMsg = chatHistory[index];
            const updatedMessage = {
                ...currentMsg,
                rfqProductPriceRequest: {
                    ...currentMsg.rfqProductPriceRequest,
                    status: rRequest.status
                }
            }
            chatHistory[index] = updatedMessage
            setSelectedChatHistory(chatHistory)
        }

        // UPDATE RFQ PRODUCT 
        updateRFQProduct(rRequest);
    }

    const updateRFQProduct = (rRequest: {
        id: number;
        messageId: number;
        requestedPrice: number;
        rfqQuoteProductId: number;
        requestedById: number;
        status: string;
        newTotalOfferPrice: number;
    }) => {
        if (rRequest.status === "APPROVED" || rRequest.status === "REJECTED") {
            let vDor = selectedVendor
            if (vDor?.rfqQuotesProducts) {
                const index = vDor?.rfqQuotesProducts.findIndex((product: any) => product.id === rRequest.rfqQuoteProductId);
                if (index !== -1) {
                    const pList = vDor?.rfqQuotesProducts;
                    let offerPrice = pList[index].offerPrice;
                    if (rRequest.status === "APPROVED") {
                        offerPrice = rRequest?.requestedPrice;
                    }

                    let priceRequest = pList[index]?.priceRequest || null;
                    if (priceRequest) {
                        priceRequest = {
                            ...priceRequest,
                            id: rRequest.id,
                            requestedPrice: rRequest.requestedPrice,
                            rfqQuoteProductId: rRequest.rfqQuoteProductId,
                            status: rRequest?.status
                        }
                    } else if (priceRequest === null) {
                        priceRequest = {
                            ...rRequest
                        }
                    }
                    pList[index]["priceRequest"] = priceRequest;
                    pList[index]["offerPrice"] = offerPrice;

                    let newData = {
                        ...vDor,
                        offerPrice: vDor.offerPrice,
                        rfqQuotesProducts: pList
                    }
                    if (rRequest.newTotalOfferPrice) {
                        newData.offerPrice = rRequest.newTotalOfferPrice
                    }
                    setSelectedVendor(newData)
                }
            }
        }
    }

    const handleRfqProducts = (item: any) => {
        const newData = item?.rfqQuotesUser_rfqQuotes?.rfqQuotesProducts.map(
            (i: any) => {
                let priceRequest = null
                let offerPrice = i.offerPrice;
                const pRequest = item?.rfqProductPriceRequests?.find((request: any) => request?.rfqQuoteProductId === i.id);
                if (pRequest) priceRequest = pRequest;
                if (priceRequest?.status === "APPROVED") {
                    offerPrice = priceRequest?.requestedPrice
                } else if (priceRequest?.status === "REJECTED") {
                    offerPrice = i.offerPrice;
                }

                return {
                    ...i,
                    priceRequest,
                    offerPrice,
                    address:
                        item?.rfqQuotesUser_rfqQuotes
                            ?.rfqQuotes_rfqQuoteAddress?.address,
                    deliveryDate:
                        item?.rfqQuotesUser_rfqQuotes
                            ?.rfqQuotes_rfqQuoteAddress?.rfqDate,
                }
            },
        ) || []
        const vendorDetails = {
            ...item,
            rfqQuotesProducts: newData
        }
        setSelectedVendor(vendorDetails)
    }

    const onEmojiClick = (emojiObject: EmojiClickData) => {
        setMessage(prevMessage => prevMessage + emojiObject.emoji);
    }

    const handleUploadedFile = async () => {
        if (attachments?.length) {
            setIsAttachmentUploading(true);
            const uploadPromises = attachments.map(async (file: any) => {
                const formData = new FormData();
                formData.append("content", file);
                formData.append("uniqueId", file.uniqueId);

                try {
                    await uploadAttachment(formData);
                } catch (error) {
                    console.error("File upload failed:", error);
                }
            });
            await Promise.all(uploadPromises);
            setAttachments([]);
            setIsAttachmentUploading(false);
        }
    };

    const handleFileChange = (e: any) => {
        const files = Array.from(e.target.files);
        const newData = files.map((file: any) => {
            const uniqueId = generateUniqueNumber();
            file.uniqueId = `${user?.id}-${uniqueId}`;
            return file;
        });
        setAttachments(newData);
    };

    const removeFile = (index: number) => {
        setAttachments((prevFiles: any) => prevFiles.filter((_: any, i: any) => i !== index));
    };

    return (
        <div>
            <div className="flex w-full rounded-sm border border-solid border-gray-300">
                <div className="w-[15%] border-r border-solid border-gray-300">
                    <div className="flex min-h-[55px] w-full items-center border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
                        <span>Request for RFQ</span>
                    </div>
                    <RequestProductCard
                        rfqId={rfqQuoteId}
                        productImages={selectedVendor?.rfqQuotesProducts
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
                                        setActiveSellerId(item?.sellerID);
                                        setRfqQuotesUserId(item.id)
                                        handleRfqProducts(item)
                                    }}
                                    seller={item.sellerIDDetail}
                                    isSelected={activeSellerId === item?.sellerID}
                                    vendor={item}
                                />
                            ),
                        )}
                    </div>
                </div>
                <div className="w-[67%] border-r border-solid border-gray-300">
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
                                    !selectedVendor?.rfqQuotesProducts?.length ? (
                                    <div className="my-2 space-y-2 py-10">
                                        <p className="text-center text-sm font-normal text-gray-500">
                                            No data found
                                        </p>
                                    </div>
                                ) : null}

                                {selectedVendor?.rfqQuotesProducts?.map(
                                    (item: {
                                        id: number;
                                        priceRequest: any;
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
                                            priceRequest={item?.priceRequest}
                                        />
                                    ),
                                )}
                            </div>
                        </div>
                        <RfqRequestChatHistory
                            roomId={selectedRoom}
                            selectedChatHistory={selectedChatHistory}
                            chatHistoryLoading={chatHistoryLoading}
                            activeSellerId={activeSellerId}
                            unreadMsgCount={selectedVendor?.unreadMsgCount}
                            rfqUserId={selectedVendor?.id}
                            updateVendorMessageCount={updateVendorMessageCount}
                        />
                    </div>
                    <div className="mt-2 flex w-full flex-wrap border-t border-solid border-gray-300 px-[15px] py-[10px]">
                        <div className="flex w-full items-center">
                            <div className="relative flex h-[32px] w-[32px] items-center">
                                <input
                                    type="file"
                                    className="z-10 absolute inset-0 opacity-0"
                                    multiple
                                    onChange={handleFileChange}
                                />
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
                                    <Image src={SmileIcon} alt="smile-icon" onClick={() => setShowEmoji(!showEmoji)} />
                                </div>
                                <div className="flex w-auto">
                                    <button onClick={handleSendMessage} type="button" className="">
                                        <Image src={SendIcon} alt="send-icon" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {showEmoji && (
                            <div className="w-full mt-2 border-t border-solid">
                                <EmojiPicker onEmojiClick={onEmojiClick} className="mt-2" />
                            </div>
                        )}

                        {!isAttachmentUploading && attachments.length > 0 && (
                            <div className="mt-2 w-full flex flex-wrap gap-2">
                                {attachments.map((file: any, index: any) => (
                                    <div key={index} className="flex items-center border border-gray-300 p-2 rounded-md">
                                        <span className="mr-2">{file.name}</span>
                                        <button onClick={() => removeFile(index)} className="text-red-500">X</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RfqRequestChat;