import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { APIResponseError } from "@/utils/types/common.types";
import { createMember } from "../requests/member.requests";

export const useCreateMember = () => {
  const queryClient = useQueryClient();
    return useMutation<
      { data: any; message: string; status: boolean },
      APIResponseError
    >({
      mutationFn: async (payload) => {
        const res = await createMember(payload);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["members"],
        });
      },
      onError: (err: APIResponseError) => {
        console.log(err);
      },
    });
  };