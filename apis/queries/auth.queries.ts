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

export const useRegister = () =>
  useMutation<IRegister, APIResponseError, IRegisterRequest>({
    mutationFn: async (payload) => {
      const res = await register(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });

export const useVerifyOtp = () =>
  useMutation<IVerifyOtp, APIResponseError, IVerifyOtpRequest>({
    mutationFn: async (payload) => {
      const res = await verifyOtp(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });

export const useResendOtp = () =>
  useMutation<IResendOtp, APIResponseError, IResendOtpRequest>({
    mutationFn: async (payload) => {
      const res = await resendOtp(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });

export const useLogin = () =>
  useMutation<ILogin, APIResponseError, ILoginRequest>({
    mutationFn: async (payload) => {
      const res = await login(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });

export const useForgotPassword = () =>
  useMutation<IForgotPassword, APIResponseError, IForgotPasswordRequest>({
    mutationFn: async (payload) => {
      const res = await forgotPassword(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });

export const useResetPassword = () =>
  useMutation<IResetPassword, APIResponseError, IResetPasswordRequest>({
    mutationFn: async (payload) => {
      const res = await resetPassword(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });

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
      console.log(err);
    },
  });

export const useChangePassword = () =>
  useMutation<IChangePassword, APIResponseError, IChangePasswordRequest>({
    mutationFn: async (payload) => {
      const res = await changePassword(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });

export const useChangeEmail = () =>
  useMutation<IChangeEmail, APIResponseError, IChangeEmailRequest>({
    mutationFn: async (payload) => {
      const res = await changeEmail(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });

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
      console.log(err);
    },
  });
};

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
      console.log(err);
    },
  });

// Multi-Account System Queries
export const useMyAccounts = () => {
  return useQuery<IMyAccounts, APIResponseError>({
    queryKey: ["myAccounts"],
    queryFn: async () => {
      if (process.env.NODE_ENV === "development") {
        console.log("useMyAccounts - fetching data");
      }
      const res = await myAccounts();
      if (process.env.NODE_ENV === "development") {
        console.log("useMyAccounts - received data:", res.data);
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

export const useCurrentAccount = () => {
  return useQuery<ICurrentAccount, APIResponseError>({
    queryKey: ["currentAccount"],
    queryFn: async () => {
      console.log("useCurrentAccount - fetching data");
      const res = await currentAccount();
      console.log("useCurrentAccount - received data:", res.data);
      return res.data;
    },
    enabled: !!getCookie(PUREMOON_TOKEN_KEY),
    staleTime: 0, // Data is always considered stale
    gcTime: 0, // Don't cache the data
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<ICreateAccount, APIResponseError, ICreateAccountRequest>({
    mutationFn: (payload) => createAccount(payload).then((res) => res.data),
    onSuccess: (data) => {
      console.log("CreateAccount onSuccess - invalidating myAccounts cache");
      // Remove the query from cache completely
      queryClient.removeQueries({ queryKey: ["myAccounts"] });
      // Clear all related queries
      queryClient.removeQueries({ queryKey: ["currentAccount"] });
      // Then refetch
      queryClient.invalidateQueries({ queryKey: ["myAccounts"] });
      queryClient.invalidateQueries({ queryKey: ["currentAccount"] });
      // Force refetch
      queryClient.refetchQueries({ queryKey: ["myAccounts"] });
      queryClient.refetchQueries({ queryKey: ["currentAccount"] });
      console.log("CreateAccount onSuccess - cache invalidation completed");
    },
    onError: (error) => {
      console.error("CreateAccount onError:", error);
    },
  });
};

export const useSwitchAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<ISwitchAccount, APIResponseError, ISwitchAccountRequest>({
    mutationFn: (payload) => switchAccount(payload).then((res) => res.data),
    onSuccess: (data) => {
      // Update the token in cookies
      setCookie(PUREMOON_TOKEN_KEY, data.data.accessToken);

      // Remove queries from cache completely
      queryClient.removeQueries({ queryKey: ["myAccounts"] });
      queryClient.removeQueries({ queryKey: ["currentAccount"] });
      queryClient.removeQueries({ queryKey: ["me"] });

      // Then invalidate and force refetch
      queryClient.invalidateQueries({ queryKey: ["myAccounts"] });
      queryClient.invalidateQueries({ queryKey: ["currentAccount"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });

      // Force immediate refetch
      queryClient.refetchQueries({ queryKey: ["myAccounts"] });
      queryClient.refetchQueries({ queryKey: ["currentAccount"] });
      queryClient.refetchQueries({ queryKey: ["me"] });
    },
  });
};
