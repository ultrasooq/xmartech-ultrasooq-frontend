/**
 * @fileoverview TanStack React Query hooks for user profile management.
 *
 * Provides hooks for updating the user profile, fetching the current
 * authenticated user ("me"), fetching a unique user by ID, and
 * fetching user business categories.
 *
 * @module queries/user
 */

import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchMe,
  fetchUniqueUser,
  fetchUserBusinessCategories,
  updateUserProfile,
} from "../requests/user.requests";
import { IBuyer, IBuyerRequest } from "@/utils/types/user.types";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Mutation hook to update the authenticated user's profile.
 * On success, removes `["me"]` and `["unique-user"]` from the cache
 * and force-refetches them.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link IBuyerRequest} | `{ tradeRole: string }`
 * - **Response**: {@link IBuyer}
 * - **Invalidates / refetches**: `["me"]`, `["unique-user"]` on success.
 * - Endpoint: Delegated to `updateUserProfile` in user.requests.
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IBuyer,
    APIResponseError,
    IBuyerRequest | { tradeRole: string }
  >({
    mutationFn: async (payload) => {
      const res = await updateUserProfile(payload);
      return res.data;
    },
    onSuccess: () => {
      // Remove queries from cache completely
      queryClient.removeQueries({ queryKey: ["me"] });
      queryClient.removeQueries({ queryKey: ["unique-user"] });

      // Then invalidate and force refetch
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["unique-user"] });

      // Force immediate refetch
      queryClient.refetchQueries({ queryKey: ["me"] });
      queryClient.refetchQueries({ queryKey: ["unique-user"] });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Query hook that fetches the currently authenticated user's profile.
 * Data is never cached (`staleTime: 0`, `gcTime: 0`) and always
 * re-fetched on mount and window focus.
 *
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the user profile data.
 *
 * @remarks
 * Query key: `["me"]`
 * Endpoint: Delegated to `fetchMe` in user.requests.
 */
export const useMe = (enabled = true) =>
  useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await fetchMe();
      return res.data;
    },
    enabled,
    staleTime: 0, // Data is always considered stale
    gcTime: 0, // Don't cache the data
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: false,
  });

/**
 * Query hook that fetches a unique user's public profile by their
 * user ID. Data is never cached (`staleTime: 0`, `gcTime: 0`).
 *
 * @param payload - User identification.
 * @param payload.userId - The target user's numeric ID (may be undefined).
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the user's profile data.
 *
 * @remarks
 * Query key: `["unique-user", payload]`
 * Endpoint: Delegated to `fetchUniqueUser` in user.requests.
 */
export const useUniqueUser = (
  payload: { userId: number | undefined },
  enabled = true,
) =>
  useQuery({
    queryKey: ["unique-user", payload],
    queryFn: async () => {
      const res = await fetchUniqueUser(payload);
      return res.data;
    },
    enabled,
    staleTime: 0, // Data is always considered stale
    gcTime: 0, // Don't cache the data
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

/**
 * Query hook that fetches the list of business categories
 * associated with the authenticated user.
 *
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the user's business categories.
 *
 * @remarks
 * Query key: `["user-busienss-categories"]` (note: original typo preserved).
 * Endpoint: Delegated to `fetchUserBusinessCategories` in user.requests.
 */
export const useUserBusinessCategories = (enabled = true) =>
  useQuery({
    queryKey: ["user-busienss-categories"],
    queryFn: async () => {
      const res = await fetchUserBusinessCategories();
      return res.data;
    },
    enabled,
  });
