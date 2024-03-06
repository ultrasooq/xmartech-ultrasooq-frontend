import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchMe, updateUserProfile } from "../requests/user.requests";

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: async (payload) => {
      const res = await updateUserProfile(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });

export const useMe = (enabled = true) =>
  useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await fetchMe();
      return res.data;
    },
    // onSuccess: () => {},
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });
