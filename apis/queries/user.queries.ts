import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchMe, updateUserProfile } from "../requests/user.requests";
import { IBuyer, IBuyerRequest } from "@/utils/types/user.types";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<IBuyer, APIResponseError, IBuyerRequest>({
    mutationFn: async (payload) => {
      const res = await updateUserProfile(payload);
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

export const useMe = (enabled = true) =>
  useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await fetchMe();
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });
