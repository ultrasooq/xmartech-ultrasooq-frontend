/**
 * @fileoverview TanStack React Query hooks for product and service
 * questions and answers (Q&A).
 *
 * Provides paginated question queries, mutations for submitting
 * questions and answers, for both regular products and services.
 *
 * @module queries/question
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { APIResponseError } from "@/utils/types/common.types";
import {
  addQuestion,
  addServiceQuestion,
  fetchQuestions,
  fetchServiceQuestions,
  updateAnswer,
  updateServiceAnswer,
} from "../requests/question.requests";

/**
 * Query hook that fetches paginated questions for a product.
 *
 * @param payload - Pagination and filter parameters.
 * @param payload.page - Page number (1-based).
 * @param payload.limit - Records per page.
 * @param payload.productId - The product ID whose questions to fetch.
 * @param payload.sortType - Optional sort ("newest" | "oldest").
 * @param payload.userType - Optional user type filter.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 *
 * @remarks
 * Query key: `["questions", payload]`
 * Endpoint: Delegated to `fetchQuestions` in question.requests.
 */
export const useQuestions = (
  payload: {
    page: number;
    limit: number;
    productId: string;
    sortType?: "newest" | "oldest";
    userType?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["questions", payload],
    queryFn: async () => {
      const res = await fetchQuestions(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Mutation hook to submit a new question on a product.
 *
 * @remarks
 * - **Payload**: `{ productId: number; question: string }`
 * - **Invalidates**: `["questions"]` on success.
 * - Endpoint: Delegated to `addQuestion` in question.requests.
 */
export const useAddQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { productId: number; question: string }
  >({
    mutationFn: async (payload) => {
      const res = await addQuestion(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to update / provide an answer to a product question.
 *
 * @remarks
 * - **Payload**: `{ productQuestionId: number; answer: string }`
 * - **Invalidates**: `["questions"]` on success.
 * - Endpoint: Delegated to `updateAnswer` in question.requests.
 */
export const useUpdateAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { productQuestionId: number; answer: string }
  >({
    mutationFn: async (payload) => {
      const res = await updateAnswer(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Query hook that fetches paginated questions for a service.
 *
 * @remarks
 * Query key: `["service-questions", payload]`
 * Endpoint: Delegated to `fetchServiceQuestions` in question.requests.
 */
export const useServiceQuestions = (
  payload: {
    page: number;
    limit: number;
    serviceId: string;
    sortType?: "latest" | "oldest";
    userType?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["service-questions", payload],
    queryFn: async () => {
      const res = await fetchServiceQuestions(payload);
      return res.data;
    },
    enabled,
  });

/**
 * Mutation hook to submit a new question on a service.
 *
 * @remarks
 * - **Payload**: `{ serviceId: number; question: string }`
 * - **Invalidates**: `["service-questions"]` on success.
 * - Endpoint: Delegated to `addServiceQuestion` in question.requests.
 */
export const useAddServiceQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { serviceId: number; question: string }
  >({
    mutationFn: async (payload) => {
      const res = await addServiceQuestion(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["service-questions"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to update / provide an answer to a service question.
 *
 * @remarks
 * - **Payload**: `{ serviceId: number; productQuestionId: number; answer: string }`
 * - **Invalidates**: `["service-questions"]` on success.
 * - Endpoint: Delegated to `updateServiceAnswer` in question.requests.
 */
export const useUpdateServiceAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { serviceId: number; productQuestionId: number; answer: string }
  >({
    mutationFn: async (payload) => {
      const res = await updateServiceAnswer(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["service-questions"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};
