/**
 * @fileoverview Zustand store for the authenticated user's profile data.
 *
 * Provides a global, non-persisted store that holds the full user object
 * (including phone numbers, social links, profile details, and branch info).
 * Typically hydrated after login or after fetching the user profile from the API.
 *
 * @module lib/userStore
 */

import { create } from "zustand";

/**
 * Shape of the user store state.
 *
 * @export
 * @typedef {Object} State
 * @property {Object} user - The full user profile object.
 * @property {number} user.id - Primary key.
 * @property {string} user.uniqueId - UUID or public-facing unique identifier.
 * @property {string} user.email - Email address.
 * @property {string} user.firstName - First name.
 * @property {string} user.lastName - Last name.
 * @property {string} user.gender - Gender.
 * @property {string} user.status - Account status (e.g. "ACTIVE", "WAITING").
 * @property {string} user.dateOfBirth - Date of birth as an ISO string.
 * @property {string} user.phoneNumber - Primary phone number.
 * @property {string} user.cc - Country calling code.
 * @property {string} user.tradeRole - Marketplace role (e.g. "VENDOR", "BUYER", "MEMBER").
 * @property {null} user.otp - One-time password (transient, always null in store).
 * @property {null} user.otpValidTime - OTP expiration (transient, always null in store).
 * @property {number} user.resetPassword - Password reset flag.
 * @property {string} user.profilePicture - URL or path to the profile picture.
 * @property {string} user.identityProof - URL or path to the front of the identity document.
 * @property {string} user.identityProofBack - URL or path to the back of the identity document.
 * @property {null} user.onlineOffline - Online/offline status (not currently used).
 * @property {null} user.onlineOfflineDateStatus - Timestamp for online/offline status.
 * @property {string} user.createdAt - ISO timestamp of account creation.
 * @property {string} user.updatedAt - ISO timestamp of last update.
 * @property {null} user.deletedAt - Soft-delete timestamp (null when active).
 * @property {null} user.userType - User type discriminator (not currently used).
 * @property {Array<Object>} user.userPhone - List of phone number records.
 * @property {number} user.userPhone[].id - Phone record ID.
 * @property {string} user.userPhone[].cc - Country calling code.
 * @property {string} user.userPhone[].phoneNumber - Phone number.
 * @property {null} user.userPhone[].deletedAt - Soft-delete timestamp.
 * @property {string} user.userPhone[].createdAt - Creation timestamp.
 * @property {string} user.userPhone[].updatedAt - Last update timestamp.
 * @property {string} user.userPhone[].status - Phone verification status.
 * @property {number} user.userPhone[].userId - Foreign key to the user.
 * @property {Array} user.userSocialLink - Social media links for the user.
 * @property {Array} user.userProfile - Extended profile information.
 * @property {Array} user.userBranch - Branch / sub-account associations.
 */
export type State = {
  user: {
    id: number;
    uniqueId: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    status: string;
    dateOfBirth: string;
    phoneNumber: string;
    cc: string;
    // password: string;
    tradeRole: string;
    otp: null;
    otpValidTime: null;
    resetPassword: number;
    profilePicture: string;
    identityProof: string;
    identityProofBack: string;
    onlineOffline: null;
    onlineOfflineDateStatus: null;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    userType: null;
    userPhone: {
      id: number;
      cc: string;
      phoneNumber: string;
      deletedAt: null;
      createdAt: string;
      updatedAt: string;
      status: string;
      userId: number;
    }[];
    userSocialLink: [];
    userProfile: [];
    userBranch: [];
  };
};

/**
 * Actions available on the user store.
 *
 * @export
 * @typedef {Object} Actions
 * @property {(data: State["user"]) => void} setUser - Replaces the entire user object in the store.
 */
export type Actions = {
  setUser: (data: State["user"]) => void;
};

/**
 * Default / empty user state used to initialise the store and for reset operations.
 *
 * @constant
 * @type {State}
 */
export const initialUserState: State = {
  user: {
    id: 0,
    uniqueId: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    status: "",
    dateOfBirth: "",
    phoneNumber: "",
    cc: "",
    // password: "",
    tradeRole: "",
    otp: null,
    otpValidTime: null,
    resetPassword: 0,
    profilePicture: "",
    identityProof: "",
    identityProofBack: "",
    onlineOffline: null,
    onlineOfflineDateStatus: null,
    createdAt: "",
    updatedAt: "",
    deletedAt: null,
    userType: null,
    userPhone: [],
    userSocialLink: [],
    userProfile: [],
    userBranch: [],
  },
};

/**
 * Zustand store hook for user profile state.
 *
 * @example
 * ```ts
 * const setUser = useUserStore((s) => s.setUser);
 * setUser(fetchedUserData);
 * ```
 */
export const useUserStore = create<State & Actions>()((set) => ({
  user: initialUserState.user,
  setUser: (data) => set((state) => ({ ...state, user: data })),
}));

/**
 * Convenience selector hook that returns only the `user` object from the store.
 *
 * @returns {State["user"]} The current user profile object.
 *
 * @example
 * ```ts
 * const user = useUser();
 * console.log(user.firstName);
 * ```
 */
export const useUser = () => useUserStore((state) => state.user);
