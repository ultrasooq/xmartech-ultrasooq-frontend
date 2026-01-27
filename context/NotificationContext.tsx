"use client";

/**
 * @fileoverview Notification context provider for the Ultrasooq marketplace.
 *
 * Combines React Query (server-state) with Socket.IO (real-time) to deliver
 * a unified notification experience. Fetches an initial page of notifications
 * and the unread count via React Query, then listens on the WebSocket for
 * live notification and count-update events. Important notification types
 * (ORDER, MESSAGE, RFQ) trigger a toast popup.
 *
 * @module context/NotificationContext
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { useSocket } from "./SocketContext";
import { Notification, NotificationType } from "@/utils/types/notification.types";
import { useUnreadCount, useNotifications } from "@/apis/queries/notifications.queries";
import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "next-intl";

/**
 * Shape of the value exposed by {@link NotificationContext}.
 *
 * @interface NotificationContextType
 * @property {Notification[]} notifications - The current page of notification objects.
 * @property {number} unreadCount - Total number of unread notifications.
 * @property {boolean} isLoading - `true` while either query is in-flight.
 * @property {Notification | null} newNotification - The most recently received real-time notification.
 * @property {() => void} clearNewNotification - Resets {@link newNotification} to `null`.
 * @property {() => void} refreshNotifications - Manually re-fetches the notifications list.
 * @property {() => void} refreshUnreadCount - Manually re-fetches the unread count.
 */
interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  newNotification: Notification | null;
  clearNewNotification: () => void;
  refreshNotifications: () => void;
  refreshUnreadCount: () => void;
}

/**
 * React context for notification state.
 * Initialized as `undefined`; consumers must be wrapped by {@link NotificationProvider}.
 */
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

/**
 * Provider component that manages notification data fetching and real-time
 * updates via Socket.IO.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components that consume the notification context.
 *
 * @remarks
 * - Notifications and unread count are only fetched when the user is authenticated
 *   **and** the socket is connected, preventing unnecessary API calls.
 * - Incoming socket events automatically invalidate the cached query data.
 *
 * @example
 * ```tsx
 * <NotificationProvider>
 *   <Header />
 *   <MainContent />
 * </NotificationProvider>
 * ```
 */
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const { socket, connected } = useSocket();
  const { toast } = useToast();
  const t = useTranslations();
  const [newNotification, setNewNotification] = useState<Notification | null>(null);

  /**
   * React Query hook for the first page of notifications.
   * Enabled only when the user is authenticated and the socket is connected.
   */
  const {
    data: notificationsData,
    isLoading: notificationsLoading,
    refetch: refetchNotifications,
  } = useNotifications(
    { page: 1, limit: 10 },
    !!user?.id && connected,
  );

  /**
   * React Query hook for the total unread notification count.
   * Enabled only when the user is authenticated and the socket is connected.
   */
  const {
    data: unreadCountData,
    isLoading: unreadCountLoading,
    refetch: refetchUnreadCount,
  } = useUnreadCount(!!user?.id && connected);

  /** Ensure `notifications` always resolves to an array, even if the query returns unexpected data. */
  const notifications = Array.isArray(notificationsData?.data)
    ? notificationsData.data
    : [];
  /** Fallback to `0` when the unread count query has not resolved yet. */
  const unreadCount = unreadCountData?.count || 0;
  /** Combined loading flag for both queries. */
  const isLoading = notificationsLoading || unreadCountLoading;

  /**
   * Effect that subscribes to Socket.IO notification events.
   *
   * Listens for:
   * - `"notification"` -- a new notification payload. Stores it in local state,
   *   shows a toast for ORDER / MESSAGE / RFQ types, and refreshes cached data.
   * - `"notification:count"` -- signals the server updated the unread count.
   *
   * Cleans up listeners on unmount or when dependencies change.
   */
  useEffect(() => {
    if (!socket || !connected || !user?.id) return;

    const handleNewNotification = (notification: Notification) => {
      setNewNotification(notification);

      // Show toast for important notifications
      if (
        notification.type === NotificationType.ORDER ||
        notification.type === NotificationType.MESSAGE ||
        notification.type === NotificationType.RFQ
      ) {
        toast({
          title: notification.title,
          description: notification.message,
          variant: notification.type === NotificationType.ORDER ? "success" : "info",
        });
      }

      // Refresh notifications and unread count
      refetchNotifications();
      refetchUnreadCount();
    };

    const handleNotificationCountUpdate = (count: number) => {
      refetchUnreadCount();
    };

    socket.on("notification", handleNewNotification);
    socket.on("notification:count", handleNotificationCountUpdate);

    return () => {
      socket.off("notification", handleNewNotification);
      socket.off("notification:count", handleNotificationCountUpdate);
    };
  }, [socket, connected, user?.id, toast, refetchNotifications, refetchUnreadCount]);

  /**
   * Resets the most-recently-received notification back to `null`.
   * Useful after a consumer has acknowledged or displayed the notification.
   *
   * @returns {void}
   */
  const clearNewNotification = useCallback(() => {
    setNewNotification(null);
  }, []);

  /**
   * Triggers a manual refetch of the notifications list from the server.
   *
   * @returns {void}
   */
  const refreshNotifications = useCallback(() => {
    refetchNotifications();
  }, [refetchNotifications]);

  /**
   * Triggers a manual refetch of the unread notification count from the server.
   *
   * @returns {void}
   */
  const refreshUnreadCount = useCallback(() => {
    refetchUnreadCount();
  }, [refetchUnreadCount]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isLoading,
        newNotification,
        clearNewNotification,
        refreshNotifications,
        refreshUnreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * Custom hook that retrieves the notification context.
 *
 * @throws {Error} If called outside of a {@link NotificationProvider}.
 * @returns {NotificationContextType} The current notification context value.
 *
 * @example
 * ```tsx
 * const { unreadCount, notifications, refreshNotifications } = useNotificationsContext();
 * ```
 */
export const useNotificationsContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationsContext must be used within a NotificationProvider",
    );
  }
  return context;
};
