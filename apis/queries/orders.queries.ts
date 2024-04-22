import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrder, createOrderUnAuth } from "../requests/orders.requests";
import { APIResponseError } from "@/utils/types/common.types";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {}
  >({
    mutationFn: async (payload) => {
      const res = await createOrder(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useCreateOrderUnAuth = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {}
  >({
    mutationFn: async (payload) => {
      const res = await createOrderUnAuth(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};
