import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import {
  deleteCartItem,
  fetchCartByDevice,
  fetchCartByUserId,
  updateCartByDevice,
  updateCartWithLogin,
  updateUserCartByDeviceId,
} from "../requests/cart.requests";

export const useCartListByUserId = (
  payload: {
    page: number;
    limit: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["cart-by-user", payload],
    queryFn: async () => {
      const res = await fetchCartByUserId(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

export const useCartListByDevice = (
  payload: {
    page: number;
    limit: number;
    deviceId: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["cart-by-device", payload],
    queryFn: async () => {
      const res = await fetchCartByDevice(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

export const useUpdateCartWithLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { productId: number; quantity: number }
  >({
    mutationFn: async (payload) => {
      const res = await updateCartWithLogin(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart-by-user"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useUpdateCartByDevice = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { productId: number; quantity: number; deviceId: string }
  >({
    mutationFn: async (payload) => {
      const res = await updateCartByDevice(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart-by-device"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { cartId: number }
  >({
    mutationFn: async (payload) => {
      const res = await deleteCartItem(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart-by-user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart-by-device"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useUpdateUserCartByDeviceId = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { deviceId: string }
  >({
    mutationFn: async (payload) => {
      const res = await updateUserCartByDeviceId(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart-by-user"],
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["cart-by-device"],
      // });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};
