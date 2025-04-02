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
import MinusIcon from "@/public/images/upDownBtn-minus.svg";
import PlusIcon from "@/public/images/upDownBtn-plus.svg";
import { useTranslations } from "next-intl";
import { toast } from "@/components/ui/use-toast";

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
  minQuantity?: number;
  maxQuantity?: number;
  onQuantityChange?: (newQuantity: number, action: "add" | "remove") => void;
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
  productQuantity = 0, // Default to 1 if undefined
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
  productPriceArr,
  minQuantity,
  maxQuantity,
  onQuantityChange, // Callback to update productQuantity outside
}) => {
  const t = useTranslations();
  const [quantity, setQuantity] = useState(productQuantity);
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
      const stars: Array<React.ReactNode> = [];
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
    setQuantity(productQuantity || 0);
  }, [productQuantity]);

  const updateQuantity = (newQuantity: number, action: "add" | "remove") => {
    if (maxQuantity && maxQuantity < newQuantity) {
      toast({
        description: t('max_quantity_must_be_n', { n: maxQuantity }),
        variant: "danger"
      });
      return;
    }

    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity, action); // Notify parent if function exists
  };

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
    if (!productPriceArr?.length || productPriceArr?.[0]?.sellType !== "BUYGROUP")
      return;

    const product = productPriceArr[0];

    const startTimestamp = getLocalTimestamp(
      product.dateOpen,
      product.startTime,
    );
    const endTimestamp = getLocalTimestamp(product.dateClose, product.endTime);

    const updateCountdown = () => {
      const now = Date.now();

      if (now < startTimestamp) {
        setTimeLeft("NotStarted");
        return;
      }

      let ms = endTimestamp - now;
      if (ms <= 0) {
        setTimeLeft("Expired");
        return;
      }

      setTimeLeft(formatTime(ms));
    };

    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [productPriceArr]);

  // ✅ Fixing getLocalTimestamp to correctly combine Date + Time
  const getLocalTimestamp = (dateStr: any, timeStr: any) => {
    const date = new Date(dateStr); // Parse date part only
    const [hours, minutes] = (timeStr || "").split(":").map(Number); // Extract hours/minutes

    date.setHours(hours, minutes || 0, 0, 0); // Set correct time in local timezone

    return date.getTime(); // Return timestamp in milliseconds
  };

  // ✅ Corrected formatTime function to display (Days, Hours, Minutes, Seconds)
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(
      2,
      "0",
    );
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0",
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    // console.log(days, hours, minutes, seconds)
    return `${days}:${hours}:${minutes}:${seconds}`;
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
            <div className="lediv w-full sm:w-1/2">
              <h5>
                <span className="inline-block w-20 sm:!w-20">Brand:</span>{" "}
                {brand}
              </h5>
            </div>

            <div className="rgdiv flex w-full gap-x-2 sm:w-1/2">
              <h5 className="w-20 !capitalize !text-dark-orange sm:!w-20">
                Sold By:
              </h5>
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
              ${calculateDiscountedPrice()}{" "}
              <span>${Number(productProductPrice)}</span>
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
                <div className="form-group min-h-[60px] pl-8">
                  {productShortDescription?.length ? (
                    <ul className="list-disc">
                      {productShortDescription?.map((item) => (
                        <li key={item?.id}>{item?.shortDescription}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{t("no_description")}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-x-4">
        <Button
          variant="outline"
          className="relative hover:shadow-sm"
          onClick={() => updateQuantity(quantity - 1, "remove")}
          disabled={quantity === 0}
        >
          <Image src={MinusIcon} alt="minus-icon" fill className="p-3" />
        </Button>
        <p>{quantity}</p>
        <Button
          variant="outline"
          className="relative hover:shadow-sm"
          onClick={() => updateQuantity(quantity + 1, "add")}
        >
          <Image src={PlusIcon} alt="plus-icon" fill className="p-3" />
        </Button>
      </div>

      {isLoading ? (
        <Skeleton className="h-44 w-full" />
      ) : productPriceArr?.[0]?.sellType === "BUYGROUP" ? (
        <div className="info-col">
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="form-group mb-0">
                {/* <label>Report Abuse</label> */}
                <p>
                  {timeLeft !== "NotStarted" && timeLeft !== "Expired" && (
                    <div className="">
                      {t("time_left")}
                      <div className="time_wrap">
                        <div className="time_field">
                          <h3>{timeLeft.split(":")[0]}</h3>
                          <h6>Days</h6>
                        </div>
                        <div className="time_field">
                          <h3>{timeLeft.split(':')[1]}</h3>
                          <h6>Hours</h6>
                        </div>
                        <div className="time_field">
                          <h3>{timeLeft.split(":")[2]}</h3>
                          <h6>Minutes</h6>
                        </div>
                        <div className="time_field">
                          <h3>{timeLeft.split(":")[3]}</h3>
                          <h6>Seconds</h6>
                        </div>
                      </div>
                    </div>
                  )}
                </p>
                <p>
                  <span className="color-text">
                    {t("group_buy_deal_ends")} :
                  </span>{" "}
                  {formatDateTimeWithTimezone(
                    productPriceArr?.[0]?.dateClose,
                    productPriceArr?.[0]?.endTime,
                  )}
                </p>
                <p>
                  <span className="color-text">{t("timezone")}:</span>{" "}
                  {getUTCOffset()} ({userTimezone})
                </p>

                <p>
                  <span className="color-text">{t("min_quantity")}:</span>{" "}
                  <b>{productPriceArr?.[0]?.minQuantity}</b>
                </p>
                <p>
                  <span className="color-text">{(t("max_quantity"))}:</span>{" "}
                  <b>{productPriceArr?.[0]?.maxQuantity}</b>
                </p>
                <p>
                  <span className="color-text">{t("deals_sold")}:</span>
                  {0}
                </p>
                <p>
                  <span className="color-text">
                    {t("min_quantity_per_customer")}:
                  </span>{" "}
                  <b>{productPriceArr?.[0]?.minQuantityPerCustomer}</b>
                </p>
                <p>
                  <span className="color-text">
                    {t("max_quantity_per_customer")}:
                  </span>{" "}
                  <b>{productPriceArr?.[0]?.maxQuantityPerCustomer}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

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
                  <span>{t("secure_payment")}</span>
                </li>
                <li>
                  <Image
                    src={SupportIcon}
                    alt="support-24hr-icon"
                    width={28}
                    height={28}
                  />
                  <span>{t("secure_payment")}</span>
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
                <label>{t("report_abuse")}</label>
                <p>
                  <span className="color-text">{t("sku")}:</span> {skuNo}
                </p>
                <p>
                  <span className="color-text">{t("categories")}:</span>{" "}
                  {category}
                </p>
                <p>
                  <span className="color-text">{t("tags")}:</span>{" "}
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
                            <DrawerTitle>{t("all_sellers")}</DrawerTitle>
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
