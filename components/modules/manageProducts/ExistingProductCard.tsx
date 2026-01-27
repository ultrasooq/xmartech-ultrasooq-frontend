import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import Image from "next/image";
import validator from "validator";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { IoMdAdd } from "react-icons/io";

/**
 * Props for the {@link ExistingProductCard} component.
 *
 * @property selectedIds    - Array of currently selected product IDs
 *   (for bulk operations).
 * @property onSelectedId   - Callback fired when the checkbox state
 *   changes; receives the checked state and the product ID.
 * @property id             - Unique product ID.
 * @property productImage   - URL of the product image, or `null`.
 * @property productName    - Display name of the product.
 * @property productPrice   - Base product price.
 * @property offerPrice     - Offer/discounted price.
 * @property categoryName   - Name of the product category.
 * @property brandName      - Name of the product brand.
 * @property shortDescription - Brief product description.
 * @property skuNo          - Optional SKU number.
 * @property productType    - Product type code: `"P"` (regular),
 *   `"R"` (RFQ), or `"D"` (dropship). Defaults to `"P"`.
 * @property isDropshipPage - When `true`, renders the dropship-specific
 *   action button instead of the standard "Add to My Products" button.
 * @property onAddToDropship - Callback fired when the user clicks
 *   "Add to Dropshipable Product".
 */
type ExistingProductCardProps = {
  selectedIds?: number[];
  onSelectedId?: (args0: boolean | string, args1: number) => void;
  id: number;
  productImage: string | null;
  productName: string;
  productPrice: number;
  offerPrice: number;
  categoryName: string;
  brandName: string;
  shortDescription: string;
  skuNo?: string;
  productType?: string;
  isDropshipPage?: boolean;
  onAddToDropship?: (productId: number) => void;
};

/**
 * Compact card component for displaying an existing product in the
 * "Add from Existing" flow.
 *
 * Shows the product image (S3-hosted images use `next/image`, external
 * URLs fall back to a native `<img>` tag with error handling), name,
 * price, category, and brand. The right side renders a contextual
 * action button:
 * - **Dropship page:** "Add to Dropshipable Product" (purple).
 * - **RFQ type:**      "Add to RFQ Products" (green), navigates to
 *   `/product?copy=<id>&productType=R`.
 * - **Default:**       "Add to My Products" (blue), navigates to
 *   `/product?copy=<id>&fromExisting=true`.
 *
 * A selection checkbox is shown for non-RFQ, non-dropship views when
 * an `onSelectedId` callback is provided.
 *
 * @param props - {@link ExistingProductCardProps}
 * @returns A bordered card element with product info and action button.
 */
const ExistingProductCard: React.FC<ExistingProductCardProps> = ({
  selectedIds,
  onSelectedId,
  id,
  productImage,
  productName,
  productPrice,
  offerPrice,
  categoryName,
  brandName,
  shortDescription,
  skuNo,
  productType = "P",
  isDropshipPage = false,
  onAddToDropship,
}) => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const router = useRouter();

  /** Navigates to the product creation form pre-populated with this product's data. */
  const handleAddToMyProducts = () => {
    router.push(`/product?copy=${id}&fromExisting=true`);
  };

  /** Navigates to the RFQ product creation form copying this product's data. */
  const handleAddToRfqProducts = () => {
    router.push(`/product?copy=${id}&productType=R`);
  };

  /** Invokes the parent's onAddToDropship callback with this product's ID. */
  const handleAddToDropship = () => {
    if (onAddToDropship) {
      onAddToDropship(id);
    }
  };

  return (
    <div className="mb-4 w-full rounded-lg border border-gray-200 bg-white shadow-xs">
      {/* Compact View - Always Visible */}
      <div className="flex items-center justify-between p-4">
        {/* Left Section - Product Info */}
        <div className="flex items-center space-x-4">
          {/* Checkbox - Only show for product type P and not on dropship page */}
          {productType !== "R" && !isDropshipPage && onSelectedId && (
            <div className="flex flex-col items-center space-y-2">
              <Checkbox
                className="border border-solid border-gray-300 data-[state=checked]:bg-blue-600!"
                checked={selectedIds?.includes(id)}
                onCheckedChange={(checked) => {
                  onSelectedId?.(checked, id);
                }}
              />
            </div>
          )}

          {/* Product Image */}
          <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-gray-200">
            {productImage && validator.isURL(productImage) ? (
              // Check if the image is from an allowed domain (S3 bucket)
              productImage.includes('puremoon.s3.amazonaws.com') ? (
                <Image
                  src={productImage}
                  alt="product-image"
                  fill
                  sizes="96px"
                  className="object-cover"
                  blurDataURL="/images/product-placeholder.png"
                  placeholder="blur"
                />
              ) : (
                // Use regular img tag for external URLs not in allowed domains
                <img
                  src={productImage}
                  alt="product-image"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = PlaceholderImage.src;
                  }}
                />
              )
            ) : (
              <Image
                src={PlaceholderImage}
                alt="product-image"
                fill
                sizes="96px"
                className="object-cover"
                blurDataURL="/images/product-placeholder.png"
                placeholder="blur"
              />
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">{productName || "-"}</h3>
            
            {/* Price Info */}
            <div className="flex space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{t("price")}:</span>
                <span className="text-blue-600 font-semibold">
                  ${productPrice || 0}
                </span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span>{t("category")}:</span>
                <span className="font-medium">{categoryName || "-"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>{t("brand")}:</span>
                <span className="font-medium">{brandName || "-"}</span>
              </div>
            </div>

            {/* SKU and Description */}
            {/* <div className="flex space-x-6 text-sm text-gray-500">
              {skuNo && (
                <div className="flex items-center space-x-2">
                  <span>{t("sku")}:</span>
                  <span className="font-medium">{skuNo}</span>
                </div>
              )}
              {shortDescription && (
                <div className="flex items-center space-x-2">
                  <span>{t("description")}:</span>
                  <span className="font-medium max-w-xs truncate">{shortDescription}</span>
                </div>
              )}
            </div> */}
          </div>
        </div>

        {/* Right Section - Action Button */}
        <div className="flex items-center space-x-2">
          {isDropshipPage ? (
            <Button
              onClick={handleAddToDropship}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm flex items-center gap-2"
              dir={langDir}
            >
              <IoMdAdd size={16} />
              {t("add_to_dropshipable_product")}
            </Button>
          ) : productType === "R" ? (
            <Button
              onClick={handleAddToRfqProducts}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm flex items-center gap-2"
              dir={langDir}
            >
              <IoMdAdd size={16} />
              {t("add_to_rfq_products")}
            </Button>
          ) : (
            <Button
              onClick={handleAddToMyProducts}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm flex items-center gap-2"
              dir={langDir}
            >
              <IoMdAdd size={16} />
              {t("add_to_my_products")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExistingProductCard;
