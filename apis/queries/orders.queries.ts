import {
  useMutation,
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createEMIPayment,
  createOrder,
  createOrderUnAuth,
  createPaymentIntent,
  createPaymentLink,
  fetchOrderById,
  fetchOrderByIdUnAuth,
  fetchOrderBySellerId,
  fetchOrders,
  fetchOrdersBySellerId,
  preOrderCalculation,
  updateCancelReason,
  updateOrderShippingStatus,
  updateProductStatus,
  fetchVendorOrderStats,
  fetchVendorRecentOrders,
  updateOrderStatus,
  addOrderTracking,
} from "../requests/orders.requests";
import { APIResponseError } from "@/utils/types/common.types";

export const useOrders = (
  payload: {
    page: number;
    limit: number;
    term?: string;
    orderProductStatus?: string;
    startDate?: string;
    endDate?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["orders", payload],
    queryFn: async () => {
      const res: any = await fetchOrders(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

export const useInfiniteOrders = (
  payload: {
    page: number;
    limit: number;
    term?: string;
    orderProductStatus?: string;
    startDate?: string;
    endDate?: string;
  },
  enabled = true,
) =>
  useInfiniteQuery({
    queryKey: ["infinite-orders", payload],
    queryFn: async ({ pageParam }) => {
      const queries = payload;
      queries.page = pageParam ?? 1;
      const res: { data: { data: any; message: string; status: boolean } } =
        await fetchOrders({ ...payload, page: queries.page });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
      if (lastPage.data.length < payload.limit) return undefined;
      return lastPage?.page + 1 || 1;
    },
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
      queryClient.invalidateQueries({
        queryKey: ["cart-by-user"],
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
      queryClient.invalidateQueries({
        queryKey: ["cart-count-without-login"],
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

export const useCreatePaymentIntent = () => {
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {}
  >({
    mutationFn: async (payload) => {
      const res = await createPaymentIntent(payload);
      return res.data;
    },
    onSuccess: () => {
      console.log("Intent Created");
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useCreatePaymentLink = () => {
  return useMutation<
    { data: any; message: string; success: boolean },
    APIResponseError,
    {}
  >({
    mutationFn: async (payload) => {
      const res = await createPaymentLink(payload);
      return res.data;
    },
    onSuccess: () => {
      console.log("Intent Created");
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useCreateEMIPayment = () => {
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {}
  >({
    mutationFn: async (payload) => {
      const res = await createEMIPayment(payload);
      return res.data;
    },
    onSuccess: () => {
      console.log("Intent Created");
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useOrderById = (
  payload: {
    orderProductId: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["order-by-id", payload],
    queryFn: async () => {
      const res: {
        data: { data: any; message: string; status: boolean; otherData: any };
      } = await fetchOrderById(payload);
      return res.data;
    },
    enabled,
  });

export const useOrderBySellerId = (
  payload: {
    orderProductId: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["order-by-seller-id", payload],
    queryFn: async () => {
      const res: {
        data: { data: any; message: string; status: boolean; otherData: any };
      } = await fetchOrderBySellerId(payload);
      return res.data;
    },
    enabled,
  });

export const useOrdersBySellerId = (
  payload: {
    page: number;
    limit: number;
    term?: string;
    orderProductStatus?: string;
    startDate?: string;
    endDate?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["orders-by-seller-id", payload],
    queryFn: async () => {
      const res: any = await fetchOrdersBySellerId(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

export const useUpdateProductStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { orderProductId: number; status: string }
  >({
    mutationFn: async (payload) => {
      const res = await updateProductStatus(payload);
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

export const useUpdateCancelReason = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { orderProductId: number; cancelReason: string }
  >({
    mutationFn: async (payload) => {
      const res = await updateCancelReason(payload);
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

export const useUpdateOrderShippingStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {
      orderShippingId: number;
      receipt: string;
    }
  >({
    mutationFn: async (payload) => {
      const res = await updateOrderShippingStatus(payload);
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

export const usePreOrderCalculation = () => {
  return useMutation<
    { [key: string]: any },
    APIResponseError,
    { cartIds: number[]; serviceCartIds: number[], userAddressId: number }
  >({
    mutationFn: async (payload) => {
      const res = await preOrderCalculation(payload);
      return res.data;
    },
    onSuccess: () => {

    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useOrderByIdUnAuth = (
  payload: {
    orderId: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["order-by-id", payload],
    queryFn: async () => {
      const res: {
        data: { data: any; message: string; status: boolean; };
      } = await fetchOrderByIdUnAuth(payload);
      return res.data;
    },
    enabled,
  });

// Vendor Dashboard specific hooks
export const useVendorOrderStats = (enabled = true) =>
  useQuery({
    queryKey: ["vendor-order-stats"],
    queryFn: async () => {
      const res: any = await fetchVendorOrderStats();
      return res.data;
    },
    enabled,
  });

export const useVendorRecentOrders = (
  payload: {
    page: number;
    limit: number;
    status?: string;
    startDate?: string;
    endDate?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["vendor-recent-orders", payload],
    queryFn: async () => {
      const res: any = await fetchVendorRecentOrders(payload);
      return res.data;
    },
    enabled,
  });

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { orderProductId: number; status: string; notes?: string }
  >({
    mutationFn: async (payload) => {
      const res = await updateOrderStatus(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendor-order-stats"],
      });
      queryClient.invalidateQueries({
        queryKey: ["vendor-recent-orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["orders-by-seller-id"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useAddOrderTracking = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { orderProductId: number; trackingNumber: string; carrier: string; notes?: string }
  >({
    mutationFn: async (payload) => {
      const res = await addOrderTracking(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendor-recent-orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["orders-by-seller-id"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};
