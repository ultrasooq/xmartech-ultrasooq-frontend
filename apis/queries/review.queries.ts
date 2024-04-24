import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { APIResponseError } from "@/utils/types/common.types";
import { addReview, fetchReviews } from "../requests/review.requests";

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
