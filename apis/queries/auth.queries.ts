/**
 * @fileoverview TanStack React Query hooks for authentication and
 * multi-account management.
 *
 * Covers registration, login (including social login), OTP verification,
 * password reset flows, email change flows, and multi-account
 * operations (list / create / switch / current account).
 *
 * @module queries/auth
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changeEmail,
  changePassword,
  emailChangeVerify,
  forgotPassword,
  login,
  passwordResetVerify,
  register,
  resendOtp,
  resetPassword,
  socialLogin,
  verifyOtp,
  myAccounts,
  createAccount,
  switchAccount,
  currentAccount,
} from "../requests/auth.requests";
import { APIResponseError } from "@/utils/types/common.types";
import { getCookie, setCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import {
  IChangeEmail,
  IChangeEmailRequest,
  IChangeEmailVerify,
  IChangeEmailVerifyRequest,
  IChangePassword,
  IChangePasswordRequest,
  IForgotPassword,
  IForgotPasswordRequest,
  ILogin,
  ILoginRequest,
  IPasswordResetVerify,
  IPasswordResetVerifyOtpRequest,
  IRegister,
  IRegisterRequest,
  IResendOtp,
  IResendOtpRequest,
  IResetPassword,
  IResetPasswordRequest,
  IVerifyOtp,
  IVerifyOtpRequest,
  IMyAccounts,
  ICurrentAccount,
  ICreateAccount,
  ICreateAccountRequest,
  ISwitchAccount,
  ISwitchAccountRequest,
} from "@/utils/types/auth.types";

/**
 * Mutation hook for new user registration.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link IRegisterRequest}
 * - **Response**: {@link IRegister}
 * - **Error type**: {@link APIResponseError}
 * - Endpoint: Delegated to `register` in auth.requests.
 */
export const useRegister = () =>
  useMutation<IRegister, APIResponseError, IRegisterRequest>({
    mutationFn: async (payload) => {
      const res = await register(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
    },
  });

/**
 * Mutation hook for verifying the OTP code sent during registration
 * or other verification flows.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link IVerifyOtpRequest}
 * - **Response**: {@link IVerifyOtp}
 * - Endpoint: Delegated to `verifyOtp` in auth.requests.
 */
export const useVerifyOtp = () =>
  useMutation<IVerifyOtp, APIResponseError, IVerifyOtpRequest>({
    mutationFn: async (payload) => {
      const res = await verifyOtp(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
    },
  });

/**
 * Mutation hook to request a new OTP code to be resent.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link IResendOtpRequest}
 * - **Response**: {@link IResendOtp}
 * - Endpoint: Delegated to `resendOtp` in auth.requests.
 */
export const useResendOtp = () =>
  useMutation<IResendOtp, APIResponseError, IResendOtpRequest>({
    mutationFn: async (payload) => {
      const res = await resendOtp(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
    },
  });

/**
 * Mutation hook for user login with email and password.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link ILoginRequest}
 * - **Response**: {@link ILogin}
 * - Endpoint: Delegated to `login` in auth.requests.
 */
export const useLogin = () =>
  useMutation<ILogin, APIResponseError, ILoginRequest>({
    mutationFn: async (payload) => {
      const res = await login(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
    },
  });

/**
 * Mutation hook to initiate a forgot-password flow by requesting a
 * reset link / OTP.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link IForgotPasswordRequest}
 * - **Response**: {@link IForgotPassword}
 * - Endpoint: Delegated to `forgotPassword` in auth.requests.
 */
export const useForgotPassword = () =>
  useMutation<IForgotPassword, APIResponseError, IForgotPasswordRequest>({
    mutationFn: async (payload) => {
      const res = await forgotPassword(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
    },
  });

/**
 * Mutation hook to reset the user password after completing the
 * forgot-password verification step.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link IResetPasswordRequest}
 * - **Response**: {@link IResetPassword}
 * - Endpoint: Delegated to `resetPassword` in auth.requests.
 */
export const useResetPassword = () =>
  useMutation<IResetPassword, APIResponseError, IResetPasswordRequest>({
    mutationFn: async (payload) => {
      const res = await resetPassword(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
    },
  });

/**
 * Mutation hook to verify the OTP during the password-reset flow.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link IPasswordResetVerifyOtpRequest}
 * - **Response**: {@link IPasswordResetVerify}
 * - Endpoint: Delegated to `passwordResetVerify` in auth.requests.
 */
export const usePasswordResetVerify = () =>
  useMutation<
    IPasswordResetVerify,
    APIResponseError,
    IPasswordResetVerifyOtpRequest
  >({
    mutationFn: async (payload) => {
      const res = await passwordResetVerify(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
    },
  });

/**
 * Mutation hook to change the authenticated user's password from
 * account settings (requires current password).
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link IChangePasswordRequest}
 * - **Response**: {@link IChangePassword}
 * - Endpoint: Delegated to `changePassword` in auth.requests.
 */
export const useChangePassword = () =>
  useMutation<IChangePassword, APIResponseError, IChangePasswordRequest>({
    mutationFn: async (payload) => {
      const res = await changePassword(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
    },
  });

/**
 * Mutation hook to initiate an email change for the authenticated user.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link IChangeEmailRequest}
 * - **Response**: {@link IChangeEmail}
 * - Endpoint: Delegated to `changeEmail` in auth.requests.
 */
export const useChangeEmail = () =>
  useMutation<IChangeEmail, APIResponseError, IChangeEmailRequest>({
    mutationFn: async (payload) => {
      const res = await changeEmail(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
    },
  });

/**
 * Mutation hook to verify the OTP for the email-change flow.
 * On success, invalidates the `["me"]` query key to refresh
 * the current user profile.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link IChangeEmailVerifyRequest}
 * - **Response**: {@link IChangeEmailVerify}
 * - **Invalidates**: `["me"]` on success.
 * - Endpoint: Delegated to `emailChangeVerify` in auth.requests.
 */
export const useChangeEmailVerify = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IChangeEmailVerify,
    APIResponseError,
    IChangeEmailVerifyRequest
  >({
    mutationFn: async (payload) => {
      const res = await emailChangeVerify(payload);
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
 * Mutation hook for social login (e.g., Google, Facebook).
 * Returns an access token alongside user data on success.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ firstName, lastName, email, tradeRole, loginType }`
 * - **Response**: `{ accessToken: string; data: any; message: string; status: boolean }`
 * - Endpoint: Delegated to `socialLogin` in auth.requests.
 */
export const useSocialLogin = () =>
  useMutation<
    {
      accessToken: string;
      data: any;
      message: string;
      status: boolean;
    },
    APIResponseError,
    {
      firstName: string;
      lastName: string;
      email: string;
      tradeRole: "BUYER";
      loginType: string;
    }
  >({
    mutationFn: async (payload) => {
      const res = await socialLogin(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
    },
  });

// Multi-Account System Queries

/**
 * Query hook that retrieves all accounts associated with the
 * authenticated user's multi-account system.
 *
 * @returns A `useQuery` result whose `data` is {@link IMyAccounts}.
 *
 * @remarks
 * - Query key: `["myAccounts"]`
 * - **Enabled**: only when the auth token cookie is present.
 * - **Cache policy**: `staleTime: 0` and `gcTime: 0` -- data is never
 *   cached and always re-fetched.
 * - Endpoint: Delegated to `myAccounts` in auth.requests.
 */
export const useMyAccounts = () => {
  return useQuery<IMyAccounts, APIResponseError>({
    queryKey: ["myAccounts"],
    queryFn: async () => {
      if (process.env.NODE_ENV === "development") {
      }
      const res = await myAccounts();
      if (process.env.NODE_ENV === "development") {
      }
      return res.data;
    },
    enabled: !!getCookie(PUREMOON_TOKEN_KEY),
    staleTime: 0, // Data is always considered stale
    gcTime: 0, // Don't cache the data (formerly cacheTime)
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: false, // Disable automatic refetching
  });
};

/**
 * Query hook that retrieves the currently active account within the
 * multi-account system.
 *
 * @returns A `useQuery` result whose `data` is {@link ICurrentAccount}.
 *
 * @remarks
 * - Query key: `["currentAccount"]`
 * - **Enabled**: only when the auth token cookie is present.
 * - **Cache policy**: `staleTime: 0` and `gcTime: 0`.
 * - Endpoint: Delegated to `currentAccount` in auth.requests.
 */
export const useCurrentAccount = () => {
  return useQuery<ICurrentAccount, APIResponseError>({
    queryKey: ["currentAccount"],
    queryFn: async () => {
      const res = await currentAccount();
      return res.data;
    },
    enabled: !!getCookie(PUREMOON_TOKEN_KEY),
    staleTime: 0, // Data is always considered stale
    gcTime: 0, // Don't cache the data
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

/**
 * Mutation hook to create a new account within the multi-account
 * system. On success it resets all cached queries and force-refetches
 * account-related data.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link ICreateAccountRequest}
 * - **Response**: {@link ICreateAccount}
 * - **Invalidates / resets**: All queries, then specifically
 *   `["myAccounts"]` and `["currentAccount"]`.
 * - Endpoint: Delegated to `createAccount` in auth.requests.
 */
export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<ICreateAccount, APIResponseError, ICreateAccountRequest>({
    mutationFn: (payload) => createAccount(payload).then((res) => res.data),
    onSuccess: (data) => {

      // Reset all queries to ensure complete cache clearing
      // This ensures fresh data is fetched after account creation
      queryClient.resetQueries();

      // Then invalidate auth-related queries specifically
      queryClient.invalidateQueries({ queryKey: ["myAccounts"] });
      queryClient.invalidateQueries({ queryKey: ["currentAccount"] });

      // Force refetch for auth queries
      queryClient.refetchQueries({ queryKey: ["myAccounts"] });
      queryClient.refetchQueries({ queryKey: ["currentAccount"] });
    },
    onError: (error) => {
    },
  });
};

/**
 * Mutation hook to switch between accounts in the multi-account
 * system. On success it persists the new access token in the cookie,
 * resets all cached queries, and force-refetches auth-related data.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link ISwitchAccountRequest}
 * - **Response**: {@link ISwitchAccount}
 * - **Side effects on success**:
 *   1. Updates the auth cookie with `data.data.accessToken`.
 *   2. Resets all queries (to clear stale per-user cached data).
 *   3. Invalidates and refetches `["myAccounts"]`, `["currentAccount"]`,
 *      and `["me"]`.
 * - Endpoint: Delegated to `switchAccount` in auth.requests.
 */
export const useSwitchAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<ISwitchAccount, APIResponseError, ISwitchAccountRequest>({
    mutationFn: (payload) => switchAccount(payload).then((res) => res.data),
    onSuccess: (data) => {
      // Update the token in cookies
      setCookie(PUREMOON_TOKEN_KEY, data.data.accessToken);

      // Reset all queries to ensure complete cache clearing
      // This is necessary because product queries have different payloads (different userIds)
      // and we need to ensure all cached data is cleared when switching accounts
      queryClient.resetQueries();

      // Then invalidate auth-related queries specifically
      queryClient.invalidateQueries({ queryKey: ["myAccounts"] });
      queryClient.invalidateQueries({ queryKey: ["currentAccount"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });

      // Force immediate refetch for auth queries
      queryClient.refetchQueries({ queryKey: ["myAccounts"] });
      queryClient.refetchQueries({ queryKey: ["currentAccount"] });
      queryClient.refetchQueries({ queryKey: ["me"] });
    },
  });
};
