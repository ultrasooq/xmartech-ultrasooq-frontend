import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createService, fetchAllServices, fetchServiceById } from "../requests/services.requests";

export const useCreateService = () => {
    const queryClient = useQueryClient();
    return useMutation<any>({
        mutationFn: async (payload: any) => {
            const res = await createService(payload);
            return res.data;
        },
        onSuccess: () => {
            //   queryClient.invalidateQueries({
            //     queryKey: ["products"],
            //   });
            //   queryClient.invalidateQueries({
            //     queryKey: ["managed-products"],
            //   });
            //   queryClient.invalidateQueries({
            //     queryKey: ["existing-products"],
            //   });
            //   queryClient.invalidateQueries({
            //     queryKey: ["rfq-products"],
            //   });
        },
        onError: (err: any) => {
            console.log(err);
        },
    });
};

export const useGetAllServices = (payload: { page: number; limit: number; term?: string; sort?: string; brandIds?: string; priceMin?: number; priceMax?: number; userId?: number; categoryIds?: string; isOwner?: string; }, enabled = true,) => useQuery({
  queryKey: ["all-services", payload],
  queryFn: async () => {
    const res = await fetchAllServices(payload);
    return res.data;
  },
  // onError: (err: APIResponseError) => {
  //   console.log(err);
  // },
  enabled,
});

export const useServiceById = (
  payload: { serviceid: string; userId?: number, sharedLinkId?: string },
  enabled = true,
) =>
  useQuery({
    queryKey: ["service-by-id", payload],
    queryFn: async () => {
      const res = await fetchServiceById(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });