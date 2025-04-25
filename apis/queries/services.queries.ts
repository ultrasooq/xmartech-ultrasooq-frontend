import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createService } from "../requests/services.requests";

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