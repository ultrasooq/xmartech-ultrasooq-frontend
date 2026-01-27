/**
 * @fileoverview Authentication and multi-account type definitions for the
 * Ultrasooq marketplace.
 *
 * Covers login, registration, OTP verification, password reset, email
 * change, and the multi-account system that allows a single user to
 * maintain multiple trade-role accounts (Buyer, Company, Freelancer).
 *
 * @module utils/types/auth.types
 * @dependencies None (pure type definitions).
 */

/**
 * Request payload for user login.
 *
 * @description
 * Intent: Supplies email and password credentials to the login endpoint.
 *
 * Usage: Submitted by the login form component.
 *
 * Data Flow: Login form -> mutation hook -> API POST /auth/login.
 *
 * @property email - The user's registered email address.
 * @property password - The user's password (plaintext; encrypted in transit via HTTPS).
 */
export interface ILoginRequest {
  email: string;
  password: string;
}

/**
 * Response payload returned by the login endpoint.
 *
 * @description
 * Intent: Carries the JWT access token, user account status, and an
 * OTP value when two-factor verification is required.
 *
 * Usage: Consumed by the auth store to persist the token and redirect
 * based on the user's account status.
 *
 * Data Flow: API POST /auth/login -> ILogin.
 *
 * @property accessToken - JWT bearer token for authenticated requests.
 * @property data - Nested object containing the user's account status.
 * @property data.status - Current account approval status.
 * @property message - Human-readable response message.
 * @property status - Boolean success indicator.
 * @property otp - One-time password for verification (if required).
 */
export interface ILogin {
  accessToken: string;
  data: {
    status:
      | "WAITING"
      | "ACTIVE"
      | "REJECT"
      | "INACTIVE"
      | "WAITING_FOR_SUPER_ADMIN"
      | "DELETE";
  };
  message: string;
  status: boolean;
  otp: number;
}

/**
 * Request payload for user registration.
 *
 * @description
 * Intent: Captures all fields required to create a new user account,
 * supporting manual registration as well as social OAuth flows.
 *
 * Usage: Submitted by the registration form or triggered via social login.
 *
 * Data Flow: Registration form -> mutation hook -> API POST /auth/register.
 *
 * @property loginType - Authentication method used ("MANUAL", "GOOGLE", "FACEBOOK").
 * @property email - Email address for the new account.
 * @property firstName - User's first name.
 * @property lastName - User's last name.
 * @property password - Chosen password (plaintext; encrypted in transit).
 * @property cc - Country calling code (e.g., "+1").
 * @property phoneNumber - User's phone number.
 * @property tradeRole - Selected trade role (e.g., "BUYER", "COMPANY", "FREELANCER").
 */
export interface IRegisterRequest {
  loginType: "MANUAL" | "GOOGLE" | "FACEBOOK";
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  cc: string;
  phoneNumber: string;
  tradeRole: string;
}

/**
 * Response payload returned by the registration endpoint.
 *
 * @description
 * Intent: Returns an OTP for email verification and a temporary access
 * token after successful registration.
 *
 * Data Flow: API POST /auth/register -> IRegister.
 *
 * @property otp - One-time password sent to the user's email for verification.
 * @property message - Human-readable response message.
 * @property status - Boolean success indicator.
 * @property accessToken - Temporary JWT token for the OTP verification step.
 */
export interface IRegister {
  otp: number;
  message: string;
  status: boolean;
  accessToken: string;
}

/**
 * Request payload for OTP verification during registration or login.
 *
 * @description
 * Intent: Verifies the one-time password sent to the user's email.
 *
 * Data Flow: OTP form -> mutation hook -> API POST /auth/verify-otp.
 *
 * @property email - The email address the OTP was sent to.
 * @property otp - The numeric OTP code entered by the user.
 */
export interface IVerifyOtpRequest {
  email: string;
  otp: number;
}

/**
 * Core user entity representing an authenticated marketplace user.
 *
 * @description
 * Intent: Models the fundamental user profile fields returned by
 * authentication and user profile endpoints.
 *
 * Usage: Consumed throughout the app in auth context, profile pages,
 * and anywhere the current user's identity is needed.
 *
 * Data Flow: API responses -> User object stored in auth context/state.
 *
 * @property id - Unique database identifier.
 * @property createdAt - ISO timestamp of account creation.
 * @property updatedAt - ISO timestamp of last profile update.
 * @property firstName - User's first name.
 * @property lastName - User's last name.
 * @property email - User's email address.
 * @property gender - User's gender ("MALE" or "FEMALE").
 * @property tradeRole - User's marketplace role ("BUYER", "COMPANY", "FREELANCER").
 * @property cc - Country calling code.
 * @property phoneNumber - User's phone number.
 * @property status - Optional account approval status.
 * @property statusNote - Optional note explaining the current status (e.g., rejection reason).
 */
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
  status?:
    | "WAITING"
    | "ACTIVE"
    | "REJECT"
    | "INACTIVE"
    | "WAITING_FOR_SUPER_ADMIN"
    | "DELETE";
  statusNote?: string;
}

/**
 * Response payload from OTP verification.
 *
 * @description
 * Intent: Returns the full access token and user data upon successful
 * OTP verification, completing the authentication flow.
 *
 * Data Flow: API POST /auth/verify-otp -> IVerifyOtp.
 *
 * @property accessToken - JWT bearer token for authenticated requests.
 * @property data - The authenticated user's profile data.
 * @property message - Human-readable response message.
 * @property status - Boolean success indicator.
 */
export interface IVerifyOtp {
  accessToken: string;
  data: User;
  message: string;
  status: boolean;
}

/**
 * Request payload for resending the OTP code.
 *
 * @description
 * Intent: Requests a new OTP be sent to the specified email address.
 *
 * Data Flow: Resend button -> mutation hook -> API POST /auth/resend-otp.
 *
 * @property email - The email address to resend the OTP to.
 */
export interface IResendOtpRequest {
  email: string;
}

/**
 * Response payload from the OTP resend endpoint.
 *
 * @description
 * Intent: Confirms that a new OTP has been dispatched.
 *
 * @property status - Boolean success indicator.
 * @property message - Human-readable response message.
 * @property otp - The newly generated OTP (may be present for dev environments).
 */
export interface IResendOtp {
  status: boolean;
  message: string;
  otp: number;
}

/**
 * Request payload for initiating the forgot-password flow.
 *
 * @description
 * Intent: Triggers an OTP to be sent to the user's email for password reset.
 *
 * Data Flow: Forgot password form -> mutation hook -> API POST /auth/forgot-password.
 *
 * @property email - The email address of the account to reset.
 */
export interface IForgotPasswordRequest {
  email: string;
}

/**
 * Response payload from the forgot-password endpoint.
 *
 * @description
 * Intent: Returns the OTP for verification during password reset.
 *
 * @property otp - The OTP sent to the user's email.
 * @property message - Human-readable response message.
 * @property status - Boolean success indicator.
 */
export interface IForgotPassword {
  otp: number;
  message: string;
  status: boolean;
}

/**
 * Request payload for resetting a password with new credentials.
 *
 * @description
 * Intent: Submits the new password after OTP verification in the
 * forgot-password flow.
 *
 * Data Flow: Reset password form -> mutation hook -> API POST /auth/reset-password.
 *
 * @property newPassword - The desired new password.
 * @property confirmPassword - Confirmation of the new password (must match).
 */
export interface IResetPasswordRequest {
  newPassword: string;
  confirmPassword: string;
}

/**
 * Response payload from the reset-password endpoint.
 *
 * @description
 * Intent: Confirms that the password has been successfully reset.
 *
 * @property message - Human-readable response message.
 * @property status - Boolean success indicator.
 * @property data - Additional response data (generic).
 * @property statusCode - HTTP-like status code from the backend.
 */
export interface IResetPassword {
  message: string;
  status: boolean;
  data: any;
  statusCode: number;
}

/**
 * Request payload for OTP verification during password reset.
 *
 * @description
 * Intent: Identical structure to {@link IVerifyOtpRequest}, used
 * specifically in the password-reset OTP verification step.
 *
 * @extends IVerifyOtpRequest
 */
export interface IPasswordResetVerifyOtpRequest extends IVerifyOtpRequest {}

/**
 * Response payload from password-reset OTP verification.
 *
 * @description
 * Intent: Returns a temporary access token that authorizes the
 * subsequent password-reset API call.
 *
 * @property status - Boolean success indicator.
 * @property message - Human-readable response message.
 * @property accessToken - Temporary JWT token for the reset step.
 */
export interface IPasswordResetVerify {
  status: boolean;
  message: string;
  accessToken: string;
}

/**
 * Request payload for changing the user's password while logged in.
 *
 * @description
 * Intent: Allows an authenticated user to change their password by
 * supplying the current password and the new credentials.
 *
 * Data Flow: Change password form -> mutation hook -> API POST /auth/change-password.
 *
 * @extends IResetPasswordRequest
 * @property password - The user's current/old password for verification.
 */
export interface IChangePasswordRequest extends IResetPasswordRequest {
  password: string;
}

/**
 * Response payload from the change-password endpoint.
 *
 * @description
 * Intent: Confirms that the password was successfully changed.
 *
 * @property message - Human-readable response message.
 * @property status - Boolean success indicator.
 * @property data - Additional response data (generic).
 */
export interface IChangePassword {
  message: string;
  status: boolean;
  data: any;
}

/**
 * Request payload for initiating an email address change.
 *
 * @description
 * Intent: Triggers an OTP to the new email address for verification.
 *
 * Data Flow: Change email form -> mutation hook -> API POST /auth/change-email.
 *
 * @property email - The new email address the user wants to switch to.
 */
export interface IChangeEmailRequest {
  email: string;
}

/**
 * Response payload from the change-email initiation endpoint.
 *
 * @description
 * Intent: Acknowledges the email change request was received.
 *
 * @property message - Human-readable response message.
 * @property status - Boolean success indicator.
 * @property data - Additional response data (generic).
 */
export interface IChangeEmail {
  message: string;
  status: boolean;
  data: any;
}

/**
 * Request payload for verifying the OTP sent to the new email address.
 *
 * @description
 * Intent: Completes the email change by verifying the OTP sent to
 * the new email address.
 *
 * Data Flow: OTP form -> mutation hook -> API POST /auth/change-email/verify.
 *
 * @property email - The new email address being verified.
 * @property otp - The OTP code sent to the new email.
 */
export interface IChangeEmailVerifyRequest {
  email: string;
  otp: number;
}

/**
 * Response payload from the change-email verification endpoint.
 *
 * @description
 * Intent: Confirms the email was successfully changed after OTP
 * verification.
 *
 * @property message - Human-readable response message.
 * @property status - Boolean success indicator.
 * @property data - Additional response data (generic).
 */
export interface IChangeEmailVerify {
  message: string;
  status: boolean;
  data: any;
}

/**
 * Multi-Account System Types
 *
 * The Ultrasooq platform supports a multi-account model where a single
 * user can have a main account and multiple sub-accounts, each with a
 * different trade role (BUYER, COMPANY, FREELANCER). Users can switch
 * between accounts seamlessly.
 */

/**
 * Represents a sub-account (child account) under a user's main account.
 *
 * @description
 * Intent: Models a sub-account that allows the user to operate under
 * a different trade role without creating a separate login.
 *
 * Usage: Displayed in the account-switcher UI, account management page,
 * and used for authorization checks.
 *
 * Data Flow: API GET /accounts -> IMyAccounts -> IUserAccount[].
 *
 * Notes: Company-specific fields are only populated when tradeRole is "COMPANY".
 * The `isCurrentAccount` flag identifies which account is currently active.
 *
 * @property id - Unique database identifier for the sub-account.
 * @property userId - ID of the parent user who owns this account.
 * @property tradeRole - The trade role of this account.
 * @property accountName - User-defined display name for the account.
 * @property isActive - Whether the account is enabled.
 * @property isCurrent - Whether this is the currently active account.
 * @property createdAt - ISO timestamp of creation.
 * @property updatedAt - ISO timestamp of last update.
 * @property isCurrentAccount - Optional convenience flag for current account.
 * @property companyName - Optional company name (COMPANY accounts only).
 * @property companyAddress - Optional company address.
 * @property companyPhone - Optional company phone number.
 * @property companyWebsite - Optional company website URL.
 * @property companyTaxId - Optional company tax identification number.
 * @property messages - Optional count of unread messages.
 * @property orders - Optional count of pending orders.
 * @property rfq - Optional count of active RFQs.
 * @property tracking - Optional count of tracked shipments.
 * @property status - Optional account approval status.
 * @property statusNote - Optional status explanation note.
 */
export interface IUserAccount {
  id: number;
  userId: number;
  tradeRole: "BUYER" | "COMPANY" | "FREELANCER";
  accountName: string;
  isActive: boolean;
  isCurrent: boolean;
  createdAt: string;
  updatedAt: string;
  isCurrentAccount?: boolean;

  // Company-specific fields
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyWebsite?: string;
  companyTaxId?: string;

  // Account statistics and status
  messages?: number;
  orders?: number;
  rfq?: number;
  tracking?: number;
  status?:
    | "WAITING"
    | "ACTIVE"
    | "REJECT"
    | "INACTIVE"
    | "WAITING_FOR_SUPER_ADMIN";
  statusNote?: string;
}

/**
 * Represents the user's main (primary) account.
 *
 * @description
 * Intent: Models the primary account created during registration, which
 * serves as the root account from which sub-accounts branch.
 *
 * Usage: Displayed at the top of the account-switcher UI and used
 * to identify the primary login identity.
 *
 * @property id - Unique database identifier.
 * @property email - User's primary email address.
 * @property firstName - User's first name.
 * @property lastName - User's last name.
 * @property tradeRole - The trade role of the main account.
 * @property accountName - Display name for the main account.
 * @property isMainAccount - Always true; identifies this as the main account.
 * @property isCurrentAccount - Optional flag indicating if this is the active account.
 * @property messages - Optional count of unread messages.
 * @property orders - Optional count of pending orders.
 * @property rfq - Optional count of active RFQs.
 * @property tracking - Optional count of tracked shipments.
 * @property status - Optional account approval status.
 * @property statusNote - Optional status explanation note.
 */
export interface IMainAccount {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  tradeRole: "BUYER" | "COMPANY" | "FREELANCER";
  accountName: string;
  isMainAccount: boolean;
  isCurrentAccount?: boolean;

  // Account statistics and status
  messages?: number;
  orders?: number;
  rfq?: number;
  tracking?: number;
  status?:
    | "WAITING"
    | "ACTIVE"
    | "REJECT"
    | "INACTIVE"
    | "WAITING_FOR_SUPER_ADMIN";
  statusNote?: string;
}

/**
 * Request payload for creating a new sub-account.
 *
 * @description
 * Intent: Creates a new sub-account under the authenticated user's
 * main account with a specified trade role.
 *
 * Usage: Submitted from the "Create Account" form in account management.
 *
 * Data Flow: Form -> mutation hook -> API POST /accounts/create.
 *
 * Notes: BUYER trade role is not allowed for sub-accounts; only COMPANY
 * and FREELANCER are valid. Identity proof fields are mandatory for
 * COMPANY and FREELANCER roles.
 *
 * @property tradeRole - Trade role for the new sub-account.
 * @property accountName - Display name for the sub-account.
 * @property companyName - Optional company name (COMPANY role).
 * @property companyAddress - Optional company address.
 * @property companyPhone - Optional company phone.
 * @property companyWebsite - Optional company website.
 * @property companyTaxId - Optional tax ID number.
 * @property identityProof - Optional front-side image URL of identity document.
 * @property identityProofBack - Optional back-side image URL of identity document.
 */
export interface ICreateAccountRequest {
  tradeRole: "COMPANY" | "FREELANCER"; // BUYER is not allowed for sub-accounts
  accountName: string;

  // Company-specific fields
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyWebsite?: string;
  companyTaxId?: string;

  // Identity card fields (mandatory for COMPANY and FREELANCER)
  identityProof?: string; // Front side image URL
  identityProofBack?: string; // Back side image URL
}

/**
 * Response payload from the create-account endpoint.
 *
 * @description
 * Intent: Returns the newly created sub-account data.
 *
 * @property message - Human-readable response message.
 * @property status - Boolean success indicator.
 * @property data - The newly created sub-account record.
 */
export interface ICreateAccount {
  message: string;
  status: boolean;
  data: IUserAccount;
}

/**
 * Response payload listing all accounts for the authenticated user.
 *
 * @description
 * Intent: Returns the main account, all sub-accounts grouped by type,
 * and a flat list of all accounts for display in account management.
 *
 * Usage: Consumed by the account-switcher dropdown and the my-accounts page.
 *
 * Data Flow: API GET /accounts -> IMyAccounts.
 *
 * @property message - Human-readable response message.
 * @property status - Boolean success indicator.
 * @property data.mainAccount - The user's primary account.
 * @property data.accountsByType - Accounts grouped by trade role.
 * @property data.accountsByType.company - Company sub-accounts.
 * @property data.accountsByType.buyer - Buyer sub-accounts.
 * @property data.accountsByType.freelancer - Freelancer sub-accounts.
 * @property data.allAccounts - Flat array of all sub-accounts.
 */
export interface IMyAccounts {
  message: string;
  status: boolean;
  data: {
    mainAccount: IMainAccount;
    accountsByType: {
      company: IUserAccount[];
      buyer: IUserAccount[];
      freelancer: IUserAccount[];
    };
    allAccounts: IUserAccount[];
  };
}

/**
 * Request payload for switching the active account.
 *
 * @description
 * Intent: Switches the user's active context to a different sub-account
 * or back to the main account.
 *
 * Usage: Triggered from the account-switcher UI.
 *
 * Data Flow: Account selector -> mutation hook -> API POST /accounts/switch.
 *
 * Notes: Pass 0 for `userAccountId` to switch back to the main account.
 *
 * @property userAccountId - ID of the target sub-account (0 = main account).
 */
export interface ISwitchAccountRequest {
  userAccountId: number; // 0 for main account, >0 for sub-accounts
}

/**
 * Response payload from the account-switch endpoint.
 *
 * @description
 * Intent: Returns a new access token scoped to the selected account
 * along with the account details.
 *
 * Data Flow: API POST /accounts/switch -> ISwitchAccount.
 *
 * @property message - Human-readable response message.
 * @property status - Boolean success indicator.
 * @property data.accessToken - New JWT token scoped to the switched account.
 * @property data.account - The account that is now active.
 */
export interface ISwitchAccount {
  message: string;
  status: boolean;
  data: {
    accessToken: string;
    account: IUserAccount | IMainAccount;
  };
}

/**
 * Response payload for the currently active account query.
 *
 * @description
 * Intent: Returns details about which account is currently in use
 * and whether it is the main account or a sub-account.
 *
 * Usage: Consumed on app initialization to set the auth context with
 * the correct account information.
 *
 * Data Flow: API GET /accounts/current -> ICurrentAccount.
 *
 * @property message - Human-readable response message.
 * @property status - Boolean success indicator.
 * @property data.account - The currently active account (main or sub).
 * @property data.isMainAccount - Whether the active account is the main account.
 */
export interface ICurrentAccount {
  message: string;
  status: boolean;
  data: {
    account: IUserAccount | IMainAccount;
    isMainAccount: boolean;
  };
}
