/**
 * @fileoverview TanStack React Query hooks for master / reference data.
 *
 * Covers countries, brands, user roles (with CRUD + copy + pagination),
 * geolocation (current location, all countries, states by country,
 * cities by state), and role deletion.
 *
 * @module queries/masters
 */

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createBrand,
  fetchBrands,
  fetchCountries,
  fetchLocation,
  fetchAllCountry,
  fetchStatesByCountry,
  fetchCitiesByState,
  createUserRole,
  fetchuserRoles,
  updateUserRole,
  fetchuserRolesWithPagination,
  deleteMemberRole,
  copyUserRole
} from "../requests/masters.requests";
import { APIResponseError } from "@/utils/types/common.types";

/**
 * Query hook that fetches the list of supported countries
 * (typically for phone codes / dropdowns).
 *
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the countries list.
 *
 * @remarks
 * Query key: `["countries"]`
 * Endpoint: Delegated to `fetchCountries` in masters.requests.
 */
export const useCountries = (enabled = true) =>
  useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await fetchCountries();
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook that fetches product brands with optional search term,
 * `addedBy` user ID, and type filters.
 *
 * @param payload - Filter parameters.
 * @param payload.term - Optional search term for brand name.
 * @param payload.addedBy - Optional user ID filter (who added the brand).
 * @param payload.type - Optional brand type filter.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the list of brands.
 *
 * @remarks
 * Query key: `["brands", payload]`
 * Endpoint: Delegated to `fetchBrands` in masters.requests.
 */
export const useBrands = (payload: { term?: string, addedBy?: number, type?: string }, enabled = true) =>
  useQuery({
    queryKey: ["brands", payload],
    queryFn: async () => {
      const res = await fetchBrands(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook that fetches all user roles (unpaginated).
 *
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the list of user roles.
 *
 * @remarks
 * Query key: `["userRoles"]`
 * Endpoint: Delegated to `fetchuserRoles` in masters.requests.
 */
export const useUserRoles = (enabled = true) =>
  useQuery({
    queryKey: ["userRoles"],
    queryFn: async () => {
      const res = await fetchuserRoles();
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook that fetches user roles with pagination.
 *
 * @param payload - Pagination parameters.
 * @param payload.page - Page number (1-based).
 * @param payload.limit - Records per page.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with paginated user roles.
 *
 * @remarks
 * Query key: `["userRoles", payload]`
 * Endpoint: Delegated to `fetchuserRolesWithPagination` in masters.requests.
 */
export const useUserRolesWithPagination = (payload: { page: number; limit: number; }, enabled = true) =>
  useQuery({
    queryKey: ["userRoles", payload],
    queryFn: async () => {
      const res = await fetchuserRolesWithPagination(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Mutation hook to delete a member role by its ID.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ id: number }`
 * - **Invalidates**: `["userRoles"]` on success.
 * - Endpoint: Delegated to `deleteMemberRole` in masters.requests.
 */
export const useDeleteMemberRole = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { id: number }
  >({
    mutationFn: async (payload) => {
      const res = await deleteMemberRole(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userRoles"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
}



/**
 * Mutation hook to create a new product brand.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ brandName: string }`
 * - **Invalidates**: `["brands"]` on success.
 * - Endpoint: Delegated to `createBrand` in masters.requests.
 */
export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { brandName: string }
  >({
    mutationFn: async (payload) => {
      const res = await createBrand(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to create a new user role.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ userRoleName: string }`
 * - **Invalidates**: `["userRoles"]` on success.
 * - Endpoint: Delegated to `createUserRole` in masters.requests.
 */
export const useCreateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { userRoleName: string }
  >({
    mutationFn: async (payload) => {
      const res = await createUserRole(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userRoles"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to duplicate an existing user role.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ userRoleId: number }`
 * - **Invalidates**: `["userRoles"]` on success.
 * - Endpoint: Delegated to `copyUserRole` in masters.requests.
 */
export const useCopyUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { userRoleId: number }
  >({
    mutationFn: async (payload) => {
      const res = await copyUserRole(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userRoles"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to update an existing user role's name.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ userRoleName: string }`
 * - **Invalidates**: `["userRoles"]` on success.
 * - Endpoint: Delegated to `updateUserRole` in masters.requests.
 */
export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { userRoleName: string }
  >({
    mutationFn: async (payload) => {
      const res = await updateUserRole(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userRoles"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
}

/**
 * Query hook that fetches the current user's geolocation
 * (browser-detected or IP-based).
 *
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with location data.
 *
 * @remarks
 * Query key: `["location"]`
 * Endpoint: Delegated to `fetchLocation` in masters.requests.
 */
export const useLocation = (enabled = true) =>
  useQuery({
    queryKey: ["location"],
    queryFn: async () => {
      const res = await fetchLocation();
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook that fetches the complete list of all countries.
 *
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the full country list.
 *
 * @remarks
 * Query key: `["allCountry"]`
 * Endpoint: Delegated to `fetchAllCountry` in masters.requests.
 */
export const useAllCountries = (enabled = true) =>
  useQuery({
    queryKey: ["allCountry"],
    queryFn: async () => {
      const res = await fetchAllCountry();
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Mutation hook to fetch states / provinces for a given country.
 * Implemented as a mutation to allow imperative (on-demand) fetching.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ countryId: number }`
 * - **Invalidates**: `["stateByCountry"]` on success.
 * - Endpoint: Delegated to `fetchStatesByCountry` in masters.requests.
 */
export const useFetchStatesByCountry = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { countryId: number } // Payload Type
  >({
    mutationFn: async (payload) => {
      const res = await fetchStatesByCountry(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stateByCountry"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to fetch cities for a given state.
 * Implemented as a mutation to allow imperative (on-demand) fetching.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ stateId: number }`
 * - **Invalidates**: `["cityByState"]` on success.
 * - Endpoint: Delegated to `fetchCitiesByState` in masters.requests.
 */
export const useFetchCitiesByState = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { stateId: number } // Payload Type
  >({
    mutationFn: async (payload) => {
      const res = await fetchCitiesByState(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cityByState"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};



