import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addMultiplePriceForProduct,
  createProduct,
  deleteProduct,
  fetchAllProducts,
  fetchProductById,
  fetchProducts,
  fetchRelatedProducts,
  fetchSameBrandProducts,
  getAllManagedProducts,
  getOneProductBySellerId,
  updateMultipleProductPrice,
  updateProduct,
} from "../requests/product.request";
import {
  ICreateProduct,
  ICreateProductRequest,
  IDeleteProduct,
  IDeleteProductRequest,
  IUpdateProduct,
  IUpdateProductRequest,
} from "@/utils/types/product.types";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<ICreateProduct, APIResponseError, ICreateProductRequest>({
    mutationFn: async (payload) => {
      const res = await createProduct(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["existing-products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["rfq-products"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useProducts = (
  payload: {
    userId: string;
    page: number;
    limit: number;
    term?: string;
    status?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["products", payload],
    queryFn: async () => {
      const res = await fetchProducts(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

export const useProductById = (
  payload: { productId: string; userId?: number },
  enabled = true,
) =>
  useQuery({
    queryKey: ["product-by-id", payload],
    queryFn: async () => {
      const res = await fetchProductById(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<IDeleteProduct, APIResponseError, IDeleteProductRequest>({
    mutationFn: async (payload) => {
      const res = await deleteProduct(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["existing-products"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<IUpdateProduct, APIResponseError, IUpdateProductRequest>({
    mutationFn: async (payload) => {
      const res = await updateProduct(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["existing-products"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useAllProducts = (
  payload: {
    page: number;
    limit: number;
    term?: string;
    sort?: string;
    brandIds?: string;
    priceMin?: number;
    priceMax?: number;
    userId?: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["existing-products", payload],
    queryFn: async () => {
      const res = await fetchAllProducts(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

export const useSameBrandProducts = (
  payload: {
    page: number;
    limit: number;
    brandIds: string;
    userId?: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["same-brand-products", payload],
    queryFn: async () => {
      const res = await fetchSameBrandProducts(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

export const useRelatedProducts = (
  payload: {
    page: number;
    limit: number;
    tagIds: string;
    userId?: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["related-products", payload],
    queryFn: async () => {
      const res = await fetchRelatedProducts(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

export const useAddMultiplePriceForProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, APIResponseError, any>({
    mutationFn: async (payload) => {
      const res = await addMultiplePriceForProduct(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["existing-products"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useUpdateMultipleProductPrice = () => {
  const queryClient = useQueryClient();
  return useMutation<any, APIResponseError, any>({
    mutationFn: async (payload) => {
      const res = await updateMultipleProductPrice(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["managed-products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["existing-products"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useAllManagedProducts = (
  payload: {
    page: number;
    limit: number;
    term?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["managed-products", payload],
    queryFn: async () => {
      const res = await getAllManagedProducts(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

export const useOneProductBySellerId = (
  payload: {
    productId: string;
    userId: string;
    sellerId: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["product-by-seller", payload],
    queryFn: async () => {
      const res = await getOneProductBySellerId(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });
