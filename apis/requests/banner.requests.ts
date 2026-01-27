import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import axios from "axios";
import { getCookie } from "cookies-next";
import { getApiUrl } from "@/config/api";

/**
 * Represents a banner entity returned by the API.
 */
export interface IBanner {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  link?: string;
  buttonText?: string;
  position: 'MAIN' | 'SIDE_TOP' | 'SIDE_BOTTOM' | 'FULL_WIDTH' | 'POPUP';
  isActive: boolean;
  priority: number;
  startDate?: string;
  endDate?: string;
  targetUrl?: string;
  clicks: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Payload for creating a new banner.
 */
export interface ICreateBanner {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  link?: string;
  buttonText?: string;
  position: 'MAIN' | 'SIDE_TOP' | 'SIDE_BOTTOM' | 'FULL_WIDTH' | 'POPUP';
  priority?: number;
  startDate?: string;
  endDate?: string;
  targetUrl?: string;
}

/**
 * Banner analytics summary returned by the API.
 */
export interface IBannerAnalytics {
  totalBanners: number;
  activeBanners: number;
  totalClicks: number;
  totalViews: number;
  clickThroughRate: number;
  topBanners: IBanner[];
}

/**
 * Fetches all currently active banners, optionally filtered by display position.
 *
 * @param position - Optional banner position filter (e.g., `'MAIN'`, `'POPUP'`).
 * @returns Axios promise resolving to the list of active banners.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/banner/active`
 * - **Auth:** None required (public endpoint).
 */
// Get all active banners (public)
export const fetchActiveBanners = (position?: string) => {
  const params = position ? { position } : {};
  return axios({
    method: "GET",
    url: `${getApiUrl()}/banner/active`,
    params,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

/**
 * Fetches all banners with optional pagination and position filter (admin only).
 *
 * @param params - Optional query parameters.
 * @param params.page - The page number to retrieve.
 * @param params.limit - The number of records per page.
 * @param params.position - Optional position filter.
 * @returns Axios promise resolving to the paginated list of all banners.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/banner`
 * - **Auth:** Bearer token required (admin).
 */
// Get all banners (admin)
export const fetchAllBanners = (params?: { page?: number; limit?: number; position?: string }) => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/banner`,
    params,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches a single banner by its numeric ID (admin only).
 *
 * @param id - The unique numeric identifier of the banner.
 * @returns Axios promise resolving to the banner details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/banner/:id`
 * - **Auth:** Bearer token required (admin).
 */
// Get single banner
export const fetchBannerById = (id: number) => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/banner/${id}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Creates a new banner (admin only).
 *
 * @param payload - The banner creation data conforming to {@link ICreateBanner}.
 * @returns Axios promise resolving to the newly created banner.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/banner`
 * - **Auth:** Bearer token required (admin).
 */
// Create banner (admin)
export const createBanner = (payload: ICreateBanner) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/banner`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates an existing banner by its ID (admin only).
 *
 * @param id - The unique numeric identifier of the banner to update.
 * @param payload - Partial banner data to update, conforming to `Partial<ICreateBanner>`.
 * @returns Axios promise resolving to the updated banner.
 *
 * @remarks
 * - **HTTP Method:** `PUT`
 * - **Endpoint:** `/banner/:id`
 * - **Auth:** Bearer token required (admin).
 */
// Update banner (admin)
export const updateBanner = (id: number, payload: Partial<ICreateBanner>) => {
  return axios({
    method: "PUT",
    url: `${getApiUrl()}/banner/${id}`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Deletes a banner by its ID (admin only).
 *
 * @param id - The unique numeric identifier of the banner to delete.
 * @returns Axios promise resolving to the deletion confirmation.
 *
 * @remarks
 * - **HTTP Method:** `DELETE`
 * - **Endpoint:** `/banner/:id`
 * - **Auth:** Bearer token required (admin).
 */
// Delete banner (admin)
export const deleteBanner = (id: number) => {
  return axios({
    method: "DELETE",
    url: `${getApiUrl()}/banner/${id}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Toggles the active/inactive status of a banner (admin only).
 *
 * @param id - The unique numeric identifier of the banner.
 * @param isActive - The desired active state (`true` to activate, `false` to deactivate).
 * @returns Axios promise resolving to the updated banner status.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/banner/:id/status`
 * - **Auth:** Bearer token required (admin).
 */
// Toggle banner status (admin)
export const toggleBannerStatus = (id: number, isActive: boolean) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/banner/${id}/status`,
    data: { isActive },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates the display priority of a banner (admin only).
 *
 * @param id - The unique numeric identifier of the banner.
 * @param priority - The new priority value (higher values may display first).
 * @returns Axios promise resolving to the updated banner priority.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/banner/:id/priority`
 * - **Auth:** Bearer token required (admin).
 */
// Update banner priority (admin)
export const updateBannerPriority = (id: number, priority: number) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/banner/${id}/priority`,
    data: { priority },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Records a user click on a specific banner for analytics tracking.
 *
 * @param id - The unique numeric identifier of the banner that was clicked.
 * @returns Axios promise resolving to the tracking confirmation.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/banner/:id/track-click`
 * - **Auth:** None required (public endpoint).
 */
// Track banner click
export const trackBannerClick = (id: number) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/banner/${id}/track-click`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

/**
 * Records a user view/impression on a specific banner for analytics tracking.
 *
 * @param id - The unique numeric identifier of the banner that was viewed.
 * @returns Axios promise resolving to the tracking confirmation.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/banner/:id/track-view`
 * - **Auth:** None required (public endpoint).
 */
// Track banner view
export const trackBannerView = (id: number) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/banner/${id}/track-view`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

/**
 * Fetches aggregated banner analytics data including clicks, views, and CTR (admin only).
 *
 * @returns Axios promise resolving to a {@link IBannerAnalytics} summary.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/banner/analytics`
 * - **Auth:** Bearer token required (admin).
 */
// Get banner analytics (admin)
export const fetchBannerAnalytics = () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/banner/analytics`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
