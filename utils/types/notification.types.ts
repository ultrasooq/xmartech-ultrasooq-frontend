export enum NotificationType {
  ORDER = "ORDER",
  MESSAGE = "MESSAGE",
  RFQ = "RFQ",
  REVIEW = "REVIEW",
  SYSTEM = "SYSTEM",
  PAYMENT = "PAYMENT",
  SHIPMENT = "SHIPMENT",
  ACCOUNT = "ACCOUNT",
}

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
    [key: string]: any;
  };
  read: boolean;
  readAt?: string | null;
  createdAt: string;
  updatedAt?: string;
  link?: string | null;
  icon?: string | null;
}

export interface NotificationListResponse {
  data: Notification[];
  total: number;
  page: number;
  limit: number;
  unreadCount: number;
}

export interface NotificationUnreadCountResponse {
  count: number;
}

export interface MarkAsReadRequest {
  notificationId: number;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  orderNotifications: boolean;
  messageNotifications: boolean;
  rfqNotifications: boolean;
  reviewNotifications: boolean;
  systemNotifications: boolean;
}

