import { useMutation } from "@tanstack/react-query";
import { APIResponseError } from "@/utils/types/common.types";
import { createFreelancerProfile } from "../requests/freelancer.requests";
import { IFreeLancer, IFreeLancerRequest } from "@/utils/types/user.types";

export const useCreateFreelancerProfile = () =>
  useMutation<IFreeLancer, APIResponseError, IFreeLancerRequest>({
    mutationFn: async (payload) => {
      const res = await createFreelancerProfile(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
