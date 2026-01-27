/**
 * @fileoverview TanStack React Query hooks for company profile and
 * branch management.
 *
 * Covers creating / updating company profiles and branches.
 * Mutations invalidate the `["me"]` and `["unique-user"]` query keys
 * so that the current user's profile data stays fresh.
 *
 * @module queries/company
 */

import { useMutation, useQuery } from "@tanstack/react-query";
import { APIResponseError } from "@/utils/types/common.types";
import {
  createCompanyBranch,
  createCompanyProfile,
  fetchCompanyBranchById,
  updateCompanyBranch,
  updateCompanyProfile,
} from "../requests/company.requests";
import { useQueryClient } from "@tanstack/react-query";
import {
  ICompany,
  ICreateCompanyBranch,
  ICreateCompanyBranchRequest,
  IEditCompanyBranch,
  IEditCompanyBranchRequest,
  IEditCompanyProfile,
  IEditCompanyProfileRequest,
} from "@/utils/types/user.types";

/**
 * Mutation hook to create a new company profile for the current user.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: Generic object (TODO: add typed definition).
 * - **Response**: {@link ICompany}
 * - **Invalidates**: `["me"]`, `["unique-user"]` on success.
 * - Endpoint: Delegated to `createCompanyProfile` in company.requests.
 */
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
      queryClient.invalidateQueries({
        queryKey: ["unique-user"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to update an existing company profile.
 * On success it removes the cached `["me"]` and `["unique-user"]`
 * queries and force-refetches them.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link IEditCompanyProfileRequest}
 * - **Response**: {@link IEditCompanyProfile}
 * - **Invalidates / refetches**: `["me"]`, `["unique-user"]` on success.
 * - Endpoint: Delegated to `updateCompanyProfile` in company.requests.
 */
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
      // Remove queries from cache completely
      queryClient.removeQueries({ queryKey: ["me"] });
      queryClient.removeQueries({ queryKey: ["unique-user"] });

      // Then invalidate and force refetch
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["unique-user"] });

      // Force immediate refetch
      queryClient.refetchQueries({ queryKey: ["me"] });
      queryClient.refetchQueries({ queryKey: ["unique-user"] });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to update an existing company branch.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link IEditCompanyBranchRequest}
 * - **Response**: {@link IEditCompanyBranch}
 * - **Invalidates**: `["me"]`, `["unique-user"]` on success.
 * - Endpoint: Delegated to `updateCompanyBranch` in company.requests.
 */
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
      queryClient.invalidateQueries({
        queryKey: ["unique-user"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to create a new company branch.
 * On success, removes and force-refetches the `["me"]` and
 * `["unique-user"]` queries.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link ICreateCompanyBranchRequest}
 * - **Response**: {@link ICreateCompanyBranch}
 * - **Invalidates / refetches**: `["me"]`, `["unique-user"]` on success.
 * - Endpoint: Delegated to `createCompanyBranch` in company.requests.
 */
export const useCreateCompanyBranch = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ICreateCompanyBranch,
    APIResponseError,
    ICreateCompanyBranchRequest
  >({
    mutationFn: async (payload) => {
      const res = await createCompanyBranch(payload);
      return res.data;
    },
    onSuccess: () => {
      // Remove queries from cache completely
      queryClient.removeQueries({ queryKey: ["me"] });
      queryClient.removeQueries({ queryKey: ["unique-user"] });

      // Then invalidate and force refetch
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      queryClient.invalidateQueries({
        queryKey: ["unique-user"],
      });

      // Force immediate refetch
      queryClient.refetchQueries({ queryKey: ["me"] });
      queryClient.refetchQueries({ queryKey: ["unique-user"] });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Query hook that fetches a single company branch by its ID.
 *
 * @param id - The unique branch identifier.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the branch details.
 *
 * @remarks
 * Query key: `["branch-by-id", id]`
 * Endpoint: Delegated to `fetchCompanyBranchById` in company.requests.
 */
export const useFetchCompanyBranchById = (id: string, enabled = true) =>
  useQuery({
    queryKey: ["branch-by-id", id],
    queryFn: async () => {
      const res = await fetchCompanyBranchById({ branchId: id });
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });
