import React, { useEffect, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import SecurePaymentIcon from "@/public/images/securePaymenticon.svg";
import SupportIcon from "@/public/images/support-24hr.svg";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import OtherSellerSection from "../trending/OtherSellerSection";
import Link from "next/link";

type ProductDescriptionCardProps = {
  productId: string;
  productName: string;
  brand: string;
  productPrice: string;
  offerPrice: string;
  skuNo: string;
  productTags: any[];
  category: string;
  productShortDescription: any[];
  productQuantity: number;
  productReview: { rating: number }[];
  onAdd: (args0: number, args2: "add" | "remove") => void;
  isLoading: boolean;
  soldBy: string;
  soldByTradeRole: string;
  userId?: number;
  sellerId?: number;
  haveOtherSellers?: boolean;
  productProductPrice?: string;
  consumerDiscount?: number;
  askForPrice?: string;
  otherSellerDetails?: any[];
  productPriceArr: any[];
};

const ProductDescriptionCard: React.FC<ProductDescriptionCardProps> = ({
  productId,
  productName,
  brand,
  productPrice,
  offerPrice,
  skuNo,
  productTags,
  category,
  productShortDescription,
  productQuantity,
  productReview,
  onAdd,
  isLoading,
  soldBy,
  soldByTradeRole,
  userId,
  sellerId,
  haveOtherSellers,
  productProductPrice,
  consumerDiscount,
  askForPrice,
  otherSellerDetails,
  productPriceArr
}) => {
  const [, setQuantity] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const calculateDiscountedPrice = () => {
    const price = productProductPrice ? Number(productProductPrice) : 0;
    const discount = consumerDiscount || 0;
    return price - (price * discount) / 100;
  };

  const calculateAvgRating = useMemo(() => {
    const totalRating = productReview?.reduce(
      (acc: number, item: { rating: number }) => {
        return acc + item.rating;
      },
      0,
    );

    const result = totalRating / productReview?.length;
    return !isNaN(result) ? Math.floor(result) : 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productReview?.length]);

  const calculateRatings = useMemo(
    () => (rating: number) => {
      const stars:Array<React.ReactNode> = [];
      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          stars.push(<FaStar key={i} color="#FFC107" size={20} />);
        } else {
          stars.push(<FaRegStar key={i} color="#FFC107" size={20} />);
        }
      }
      return stars;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productReview?.length],
  );

  useEffect(() => {
    setQuantity(productQuantity || 1);
  }, [productQuantity]);

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
    // Get UTC offset
    const getUTCOffset = () => {
      const now = new Date();
      const offsetMinutes = now.getTimezoneOffset();
      const offsetHours = Math.abs(offsetMinutes) / 60;
      const sign = offsetMinutes > 0 ? "-" : "+";
      return `UTC${sign}${String(offsetHours).padStart(2, "0")}:00`;
    };

    // get end date and time with own timezone
    const formatDateTimeWithTimezone = (isoDate: string, time24: string) => {
      if (!isoDate || !time24) return "Invalid date"; // Handle empty values safely
    
      // Parse the dateClose string to get the correct date
      const date = new Date(isoDate);
      
      // Extract hours and minutes from `endTime` (which is in 24-hour format)
      const [hours, minutes] = time24.split(":").map(Number);
      
      // Set the correct local time (adjusting for timezone shifts)
      date.setHours(hours, minutes, 0, 0); // Set the correct time in local time
    
      // Get the user's local timezone
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
      // Format the date-time in the user's local timezone
      return date.toLocaleString("en-US", {
        timeZone: userTimeZone,
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Ensures AM/PM format
      });
    };

    // For CountDown
    useEffect(() => {
      if (!productPriceArr?.length) return;
  
      const updateCountdown = () => {
        const product = productPriceArr[0];
        if (!product) return;
  
        const timeRemaining = calculateTimeLeft(product);
        setTimeLeft(timeRemaining);
      };
  
      updateCountdown(); // Initial update
      const interval = setInterval(updateCountdown, 1000); // Update every second
  
      return () => clearInterval(interval); // Cleanup on unmount
    }, [productPriceArr]);
  
    const calculateTimeLeft = (product: any): string => {
      const { startTime, dateOpen, dateClose, endTime } = product;
  
      if (!startTime || !dateOpen || !dateClose || !endTime) return "N/A";
  
      // Convert to timestamps
      const startTimestamp = getLocalTimestamp(dateOpen, startTime);
      const endTimestamp = getLocalTimestamp(dateClose, endTime);
  
      // Get current time
      const now = Date.now();
  
      // Ensure countdown starts from `startTimestamp`
      let ms = endTimestamp - Math.max(now, startTimestamp);
      if (ms <= 0) return "Expired";
  
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));
      const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  
      return `${String(days).padStart(2, "0")}d : ${String(hours).padStart(2, "0")}h : ${String(minutes).padStart(2, "0")}m : ${String(seconds).padStart(2, "0")}s`;
    };
  
    const getLocalTimestamp = (isoDate: string, timeStr: string): number => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      const date = new Date(isoDate); // Parses in UTC
      date.setHours(hours, minutes, 0, 0); // Adjust time
      return date.getTime();
    };
  

  return (
    <div className="product-view-s1-right">
      {isLoading ? <Skeleton className="mb-2 h-10 w-full" /> : null}
      <div className="info-col">
        <h2>{productName}</h2>
      </div>
      {isLoading ? (
        <Skeleton className="mb-2 h-28 w-full" />
      ) : (
        <div className="info-col mb-2">
          <div className="brand_sold_info !items-start">
            <div className="lediv w-1/2">
              <h5>
                <span>Brand:</span> {brand}
              </h5>
            </div>

            <div className="rgdiv flex w-1/2 gap-x-2">
              <h5 className="!w-20 !capitalize !text-dark-orange">Sold By:</h5>
              <Link
                href={
                  soldByTradeRole === "COMPANY"
                    ? `/company-profile-details?userId=${sellerId}`
                    : soldByTradeRole === "FREELANCER"
                      ? `/freelancer-profile-details?userId=${sellerId}`
                      : "#"
                }
              >
                <h5>{soldBy}</h5>
              </Link>
            </div>
          </div>
          <div className="rating">
            {calculateRatings(calculateAvgRating)}
            <span className="mt-1">({productReview?.length} Reviews)</span>
          </div>
          {askForPrice === "true" ? (
            <h3 className="w-fit rounded !bg-dark-orange px-4 py-2 !font-semibold !normal-case !text-white !no-underline shadow-md">
              Ask for price
            </h3>
          ) : (
            <h3>
              ${calculateDiscountedPrice()} <span>${productProductPrice}</span>
            </h3>
          )}
        </div>
      )}

      {isLoading ? (
        <Skeleton className="h-44 w-full" />
      ) : (
        <div className="info-col">
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="col-12 col-md-12">
                <div className="form-group min-h-[160px] pl-8">
                  {productShortDescription?.length ? (
                    <ul className="list-disc">
                      {productShortDescription?.map((item) => (
                        <li key={item?.id}>{item?.shortDescription}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No Description</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    {isLoading ? (
        <Skeleton className="h-44 w-full" />
      ) : (
        productPriceArr[0]?.sellType === "BUYGROUP" ?
        <div className="info-col">
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="form-group mb-0">
              {/* <label>Report Abuse</label> */}
              <p>
                <span className="color-text">Time Left:</span> {timeLeft}
                {/* {formatTime(
                  // timeLeft, 
                  productPriceArr[0]?.startTime, 
                  productPriceArr[0]?.dateOpen, 
                  productPriceArr[0]?.dateClose, 
                  productPriceArr[0]?.endTime)
                  } <br /> */}
                 {/* {formatDateTimeWithTimezone(productPriceArr[0]?.dateOpen, productPriceArr[0]?.startTime)} */}
              </p>
              <p>
                <span className="color-text">Group Buy deal ends :</span> {formatDateTimeWithTimezone(productPriceArr[0]?.dateClose, productPriceArr[0]?.endTime)}
              </p>
              <p>
                <span className="color-text">Timezone:</span> {getUTCOffset()} ({userTimezone})
                
              </p>

              <p>
                <span className="color-text">Minimum Quantity:</span> <b>{productPriceArr[0]?.minQuantity}</b>
                
              </p>
              <p>
                <span className="color-text">Maximum Quantity:</span> <b>{productPriceArr[0]?.maxQuantity}</b>
                
              </p>
              <p>
                <span className="color-text">Deals sold:</span>{0}
               </p>
               <p>
                <span className="color-text">Minimum Quantity Per Customer:</span> <b>{productPriceArr[0]?.minQuantityPerCustomer}</b>
                
              </p>
              <p>
                <span className="color-text">Maximum Quantity Per Customer:</span> <b>{productPriceArr[0]?.maxQuantityPerCustomer}</b>
                
              </p>
              
            </div>
          </div>
        </div>
      </div>
         : null
      )}


      <div className="info-col top-btm-border">
        <div className="form-group mb-0">
          <div className="quantity-with-right-payment-info">
            <div className="right-payment-info">
              <ul>
                <li>
                  <Image
                    src={SecurePaymentIcon}
                    alt="secure-payment-icon"
                    width={28}
                    height={22}
                  />
                  <span>Secure Payment</span>
                </li>
                <li>
                  <Image
                    src={SupportIcon}
                    alt="support-24hr-icon"
                    width={28}
                    height={28}
                  />
                  <span>Secure Payment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Skeleton className="h-28 w-full" />
      ) : (
        <div className="info-col">
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="form-group mb-0">
                <label>Report Abuse</label>
                <p>
                  <span className="color-text">SKU:</span> {skuNo}
                </p>
                <p>
                  <span className="color-text">Categories:</span> {category}
                </p>
                <p>
                  <span className="color-text">Tags:</span>{" "}
                  {productTags
                    ?.map((item) => item.productTagsTag?.tagName)
                    .join(", ")}
                </p>
                {haveOtherSellers ? (
                  <Drawer
                    direction="right"
                    open={isDrawerOpen}
                    onOpenChange={setIsDrawerOpen}
                  >
                    {/* <DrawerTrigger asChild> */}
                    <Button
                      variant="ghost"
                      className="font-bold text-red-500"
                      onClick={() => setIsDrawerOpen(true)}
                    >
                      See other sellers
                    </Button>
                    {/* </DrawerTrigger> */}
                    <DrawerContent className="left-auto right-0 top-0 mt-0 w-[600px] rounded-none">
                      <ScrollArea className="h-screen">
                        <div className="mx-auto w-full p-2">
                          <DrawerHeader>
                            <DrawerTitle>All Sellers</DrawerTitle>
                          </DrawerHeader>
                          <OtherSellerSection
                            setIsDrawerOpen={setIsDrawerOpen}
                            otherSellerDetails={otherSellerDetails}
                          />
                        </div>
                      </ScrollArea>
                    </DrawerContent>
                  </Drawer>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescriptionCard;
