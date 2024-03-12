import { useMutation } from "@tanstack/react-query";
import { APIResponseError } from "@/utils/types/common.types";
import { createFreelancerProfile } from "../requests/freelancer.requests";
import { IFreeLancer, IFreeLancerRequest } from "@/utils/types/user.types";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateFreelancerProfile = () =>{
  const queryClient = useQueryClient();
  return useMutation<IFreeLancer, APIResponseError, IFreeLancerRequest>({
    mutationFn: async (payload) => {
      const res = await createFreelancerProfile(payload);
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
  })};
