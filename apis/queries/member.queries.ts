/**
 * @fileoverview TanStack React Query hooks for team member and
 * permission management.
 *
 * Provides CRUD hooks for members, permission queries, and
 * permission assignment / update operations.
 *
 * @module queries/member
 */

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { APIResponseError } from "@/utils/types/common.types";
import { createMember, fetchAllMembers, fetchPermissions, updateMember, setPermission, fetchPermissionByRoleId, updatePermission } from "../requests/member.requests";

/**
 * Mutation hook to create a new team member.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: Untyped (passed through to `createMember`).
 * - **Response**: `{ data: any; message: string; status: boolean }`
 * - **Invalidates**: `["members"]` on success.
 * - Endpoint: Delegated to `createMember` in member.requests.
 */
export const useCreateMember = () => {
  const queryClient = useQueryClient();
    return useMutation<
      { data: any; message: string; status: boolean },
      APIResponseError
    >({
      mutationFn: async (payload) => {
        const res = await createMember(payload);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["members"],
        });
      },
      onError: (err: APIResponseError) => {
      },
    });
  };

  /**
   * Mutation hook to update an existing team member.
   *
   * @returns A `useMutation` result.
   *
   * @remarks
   * - **Payload**: Untyped (passed through to `updateMember`).
   * - **Response**: `{ data: any; message: string; status: boolean }`
   * - **Invalidates**: `["members"]` on success.
   * - Endpoint: Delegated to `updateMember` in member.requests.
   */
  export const useUpdateMember = () => {
    const queryClient = useQueryClient();
      return useMutation<
        { data: any; message: string; status: boolean },
        APIResponseError
      >({
        mutationFn: async (payload) => {
          const res = await updateMember(payload);
          return res.data;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["members"],
          });
        },
        onError: (err: APIResponseError) => {
        },
      });
    };

  /**
   * Query hook that fetches all team members with pagination.
   *
   * @param payload - Pagination parameters.
   * @param payload.page - Page number (1-based).
   * @param payload.limit - Records per page.
   * @param enabled - Whether the query should execute. Defaults to `true`.
   * @returns A `useQuery` result with paginated member data.
   *
   * @remarks
   * Query key: `["members", payload]`
   * Endpoint: Delegated to `fetchAllMembers` in member.requests.
   */
  export const useAllMembers  = (payload: { page: number; limit: number;},enabled = true) =>
      useQuery({
        queryKey: ["members", payload],
        queryFn: async () => {
          const res = await fetchAllMembers(payload);
          return res.data;
        },
        // onError: (err: APIResponseError) => {
        //   console.log(err);
        // },
        enabled,
  });

  /**
   * Query hook that fetches all available permissions.
   *
   * @param enabled - Whether the query should execute. Defaults to `true`.
   * @returns A `useQuery` result with the permissions list.
   *
   * @remarks
   * Query key: `["permissions"]`
   * Endpoint: Delegated to `fetchPermissions` in member.requests.
   */
  export const usePermissions = (enabled = true) =>
    useQuery({
      queryKey: ["permissions"],
      queryFn: async () => {
        const res = await fetchPermissions();
        return res.data;
      },
      // onError: (err: APIResponseError) => {
      //   console.log(err);
      // },
      enabled,
    });

    /**
     * Mutation hook to assign a set of permissions to a role.
     *
     * @returns A `useMutation` result.
     *
     * @remarks
     * - **Payload**: Untyped (passed through to `setPermission`).
     * - **Response**: `{ data: any; message: string; status: boolean }`
     * - **Invalidates**: `["setPermission"]` on success.
     * - Endpoint: Delegated to `setPermission` in member.requests.
     */
    export const useSetPermission = () => {
      const queryClient = useQueryClient();
      return useMutation<
        { data: any; message: string; status: boolean },
        APIResponseError
      >({
        mutationFn: async (payload) => {
          const res = await setPermission(payload);
          return res.data;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["setPermission"],
          });
        },
        onError: (err: APIResponseError) => {
        },
      });
    };

    /**
     * Query hook that fetches permissions assigned to a specific user role.
     *
     * @param payload - Role identification.
     * @param payload.userRoleId - The numeric user role ID.
     * @param enabled - Whether the query should execute. Defaults to `true`.
     * @returns A `useQuery` result with the role's permissions.
     *
     * @remarks
     * Query key: `["setPermission", payload]`
     * Endpoint: Delegated to `fetchPermissionByRoleId` in member.requests.
     */
    export const useGetPermission = (payload: { userRoleId: number},enabled = true) =>
          useQuery({
            queryKey: ["setPermission", payload],
            queryFn: async () => {
              const res = await fetchPermissionByRoleId(payload);
              return res.data;
            },
            // onError: (err: APIResponseError) => {
            //   console.log(err);
            // },
            enabled,
          });

  /**
   * Mutation hook to update existing permissions for a role.
   *
   * @returns A `useMutation` result.
   *
   * @remarks
   * - **Payload**: Untyped (passed through to `updatePermission`).
   * - **Response**: `{ data: any; message: string; status: boolean }`
   * - **Invalidates**: `["setPermission"]` on success.
   * - Endpoint: Delegated to `updatePermission` in member.requests.
   */
  export const useUpdatePermission = () => {
    const queryClient = useQueryClient();
    return useMutation<
      { data: any; message: string; status: boolean },
      APIResponseError
    >({
      mutationFn: async (payload) => {
        const res = await updatePermission(payload);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["setPermission"],
        });
      },
      onError: (err: APIResponseError) => {
      },
    });
  };


