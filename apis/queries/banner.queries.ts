/**
 * @fileoverview TanStack React Query hooks for banner management.
 *
 * Includes public queries (active banners), admin CRUD operations
 * (create, update, delete, toggle status, update priority), user-facing
 * analytics tracking (click/view), and admin analytics queries.
 *
 * @module queries/banner
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchActiveBanners,
  fetchAllBanners,
  fetchBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
  toggleBannerStatus,
  updateBannerPriority,
  trackBannerClick,
  trackBannerView,
  fetchBannerAnalytics,
  ICreateBanner,
  IBanner,
} from "../requests/banner.requests";

/**
 * Query hook that fetches currently active banners, optionally filtered
 * by display position. Results are cached for 5 minutes.
 *
 * @param position - Optional banner placement position filter (e.g., "HOME_TOP").
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result whose `data` is an array of active banners.
 *
 * @remarks
 * - Query key: `["banners", "active", position]`
 * - **staleTime**: 5 minutes.
 * - Endpoint: Delegated to `fetchActiveBanners` in banner.requests.
 */
// Get active banners (public)
export const useActiveBanners = (position?: string, enabled = true) =>
  useQuery({
    queryKey: ["banners", "active", position],
    queryFn: async () => {
      const res = await fetchActiveBanners(position);
      // Backend returns { status, message, data: [...] }
      // Return the data array directly
      return res.data?.data || res.data || [];
    },
    enabled,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

/**
 * Query hook that fetches all banners with pagination and optional
 * position filter. Intended for admin use.
 *
 * @param params - Optional pagination and filter parameters.
 * @param params.page - Page number (1-based).
 * @param params.limit - Records per page.
 * @param params.position - Optional position filter.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with paginated banner data.
 *
 * @remarks
 * Query key: `["banners", "all", params]`
 * Endpoint: Delegated to `fetchAllBanners` in banner.requests.
 */
// Get all banners (admin)
export const useAllBanners = (
  params?: { page?: number; limit?: number; position?: string },
  enabled = true
) =>
  useQuery({
    queryKey: ["banners", "all", params],
    queryFn: async () => {
      const res = await fetchAllBanners(params);
      return res.data;
    },
    enabled,
  });

/**
 * Query hook that fetches a single banner by its numeric ID.
 *
 * @param id - The unique banner identifier.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 *   The query is also disabled when `id` is falsy.
 * @returns A `useQuery` result with the banner details.
 *
 * @remarks
 * Query key: `["banner", id]`
 * Endpoint: Delegated to `fetchBannerById` in banner.requests.
 */
// Get single banner
export const useBannerById = (id: number, enabled = true) =>
  useQuery({
    queryKey: ["banner", id],
    queryFn: async () => {
      const res = await fetchBannerById(id);
      return res.data;
    },
    enabled: enabled && !!id,
  });

/**
 * Mutation hook to create a new banner (admin).
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link ICreateBanner}
 * - **Invalidates**: `["banners"]` on success.
 * - Endpoint: Delegated to `createBanner` in banner.requests.
 */
// Create banner mutation (admin)
export const useCreateBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ICreateBanner) => createBanner(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });
};

/**
 * Mutation hook to update an existing banner (admin).
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ id: number; payload: Partial<ICreateBanner> }`
 * - **Invalidates**: `["banners"]` on success.
 * - Endpoint: Delegated to `updateBanner` in banner.requests.
 */
// Update banner mutation (admin)
export const useUpdateBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<ICreateBanner> }) =>
      updateBanner(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });
};

/**
 * Mutation hook to delete a banner (admin).
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `number` (banner ID)
 * - **Invalidates**: `["banners"]` on success.
 * - Endpoint: Delegated to `deleteBanner` in banner.requests.
 */
// Delete banner mutation (admin)
export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });
};

/**
 * Mutation hook to toggle a banner's active/inactive status (admin).
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ id: number; isActive: boolean }`
 * - **Invalidates**: `["banners"]` on success.
 * - Endpoint: Delegated to `toggleBannerStatus` in banner.requests.
 */
// Toggle banner status mutation (admin)
export const useToggleBannerStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) =>
      toggleBannerStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });
};

/**
 * Mutation hook to update a banner's display priority (admin).
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ id: number; priority: number }`
 * - **Invalidates**: `["banners"]` on success.
 * - Endpoint: Delegated to `updateBannerPriority` in banner.requests.
 */
// Update priority mutation (admin)
export const useUpdateBannerPriority = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, priority }: { id: number; priority: number }) =>
      updateBannerPriority(id, priority),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });
};

/**
 * Mutation hook to track a user click on a banner.
 * Fire-and-forget -- no cache invalidation on success.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `number` (banner ID)
 * - Endpoint: Delegated to `trackBannerClick` in banner.requests.
 */
// Track click mutation
export const useTrackBannerClick = () => {
  return useMutation({
    mutationFn: (id: number) => trackBannerClick(id),
  });
};

/**
 * Mutation hook to track a banner view / impression.
 * Fire-and-forget -- no cache invalidation on success.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `number` (banner ID)
 * - Endpoint: Delegated to `trackBannerView` in banner.requests.
 */
// Track view mutation
export const useTrackBannerView = () => {
  return useMutation({
    mutationFn: (id: number) => trackBannerView(id),
  });
};

/**
 * Query hook that fetches aggregated banner analytics data (admin).
 *
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with analytics metrics.
 *
 * @remarks
 * Query key: `["banners", "analytics"]`
 * Endpoint: Delegated to `fetchBannerAnalytics` in banner.requests.
 */
// Get analytics query (admin)
export const useBannerAnalytics = (enabled = true) =>
  useQuery({
    queryKey: ["banners", "analytics"],
    queryFn: async () => {
      const res = await fetchBannerAnalytics();
      return res.data;
    },
    enabled,
  });

