import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import AttachIcon from "@/public/images/attach.svg";
import SmileIcon from "@/public/images/smile.svg";
import Link from "next/link";
import SendIcon from "@/public/images/send-button.png";
import OfferPriceCard from "@/components/modules/rfqRequest/OfferPriceCard";
import { useAllRfqQuotesUsersBySellerId } from "@/apis/queries/rfq.queries";
import { newAttachmentType, useSocket } from "@/context/SocketContext";
import {
  findRoomId,
  getChatHistory,
  updateUnreadMessages,
  uploadAttachment,
} from "@/apis/requests/chat.requests";
import RequestProductCard from "@/components/modules/rfqRequest/RequestProductCard";
import SellerChatHistory from "./SellerChatHistory";
import { useToast } from "@/components/ui/use-toast";
import { CHAT_REQUEST_MESSAGE } from "@/utils/constants";
import { useAuth } from "@/context/AuthContext";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { generateUniqueNumber } from "@/utils/helper";
import { useTranslations } from "next-intl";
import moment from "moment";
import validator from "validator";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/lib/orderStore";

interface RfqQuoteType {
  id: number;
  rfqQuotesId: number;
  offerPrice: string;
  buyerID: number;
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
  lastUnreadMessage: {
    content: string;
    createdAt: string;
  };
  unreadMsgCount: number;
}
interface SellerChatProps {}

const SellerChat: React.FC<SellerChatProps> = () => {
  const t = useTranslations();
  const { langDir, currency } = useAuth();
  const [activeSellerId, setActiveSellerId] = useState<number | undefined>();
  const [quoteProducts, setQuoteProducts] = useState<any[]>([]);
  const [rfqQuotes, setRfqQuotes] = useState<any[]>([]);
  const [selectedRfqQuote, setSelectedRfqQuote] = useState<any>("");
  const [chatHistoryLoading, setChatHistoryLoading] = useState<boolean>(false);
  const [selectedChatHistory, setSelectedChatHistory] = useState<any>([]);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<any>([]);
  const [isAttachmentUploading, setIsAttachmentUploading] =
    useState<boolean>(false);
  const [showDetailView, setShowDetailView] = useState<boolean>(false);
  const [showSuggestProduct, setShowSuggestProduct] = useState<boolean>(false);
  const [suggestedProductLink, setSuggestedProductLink] = useState<string>("");
  const {
    sendMessage,
    cratePrivateRoom,
    newMessage,
    newRoom,
    errorMessage,
    clearErrorMessage,
    rfqRequest,
    newAttachment,
  } = useSocket();
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();
  const orderStore = useOrderStore();

  const allRfqQuotesQuery = useAllRfqQuotesUsersBySellerId({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const rfqQuotesDetails = allRfqQuotesQuery.data?.data;

    if (rfqQuotesDetails?.length > 0) {
      setRfqQuotes(rfqQuotesDetails);
      // Don't auto-select first item - let user click on cards
      // setActiveSellerId(rfqQuotesDetails[0]?.id);
      // setSelectedRfqQuote(rfqQuotesDetails[0]);
      // handleRfqProducts(rfqQuotesDetails[0]);
    }
  }, [allRfqQuotesQuery.data?.data]);

  // check room id
  useEffect(() => {
    if (selectedRfqQuote?.sellerID && selectedRfqQuote?.buyerID) {
      checkRoomId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRfqQuote]);

  // get chat history
  useEffect(() => {
    if (selectedRoom) {
      handleChatHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoom]);

  // receive a messaage
  useEffect(() => {
    if (newMessage) {
      handleNewMessage(newMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  // update the new message status
  useEffect(() => {
    if (newMessage?.rfqId === selectedRfqQuote?.rfqQuotesId) {
      handleUpdateNewMessageStatus(newMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  // if new room crated
  useEffect(() => {
    if (newRoom?.roomId) {
      setSelectedRoom(newRoom?.roomId);
    }
  }, [newRoom]);

  // if rfqRequest
  useEffect(() => {
    if (rfqRequest) {
      handleRfqRequest(rfqRequest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rfqRequest]);

  // if any error exception
  useEffect(() => {
    if (errorMessage) {
      toast({
        title: t("chat"),
        description: errorMessage,
        variant: "danger",
      });
      clearErrorMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  // Update attachment status
  useEffect(() => {
    if (newAttachment) {
      handleUpdateAttachmentStatus(newAttachment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAttachment]);

  const handleUpdateAttachmentStatus = (attach: newAttachmentType) => {
    try {
      if (attach?.senderId === user?.id) {
        setSelectedChatHistory((prevChatHistory: any[]) =>
          prevChatHistory.map((item1: any) => ({
            ...item1,
            attachments: item1?.attachments?.map((item2: any) =>
              item2.uniqueId === attach.uniqueId
                ? {
                    ...item2,
                    status: attach.status,
                    filePath: attach.filePath,
                    presignedUrl: attach.presignedUrl,
                    fileType: attach?.fileType,
                  }
                : item2,
            ),
          })),
        );
      } else {
        const chatHistory = [...selectedChatHistory];
        const index = chatHistory.findIndex(
          (message: any) => message.id === attach.messageId,
        );
        if (index !== -1) {
          chatHistory[index]["attachments"].push(attach);
          setSelectedChatHistory(chatHistory);
        }
      }
    } catch (error) {
      toast({
        title: t("chat"),
        description: t("attachment_update_status_failed"),
        variant: "danger",
      });
    }
  };

  const handleUpdateNewMessageStatus = async (message: any) => {
    try {
      if (
        selectedRfqQuote?.rfqQuotesId === message?.rfqId &&
        message?.userId !== user?.id
      ) {
        if (selectedRfqQuote?.buyerID && selectedRoom) {
          const payload = {
            userId: selectedRfqQuote?.buyerID,
            roomId: selectedRoom,
          };
          await updateUnreadMessages(payload);
        }
      }
    } catch (error) {}
  };

  const handleNewMessage = (message: any) => {
    try {
      const index = rfqQuotes.findIndex(
        (rfq: any) => message?.rfqId === rfq.rfqQuotesId,
      );
      if (index !== -1) {
        const rfqList = [...rfqQuotes];
        const [item] = rfqList.splice(index, 1);
        let newItem = {
          ...item,
          lastUnreadMessage: {
            content: message.content,
            createdAt: message.createdAt,
          },
        };

        if (selectedRfqQuote?.rfqQuotesId !== message?.rfqId) {
          newItem = {
            ...newItem,
            unreadMsgCount: newItem?.unreadMsgCount + 1,
          };
        }
        rfqList.unshift(newItem);
        setRfqQuotes(rfqList);
        if (selectedRfqQuote?.rfqQuotesId === message.rfqId) {
          const chatHistory = [...selectedChatHistory];
          const index = chatHistory.findIndex(
            (chat) => chat?.uniqueId === message?.uniqueId,
          );
          if (index !== -1) {
            // upload attachment once the message saved in draft mode, if attachments are selected
            if (chatHistory[index]?.attachments?.length) handleUploadedFile();

            const nMessage = {
              ...message,
              attachments: chatHistory[index]?.attachments || [],
              status: "sent",
            };
            chatHistory[index] = nMessage;
          } else {
            const nMessage = {
              ...message,
              attachments: [],
              status: "sent",
            };
            chatHistory.push(nMessage);
          }
          setSelectedChatHistory(chatHistory);
        }

        if (message?.rfqProductPriceRequest) {
          updateRFQProduct(message?.rfqProductPriceRequest);
        }
      }
    } catch (error) {}
  };

  const handleSendMessage = async () => {
    try {
      if (message || attachments.length) {
        if (selectedRoom) {
          sendNewMessage(selectedRoom, message);
        } else if (
          !selectedRoom &&
          selectedRfqQuote?.sellerID &&
          selectedRfqQuote?.buyerID
        ) {
          handleCreateRoom(message);
        }
        setMessage("");
        setShowEmoji(false);
      } else {
        toast({
          title: t("chat"),
          description: t("please_type_your_message"),
          variant: "danger",
        });
      }
    } catch (error) {
      toast({
        title: t("chat"),
        description: t("failed"),
        variant: "danger",
      });
    }
  };

  const sendNewMessage = (
    roomId: number,
    content: string,
    rfqQuoteProductId?: number,
    sellerId?: number,
    requestedPrice?: number,
  ) => {
    const uniqueId = generateUniqueNumber();
    const attach = attachments.map((att: any) => {
      const extension = att?.name.split(".").pop();
      return {
        fileType: att?.type,
        fileName: att?.name,
        fileSize: att?.size,
        filePath: "",
        fileExtension: extension,
        uniqueId: att.uniqueId,
        status: "UPLOADING",
      };
    });

    const newMessage = {
      roomId: "",
      rfqId: "",
      content: message,
      userId: user?.id,
      user: {
        firstName: user?.firstName,
        lastName: user?.lastName,
      },
      rfqQuotesUserId: null,
      attachments: attach,
      uniqueId,
      status: "SD",
      createdAt: new Date(),
    };
    const chatHistory = [...selectedChatHistory];
    chatHistory.push(newMessage);
    setSelectedChatHistory(chatHistory);

    const msgPayload = {
      roomId: roomId,
      content,
      rfqId: selectedRfqQuote?.rfqQuotesId,
      requestedPrice,
      rfqQuoteProductId,
      sellerId,
      rfqQuotesUserId: activeSellerId,
      uniqueId,
      attachments: attach,
    };
    sendMessage(msgPayload);
  };

  const handleCreateRoom = async (
    content: string,
    rfqQuoteProductId?: number,
    sellerId?: number,
    requestedPrice?: number,
  ) => {
    try {
      const uniqueId = generateUniqueNumber();
      const attach = attachments.map((att: any) => {
        const extension = att?.name.split(".").pop();
        return {
          fileType: att?.type,
          fileName: att?.name,
          fileSize: att?.size,
          filePath: "",
          uniqueId: att.uniqueId,
          fileExtension: extension,
          status: "UPLOADING",
        };
      });

      const newMessage = {
        roomId: "",
        rfqId: "",
        content: message,
        userId: user?.id,
        user: {
          firstName: user?.firstName,
          lastName: user?.lastName,
        },
        rfqQuotesUserId: null,
        attachments: attach,
        uniqueId,
        status: "SD",
        createdAt: new Date(),
      };
      const chatHistory = [...selectedChatHistory];
      chatHistory.push(newMessage);
      setSelectedChatHistory(chatHistory);

      const payload = {
        participants: [selectedRfqQuote?.sellerID, selectedRfqQuote?.buyerID],
        content,
        rfqId: selectedRfqQuote?.rfqQuotesId,
        requestedPrice,
        rfqQuoteProductId,
        sellerId,
        rfqQuotesUserId: activeSellerId,
        uniqueId,
        attachments: attach,
      };
      cratePrivateRoom(payload);
    } catch (error) {
      return "";
    }
  };

  const checkRoomId = async () => {
    try {
      const payloadRoomFind = {
        rfqId: selectedRfqQuote?.rfqQuotesId,
        userId: selectedRfqQuote?.sellerID,
      };
      const room = await findRoomId(payloadRoomFind);
      if (room?.data?.roomId) {
        setSelectedRoom(room?.data?.roomId);
      } else {
        setSelectedRoom(null);
        setChatHistoryLoading(false);
        setSelectedChatHistory([]);
      }
    } catch (error) {
      setChatHistoryLoading(false);
    }
  };

  const handleChatHistory = async () => {
    try {
      setChatHistoryLoading(true);
      const payload = {
        roomId: selectedRoom,
      };
      const res = await getChatHistory(payload);
      if (res?.data?.status === 200) {
        setSelectedChatHistory(res.data.data);
      }
      setChatHistoryLoading(false);
    } catch (error) {
      setChatHistoryLoading(false);
    }
  };

  const handleSendMessageKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRequestPrice = (productId: number, requestedPrice: number) => {
    if (selectedRoom && requestedPrice) {
      sendNewMessage(
        selectedRoom,
        CHAT_REQUEST_MESSAGE.priceRequest.value,
        productId,
        selectedRfqQuote?.sellerID,
        requestedPrice,
      );
    } else if (
      !selectedRoom &&
      requestedPrice &&
      selectedRfqQuote?.sellerID &&
      selectedRfqQuote?.buyerID
    ) {
      handleCreateRoom(
        CHAT_REQUEST_MESSAGE.priceRequest.value,
        productId,
        selectedRfqQuote?.sellerID,
        requestedPrice,
      );
    }
  };

  const handleRfqRequest = (rRequest: {
    id: number;
    messageId: number;
    requestedPrice: number;
    rfqQuoteProductId: number;
    requestedById: number;
    status: string;
    newTotalOfferPrice: number;
  }) => {
    const chatHistory = [...selectedChatHistory];
    const index = chatHistory.findIndex(
      (chat) => chat.id === rRequest.messageId,
    );
    if (index !== -1) {
      const currentMsg = chatHistory[index];
      const updatedMessage = {
        ...currentMsg,
        rfqProductPriceRequest: {
          ...currentMsg.rfqProductPriceRequest,
          status: rRequest.status,
        },
      };
      chatHistory[index] = updatedMessage;
      setSelectedChatHistory(chatHistory);
    }

    // UPDATE TOTAL PRICE
    if (rRequest.status === "APPROVED") {
      setSelectedRfqQuote((prevSelectedRfqQuote: any) => ({
        ...prevSelectedRfqQuote,
        offerPrice: rRequest.newTotalOfferPrice,
      }));
    }

    // UPDATE RFQ PRODUCT
    updateRFQProduct(rRequest);
  };

  const updateRFQProduct = (rRequest: {
    id: number;
    messageId: number;
    requestedPrice: number;
    rfqQuoteProductId: number;
    requestedById: number;
    status: string;
    newTotalOfferPrice: number;
  }) => {
    if (
      selectedRfqQuote?.buyerID === rRequest?.requestedById ||
      (rRequest?.requestedById === user?.id && rRequest?.status === "REJECTED")
    ) {
      const index = quoteProducts.findIndex(
        (product: any) => product.id === rRequest.rfqQuoteProductId,
      );
      if (index !== -1) {
        const pList = [...quoteProducts];
        const product = { ...pList[index] };
        let offerPrice = product.offerPrice;
        if (rRequest.status === "APPROVED") {
          offerPrice = rRequest?.requestedPrice;
        }

        let priceRequest = product?.priceRequest
          ? { ...product.priceRequest }
          : null;

        if (priceRequest) {
          priceRequest = {
            ...priceRequest,
            id: rRequest.id,
            requestedPrice: rRequest.requestedPrice,
            rfqQuoteProductId: rRequest.rfqQuoteProductId,
            status: rRequest?.status,
          };
        } else {
          priceRequest = {
            ...rRequest,
          };
        }

        product.priceRequest = priceRequest;
        product.offerPrice = offerPrice;
        pList[index] = product;
        setQuoteProducts(pList);
      }
    }
  };

  const handleRfqProducts = (item: any) => {
    const newData =
      item?.rfqQuotesUser_rfqQuotes?.rfqQuotesProducts.map((i: any) => {
        let priceRequest = null;
        const pRequest = item?.rfqProductPriceRequests?.find(
          (request: any) =>
            request?.rfqQuoteProductId === i.id &&
            request?.status === "APPROVED",
        );
        if (pRequest) priceRequest = pRequest;
        let offerPrice = i.offerPrice;
        if (
          pRequest &&
          pRequest.status &&
          typeof pRequest.status == "string" &&
          pRequest?.status === "APPROVED"
        ) {
          offerPrice = pRequest?.requestedPrice;
        }
        return {
          ...i,
          priceRequest,
          offerPrice,
          offerPriceFrom: i.offerPriceFrom,
          offerPriceTo: i.offerPriceTo,
          address:
            item?.rfqQuotesUser_rfqQuotes?.rfqQuotes_rfqQuoteAddress?.address,
          deliveryDate:
            item?.rfqQuotesUser_rfqQuotes?.rfqQuotes_rfqQuoteAddress?.rfqDate,
        };
      }) || [];
    setQuoteProducts(newData);
  };

  // Check if checkout is allowed (all products must have approved prices)
  const canCheckout = () => {
    if (!selectedRfqQuote || !quoteProducts || quoteProducts.length === 0) {
      return false;
    }

    // Check if all products have approved price requests
    const allApproved = quoteProducts.every((product: any) => {
      return (
        product?.priceRequest &&
        product?.priceRequest?.status === "APPROVED" &&
        product?.offerPrice &&
        parseFloat(product.offerPrice) > 0
      );
    });

    return allApproved;
  };

  // Calculate total price from approved product prices
  const calculateTotalPrice = () => {
    if (!quoteProducts || quoteProducts.length === 0) {
      return 0;
    }

    return quoteProducts.reduce((total: number, product: any) => {
      if (
        product?.priceRequest &&
        product?.priceRequest?.status === "APPROVED" &&
        product?.offerPrice
      ) {
        const price = parseFloat(product.offerPrice || "0");
        const quantity = product.quantity || 1;
        return total + price * quantity;
      }
      return total;
    }, 0);
  };

  // Handle checkout - redirect to checkout page with RFQ quote data
  const handleCheckout = () => {
    if (!canCheckout()) {
      toast({
        title: t("checkout_not_available") || "Checkout Not Available",
        description:
          t("all_prices_must_be_approved") ||
          "All product prices must be approved before checkout",
        variant: "danger",
      });
      return;
    }

    // Calculate total from approved product prices
    const calculatedTotal = calculateTotalPrice();

    // Store RFQ quote data in order store for checkout
    const rfqQuoteData = {
      rfqQuotesUserId: selectedRfqQuote?.id,
      rfqQuotesId: selectedRfqQuote?.rfqQuotesId,
      sellerId: selectedRfqQuote?.sellerID,
      buyerId: selectedRfqQuote?.buyerID,
      totalPrice: calculatedTotal,
      quoteProducts: quoteProducts.map((product: any) => ({
        id: product.id,
        offerPrice: parseFloat(product.offerPrice || "0"),
        quantity: product.quantity || 1,
        priceRequestId: product.priceRequest?.id,
      })),
    };

    // Store RFQ quote data in sessionStorage for checkout page to access
    if (typeof window !== "undefined") {
      sessionStorage.setItem("rfqQuoteData", JSON.stringify(rfqQuoteData));
    }

    // Store in order store
    orderStore.setOrders({
      ...orderStore.orders,
    });
    orderStore.setTotal(calculatedTotal);

    // Redirect to checkout page with RFQ flag
    router.push("/checkout?fromRfq=true");
  };

  const updateRfqMessageCount = () => {
    const index = rfqQuotes.findIndex(
      (rfq: RfqQuoteType) => rfq.rfqQuotesId === selectedRfqQuote?.rfqQuotesId,
    );
    if (index !== -1) {
      const rfqList = [...rfqQuotes];
      rfqList[index]["unreadMsgCount"] = 0;
      setRfqQuotes(rfqList);
    }
  };

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleUploadedFile = async () => {
    if (attachments?.length) {
      setIsAttachmentUploading(true);
      const uploadPromises = attachments.map(async (file: any) => {
        const formData = new FormData();
        formData.append("content", file);
        formData.append("uniqueId", file.uniqueId);

        try {
          await uploadAttachment(formData);
        } catch (error) {}
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
    setAttachments((prevFiles: any) =>
      prevFiles.filter((_: any, i: any) => i !== index),
    );
  };

  // Group RFQ quotes by RFQ ID to show unique RFQ requests
  const groupedRfqQuotes = React.useMemo(() => {
    const grouped = new Map<number, RfqQuoteType[]>();
    rfqQuotes.forEach((quote) => {
      const rfqId = quote.rfqQuotesId;
      if (!grouped.has(rfqId)) {
        grouped.set(rfqId, []);
      }
      grouped.get(rfqId)!.push(quote);
    });
    return Array.from(grouped.values());
  }, [rfqQuotes]);

  // If detail view is shown, render the detailed chat interface
  if (showDetailView && selectedRfqQuote) {
    return (
      <div>
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => {
              setShowDetailView(false);
              setSelectedRfqQuote("");
              setActiveSellerId(undefined);
              setQuoteProducts([]);
              setSelectedRoom(null);
              setSelectedChatHistory([]);
              setMessage("");
            }}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {t("back_to_requests") || "Back to Requests"}
          </button>
        </div>

        {/* Detailed View */}
        <div className="flex w-full flex-col rounded-xl border border-gray-200 bg-white shadow-lg">
          {/* Header Section */}
          <div className="flex min-h-[70px] w-full items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
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
                  className="text-sm font-medium text-gray-600"
                  dir={langDir}
                  translate="no"
                >
                  {t("offering_price")}
                </p>
                <p
                  className="text-2xl font-bold text-green-600"
                  dir={langDir}
                  translate="no"
                >
                  {(() => {
                    // Calculate total from approved product prices
                    if (!quoteProducts || quoteProducts.length === 0) {
                      return selectedRfqQuote?.offerPrice
                        ? `${currency.symbol}${selectedRfqQuote?.offerPrice}`
                        : "-";
                    }
                    const calculatedTotal = quoteProducts.reduce(
                      (total: number, product: any) => {
                        if (
                          product?.priceRequest &&
                          product?.priceRequest?.status === "APPROVED" &&
                          product?.offerPrice
                        ) {
                          const price = parseFloat(product.offerPrice || "0");
                          const quantity = product.quantity || 1;
                          return total + price * quantity;
                        }
                        return total;
                      },
                      0,
                    );
                    // If we have approved prices, show calculated total, otherwise show original offer price
                    const hasApprovedPrices = quoteProducts.some(
                      (product: any) =>
                        product?.priceRequest &&
                        product?.priceRequest?.status === "APPROVED",
                    );
                    return hasApprovedPrices && calculatedTotal > 0
                      ? `${currency.symbol}${calculatedTotal}`
                      : selectedRfqQuote?.offerPrice
                        ? `${currency.symbol}${selectedRfqQuote?.offerPrice}`
                        : "-";
                  })()}
                </p>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={!canCheckout()}
              className="bg-dark-orange flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-orange-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              translate="no"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {t("checkout")}
            </button>
          </div>

          {/* Content Section */}
          <div className="flex w-full flex-col p-6">
            {/* Product Table Section */}
            <div className="mb-6 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[700px]">
                  {/* Table Header */}
                  <div className="sticky top-0 z-10 grid grid-cols-7 gap-4 border-b border-gray-200 bg-gray-50 px-4 py-3">
                    <div
                      className="text-sm font-semibold text-gray-700"
                      dir={langDir}
                      translate="no"
                    >
                      {t("product")}
                    </div>
                    <div
                      className="text-sm font-semibold text-gray-700"
                      dir={langDir}
                      translate="no"
                    >
                      {t("product_type_indicator")}
                    </div>
                    <div
                      className="text-sm font-semibold text-gray-700"
                      dir={langDir}
                      translate="no"
                    >
                      {t("delivery_date")}
                    </div>
                    <div
                      className="text-sm font-semibold text-gray-700"
                      dir={langDir}
                      translate="no"
                    >
                      {t("brand")}
                    </div>
                    <div
                      className="text-sm font-semibold text-gray-700"
                      dir={langDir}
                      translate="no"
                    >
                      {t("number_of_piece")}
                    </div>
                    <div
                      className="text-sm font-semibold text-gray-700"
                      dir={langDir}
                      translate="no"
                    >
                      {t("price")}
                    </div>
                    <div
                      className="text-sm font-semibold text-gray-700"
                      dir={langDir}
                      translate="no"
                    >
                      {t("address")}
                    </div>
                  </div>
                  {/* Table Body */}
                  {allRfqQuotesQuery.isLoading ? (
                    <div className="space-y-2 p-4">
                      {Array.from({ length: 2 }).map((_, i) => (
                        <Skeleton key={i} className="h-24 w-full" />
                      ))}
                    </div>
                  ) : null}

                  {!allRfqQuotesQuery?.isLoading && !quoteProducts?.length ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <svg
                          className="h-8 w-8 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </div>
                      <p
                        className="text-center text-sm font-medium text-gray-500"
                        dir={langDir}
                        translate="no"
                      >
                        {t("no_data_found")}
                      </p>
                    </div>
                  ) : null}

                  {quoteProducts?.map(
                    (item: {
                      id: number;
                      offerPrice: string;
                      priceRequest: any;
                      note: string;
                      quantity: number;
                      productType?: string;
                      offerPriceFrom?: number;
                      offerPriceTo?: number;
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
                        productId={item?.id}
                        offerPrice={item?.offerPrice}
                        note={item?.note}
                        quantity={item?.quantity}
                        productType={item?.productType}
                        offerPriceFrom={item?.offerPriceFrom}
                        offerPriceTo={item?.offerPriceTo}
                        address={item?.address}
                        deliveryDate={item?.deliveryDate}
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
            </div>

            {/* Chat Section */}
            {rfqQuotes?.length > 0 ? (
              <div className="mb-6 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <SellerChatHistory
                  roomId={selectedRoom}
                  selectedChatHistory={selectedChatHistory}
                  chatHistoryLoading={chatHistoryLoading}
                  buyerId={selectedRfqQuote?.buyerID}
                  rfqUserId={selectedRfqQuote?.id}
                  updateRfqMessageCount={updateRfqMessageCount}
                  unreadMsgCount={selectedRfqQuote?.unreadMsgCount}
                />
              </div>
            ) : null}

            {/* Message Input Section */}
            {rfqQuotes?.length > 0 ? (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                {/* Suggest Product Button - Show only if any product has SIMILAR type */}
                {quoteProducts?.some(
                  (product: any) => product?.productType === "SIMILAR",
                ) && (
                  <div className="mb-3">
                    <button
                      onClick={() => setShowSuggestProduct(!showSuggestProduct)}
                      type="button"
                      className="flex items-center gap-2 rounded-lg border border-green-500 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-100"
                      dir={langDir}
                      translate="no"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      {t("suggest_alternative_product")}
                    </button>

                    {/* Product Suggestion Input */}
                    {showSuggestProduct && (
                      <div className="mt-3 rounded-lg border border-gray-300 bg-white p-4">
                        <label
                          className="mb-2 block text-sm font-medium text-gray-700"
                          dir={langDir}
                          translate="no"
                        >
                          {t("similar_product_suggestion")}:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={suggestedProductLink}
                            onChange={(e) =>
                              setSuggestedProductLink(e.target.value)
                            }
                            placeholder={
                              t("enter_product_link_or_id") ||
                              "Enter product link or ID"
                            }
                            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
                            dir={langDir}
                          />
                          <button
                            onClick={() => {
                              if (suggestedProductLink.trim()) {
                                const suggestionMessage = `${t("suggested_product")}: ${suggestedProductLink}`;
                                setMessage(suggestionMessage);
                                setSuggestedProductLink("");
                                setShowSuggestProduct(false);
                              }
                            }}
                            type="button"
                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                            dir={langDir}
                            translate="no"
                          >
                            {t("add")}
                          </button>
                          <button
                            onClick={() => {
                              setShowSuggestProduct(false);
                              setSuggestedProductLink("");
                            }}
                            type="button"
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                            dir={langDir}
                            translate="no"
                          >
                            {t("cancel")}
                          </button>
                        </div>
                        <p className="mt-2 text-xs text-gray-500" dir={langDir}>
                          {t("you_can_suggest_similar_products_if_unavailable")}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex w-full items-end gap-3">
                  {/* Attachment Button */}
                  <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-white transition-colors hover:bg-gray-50">
                    <input
                      type="file"
                      className="absolute inset-0 z-10 cursor-pointer opacity-0"
                      multiple
                      onChange={handleFileChange}
                    />
                    <Image
                      src={AttachIcon}
                      alt="attach-icon"
                      className="h-5 w-5"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-1 items-end gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5">
                    <textarea
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      placeholder={
                        t("type_your_message") || "Type your message...."
                      }
                      className="max-h-32 min-h-[40px] w-full resize-none border-0 text-sm focus:outline-none"
                      onKeyDown={handleSendMessageKeyDown}
                      rows={1}
                    />
                    <button
                      onClick={() => setShowEmoji(!showEmoji)}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
                      type="button"
                    >
                      <Image
                        src={SmileIcon}
                        alt="smile-icon"
                        className="h-5 w-5"
                      />
                    </button>
                  </div>

                  {/* Send Button */}
                  <button
                    onClick={handleSendMessage}
                    type="button"
                    className="bg-dark-orange flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-orange-600"
                  >
                    <Image src={SendIcon} alt="send-icon" className="h-5 w-5" />
                  </button>
                </div>

                {/* Emoji Picker */}
                {showEmoji ? (
                  <div className="mt-3 rounded-lg border border-gray-200 bg-white p-2">
                    <EmojiPicker
                      lazyLoadEmojis={true}
                      onEmojiClick={onEmojiClick}
                      className="mt-2"
                    />
                  </div>
                ) : null}

                {/* Attachments Preview */}
                {!isAttachmentUploading && attachments.length > 0 ? (
                  <div className="mt-3 flex w-full flex-wrap gap-2">
                    {attachments.map((file: any, index: any) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2"
                      >
                        <svg
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span className="max-w-[200px] truncate text-sm text-gray-700">
                          {file.name}
                        </span>
                        <button
                          onClick={() => removeFile(index)}
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600 transition-colors hover:bg-red-200"
                          type="button"
                        >
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  // Card View - Show all RFQ requests as cards
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2
          className="text-2xl font-bold text-gray-900"
          dir={langDir}
          translate="no"
        >
          {t("request_for_rfq")}
        </h2>
        <p className="mt-1 text-sm text-gray-600" dir={langDir} translate="no">
          {t("select_an_rfq_request_to_view_details") ||
            "Select an RFQ request to view details and respond"}
        </p>
      </div>

      {/* Loading State */}
      {allRfqQuotesQuery?.isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      ) : null}

      {/* Empty State */}
      {!allRfqQuotesQuery?.isLoading && groupedRfqQuotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p
            className="text-center text-lg font-medium text-gray-500"
            dir={langDir}
            translate="no"
          >
            {t("no_data_found")}
          </p>
        </div>
      ) : null}

      {/* RFQ Request Cards Grid */}
      {!allRfqQuotesQuery?.isLoading && groupedRfqQuotes.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groupedRfqQuotes.map((rfqGroup, groupIndex) => {
            // Get the first quote from the group to display main info
            const mainQuote = rfqGroup[0];
            const rfqId = mainQuote.rfqQuotesId;

            // Get all product images from all quotes in this group
            const allProductImages = rfqGroup
              .flatMap(
                (quote) =>
                  quote.rfqQuotesUser_rfqQuotes?.rfqQuotesProducts?.map(
                    (product: any) =>
                      product?.rfqProductDetails?.productImages?.[0],
                  ) || [],
              )
              .filter(Boolean);

            // Get buyer info from first quote
            const buyerInfo = mainQuote.buyerIDDetail;
            const buyerName =
              (buyerInfo as any)?.accountName ||
              `${buyerInfo?.firstName || ""} ${buyerInfo?.lastName || ""}`.trim() ||
              "Buyer";

            // Calculate total unread messages for this RFQ
            const totalUnreadMessages = rfqGroup.reduce(
              (total, quote) => total + (quote.unreadMsgCount || 0),
              0,
            );

            // Get latest message
            const latestMessage = rfqGroup
              .map((q) => q.lastUnreadMessage)
              .filter(Boolean)
              .sort(
                (a, b) =>
                  new Date(b?.createdAt || 0).getTime() -
                  new Date(a?.createdAt || 0).getTime(),
              )[0];

            return (
              <div
                key={rfqId}
                onClick={() => {
                  // Select the first quote in the group
                  setSelectedRfqQuote(mainQuote);
                  setActiveSellerId(mainQuote.id);
                  handleRfqProducts(mainQuote);
                  setShowDetailView(true);
                }}
                className="group hover:border-dark-orange cursor-pointer overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-dark-orange flex h-10 w-10 items-center justify-center rounded-lg shadow-sm">
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <span
                        className="text-xs font-medium text-gray-500"
                        translate="no"
                      >
                        {t("rfq_id")}
                      </span>
                      <p
                        className="text-dark-orange text-base font-bold"
                        translate="no"
                      >
                        RFQ{String(rfqId || "").padStart(5, "0")}
                      </p>
                    </div>
                  </div>
                  {totalUnreadMessages > 0 && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-md">
                      {totalUnreadMessages > 9 ? "9+" : totalUnreadMessages}
                    </div>
                  )}
                </div>

                {/* Product Images */}
                <div className="p-4">
                  <div className="mb-3 flex gap-2">
                    {allProductImages
                      .slice(0, 3)
                      .map((img: any, idx: number) => (
                        <div
                          key={idx}
                          className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100"
                        >
                          <Image
                            src={
                              img?.image && validator.isURL(img.image)
                                ? img.image
                                : PlaceholderImage
                            }
                            fill
                            alt={`Product ${idx + 1}`}
                            className="object-cover"
                          />
                        </div>
                      ))}
                    {allProductImages.length > 3 && (
                      <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                        <span className="text-sm font-bold text-gray-600">
                          +{allProductImages.length - 3}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Buyer Info */}
                  <div className="mb-3 flex items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white ring-2 ring-gray-100">
                      <Image
                        src={buyerInfo?.profilePicture || PlaceholderImage}
                        alt={buyerName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {buyerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {rfqGroup.length}{" "}
                        {rfqGroup.length === 1 ? "request" : "requests"}
                      </p>
                    </div>
                  </div>

                  {/* Latest Message Preview */}
                  {latestMessage?.content && (
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-2">
                      <p className="line-clamp-2 text-xs text-gray-600">
                        {latestMessage.content}
                      </p>
                      {latestMessage.createdAt && (
                        <p className="mt-1 text-xs text-gray-400">
                          {moment(latestMessage.createdAt).fromNow()}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Delivery Date */}
                  {mainQuote.rfqQuotesUser_rfqQuotes?.rfqQuotes_rfqQuoteAddress
                    ?.rfqDate && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-600">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        {moment(
                          mainQuote.rfqQuotesUser_rfqQuotes
                            .rfqQuotes_rfqQuoteAddress.rfqDate,
                        ).format("MMM DD, YYYY")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SellerChat;
