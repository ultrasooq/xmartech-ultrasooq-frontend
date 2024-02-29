import { ILoginRequest, IRegisterRequest, IResendOtpRequest, IVerifyOtpRequest } from "@/utils/types/auth.types";
import axios from "axios";

export const register = (payload:IRegisterRequest) => {
    return axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
    data: payload
})};

export const verifyOtp = (payload:IVerifyOtpRequest) => {
    return axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/user/registerValidateOtp`,
    data: payload
})};

export const resendOtp = (payload:IResendOtpRequest) => {
    return axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/user/resendOtp`,
    data: payload
})};

export const login = (payload:ILoginRequest) => {
    return axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
    data: payload
})};