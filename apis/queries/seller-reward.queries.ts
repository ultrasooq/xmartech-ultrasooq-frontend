/**
 * @fileoverview TanStack React Query hooks for seller rewards and
 * share links.
 *
 * Provides paginated queries for seller rewards, share links, and
 * share links filtered by a specific seller reward, plus mutations
 * to create rewards and share links.
 *
 * @module queries/seller-reward
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { APIResponseError } from "@/utils/types/common.types";
import {
    addSellerReward,
    createShareLink,
    fetchSellerRewards,
    fetchShareLinks,
    fetchShareLinksBySellerRewardId
} from "../requests/seller-reward.requests";

/**
 * Query hook that fetches paginated seller rewards with optional
 * search, product, and sort filters.
 *
 * @param payload - Pagination and filter parameters.
 * @param payload.page - Page number (1-based).
 * @param payload.limit - Records per page.
 * @param payload.term - Optional search term.
 * @param payload.productId - Optional product ID filter.
 * @param payload.sortType - Optional sort direction ("asc" | "desc").
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with paginated seller rewards.
 *
 * @remarks
 * Query key: `["seller_rewards", payload]`
 * Endpoint: Delegated to `fetchSellerRewards` in seller-reward.requests.
 */
export const useSellerRewards = (
    payload: {
        page: number;
        limit: number;
        term?: string;
        productId?: string;
        sortType?: "asc" | "desc";
    },
    enabled = true,
) =>
    useQuery({
        queryKey: ["seller_rewards", payload],
        queryFn: async () => {
            const res = await fetchSellerRewards(payload);
            return res.data;
        },
        // onError: (err: APIResponseError) => {
        //   console.log(err);
        // },
        enabled,
    });

/**
 * Mutation hook to create a new seller reward for a product.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ productId, startTime, endTime, rewardPercentage,
 *   rewardFixAmount, minimumOrder, stock }`
 * - **Response**: `{ data: any; message: string; status: boolean }`
 * - **Invalidates**: `["seller_rewards"]` on success.
 * - Endpoint: Delegated to `addSellerReward` in seller-reward.requests.
 */
export const useAddSellerReward = () => {
    const queryClient = useQueryClient();
    return useMutation<
        { data: any; message: string; status: boolean },
        APIResponseError,
        {
            productId: number;
            startTime: string;
            endTime: string;
            rewardPercentage: number;
            rewardFixAmount: number;
            minimumOrder: number;
            stock: number;
        }
    >({
        mutationFn: async (payload) => {
            const res = await addSellerReward(payload);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["seller_rewards"],
            });
        },
        onError: (err: APIResponseError) => {
        },
    });
};

/**
 * Query hook that fetches paginated share links with optional
 * product and sort filters.
 *
 * @param payload - Pagination and filter parameters.
 * @param payload.page - Page number (1-based).
 * @param payload.limit - Records per page.
 * @param payload.productId - Optional product ID filter.
 * @param payload.sortType - Optional sort direction ("asc" | "desc").
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with paginated share links.
 *
 * @remarks
 * Query key: `["share_links", payload]`
 * Endpoint: Delegated to `fetchShareLinks` in seller-reward.requests.
 */
export const useShareLinks = (
    payload: {
        page: number;
        limit: number;
        productId?: string;
        sortType?: "asc" | "desc";
    },
    enabled = true,
) =>
    useQuery({
        queryKey: ["share_links", payload],
        queryFn: async () => {
            const res = await fetchShareLinks(payload);
            return res.data;
        },
        // onError: (err: APIResponseError) => {
        //   console.log(err);
        // },
        enabled,
    });

/**
 * Mutation hook to create a new share link for a seller reward.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ sellerRewardId: number }`
 * - **Response**: `{ data: any; message: string; status: boolean }`
 * - Endpoint: Delegated to `createShareLink` in seller-reward.requests.
 */
export const useCreateShareLink = () => {
    const queryClient = useQueryClient();
    return useMutation<
        { data: any; message: string; status: boolean },
        APIResponseError,
        { sellerRewardId: number; }
    >({
        mutationFn: async (payload) => {
            const res = await createShareLink(payload);
            return res.data;
        },
        onSuccess: () => {
            // queryClient.invalidateQueries({
            //     queryKey: ["share_links"],
            // });
        },
        onError: (err: APIResponseError) => {
        },
    });
};

/**
 * Query hook that fetches share links belonging to a specific
 * seller reward, with pagination and optional search/sort.
 *
 * @param payload - Pagination and filter parameters.
 * @param payload.page - Page number (1-based).
 * @param payload.limit - Records per page.
 * @param payload.term - Optional search term.
 * @param payload.sellerRewardId - Optional seller reward ID filter.
 * @param payload.sortType - Optional sort direction ("asc" | "desc").
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with paginated share links for the reward.
 *
 * @remarks
 * Query key: `["share_links_by_reward", payload]`
 * Endpoint: Delegated to `fetchShareLinksBySellerRewardId` in seller-reward.requests.
 */
export const useShareLinksBySellerReward = (
    payload: {
        page: number;
        limit: number;
        term?: string;
        sellerRewardId?: string;
        sortType?: "asc" | "desc";
    },
    enabled = true,
) =>
    useQuery({
        queryKey: ["share_links_by_reward", payload],
        queryFn: async () => {
            const res = await fetchShareLinksBySellerRewardId(payload);
            return res.data;
        },
        // onError: (err: APIResponseError) => {
        //   console.log(err);
        // },
        enabled,
    });
