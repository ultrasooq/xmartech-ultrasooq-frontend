/**
 * @fileoverview Buygroup Sale Notification Scheduler for the Ultrasooq marketplace.
 *
 * Schedules and manages timed notifications for buygroup (collective buying)
 * sales, including:
 * - **Coming soon** reminders (24 hours, 12 hours, 1 hour before start)
 * - **Started** alerts (at sale start time)
 * - **Ending soon** urgency notices (1 hour, 30 minutes, 10 minutes before end)
 *
 * This is a frontend utility. The actual notification dispatch should be
 * handled by the backend. This module can be used to:
 * 1. Display in-app UI notifications
 * 2. Schedule backend API calls for push/email notifications
 * 3. Track which notifications have been sent
 *
 * @module utils/notifications/buygroup-scheduler
 * @dependencies
 * - {@link module:utils/notifications/notification.helpers} - Notification payload factories.
 */

import {
  createBuygroupSaleComingSoonNotification,
  createBuygroupSaleStartedNotification,
  createBuygroupSaleEndingSoonNotification,
} from "./notification.helpers";

/**
 * Information about a buygroup sale needed to schedule notifications.
 *
 * @description
 * Intent: Encapsulates the product and timing data required to calculate
 * all notification trigger times for a single buygroup sale.
 *
 * Usage: Passed to {@link calculateBuygroupNotificationTimes} to generate
 * the full notification schedule.
 *
 * @property productId - ID of the product on sale.
 * @property productPriceId - ID of the specific buygroup price listing.
 * @property productName - Display name for the product (used in notification text).
 * @property startTime - Unix timestamp (ms) when the sale begins.
 * @property endTime - Unix timestamp (ms) when the sale ends.
 */
export interface BuygroupSaleInfo {
  productId: number;
  productPriceId: number;
  productName: string;
  startTime: number; // timestamp
  endTime: number; // timestamp
}

/**
 * Represents a single scheduled notification with its trigger time and payload.
 *
 * @description
 * Intent: Tracks one notification event including when it should fire,
 * its type, the constructed notification payload, and whether it has
 * already been sent.
 *
 * Usage: Stored in an array managed by the scheduler; iterated by
 * {@link getDueNotifications} to find notifications ready to dispatch.
 *
 * @property id - Unique identifier for this scheduled notification (includes type and timing).
 * @property type - Category of the notification ("coming_soon", "started", "ending_soon").
 * @property scheduledTime - Unix timestamp (ms) when this notification should be triggered.
 * @property notification - The pre-built notification payload from the helper factory.
 * @property sent - Whether this notification has already been dispatched.
 */
export interface ScheduledNotification {
  id: string;
  type: "coming_soon" | "started" | "ending_soon";
  scheduledTime: number;
  notification: ReturnType<
    | typeof createBuygroupSaleComingSoonNotification
    | typeof createBuygroupSaleStartedNotification
    | typeof createBuygroupSaleEndingSoonNotification
  >;
  sent: boolean;
}

/**
 * Calculates all notification trigger times for a buygroup sale.
 *
 * @description
 * Intent: Given sale timing information, generates the complete schedule of
 * notifications that should be sent, filtering out any that are already in
 * the past. Returns them sorted by scheduled time (earliest first).
 *
 * Data Flow: BuygroupSaleInfo -> time offset calculations -> ScheduledNotification[].
 *
 * Notes: The `userId` in generated payloads is set to 0 as a placeholder;
 * the actual user ID should be resolved when the notification is dispatched.
 *
 * @param {BuygroupSaleInfo} saleInfo - The sale's product and timing details.
 * @returns {ScheduledNotification[]} Sorted array of future notification events.
 */
export const calculateBuygroupNotificationTimes = (
  saleInfo: BuygroupSaleInfo,
): ScheduledNotification[] => {
  const notifications: ScheduledNotification[] = [];
  const now = Date.now();
  const { startTime, endTime } = saleInfo;

  // Coming soon notifications (24h, 12h, 1h before start)
  const comingSoonTimes = [
    24 * 60 * 60 * 1000, // 24 hours
    12 * 60 * 60 * 1000, // 12 hours
    1 * 60 * 60 * 1000, // 1 hour
  ];

  comingSoonTimes.forEach((timeBefore) => {
    const notificationTime = startTime - timeBefore;
    if (notificationTime > now && notificationTime < startTime) {
      notifications.push({
        id: `coming_soon_${saleInfo.productPriceId}_${timeBefore}`,
        type: "coming_soon",
        scheduledTime: notificationTime,
        notification: createBuygroupSaleComingSoonNotification(
          0, // userId will be set when sending
          saleInfo.productName,
          saleInfo.productId,
          saleInfo.productPriceId,
          timeBefore,
        ),
        sent: false,
      });
    }
  });

  // Started notification (at start time)
  if (startTime > now && startTime < endTime) {
    notifications.push({
      id: `started_${saleInfo.productPriceId}`,
      type: "started",
      scheduledTime: startTime,
      notification: createBuygroupSaleStartedNotification(
        0, // userId will be set when sending
        saleInfo.productName,
        saleInfo.productId,
        saleInfo.productPriceId,
      ),
      sent: false,
    });
  }

  // Ending soon notifications (1h, 30m, 10m before end)
  const endingSoonTimes = [
    1 * 60 * 60 * 1000, // 1 hour
    30 * 60 * 1000, // 30 minutes
    10 * 60 * 1000, // 10 minutes
  ];

  endingSoonTimes.forEach((timeBefore) => {
    const notificationTime = endTime - timeBefore;
    if (notificationTime > now && notificationTime < endTime && notificationTime > startTime) {
      notifications.push({
        id: `ending_soon_${saleInfo.productPriceId}_${timeBefore}`,
        type: "ending_soon",
        scheduledTime: notificationTime,
        notification: createBuygroupSaleEndingSoonNotification(
          0, // userId will be set when sending
          saleInfo.productName,
          saleInfo.productId,
          saleInfo.productPriceId,
          timeBefore,
        ),
        sent: false,
      });
    }
  });

  // Sort by scheduled time
  return notifications.sort((a, b) => a.scheduledTime - b.scheduledTime);
};

/**
 * Filters the scheduled notifications to find those that are due for dispatch.
 *
 * @description
 * Intent: Identifies all notifications whose scheduled time has passed
 * and that have not yet been marked as sent.
 *
 * Usage: Called on a polling interval to check for notifications ready
 * to be dispatched.
 *
 * @param {ScheduledNotification[]} scheduledNotifications - The full list of scheduled notifications.
 * @returns {ScheduledNotification[]} Subset of notifications that are due and unsent.
 */
export const getDueNotifications = (
  scheduledNotifications: ScheduledNotification[],
): ScheduledNotification[] => {
  const now = Date.now();
  return scheduledNotifications.filter(
    (notification) => !notification.sent && notification.scheduledTime <= now,
  );
};

/**
 * Marks a specific notification as sent (immutably).
 *
 * @description
 * Intent: Returns a new array with the targeted notification's `sent`
 * flag set to true, preserving immutability for React state updates.
 *
 * Usage: Called after successfully dispatching a notification to prevent
 * re-sending.
 *
 * @param {ScheduledNotification[]} notifications - Current notifications array.
 * @param {string} notificationId - The ID of the notification to mark as sent.
 * @returns {ScheduledNotification[]} New array with the notification marked as sent.
 */
export const markNotificationAsSent = (
  notifications: ScheduledNotification[],
  notificationId: string,
): ScheduledNotification[] => {
  return notifications.map((notification) =>
    notification.id === notificationId
      ? { ...notification, sent: true }
      : notification,
  );
};

/**
 * Retrieves the list of user IDs who should receive buygroup sale notifications.
 *
 * @description
 * Intent: Determines the target audience for a buygroup notification.
 * Should include:
 * - Users who have the product in their wishlist
 * - Users who have viewed the product
 * - Users who have purchased similar products
 * - Users who have subscribed to product notifications
 *
 * Notes: This is a placeholder implementation that returns an empty array.
 * The actual implementation should call a backend API endpoint such as
 * `GET /api/products/{productId}/notification-subscribers`.
 *
 * @param {number} productId - The product ID to find subscribers for.
 * @param {number} productPriceId - The specific price listing ID.
 * @returns {Promise<number[]>} Array of user IDs (currently always empty).
 */
export const getUsersForBuygroupNotification = async (
  productId: number,
  productPriceId: number,
): Promise<number[]> => {
  // This is a placeholder - actual implementation should call backend API
  // Example: GET /api/products/{productId}/notification-subscribers
  // The backend should return an array of user IDs
  
  // For now, return empty array - backend should handle this
  return [];
};

