import axios from "axios";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getApiUrl } from "@/config/api";
import urlcat from "urlcat";
import {
  Notification,
  NotificationListResponse,
  NotificationUnreadCountResponse,
} from "@/utils/types/notification.types";

/**
 * Payload for fetching notifications with optional filtering and pagination.
 */
export interface FetchNotificationsPayload {
  page?: number;
  limit?: number;
  type?: string;
  read?: boolean;
}

/**
 * Fetches the authenticated user's notifications with optional filtering and pagination.
 *
 * @param payload - Optional query parameters for filtering/pagination.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.type - Optional notification type filter.
 * @param payload.read - Optional filter for read/unread status.
 * @returns Axios promise resolving to the paginated list of notifications.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/notification`
 * - **Auth:** Bearer token required.
 */
export const fetchNotifications = async (
  payload: FetchNotificationsPayload = {},
) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/notification`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches the count of unread notifications for the authenticated user.
 *
 * @returns Axios promise resolving to the unread notification count.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/notification/unread-count`
 * - **Auth:** Bearer token required.
 */
export const fetchUnreadCount = async () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/notification/unread-count`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Marks a single notification as read.
 *
 * @param notificationId - The numeric ID of the notification to mark as read.
 * @returns Axios promise resolving to the update confirmation.
 *
 * @remarks
 * - **HTTP Method:** `PUT`
 * - **Endpoint:** `/notification/:notificationId/read`
 * - **Auth:** Bearer token required.
 */
export const markAsRead = async (notificationId: number) => {
  return axios({
    method: "PUT",
    url: `${getApiUrl()}/notification/${notificationId}/read`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Marks all notifications as read for the authenticated user.
 *
 * @returns Axios promise resolving to the bulk update confirmation.
 *
 * @remarks
 * - **HTTP Method:** `PUT`
 * - **Endpoint:** `/notification/read-all`
 * - **Auth:** Bearer token required.
 */
export const markAllAsRead = async () => {
  return axios({
    method: "PUT",
    url: `${getApiUrl()}/notification/read-all`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Deletes a single notification by its ID.
 *
 * @param notificationId - The numeric ID of the notification to delete.
 * @returns Axios promise resolving to the deletion confirmation.
 *
 * @remarks
 * - **HTTP Method:** `DELETE`
 * - **Endpoint:** `/notification/:notificationId`
 * - **Auth:** Bearer token required.
 */
export const deleteNotification = async (notificationId: number) => {
  return axios({
    method: "DELETE",
    url: `${getApiUrl()}/notification/${notificationId}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Deletes all notifications for the authenticated user.
 *
 * @returns Axios promise resolving to the bulk deletion confirmation.
 *
 * @remarks
 * - **HTTP Method:** `DELETE`
 * - **Endpoint:** `/notification`
 * - **Auth:** Bearer token required.
 */
export const deleteAllNotifications = async () => {
  return axios({
    method: "DELETE",
    url: `${getApiUrl()}/notification`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
