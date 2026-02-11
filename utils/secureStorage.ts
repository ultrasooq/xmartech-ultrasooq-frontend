/**
 * Secure storage utility for production-safe data persistence
 * 
 * Rules:
 * - Never store: tokens, passwords, full PII, payment details, sensitive user data
 * - Use sessionStorage for session-only data (cleared on browser close)
 * - Use localStorage only for non-sensitive preferences (locale, theme, etc.)
 * - Always validate and sanitize data before storage
 */

/**
 * Safe storage wrapper that handles SSR and errors gracefully
 */
export const safeStorage = {
  /**
   * Get sessionStorage (cleared on browser close - safer for sensitive data)
   */
  session: {
    getItem: (key: string): string | null => {
      if (typeof window === "undefined") return null;
      try {
        return sessionStorage.getItem(key);
      } catch {
        return null;
      }
    },
    setItem: (key: string, value: string): boolean => {
      if (typeof window === "undefined") return false;
      try {
        sessionStorage.setItem(key, value);
        return true;
      } catch {
        return false;
      }
    },
    removeItem: (key: string): boolean => {
      if (typeof window === "undefined") return false;
      try {
        sessionStorage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    },
  },

  /**
   * Get localStorage (persists across sessions - only for non-sensitive preferences)
   */
  local: {
    getItem: (key: string): string | null => {
      if (typeof window === "undefined") return null;
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    setItem: (key: string, value: string): boolean => {
      if (typeof window === "undefined") return false;
      try {
        localStorage.setItem(key, value);
        return true;
      } catch {
        return false;
      }
    },
    removeItem: (key: string): boolean => {
      if (typeof window === "undefined") return false;
      try {
        localStorage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    },
  },
};

/**
 * Storage keys that are safe to use
 */
export const STORAGE_KEYS = {
  // Safe for localStorage (non-sensitive preferences)
  LOCALE: "locale",
  CURRENCY: "currency",
  DEVICE_ID: "deviceId", // Pseudonymous identifier
  LOGIN_TYPE: "loginType", // Non-sensitive auth method
  
  // Should use sessionStorage (session-only data)
  IP_INFO: "ipInfo", // Geolocation data
  ORDER_DRAFT: "order-draft", // Temporary checkout data
} as const;

/**
 * Check if a value contains sensitive data patterns
 */
export const containsSensitiveData = (value: string): boolean => {
  const sensitivePatterns = [
    /password/i,
    /token/i,
    /secret/i,
    /api[_-]?key/i,
    /credit[_-]?card/i,
    /cvv/i,
    /ssn/i,
    /social[_-]?security/i,
    /@.*\.(com|net|org)/i, // Email patterns
    /\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}/, // Credit card pattern
  ];

  return sensitivePatterns.some((pattern) => pattern.test(value));
};
