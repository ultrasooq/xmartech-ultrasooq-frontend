import { useMutation } from "@tanstack/react-query";
import { APIResponseError } from "@/utils/types/common.types";
import {
  createFreelancerProfile,
  updateFreelancerBranch,
  updateFreelancerProfile,
} from "../requests/freelancer.requests";
import {
  IEditFreelancerBranchRequest,
  IEditFreelancerProfileRequest,
  IFreeLancer,
  IFreeLancerRequest,
} from "@/utils/types/user.types";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateFreelancerProfile = () => {
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
  });
};

export const useUpdateFreelancerProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IFreeLancer,
    APIResponseError,
    IEditFreelancerProfileRequest
  >({
    mutationFn: async (payload) => {
      const res = await updateFreelancerProfile(payload);
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

export const useUpdateFreelancerBranch = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IFreeLancer,
    APIResponseError,
    IEditFreelancerBranchRequest
  >({
    mutationFn: async (payload) => {
      const res = await updateFreelancerBranch(payload);
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
