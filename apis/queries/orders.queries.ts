import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrder,
  createOrderUnAuth,
  fetchOrders,
} from "../requests/orders.requests";
import { APIResponseError } from "@/utils/types/common.types";

export const useOrders = (
  payload: {
    page: number;
    limit: number;
    term?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["orders", payload],
    queryFn: async () => {
      const res: { data: { data: any; message: string; status: boolean } } =
        await fetchOrders(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

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
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart-count-with-login"],
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
        queryKey: ["orders"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};
