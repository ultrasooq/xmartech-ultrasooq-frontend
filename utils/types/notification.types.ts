/**
 * @fileoverview Notification type definitions for the Ultrasooq marketplace.
 *
 * Covers the notification domain model including notification categories,
 * individual notification records, paginated list responses, read-state
 * management, and user notification preferences.
 *
 * @module utils/types/notification.types
 * @dependencies None (pure type definitions).
 */

/**
 * Enumeration of all notification categories supported by the platform.
 *
 * @description
 * Intent: Provides a type-safe discriminator for notification records so
 * the UI can apply category-specific icons, colors, and routing.
 *
 * Usage: Used in notification list rendering, filtering, and preference
 * toggles.
 *
 * @enum {string}
 */
export enum NotificationType {
  /** Order lifecycle events (placed, confirmed, delivered, etc.). */
  ORDER = "ORDER",
  /** New chat messages or message-related events. */
  MESSAGE = "MESSAGE",
  /** Request For Quotation events (submitted, accepted, rejected). */
  RFQ = "RFQ",
  /** Product review events (new review received). */
  REVIEW = "REVIEW",
  /** System-wide announcements and administrative notices. */
  SYSTEM = "SYSTEM",
  /** Payment processing events (success, failure, refund). */
  PAYMENT = "PAYMENT",
  /** Shipment tracking events (created, in transit, delivered). */
  SHIPMENT = "SHIPMENT",
  /** Account status changes (approved, rejected, suspended). */
  ACCOUNT = "ACCOUNT",
  /** Product-related events (approval, listing changes). */
  PRODUCT = "PRODUCT",
  /** Buygroup sale events (coming soon, started, ending soon). */
  BUYGROUP = "BUYGROUP",
  /** Stock level alerts (out of stock, low stock, back in stock). */
  STOCK = "STOCK",
  /** Price change alerts (price drop, price increase). */
  PRICE = "PRICE",
}

/**
 * Represents a single notification record.
 *
 * @description
 * Intent: Full notification entity as returned from the backend, carrying
 * all metadata needed to render a notification item including contextual
 * data for deep-linking.
 *
 * Usage: Rendered in the notification bell dropdown, notification list
 * page, and push notification handlers.
 *
 * Data Flow: API GET /notifications -> Notification[].
 *
 * @property id - Unique notification identifier.
 * @property userId - ID of the user this notification belongs to.
 * @property type - Category of the notification (see {@link NotificationType}).
 * @property title - Short headline for the notification.
 * @property message - Detailed notification body text.
 * @property data - Optional contextual payload with entity IDs for deep-linking.
 * @property data.orderId - Optional related order ID.
 * @property data.messageId - Optional related message ID.
 * @property data.rfqId - Optional related RFQ ID.
 * @property data.reviewId - Optional related review ID.
 * @property data.productId - Optional related product ID.
 * @property data.productPriceId - Optional related product price ID.
 * @property data.buygroupSaleId - Optional related buygroup sale ID.
 * @property data.stockLevel - Optional stock level for stock alerts.
 * @property data.oldPrice - Optional previous price for price change alerts.
 * @property data.newPrice - Optional new price for price change alerts.
 * @property read - Whether the notification has been read.
 * @property readAt - ISO timestamp when the notification was read, or null.
 * @property createdAt - ISO timestamp of notification creation.
 * @property updatedAt - Optional ISO timestamp of last update.
 * @property link - Optional deep-link URL for navigation on click.
 * @property icon - Optional icon identifier or emoji for display.
 */
export interface Notification {
  id: number;
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  data?: {
    orderId?: number;
    messageId?: number;
    rfqId?: number;
    reviewId?: number;
    productId?: number;
    productPriceId?: number;
    buygroupSaleId?: number;
    stockLevel?: number;
    oldPrice?: number;
    newPrice?: number;
    [key: string]: any;
  };
  read: boolean;
  readAt?: string | null;
  createdAt: string;
  updatedAt?: string;
  link?: string | null;
  icon?: string | null;
}

/**
 * Paginated response for notification list queries.
 *
 * @description
 * Intent: Wraps a page of notifications along with pagination metadata
 * and the total unread count for badge display.
 *
 * Usage: Consumed by the notification list page with infinite scroll
 * or pagination controls.
 *
 * Data Flow: API GET /notifications?page=N&limit=M -> NotificationListResponse.
 *
 * @property data - Array of notification records for the current page.
 * @property total - Total number of notifications across all pages.
 * @property page - Current page number (1-indexed).
 * @property limit - Number of items per page.
 * @property unreadCount - Total unread notifications (all pages).
 */
export interface NotificationListResponse {
  data: Notification[];
  total: number;
  page: number;
  limit: number;
  unreadCount: number;
}

/**
 * Response payload for the unread notification count endpoint.
 *
 * @description
 * Intent: Lightweight response used to update the notification badge
 * count without fetching full notification data.
 *
 * Data Flow: API GET /notifications/unread-count -> NotificationUnreadCountResponse.
 *
 * @property count - Number of unread notifications.
 */
export interface NotificationUnreadCountResponse {
  count: number;
}

/**
 * Request payload for marking a single notification as read.
 *
 * @description
 * Intent: Marks a specific notification as read when the user clicks on it.
 *
 * Data Flow: Notification click -> mutation hook -> API POST /notifications/read.
 *
 * @property notificationId - ID of the notification to mark as read.
 */
export interface MarkAsReadRequest {
  notificationId: number;
}

/**
 * User's notification preference settings.
 *
 * @description
 * Intent: Controls which notification channels and categories the user
 * has opted in to receive.
 *
 * Usage: Managed in the user settings page under notification preferences.
 *
 * Data Flow: API GET/PUT /notifications/preferences -> NotificationPreferences.
 *
 * @property emailNotifications - Whether email notifications are enabled.
 * @property pushNotifications - Whether push notifications are enabled.
 * @property orderNotifications - Whether order-related notifications are enabled.
 * @property messageNotifications - Whether message notifications are enabled.
 * @property rfqNotifications - Whether RFQ notifications are enabled.
 * @property reviewNotifications - Whether review notifications are enabled.
 * @property systemNotifications - Whether system announcements are enabled.
 */
export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  orderNotifications: boolean;
  messageNotifications: boolean;
  rfqNotifications: boolean;
  reviewNotifications: boolean;
  systemNotifications: boolean;
}
