import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addServiceToCart, createService, fetchAllServices, fetchServiceById, updateService } from "../requests/services.requests";

export const useCreateService = () => {
    const queryClient = useQueryClient();
    return useMutation<any>({
        mutationFn: async (payload: any) => {
            const res = await createService(payload);
            return res.data;
        },
        onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ["all-services"],
              });
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
export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation<any>({
      mutationFn: async (payload: any) => {
          const res = await updateService(payload);
          return res.data;
      },
      onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["all-services"],
            });
            queryClient.invalidateQueries({
              queryKey: ["service-by-id"],
            });
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
export const useGetAllServices = (payload: { page: number; limit: number; term?: string; sort?: string; brandIds?: string; priceMin?: number; priceMax?: number; userId?: number; categoryIds?: string; isOwner?: string; ownservice?:boolean }, enabled = true,) => useQuery({
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
  payload: { serviceid: string; userId?: number; sharedLinkId?: string },
  enabled = true,
) =>
  useQuery({
    queryKey: ["service-by-id", payload],
    queryFn: async () => {
      const res = await fetchServiceById(payload);
      return res.data;
    },
    enabled,
    gcTime: 0, // Disables caching by setting garbage collection time to 0
  });

  export const useAddServiceToCart = () => {
    const queryClient = useQueryClient();
    return useMutation<any, APIResponseError, number[]>({
      mutationFn: async (payload: any) => {
        const res = await addServiceToCart(payload);
        return res.data;
      },
      onSuccess: () => {
        
      },
      onError: (err: APIResponseError) => {
        console.log(err);
      },
    });
  };