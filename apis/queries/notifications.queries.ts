/**
 * @fileoverview TanStack React Query hooks for the notifications system.
 *
 * Provides query hooks for fetching notifications (paginated) and unread
 * counts, plus mutation hooks for marking notifications as read and
 * deleting individual or all notifications.
 *
 * @module queries/notifications
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotifications,
  fetchUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  FetchNotificationsPayload,
} from "../requests/notifications.requests";
import { APIResponseError } from "@/utils/types/common.types";
import {
  Notification,
  NotificationListResponse,
  NotificationUnreadCountResponse,
} from "@/utils/types/notification.types";

/**
 * Query hook that fetches the authenticated user's notifications with
 * optional filters and pagination.
 *
 * @param payload - Notification filter / pagination options (defaults to `{}`).
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result whose `data` is {@link NotificationListResponse}.
 *
 * @remarks
 * - Query key: `["notifications", payload]`
 * - **staleTime**: 30 seconds.
 * - **refetchOnWindowFocus**: true.
 * - Endpoint: Delegated to `fetchNotifications` in notifications.requests.
 */
export const useNotifications = (
  payload: FetchNotificationsPayload = {},
  enabled = true,
) => {
  return useQuery<NotificationListResponse, APIResponseError>({
    queryKey: ["notifications", payload],
    queryFn: async () => {
      const res = await fetchNotifications(payload);
      // Backend returns: { status, message, data: { data: [...], total, ... } }
      // We need to extract the inner data object
      return res.data?.data || { data: [], total: 0, page: 1, limit: 10, unreadCount: 0 };
    },
    enabled,
    refetchOnWindowFocus: true,
    staleTime: 30000, // 30 seconds
  });
};

/**
 * Query hook that fetches the total unread notification count for
 * the authenticated user. Auto-refetches every 30 seconds.
 *
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result whose `data` is {@link NotificationUnreadCountResponse}.
 *
 * @remarks
 * - Query key: `["notifications", "unread-count"]`
 * - **refetchInterval**: 30 000 ms.
 * - Endpoint: Delegated to `fetchUnreadCount` in notifications.requests.
 */
export const useUnreadCount = (enabled = true) => {
  return useQuery<NotificationUnreadCountResponse, APIResponseError>({
    queryKey: ["notifications", "unread-count"],
    queryFn: async () => {
      const res = await fetchUnreadCount();
      // Backend returns: { status, message, data: { count } }
      return res.data?.data || { count: 0 };
    },
    enabled,
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchOnWindowFocus: true,
  });
};

/**
 * Mutation hook to mark a single notification as read.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `number` (notification ID).
 * - **Response**: {@link Notification}
 * - **Invalidates**: `["notifications"]`, `["notifications", "unread-count"]`
 *   on success.
 * - Endpoint: Delegated to `markAsRead` in notifications.requests.
 */
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation<Notification, APIResponseError, number>({
    mutationFn: async (notificationId: number) => {
      const res = await markAsRead(notificationId);
      return res.data;
    },
    onSuccess: () => {
      // Invalidate notifications and unread count
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
    },
  });
};

/**
 * Mutation hook to mark all notifications as read for the current user.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `void`
 * - **Response**: `{ count: number }` -- number of notifications marked.
 * - **Invalidates**: `["notifications"]`, `["notifications", "unread-count"]`
 *   on success.
 * - Endpoint: Delegated to `markAllAsRead` in notifications.requests.
 */
export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation<{ count: number }, APIResponseError, void>({
    mutationFn: async () => {
      const res = await markAllAsRead();
      return res.data;
    },
    onSuccess: () => {
      // Invalidate notifications and unread count
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
    },
  });
};

/**
 * Mutation hook to delete a single notification.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `number` (notification ID).
 * - **Invalidates**: `["notifications"]`, `["notifications", "unread-count"]`
 *   on success.
 * - Endpoint: Delegated to `deleteNotification` in notifications.requests.
 */
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean }, APIResponseError, number>({
    mutationFn: async (notificationId: number) => {
      const res = await deleteNotification(notificationId);
      return res.data;
    },
    onSuccess: () => {
      // Invalidate notifications and unread count
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
    },
  });
};

/**
 * Mutation hook to delete all notifications for the current user.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `void`
 * - **Response**: `{ success: boolean; count: number }`
 * - **Invalidates**: `["notifications"]`, `["notifications", "unread-count"]`
 *   on success.
 * - Endpoint: Delegated to `deleteAllNotifications` in notifications.requests.
 */
export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean; count: number }, APIResponseError, void>({
    mutationFn: async () => {
      const res = await deleteAllNotifications();
      return res.data;
    },
    onSuccess: () => {
      // Invalidate notifications and unread count
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
    },
  });
};

