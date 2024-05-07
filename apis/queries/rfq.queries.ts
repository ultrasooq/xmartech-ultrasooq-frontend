import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addRfqProduct,
  addRfqQuotes,
  deleteRfqCartItem,
  fetchRfqCartByUserId,
  fetchRfqProductById,
  fetchRfqProducts,
  updateRfqCartWithLogin,
  updateRfqProduct,
} from "../requests/rfq.requests";
import { AddRfqQuotesRequest } from "@/utils/types/rfq.types";

export const useRfqProducts = (
  payload: {
    page: number;
    limit: number;
    term?: string;
    adminId?: string;
    sortType?: "newest" | "oldest";
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["rfq-products", payload],
    queryFn: async () => {
      const res = await fetchRfqProducts(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

export const useRfqProductById = (id: string, enabled = true) =>
  useQuery({
    queryKey: ["rfq-product-by-id", id],
    queryFn: async () => {
      const res = await fetchRfqProductById({ rfqProductId: id });
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

export const useAddRfqProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {
      productNote: string;
      rfqProductName: string;
      rfqProductImagesList: { imageName: string; image: string }[];
    }
  >({
    mutationFn: async (payload) => {
      const res = await addRfqProduct(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rfq-products"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useUpdateRfqProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {
      rFqProductId: number;
      productNote: string;
      rfqProductName: string;
      rfqProductImagesList: { imageName: string; image: string }[];
    }
  >({
    mutationFn: async (payload) => {
      const res = await updateRfqProduct(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rfq-products"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useRfqCartListByUserId = (
  payload: {
    page: number;
    limit: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["rfq-cart-by-user", payload],
    queryFn: async () => {
      const res = await fetchRfqCartByUserId(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

export const useUpdateRfqCartWithLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { productId: number; quantity: number }
  >({
    mutationFn: async (payload) => {
      const res = await updateRfqCartWithLogin(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rfq-cart-by-user"],
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["rfq-cart-count-with-login"],
      // });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useDeleteRfqCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { rfqCartId: number }
  >({
    mutationFn: async (payload) => {
      const res = await deleteRfqCartItem(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rfq-cart-by-user"],
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["cart-by-device"],
      // });
      // queryClient.invalidateQueries({
      //   queryKey: ["cart-count-with-login"],
      // });
      // queryClient.invalidateQueries({
      //   queryKey: ["cart-count-without-login"],
      // });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useAddRfqQuotes = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    AddRfqQuotesRequest
  >({
    mutationFn: async (payload) => {
      const res = await addRfqQuotes(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rfq-quotes"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};
