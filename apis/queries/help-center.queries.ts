import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitQuery } from "../requests/help-center.requests";

export const useSubmitQuery = () => {
    const queryClient = useQueryClient();
    return useMutation<
      { data: any; message: string; status: boolean },
      APIResponseError,
      { email: string; query: string; }
    >({
      mutationFn: async (payload) => {
        const res = await submitQuery(payload);
        return res.data;
      },
      onSuccess: () => {
        
      },
      onError: (err: APIResponseError) => {
        console.log(err);
      },
    });
  }