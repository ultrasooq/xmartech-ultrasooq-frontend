import { APIResponseError } from "@/utils/types/common.types";
import { useMutation } from "@tanstack/react-query";
import { updateUserProfile } from "../requests/user.requests";

export const useUpdateProfile = () => useMutation({
    mutationFn: async payload => {
        const res = await updateUserProfile(payload);
        return res.data;
    },
    onSuccess: () => {},
    onError: (err:APIResponseError) => {
      console.log(err);
    },
  })