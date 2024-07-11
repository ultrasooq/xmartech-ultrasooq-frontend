import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProductDuplicateRfq,
  addRfqProduct,
  addRfqQuotes,
  deleteRfqCartItem,
  deleteRfqQuote,
  fetchAllRfqQuotesByBuyerId,
  fetchAllRfqQuotesUsersByBuyerId,
  fetchAllRfqQuotesUsersBySellerId,
  fetchOneRfqQuotesUsersByBuyerID,
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
    { productId: number; quantity: number; offerPrice: number; note: string }
  >({
    mutationFn: async (payload) => {
      const res = await updateRfqCartWithLogin(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rfq-cart-by-user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["rfq-products"],
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
      queryClient.invalidateQueries({
        queryKey: ["rfq-products"],
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

export const useAllRfqQuotesByBuyerId = (
  payload: {
    page: number;
    limit: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["rfq-quotes-request", payload],
    queryFn: async () => {
      const res = await fetchAllRfqQuotesByBuyerId(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

export const useAllRfqQuotesUsersByBuyerId = (
  payload: {
    page: number;
    limit: number;
    rfqQuotesId: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["rfq-quotes-users", payload],
    queryFn: async () => {
      const res = await fetchAllRfqQuotesUsersByBuyerId(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

export const useFindOneRfqQuotesUsersByBuyerID = (
  payload: {
    rfqQuotesId?: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["rfq-quotes-by-buyer-id", payload],
    queryFn: async () => {
      const res = await fetchOneRfqQuotesUsersByBuyerID(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

export const useAllRfqQuotesUsersBySellerId = (
  payload: {
    page: number;
    limit: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["rfq-quotes-by-seller-id", payload],
    queryFn: async () => {
      const res = await fetchAllRfqQuotesUsersBySellerId(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

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
        queryKey: ["rfq-quotes-request"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useAddProductDuplicateRfq = () => {
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { productId: number }
  >({
    mutationFn: async (payload) => {
      const res = await addProductDuplicateRfq(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useDeleteRfqQuote = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {
      rfqQuotesId: number;
    }
  >({
    mutationFn: async (payload) => {
      const res = await deleteRfqQuote(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rfq-quotes-request"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};
