/**
 * @fileoverview Shopping cart type definitions for the Ultrasooq marketplace.
 *
 * Defines the structure of individual cart items, including product pricing
 * details, discount information, and service-related data.
 *
 * @module utils/types/cart.types
 * @dependencies None (pure type definitions).
 */

/**
 * Represents a single item in the user's shopping cart.
 *
 * @description
 * Intent: Models one line item in the cart, covering both regular product
 * purchases ("DEFAULT") and service-based purchases ("SERVICE").
 *
 * Usage: Consumed by cart page components, mini-cart widgets, and checkout
 * summary sections to display item details, pricing, and quantities.
 *
 * Data Flow: API GET /cart -> CartItem[].
 *
 * Notes: The `productPriceDetails` contains nested pricing and discount
 * information that comes from the product-price join on the backend.
 * The `object` field is a generic catch-all for additional metadata.
 *
 * @property id - Unique identifier of this cart entry.
 * @property cartType - Discriminator: "DEFAULT" for products, "SERVICE" for services.
 * @property productId - ID of the product added to cart.
 * @property productPriceId - ID of the specific product-price variant.
 * @property productPriceDetails - Nested pricing and product metadata object.
 * @property productPriceDetails.adminId - ID of the admin/vendor who owns the price listing.
 * @property productPriceDetails.offerPrice - The listed offer price as a string.
 * @property productPriceDetails.productPrice_product - Nested product info including name, price, and images.
 * @property productPriceDetails.consumerDiscount - Discount amount for consumer buyers.
 * @property productPriceDetails.consumerDiscountType - Optional discount type (e.g., "PERCENTAGE", "FIXED").
 * @property productPriceDetails.vendorDiscount - Discount amount for vendor/wholesale buyers.
 * @property productPriceDetails.vendorDiscountType - Optional vendor discount type.
 * @property productPriceDetails.minQuantityPerCustomer - Optional minimum purchase quantity.
 * @property productPriceDetails.maxQuantityPerCustomer - Optional maximum purchase quantity.
 * @property serviceId - ID of the service (relevant when cartType is "SERVICE").
 * @property cartServiceFeatures - Array of selected service feature options.
 * @property quantity - Number of units in the cart.
 * @property object - Generic metadata object for extensibility.
 */
export interface CartItem {
  id: number;
  cartType: "DEFAULT" | "SERVICE"
  productId: number;
  productPriceId: number;
  productPriceDetails: {
    adminId: number;
    offerPrice: string;
    productPrice_product: {
      productName: string;
      offerPrice: string;
      productImages: { id: number; image: string }[];
    };
    consumerDiscount: number;
    consumerDiscountType?: string;
    vendorDiscount: number;
    vendorDiscountType?: string;
    minQuantityPerCustomer?: number;
    maxQuantityPerCustomer?: number;
  };
  serviceId: number;
  cartServiceFeatures: any[];
  quantity: number;
  object: any;
}
