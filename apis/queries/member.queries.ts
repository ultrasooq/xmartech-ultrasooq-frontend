import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { APIResponseError } from "@/utils/types/common.types";
import { createMember, fetchAllMembers } from "../requests/member.requests";

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

  export const useAllMembers  = (payload: { page: number; limit: number;},enabled = true) =>
      useQuery({
        queryKey: ["members", payload],
        queryFn: async () => {
          const res = await fetchAllMembers(payload);
          return res.data;
        },
        // onError: (err: APIResponseError) => {
        //   console.log(err);
        // },
        enabled,
  });