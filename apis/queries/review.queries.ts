import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { APIResponseError } from "@/utils/types/common.types";
import {
  addReview,
  fetchAllReviewBySellerId,
  fetchReviewById,
  fetchReviews,
  updateReview,
} from "../requests/review.requests";

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
      console.log(err);
    },
  });
};

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
      console.log(err);
    },
  });
};

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

export const useReviewsForSeller = (
  payload: {
    page: number;
    limit: number;
    sortType?: "highest" | "lowest" | "newest";
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["reviews-for-seller", payload],
    queryFn: async () => {
      const res = await fetchAllReviewBySellerId(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });
