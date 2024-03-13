import { useMutation } from "@tanstack/react-query";
import { APIResponseError } from "@/utils/types/common.types";
import { createCompanyProfile } from "../requests/company.requests";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateCompanyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await createCompanyProfile(payload);
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
