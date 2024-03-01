export interface ILoginRequest {
    email: string;
    password: string;
};

export interface ILogin {
    accessToken: string;
    data: any;
    message:string;
    success: boolean;
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
    message:string;
    status: boolean;
}

export interface IVerifyOtpRequest {
    email: string;
    otp: number;
}

export interface IVerifyOtp {
    accessToken: string;
    data: any;
    message:string;
    success: boolean;
}

export interface IResendOtpRequest {
    email: string;
}

export interface IForgotPasswordRequest {
    email: string;
}

export interface IForgotPassword {
    message:string;
    status: boolean;
    data: string;
}

export interface IResetPasswordRequest {
    newPassword: string;
    confirmPassword: string;
}

export interface IResetPassword {
    message:string;
    status: boolean;
    data: any;
    statusCode: number
}