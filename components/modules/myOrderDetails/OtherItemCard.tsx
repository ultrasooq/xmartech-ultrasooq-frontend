import { formattedDate } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSolidCircle, BiCircle } from "react-icons/bi";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

/**
 * Props for the buyer-side {@link OtherItemCard} component.
 *
 * @property id                 - Order product entry ID.
 * @property orderProductType    - `"SERVICE"` or product type.
 * @property productName         - Product display name.
 * @property offerPrice          - Price string.
 * @property orderQuantity       - Quantity ordered.
 * @property variant             - Variant details.
 * @property serviceFeature      - Service feature data.
 * @property productImages       - Array of product image objects.
 * @property sellerName          - Seller's display name.
 * @property orderNo             - Human-readable order number.
 * @property orderProductDate    - Order placement date string.
 * @property orderProductStatus  - Current delivery status.
 * @property updatedAt           - Last-updated timestamp.
 */
type OtherItemCardProps = {
  id: number;
  orderProductType?: string;
  productName: string;
  offerPrice: string;
  orderQuantity?: number;
  variant?: any;
  serviceFeature?: any;
  productImages?: { id: number; image: string }[];
  sellerName?: string;
  orderNo: string;
  orderProductDate: string;
  orderProductStatus: string;
  updatedAt: string;
};

/**
 * Displays "Other Items in this order" card on the buyer's order
 * details page. Shows product image, name, price, status, and date.
 * Links to the order detail page at `/my-orders/<id>`.
 *
 * @param props - {@link OtherItemCardProps}
 * @returns An order item card for sibling items in the same order.
 */
const OtherItemCard: React.FC<OtherItemCardProps> = ({
  id,
  orderProductType,
  productName,
  offerPrice,
  orderQuantity,
  variant,
  serviceFeature,
  productImages,
  sellerName,
  orderNo,
  orderProductDate,
  orderProductStatus,
  updatedAt,
}) => {
  const t = useTranslations();
  const { langDir, currency } = useAuth();

  return (
    <div className="my-order-item">
      <div className="my-order-card">
        <div className="cardTitle mb-2!">Other Items in this order</div>
        <h5 className="mb-2" dir={langDir} translate="no">
          {t("order_id")}: <span className="font-semibold">{orderNo}</span>
        </h5>
        <div className="my-order-box">
          <Link href={`/my-orders/${id}`}>
            {orderProductType == 'SERVICE' ? (
              <figure>
                <div className="image-container rounded border border-gray-300">
                  <Image
                    src={PlaceholderImage}
                    alt="preview-product"
                    width={120}
                    height={120}
                    placeholder="blur"
                    blurDataURL="/images/product-placeholder.png"
                  />
                </div>
                <figcaption>
                  <h3>{serviceFeature?.name}</h3>
                  <h4 className="mt-1">
                    {currency.symbol}{Number(offerPrice) * (orderQuantity ?? 0)}
                  </h4>
                  <p className="text-gray-500">Quantity x {orderQuantity || 0}</p>
                </figcaption>
              </figure>
            ) : (
              <figure>
                <div className="image-container rounded border border-gray-300">
                  <Image
                    src={productImages?.[0]?.image || PlaceholderImage}
                    alt="preview-product"
                    width={120}
                    height={120}
                    placeholder="blur"
                    blurDataURL="/images/product-placeholder.png"
                  />
                </div>
                <figcaption>
                  <h3>{productName}</h3>
                  <p className="mt-1">Seller: {sellerName}</p>
                  <h4 className="mt-1">
                    {currency.symbol}{Number(offerPrice) * (orderQuantity ?? 0)}
                  </h4>
                  <p className="text-gray-500">Quantity x {orderQuantity || 0}</p>
                  {orderProductType == 'PRODUCT' && variant ? (
                    (() => {
                      if (Array.isArray(variant)) {
                        return variant.map((obj: any, index: number) => {
                          return (
                            <p className="text-gray-500" dir={langDir} key={index}>
                              {obj.type}: {obj.value}
                            </p>
                          );
                        });
                      }

                      return (
                        <p className="text-gray-500" dir={langDir}>
                          {variant.type}: {variant.value}
                        </p>
                      );
                    })()
                  ) : null}
                </figcaption>
              </figure>
            )}
          </Link>
          <div className="right-info">
            <h4 className="mb-2" dir={langDir} translate="no">
              {orderProductStatus === "CONFIRMED" ? (
                <>
                  <BiCircle color="green" />
                  {t("placed_on")}{" "}
                  {orderProductDate ? formattedDate(orderProductDate) : ""}
                </>
              ) : null}

              {orderProductStatus === "SHIPPED" ? (
                <>
                  <BiCircle color="green" />
                  {t("shipped_on")} {updatedAt ? formattedDate(updatedAt) : ""}
                </>
              ) : null}

              {orderProductStatus === "OFD" ? (
                <>
                  <BiCircle color="green" /> {t("out_for_delivery")}{" "}
                  {updatedAt ? formattedDate(updatedAt) : ""}
                </>
              ) : null}

              {orderProductStatus === "DELIVERED" ? (
                <>
                  <BiSolidCircle color="green" /> {t("delivered_on")}{" "}
                  {updatedAt ? formattedDate(updatedAt) : ""}
                </>
              ) : null}

              {orderProductStatus === "CANCELLED" ? (
                <>
                  <BiSolidCircle color="red" /> {t("cancelled_on")}{" "}
                  {updatedAt ? formattedDate(updatedAt) : ""}
                </>
              ) : null}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherItemCard;
