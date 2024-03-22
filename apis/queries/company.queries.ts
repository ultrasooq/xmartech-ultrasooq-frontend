import { useMutation } from "@tanstack/react-query";
import { APIResponseError } from "@/utils/types/common.types";
import {
  createCompanyBranch,
  createCompanyProfile,
  updateCompanyBranch,
  updateCompanyProfile,
} from "../requests/company.requests";
import { useQueryClient } from "@tanstack/react-query";
import {
  ICompany,
  IEditCompanyBranch,
  IEditCompanyBranchRequest,
  IEditCompanyProfile,
  IEditCompanyProfileRequest,
} from "@/utils/types/user.types";

export const useCreateCompanyProfile = () => {
  const queryClient = useQueryClient();

  //TODO: add types definition
  return useMutation<ICompany, APIResponseError, {}>({
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

export const useUpdateCompanyProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IEditCompanyProfile,
    APIResponseError,
    IEditCompanyProfileRequest
  >({
    mutationFn: async (payload) => {
      const res = await updateCompanyProfile(payload);
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

export const useUpdateCompanyBranch = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IEditCompanyBranch,
    APIResponseError,
    IEditCompanyBranchRequest
  >({
    mutationFn: async (payload) => {
      const res = await updateCompanyBranch(payload);
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

export const useCreateCompanyBranch = () => {
  const queryClient = useQueryClient();
  return useMutation<{}, APIResponseError, {}>({
    mutationFn: async (payload) => {
      const res = await createCompanyBranch(payload);
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
