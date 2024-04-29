import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRfqProduct, fetchRfqProducts } from "../requests/rfq.requests";

export const useRfqProducts = (
  payload: {
    page: number;
    limit: number;
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
