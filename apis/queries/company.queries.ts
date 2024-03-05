import { useMutation } from "@tanstack/react-query";
import { APIResponseError } from "@/utils/types/common.types";
import { createCompanyProfile } from "../requests/company.requests";

export const useCreateCompanyProfile = () => useMutation({
    mutationFn: async payload => {
        const res = await createCompanyProfile(payload);
        return res.data;
    },
    onSuccess: () => {},
    onError: (err:APIResponseError) => {
      console.log(err);
    },
  })