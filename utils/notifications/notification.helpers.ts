/**
 * @fileoverview Notification payload factory functions and formatting utilities
 * for the Ultrasooq marketplace.
 *
 * Provides a library of factory functions that construct standardized
 * notification payloads for various marketplace events including buygroup
 * sales, stock changes, price changes, RFQ lifecycle events, reviews,
 * and shipment updates.
 *
 * These payloads can be sent to the backend notification service for
 * persistence, push delivery, and email dispatch.
 *
 * @module utils/notifications/notification.helpers
 * @dependencies
 * - {@link module:utils/types/notification.types} - NotificationType enum.
 */

import { NotificationType } from "@/utils/types/notification.types";

/**
 * Standard notification payload structure sent to the backend service.
 *
 * @description
 * Intent: Defines the universal shape for all notification payloads
 * created by the factory functions in this module.
 *
 * Usage: Returned by every `create*Notification` factory function and
 * consumed by the notification dispatch service or API call.
 *
 * @property userId - Target user ID to receive the notification.
 * @property type - Notification category (from {@link NotificationType}).
 * @property title - Short headline text.
 * @property message - Detailed notification body.
 * @property data - Optional metadata for deep-linking and context.
 * @property link - Optional in-app URL for navigation on click.
 * @property icon - Optional icon/emoji for visual identification.
 */
export interface NotificationPayload {
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  link?: string;
  icon?: string;
}

/**
 * Formats a duration in milliseconds into a human-readable time string.
 *
 * @description
 * Intent: Converts a raw millisecond duration into the largest appropriate
 * time unit (days, hours, minutes, or seconds) with proper pluralization.
 *
 * Usage: Called by buygroup sale notification factories to describe
 * countdown durations (e.g., "2 hours", "30 minutes").
 *
 * @param {number} milliseconds - Duration in milliseconds.
 * @returns {string} Human-readable time string (e.g., "1 day", "3 hours", "45 minutes").
 */
export const formatTimeRemaining = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""}`;
  }
};

/**
 * Creates a notification payload for a buygroup sale that is approaching.
 *
 * @description
 * Intent: Generates a "Sale Starting Soon!" notification to alert users
 * about an upcoming buygroup sale, including the countdown duration.
 *
 * Data Flow: Sale timing data -> formatted time string -> NotificationPayload.
 *
 * @param {number} userId - Target user's ID.
 * @param {string} productName - Name of the product on sale.
 * @param {number} productId - Product ID for deep-linking.
 * @param {number} productPriceId - Product price ID for context.
 * @param {number} timeRemaining - Milliseconds until the sale starts.
 * @returns {NotificationPayload} Constructed notification payload.
 */
export const createBuygroupSaleComingSoonNotification = (
  userId: number,
  productName: string,
  productId: number,
  productPriceId: number,
  timeRemaining: number,
): NotificationPayload => {
  const timeStr = formatTimeRemaining(timeRemaining);
  return {
    userId,
    type: NotificationType.BUYGROUP,
    title: "Sale Starting Soon!",
    message: `A buygroup sale for ${productName} is starting in ${timeStr}. Don't miss out!`,
    data: {
      productId,
      productPriceId,
      timeRemaining,
      productName,
    },
    link: `/trending/${productId}`,
    icon: "🎉",
  };
};

/**
 * Creates a notification payload for a buygroup sale that has just started.
 *
 * @description
 * Intent: Generates a "Sale Started!" notification to alert users that
 * they can now participate in the buygroup sale.
 *
 * @param {number} userId - Target user's ID.
 * @param {string} productName - Name of the product on sale.
 * @param {number} productId - Product ID for deep-linking.
 * @param {number} productPriceId - Product price ID for context.
 * @returns {NotificationPayload} Constructed notification payload.
 */
export const createBuygroupSaleStartedNotification = (
  userId: number,
  productName: string,
  productId: number,
  productPriceId: number,
): NotificationPayload => {
  return {
    userId,
    type: NotificationType.BUYGROUP,
    title: "Sale Started!",
    message: `The buygroup sale for ${productName} has started. Limited stock available!`,
    data: {
      productId,
      productPriceId,
      productName,
    },
    link: `/trending/${productId}`,
    icon: "🔥",
  };
};

/**
 * Creates a notification payload for a buygroup sale that is about to end.
 *
 * @description
 * Intent: Generates a "Sale Ending Soon!" urgency notification with
 * the countdown until the sale expires.
 *
 * @param {number} userId - Target user's ID.
 * @param {string} productName - Name of the product on sale.
 * @param {number} productId - Product ID for deep-linking.
 * @param {number} productPriceId - Product price ID for context.
 * @param {number} timeRemaining - Milliseconds until the sale ends.
 * @returns {NotificationPayload} Constructed notification payload.
 */
export const createBuygroupSaleEndingSoonNotification = (
  userId: number,
  productName: string,
  productId: number,
  productPriceId: number,
  timeRemaining: number,
): NotificationPayload => {
  const timeStr = formatTimeRemaining(timeRemaining);
  return {
    userId,
    type: NotificationType.BUYGROUP,
    title: "Sale Ending Soon!",
    message: `The buygroup sale for ${productName} is ending in ${timeStr}. Get it now!`,
    data: {
      productId,
      productPriceId,
      timeRemaining,
      productName,
    },
    link: `/trending/${productId}`,
    icon: "⏰",
  };
};

/**
 * Creates a notification payload for a product that has gone out of stock.
 *
 * @description
 * Intent: Alerts the user (typically the seller/vendor) that a product
 * has reached zero stock and needs restocking.
 *
 * @param {number} userId - Target user's ID.
 * @param {string} productName - Name of the out-of-stock product.
 * @param {number} productId - Product ID for deep-linking.
 * @param {number} productPriceId - Product price ID for context.
 * @returns {NotificationPayload} Constructed notification payload.
 */
export const createProductOutOfStockNotification = (
  userId: number,
  productName: string,
  productId: number,
  productPriceId: number,
): NotificationPayload => {
  return {
    userId,
    type: NotificationType.STOCK,
    title: "Product Out of Stock",
    message: `${productName} is now out of stock. We'll notify you when it's back!`,
    data: {
      productId,
      productPriceId,
      productName,
      stockLevel: 0,
    },
    link: `/trending/${productId}`,
    icon: "📦",
  };
};

/**
 * Creates a notification payload for a product that is back in stock.
 *
 * @description
 * Intent: Alerts users who expressed interest in an out-of-stock product
 * that it is now available for purchase.
 *
 * @param {number} userId - Target user's ID.
 * @param {string} productName - Name of the restocked product.
 * @param {number} productId - Product ID for deep-linking.
 * @param {number} productPriceId - Product price ID for context.
 * @param {number} stockLevel - Current stock quantity.
 * @returns {NotificationPayload} Constructed notification payload.
 */
export const createProductBackInStockNotification = (
  userId: number,
  productName: string,
  productId: number,
  productPriceId: number,
  stockLevel: number,
): NotificationPayload => {
  return {
    userId,
    type: NotificationType.STOCK,
    title: "Product Back in Stock",
    message: `Great news! ${productName} is back in stock. Order now!`,
    data: {
      productId,
      productPriceId,
      productName,
      stockLevel,
    },
    link: `/trending/${productId}`,
    icon: "✅",
  };
};

/**
 * Creates a notification payload for a product running low on stock.
 *
 * @description
 * Intent: Warns the seller that a product's stock is below a threshold
 * and may need replenishment.
 *
 * @param {number} userId - Target user's ID.
 * @param {string} productName - Name of the low-stock product.
 * @param {number} productId - Product ID for deep-linking.
 * @param {number} productPriceId - Product price ID for context.
 * @param {number} stockLevel - Current remaining stock quantity.
 * @returns {NotificationPayload} Constructed notification payload.
 */
export const createProductLowStockNotification = (
  userId: number,
  productName: string,
  productId: number,
  productPriceId: number,
  stockLevel: number,
): NotificationPayload => {
  return {
    userId,
    type: NotificationType.STOCK,
    title: "Low Stock Alert",
    message: `${productName} is running low on stock. Only ${stockLevel} left!`,
    data: {
      productId,
      productPriceId,
      productName,
      stockLevel,
    },
    link: `/trending/${productId}`,
    icon: "⚠️",
  };
};

/**
 * Creates a notification payload for a product price change.
 *
 * @description
 * Intent: Notifies users watching a product that its price has changed.
 * Automatically determines whether the change is a price drop (positive)
 * or increase, and adjusts the title and icon accordingly.
 *
 * @param {number} userId - Target user's ID.
 * @param {string} productName - Name of the product.
 * @param {number} productId - Product ID for deep-linking.
 * @param {number} productPriceId - Product price ID for context.
 * @param {number} oldPrice - Previous price value.
 * @param {number} newPrice - New price value.
 * @param {string} [currency="USD"] - Currency code for display.
 * @returns {NotificationPayload} Constructed notification payload.
 */
export const createProductPriceChangedNotification = (
  userId: number,
  productName: string,
  productId: number,
  productPriceId: number,
  oldPrice: number,
  newPrice: number,
  currency: string = "USD",
): NotificationPayload => {
  const isPriceDrop = newPrice < oldPrice;
  return {
    userId,
    type: NotificationType.PRICE,
    title: isPriceDrop ? "Price Drop!" : "Price Changed",
    message: isPriceDrop
      ? `Great news! The price of ${productName} has dropped to ${currency} ${newPrice}`
      : `The price of ${productName} has changed from ${currency} ${oldPrice} to ${currency} ${newPrice}`,
    data: {
      productId,
      productPriceId,
      productName,
      oldPrice,
      newPrice,
      currency,
      isPriceDrop,
    },
    link: `/trending/${productId}`,
    icon: isPriceDrop ? "💰" : "📊",
  };
};

/**
 * Creates a notification payload for an RFQ quote submission.
 *
 * @description
 * Intent: Confirms to the user that their RFQ quote was submitted successfully.
 *
 * @param {number} userId - Target user's ID.
 * @param {number} rfqId - The RFQ ID for deep-linking.
 * @returns {NotificationPayload} Constructed notification payload.
 */
export const createRfqQuoteSubmittedNotification = (
  userId: number,
  rfqId: number,
): NotificationPayload => {
  return {
    userId,
    type: NotificationType.RFQ,
    title: "RFQ Quote Submitted",
    message: "Your RFQ quote has been submitted successfully",
    data: {
      rfqId,
    },
    link: `/rfq-request`,
    icon: "📝",
  };
};

/**
 * Creates a notification payload for an RFQ quote acceptance.
 *
 * @description
 * Intent: Notifies the seller that their RFQ quote has been accepted
 * by the buyer.
 *
 * @param {number} userId - Target user's ID.
 * @param {number} rfqId - The RFQ ID for deep-linking.
 * @returns {NotificationPayload} Constructed notification payload.
 */
export const createRfqQuoteAcceptedNotification = (
  userId: number,
  rfqId: number,
): NotificationPayload => {
  return {
    userId,
    type: NotificationType.RFQ,
    title: "RFQ Quote Accepted",
    message: "Your RFQ quote has been accepted by the buyer",
    data: {
      rfqId,
    },
    link: `/rfq-request`,
    icon: "✅",
  };
};

/**
 * Creates a notification payload for an RFQ quote rejection.
 *
 * @description
 * Intent: Notifies the seller that their RFQ quote has been rejected
 * by the buyer.
 *
 * @param {number} userId - Target user's ID.
 * @param {number} rfqId - The RFQ ID for deep-linking.
 * @returns {NotificationPayload} Constructed notification payload.
 */
export const createRfqQuoteRejectedNotification = (
  userId: number,
  rfqId: number,
): NotificationPayload => {
  return {
    userId,
    type: NotificationType.RFQ,
    title: "RFQ Quote Rejected",
    message: "Your RFQ quote has been rejected",
    data: {
      rfqId,
    },
    link: `/rfq-request`,
    icon: "❌",
  };
};

/**
 * Creates a notification payload for a new product review.
 *
 * @description
 * Intent: Alerts the product seller that a new review has been submitted
 * for one of their products.
 *
 * @param {number} userId - Target user's (seller's) ID.
 * @param {string} productName - Name of the reviewed product.
 * @param {number} productId - Product ID for deep-linking to the reviews section.
 * @param {number} reviewId - ID of the new review.
 * @returns {NotificationPayload} Constructed notification payload.
 */
export const createNewReviewNotification = (
  userId: number,
  productName: string,
  productId: number,
  reviewId: number,
): NotificationPayload => {
  return {
    userId,
    type: NotificationType.REVIEW,
    title: "New Review",
    message: `You have received a new review for ${productName}`,
    data: {
      productId,
      reviewId,
      productName,
    },
    link: `/trending/${productId}#reviews`,
    icon: "⭐",
  };
};

/**
 * Creates a notification payload for shipment status updates.
 *
 * @description
 * Intent: Notifies the buyer about changes in their order's shipment
 * status. Automatically selects the appropriate title, message, and
 * icon based on the shipment status.
 *
 * Usage: Called when the shipment status changes (created, in transit,
 * delivered, or delayed).
 *
 * @param {number} userId - Target user's (buyer's) ID.
 * @param {number} orderId - Order ID for context.
 * @param {"created" | "in_transit" | "delivered" | "delayed"} status - Current shipment status.
 * @param {string} [orderNo] - Optional order number for the deep-link URL.
 * @returns {NotificationPayload} Constructed notification payload.
 */
export const createShipmentNotification = (
  userId: number,
  orderId: number,
  status: "created" | "in_transit" | "delivered" | "delayed",
  orderNo?: string,
): NotificationPayload => {
  const statusMap = {
    created: {
      title: "Shipment Created",
      message: "Your order shipment has been created",
      icon: "📦",
    },
    in_transit: {
      title: "Shipment In Transit",
      message: "Your order is on the way",
      icon: "🚚",
    },
    delivered: {
      title: "Order Delivered",
      message: "Your order has been delivered successfully",
      icon: "✅",
    },
    delayed: {
      title: "Shipment Delayed",
      message: "Your order shipment has been delayed",
      icon: "⏳",
    },
  };

  const statusInfo = statusMap[status];
  return {
    userId,
    type: NotificationType.SHIPMENT,
    title: statusInfo.title,
    message: statusInfo.message,
    data: {
      orderId,
      orderNo,
      status,
    },
    link: `/my-orders${orderNo ? `?orderNo=${orderNo}` : ""}`,
    icon: statusInfo.icon,
  };
};

