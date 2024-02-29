import { useMutation } from "@tanstack/react-query"
import { login, register, resendOtp, verifyOtp } from "../requests/auth.requests";
import { APIResponseError } from "@/utils/types/common.types";
import { ILogin, ILoginRequest, IRegister, IRegisterRequest, IVerifyOtp, IVerifyOtpRequest } from "@/utils/types/auth.types";

export const useRegister = () => useMutation<IRegister, APIResponseError, IRegisterRequest>({
  mutationFn: async (payload: any) => {
      const res = await register(payload);
      return res.data;
  },
  onSuccess: () => {},
  onError: (err:APIResponseError) => {
    console.log(err);
  },
})

export const useVerifyOtp = () => useMutation<IVerifyOtp, APIResponseError, IVerifyOtpRequest>({
  mutationFn: async (payload: any) => {
      const res = await verifyOtp(payload);
      return res.data;
  },
  onSuccess: () => {},
  onError: (err:APIResponseError) => {
    console.log(err);
  },
});

export const useResendOtp = () => useMutation({
    mutationFn: async (payload: any) => {
        const res = await resendOtp(payload);
        return res;
    },
    onSuccess: () => {},
    onError: (err:APIResponseError) => {
      console.log(err);
    },
  })

export const useLogin = () => useMutation<ILogin, APIResponseError, ILoginRequest>({
    mutationFn: async payload => {
        const res = await login(payload);

        return res.data;
    },
    onSuccess: () => {},
    onError: (err:APIResponseError) => {
      console.log(err);
    },
  })

