import { PUREMOON_TEMP_TOKEN_KEY, PUREMOON_TOKEN_KEY } from "@/utils/constants";
import {
  IChangeEmailRequest,
  IChangeEmailVerifyRequest,
  IChangePasswordRequest,
  ICreateAccountRequest,
  IForgotPasswordRequest,
  ILoginRequest,
  IPasswordResetVerifyOtpRequest,
  IRegisterRequest,
  IResendOtpRequest,
  IResetPasswordRequest,
  ISwitchAccountRequest,
  IVerifyOtpRequest,
} from "@/utils/types/auth.types";
import axios from "axios";
import { getCookie } from "cookies-next";
import { getApiUrl } from "@/config/api";

/**
 * Registers a new user account.
 *
 * @param payload - The registration data conforming to {@link IRegisterRequest}.
 * @returns Axios promise resolving to the registration result.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/register`
 * - **Auth:** None required.
 */
export const register = (payload: IRegisterRequest) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/register`,
    data: payload,
  });
};

/**
 * Validates the OTP sent during the registration process.
 *
 * @param payload - The OTP verification data conforming to {@link IVerifyOtpRequest}.
 * @returns Axios promise resolving to the OTP verification result.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/registerValidateOtp`
 * - **Auth:** None required.
 */
export const verifyOtp = (payload: IVerifyOtpRequest) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/registerValidateOtp`,
    data: payload,
  });
};

/**
 * Resends the OTP to the user for verification.
 *
 * @param payload - The resend request data conforming to {@link IResendOtpRequest}.
 * @returns Axios promise resolving to the resend confirmation.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/resendOtp`
 * - **Auth:** None required.
 */
export const resendOtp = (payload: IResendOtpRequest) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/resendOtp`,
    data: payload,
  });
};

/**
 * Authenticates a user and returns an access token.
 *
 * @param payload - The login credentials conforming to {@link ILoginRequest}.
 * @returns Axios promise resolving to the authentication result including the token.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/login`
 * - **Auth:** None required.
 */
export const login = (payload: ILoginRequest) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/login`,
    data: payload,
  });
};

/**
 * Initiates the forgot-password flow by sending a reset OTP to the user's email.
 *
 * @param payload - The forgot-password data conforming to {@link IForgotPasswordRequest}.
 * @returns Axios promise resolving to the forgot-password initiation result.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/forgetPassword`
 * - **Auth:** None required.
 */
export const forgotPassword = (payload: IForgotPasswordRequest) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/forgetPassword`,
    data: payload,
  });
};

/**
 * Resets the user's password using a temporary token obtained from the OTP flow.
 *
 * @param payload - The reset-password data conforming to {@link IResetPasswordRequest}.
 * @returns Axios promise resolving to the password reset confirmation.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/resetPassword`
 * - **Auth:** Temporary Bearer token required (via `PUREMOON_TEMP_TOKEN_KEY` cookie).
 */
export const resetPassword = (payload: IResetPasswordRequest) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/resetPassword`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TEMP_TOKEN_KEY),
    },
  });
};

/**
 * Verifies the OTP during the password-reset flow.
 *
 * @param payload - The OTP verification data conforming to {@link IPasswordResetVerifyOtpRequest}.
 * @returns Axios promise resolving to the OTP verification result.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/verifyOtp`
 * - **Auth:** None required.
 */
export const passwordResetVerify = (
  payload: IPasswordResetVerifyOtpRequest,
) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/verifyOtp`,
    data: payload,
  });
};

/**
 * Changes the authenticated user's current password.
 *
 * @param payload - The change-password data conforming to {@link IChangePasswordRequest}.
 * @returns Axios promise resolving to the password change confirmation.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/changePassword`
 * - **Auth:** Bearer token required.
 */
export const changePassword = (payload: IChangePasswordRequest) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/changePassword`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Initiates an email change for the authenticated user.
 *
 * @param payload - The new email data conforming to {@link IChangeEmailRequest}.
 * @returns Axios promise resolving to the email change initiation result.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/user/changeEmail`
 * - **Auth:** Bearer token required.
 */
export const changeEmail = (payload: IChangeEmailRequest) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/user/changeEmail`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Verifies the OTP sent to the new email address to complete the email change.
 *
 * @param payload - The email verification data conforming to {@link IChangeEmailVerifyRequest}.
 * @returns Axios promise resolving to the email verification result.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/user/verifyEmail`
 * - **Auth:** Bearer token required.
 */
export const emailChangeVerify = (payload: IChangeEmailVerifyRequest) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/user/verifyEmail`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Authenticates a user via a third-party social login provider (e.g., Google, Facebook).
 *
 * @param payload - The social login provider data (untyped).
 * @returns Axios promise resolving to the social authentication result including the token.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/socialLogin`
 * - **Auth:** None required.
 */
export const socialLogin = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/socialLogin`,
    data: payload,
  });
};

// Multi-Account System Requests

/**
 * Retrieves all accounts associated with the currently authenticated user.
 *
 * @returns Axios promise resolving to the list of user accounts.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/user/myAccounts`
 * - **Auth:** Bearer token required.
 * - Includes cache-busting query parameter `_t` and `no-cache` headers.
 */
export const myAccounts = () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/user/myAccounts`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
    params: {
      _t: Date.now(), // Cache busting parameter
    },
  });
};

/**
 * Creates a new sub-account under the currently authenticated user.
 *
 * @param payload - The account creation data conforming to {@link ICreateAccountRequest}.
 * @returns Axios promise resolving to the newly created account details.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/createAccount`
 * - **Auth:** Bearer token required.
 */
export const createAccount = (payload: ICreateAccountRequest) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/createAccount`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Switches the active session to a different account owned by the same user.
 *
 * @param payload - The account switch data conforming to {@link ISwitchAccountRequest}.
 * @returns Axios promise resolving to the new session/token for the switched account.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/switchAccount`
 * - **Auth:** Bearer token required.
 */
export const switchAccount = (payload: ISwitchAccountRequest) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/switchAccount`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Retrieves the currently active account for the authenticated user.
 *
 * @returns Axios promise resolving to the current account details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/user/currentAccount`
 * - **Auth:** Bearer token required.
 */
export const currentAccount = () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/user/currentAccount`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
