export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILogin {
  accessToken: string;
  data: [];
  message: string;
  status: boolean;
}

export interface IRegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  cc: string;
  phoneNumber: string;
  tradeRole: string;
}

export interface IRegister {
  otp: number;
  message: string;
  status: boolean;
}

export interface IVerifyOtpRequest {
  email: string;
  otp: number;
}

export interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: "MALE" | "FEMALE";
  tradeRole: "BUYER" | "COMPANY" | "FREELANCER";
  cc: string;
  phoneNumber: string;
}

export interface IVerifyOtp {
  accessToken: string;
  data: User;
  message: string;
  status: boolean;
}

export interface IResendOtpRequest {
  email: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IForgotPassword {
  message: string;
  status: boolean;
  data: string;
}

export interface IResetPasswordRequest {
  newPassword: string;
  confirmPassword: string;
}

export interface IResetPassword {
  message: string;
  status: boolean;
  data: any;
  statusCode: number;
}
