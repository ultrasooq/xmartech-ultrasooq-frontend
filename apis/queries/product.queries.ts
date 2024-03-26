import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../requests/product.request";
import {
  ICreateProduct,
  ICreateProductRequest,
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
        queryKey: ["me"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};
