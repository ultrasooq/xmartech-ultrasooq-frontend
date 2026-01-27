/**
 * @fileoverview TanStack React Query hooks for product and seller reviews.
 *
 * Supports fetching, creating, and updating reviews for both products
 * and sellers (product-price level reviews). Also provides hooks
 * for looking up individual reviews by ID and for seller review aggregation.
 *
 * @module queries/review
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { APIResponseError } from "@/utils/types/common.types";
import {
  addReview,
  addSellerReview,
  fetchAllProductPriceReviewBySellerId,
  // fetchAllReviewBySellerId,
  fetchReviewById,
  fetchReviews,
  fetchSellerReviewById,
  updateReview,
  updateSellerReview,
} from "../requests/review.requests";

/**
 * Query hook that fetches paginated reviews for a product.
 *
 * @remarks
 * Query key: `["reviews", payload]`
 * Endpoint: Delegated to `fetchReviews` in review.requests.
 */
export const useReviews = (
  payload: {
    page: number;
    limit: number;
    productId: string;
    sortType?: "highest" | "lowest" | "newest";
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["reviews", payload],
    queryFn: async () => {
      const res = await fetchReviews(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Mutation hook to add a new product review.
 *
 * @remarks
 * - **Payload**: `{ productId, title, description, rating }`
 * - **Invalidates**: `["reviews"]` on success.
 * - Endpoint: Delegated to `addReview` in review.requests.
 */
export const useAddReview = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { productId: number; title: string; description: string; rating: number }
  >({
    mutationFn: async (payload) => {
      const res = await addReview(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to update an existing product review.
 *
 * @remarks
 * - **Payload**: `{ productReviewId, title, description, rating }`
 * - **Invalidates**: `["reviews"]` on success.
 * - Endpoint: Delegated to `updateReview` in review.requests.
 */
export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {
      productReviewId: number;
      title: string;
      description: string;
      rating: number;
    }
  >({
    mutationFn: async (payload) => {
      const res = await updateReview(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Query hook that fetches a single product review by its ID.
 *
 * @remarks
 * Query key: `["review-by-id", payload]`
 * Endpoint: Delegated to `fetchReviewById` in review.requests.
 */
export const useReviewById = (
  payload: { productReviewId: number },
  enabled = true,
) =>
  useQuery({
    queryKey: ["review-by-id", payload],
    queryFn: async () => {
      const res = await fetchReviewById(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

// export const useReviewsForSeller = (
//   payload: {
//     page: number;
//     limit: number;
//     sortType?: "highest" | "lowest" | "newest";
//   },
//   enabled = true,
// ) =>
//   useQuery({
//     queryKey: ["reviews-for-seller", payload],
//     queryFn: async () => {
//       const res = await fetchAllReviewBySellerId(payload);
//       return res.data;
//     },
//     // onError: (err: APIResponseError) => {
//     //   console.log(err);
//     // },
//     enabled,
//   });

/**
 * Mutation hook to add a seller-level review (product-price review).
 *
 * @remarks
 * - **Payload**: `{ productPriceId, adminId, productId, title, description, rating }`
 * - **Invalidates**: `["reviews-for-seller"]` on success.
 * - Endpoint: Delegated to `addSellerReview` in review.requests.
 */
export const useAddSellerReview = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {
      productPriceId: number;
      adminId: number;
      productId: number;
      title: string;
      description: string;
      rating: number;
    }
  >({
    mutationFn: async (payload) => {
      const res = await addSellerReview(payload);
      return res.data;
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ["seller-reviews"],
      // });
      queryClient.invalidateQueries({
        queryKey: ["reviews-for-seller"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to update an existing seller-level review.
 *
 * @remarks
 * - **Payload**: `{ productReviewId, title, description, rating }`
 * - **Invalidates**: `["reviews-for-seller"]` on success.
 * - Endpoint: Delegated to `updateSellerReview` in review.requests.
 */
export const useUpdateSellerReview = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {
      productReviewId: number;
      title: string;
      description: string;
      rating: number;
    }
  >({
    mutationFn: async (payload) => {
      const res = await updateSellerReview(payload);
      return res.data;
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ["seller-reviews"],
      // });
      queryClient.invalidateQueries({
        queryKey: ["reviews-for-seller"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Query hook that fetches a single seller review by its product-price
 * review ID.
 *
 * @remarks
 * Query key: `["seller-review-by-id", payload]`
 * Endpoint: Delegated to `fetchSellerReviewById` in review.requests.
 */
export const useSellerReviewById = (
  payload: { productPriceReviewId: number },
  enabled = true,
) =>
  useQuery({
    queryKey: ["seller-review-by-id", payload],
    queryFn: async () => {
      const res = await fetchSellerReviewById(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook that fetches all product-price reviews for a given
 * seller, with pagination and sort options.
 *
 * @remarks
 * Query key: `["reviews-for-seller", payload]`
 * Endpoint: Delegated to `fetchAllProductPriceReviewBySellerId` in review.requests.
 */
export const useAllProductPriceReviewBySellerId = (
  payload: {
    page: number;
    limit: number;
    sortType?: "highest" | "lowest" | "newest";
    sellerId: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["reviews-for-seller", payload],
    queryFn: async () => {
      const res = await fetchAllProductPriceReviewBySellerId(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });
