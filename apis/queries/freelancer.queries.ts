/**
 * @fileoverview TanStack React Query hooks for freelancer profile
 * management.
 *
 * Provides mutation hooks to create, update, and toggle the active
 * status of freelancer profiles and their branches. All mutations
 * invalidate `["me"]` so the current user's data stays in sync.
 *
 * @module queries/freelancer
 */

import { useMutation } from "@tanstack/react-query";
import { APIResponseError } from "@/utils/types/common.types";
import {
  createFreelancerProfile,
  updateFreelancerActiveStatus,
  updateFreelancerBranch,
  updateFreelancerProfile,
} from "../requests/freelancer.requests";
import {
  IEditFreelancerProfileRequest,
  IFreelancer,
  IFreelancerRequest,
  IFreelancerStatus,
  IFreelancerStatusRequest,
  TUnionEditFreelancerBranchRequest,
} from "@/utils/types/user.types";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Mutation hook to create a new freelancer profile for the
 * authenticated user.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link IFreelancerRequest}
 * - **Response**: {@link IFreelancer}
 * - **Invalidates**: `["me"]` on success.
 * - Endpoint: Delegated to `createFreelancerProfile` in freelancer.requests.
 */
export const useCreateFreelancerProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<IFreelancer, APIResponseError, IFreelancerRequest>({
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
    },
  });
};

/**
 * Mutation hook to update the authenticated user's freelancer profile.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link IEditFreelancerProfileRequest}
 * - **Response**: {@link IFreelancer}
 * - **Invalidates**: `["me"]` on success.
 * - Endpoint: Delegated to `updateFreelancerProfile` in freelancer.requests.
 */
export const useUpdateFreelancerProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IFreelancer,
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
    },
  });
};

/**
 * Mutation hook to update a freelancer branch (location / details).
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link TUnionEditFreelancerBranchRequest}
 * - **Response**: {@link IFreelancer}
 * - **Invalidates**: `["me"]` on success.
 * - Endpoint: Delegated to `updateFreelancerBranch` in freelancer.requests.
 */
export const useUpdateFreelancerBranch = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IFreelancer,
    APIResponseError,
    TUnionEditFreelancerBranchRequest
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
    },
  });
};

/**
 * Mutation hook to toggle the freelancer's active / inactive status.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link IFreelancerStatusRequest}
 * - **Response**: {@link IFreelancerStatus}
 * - **Invalidates**: `["me"]` on success.
 * - Endpoint: Delegated to `updateFreelancerActiveStatus` in freelancer.requests.
 */
export const useUpdatFreelancerActiveStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IFreelancerStatus,
    APIResponseError,
    IFreelancerStatusRequest
  >({
    mutationFn: async (payload) => {
      const res = await updateFreelancerActiveStatus(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};
