"use client";

/**
 * @fileoverview Authentication context provider for the Ultrasooq marketplace.
 *
 * Manages user authentication state, locale/translation preferences, and
 * currency selection across the entire application. Provides a client-side
 * recovery mechanism that re-fetches the current user from the API when
 * a valid token cookie exists but the server-side render did not resolve a user.
 *
 * @module context/AuthContext
 */

import { setUserLocale } from "@/src/services/locale";
import { CURRENCIES, LANGUAGES, PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { fetchMe } from "@/apis/requests/user.requests";
import { getCookie } from "cookies-next";
import React, {
  createContext,
  startTransition,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

/**
 * Minimal user representation stored within the auth context.
 *
 * @interface User
 * @property {number} id - The unique identifier of the authenticated user.
 * @property {string} firstName - The user's first name.
 * @property {string} lastName - The user's last name.
 * @property {string} tradeRole - The user's marketplace role (e.g. "VENDOR", "BUYER", "MEMBER").
 */
interface User {
  id: number;
  firstName: string;
  lastName: string;
  tradeRole: string;
}

/**
 * Shape of the value exposed by {@link AuthContext}.
 *
 * @interface AuthContextType
 * @property {User | null} user - The currently authenticated user, or `null` if unauthenticated.
 * @property {(user: User | null) => void} setUser - Setter to update the authenticated user.
 * @property {boolean} isAuthenticated - Convenience flag derived from `!!user`.
 * @property {() => void} clearUser - Resets the user state to `null` (logout helper).
 * @property {any[]} permissions - Array of permission objects for the current user / sub-account.
 * @property {(permissions: any[]) => void} setPermissions - Setter to update the permissions array.
 * @property {(locale: string) => Promise<void>} applyTranslation - Persists the chosen locale and triggers a React transition.
 * @property {string} selectedLocale - The currently active locale code (e.g. "en", "ar").
 * @property {string} langDir - Text direction derived from the active locale ("ltr" or "rtl").
 * @property {(typeof CURRENCIES)[0]} currency - The active currency object including code and symbol.
 * @property {(code: string) => void} changeCurrency - Updates the active currency by its ISO code.
 */
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  clearUser: () => void;
  permissions: any[];
  setPermissions: (permissions: any[]) => void;
  applyTranslation: (locale: string) => Promise<void>;
  selectedLocale: string;
  langDir: string;
  currency: (typeof CURRENCIES)[0];
  changeCurrency: (code: string) => void;
}

/**
 * React context that holds authentication, locale, and currency state.
 * Initialized as `undefined`; consumers must be wrapped by {@link AuthProvider}.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider component that supplies authentication, locale, and currency state
 * to its subtree.
 *
 * @component
 * @param {Object} props
 * @param {User | null} props.user - The initial user object resolved on the server (may be `null`).
 * @param {any[]} props.permissions - The initial permissions list resolved on the server.
 * @param {React.ReactNode} props.children - Child components that consume the context.
 * @param {string} [props.locale] - The initial locale code. Defaults to `"en"` when omitted.
 *
 * @example
 * ```tsx
 * <AuthProvider user={serverUser} permissions={serverPermissions} locale="ar">
 *   <App />
 * </AuthProvider>
 * ```
 */
export const AuthProvider: React.FC<{
  user: User | null;
  permissions: any[];
  children: React.ReactNode;
  locale?: string;
}> = ({
  user: initialUser,
  permissions: initialPermissions,
  children,
  locale,
}) => {
  /** @type {[User | null, React.Dispatch<React.SetStateAction<User | null>>]} */
  const [user, setUser] = useState<User | null>(initialUser);

  /** @type {[any[], React.Dispatch<React.SetStateAction<any[]>>]} */
  const [permissions, setPermissions] = useState<any[]>(initialPermissions);

  /**
   * Client-side user recovery effect.
   * When the server-side render does not produce a user but a valid token cookie
   * is present, this effect calls {@link fetchMe} to restore the session.
   * Fails silently so the user is simply prompted to log in again.
   */
  useEffect(() => {
    if (!user && typeof window !== "undefined") {
      const token = getCookie(PUREMOON_TOKEN_KEY);
      if (token) {
        fetchMe()
          .then((res) => {
            if (res?.data?.data?.id) {
              setUser({
                id: res.data.data.id,
                firstName: res.data.data.firstName || "",
                lastName: res.data.data.lastName || "",
                tradeRole: res.data.data.tradeRole || "",
              });
            }
          })
          .catch(() => {
            // Silent fail - user will need to login again
          });
      }
    }
  }, [user]);

  /** Derived boolean: `true` when a user object is present. */
  const isAuthenticated = !!user;

  /**
   * Clears the current user from state, effectively logging out on the client.
   * @returns {void}
   */
  const clearUser = () => {
    setUser(null);
  };

  /** @type {[string, React.Dispatch<React.SetStateAction<string>>]} */
  const [selectedLocale, setSelectedLocale] = useState<string>(locale || "en");

  /**
   * Persists the selected locale to the server-side cookie/service, saves it
   * to `localStorage`, and updates the React state inside a transition so the
   * UI remains responsive.
   *
   * @param {string} locale - The locale code to apply (e.g. "en", "ar").
   * @returns {Promise<void>}
   */
  const applyTranslation = async (locale: string): Promise<void> => {
    await setUserLocale(locale);
    window.localStorage.setItem("locale", locale);
    startTransition(() => {
      setSelectedLocale(locale);
    });
  };

  /** @type {[(typeof CURRENCIES)[0], React.Dispatch<React.SetStateAction<(typeof CURRENCIES)[0]>>]} */
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[0]>(
    CURRENCIES.find((item) => item.code == "OMR") || CURRENCIES[0],
  );

  /**
   * Updates the active currency by its ISO code.
   * Falls back to the first entry in the {@link CURRENCIES} array when the
   * code is not found.
   *
   * @param {string} code - ISO currency code (e.g. "OMR", "USD").
   * @returns {void}
   */
  const changeCurrency = (code: string) => {
    setCurrency(CURRENCIES.find((item) => item.code == code) || CURRENCIES[0]);
    startTransition(() => {});
  };

  /**
   * Memoised currency object that derives its `symbol` based on the active
   * locale. For the Omani Rial ("OMR"), an Arabic symbol variant is used when
   * the locale is `"ar"`.
   */
  const currencyWithLocale = useMemo(() => {
    let symbol = currency.symbol;

    if (currency.code === "OMR") {
      // Check if currency has symbolAr property and locale is Arabic
      const currencyWithAr = currency as (typeof CURRENCIES)[0] & {
        symbolAr?: string;
      };
      symbol =
        selectedLocale === "ar" && currencyWithAr.symbolAr
          ? currencyWithAr.symbolAr
          : currency.symbol;
    }

    return {
      ...currency,
      symbol,
    };
  }, [currency, selectedLocale]);

  /** Aggregated context value supplied to consumers. */
  let data = {
    user,
    setUser,
    isAuthenticated,
    clearUser,
    permissions,
    setPermissions,
    applyTranslation,
    selectedLocale,
    langDir:
      LANGUAGES.find((language) => language.locale == selectedLocale)
        ?.direction || "ltr",
    currency: currencyWithLocale,
    changeCurrency,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook that retrieves the authentication context.
 *
 * @throws {Error} If called outside of an {@link AuthProvider}.
 * @returns {AuthContextType} The current authentication context value.
 *
 * @example
 * ```tsx
 * const { user, isAuthenticated, applyTranslation } = useAuth();
 * ```
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
