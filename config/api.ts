/**
 * @fileoverview API configuration and URL resolution for the Ultrasooq frontend.
 *
 * Centralises the base API URL used by Axios instances and the Socket.IO
 * client. Supports three resolution strategies:
 * 1. An explicit `NEXT_PUBLIC_API_URL` environment variable (highest priority).
 * 2. Browser-side hostname detection -- derives the backend URL from the
 *    current `window.location.hostname` (useful for LAN / mobile testing).
 * 3. A hard-coded fallback to the production API URL for server-side rendering.
 *
 * @module config/api
 */

/**
 * Static API configuration object.
 *
 * @constant
 * @type {{ BASE_URL: string, TIMEOUT: number }}
 * @property {string} BASE_URL - The base URL for all API requests. Resolved
 *   from `process.env.NEXT_PUBLIC_API_URL` or a hard-coded production default.
 * @property {number} TIMEOUT - Default request timeout in milliseconds.
 */
export const API_CONFIG = {
  BASE_URL:
    process.env.NEXT_PUBLIC_API_URL || "https://ultrasooq-api.duckdns.org", // Backend API URL chnaged
  TIMEOUT: 10000,
};

/**
 * Dynamically resolves the backend API base URL at runtime.
 *
 * Resolution order:
 * 1. If `NEXT_PUBLIC_API_URL` is set, returns {@link API_CONFIG.BASE_URL}.
 * 2. In the browser, constructs `http://<current-hostname>:3000` so that
 *    developers accessing the frontend via a network IP (e.g. from a mobile
 *    device) automatically hit the backend on the same host.
 * 3. On the server (SSR / RSC), returns {@link API_CONFIG.BASE_URL}.
 *
 * @returns {string} The fully-qualified backend API base URL (no trailing slash).
 *
 * @example
 * ```ts
 * const apiUrl = getApiUrl();
 * // "https://ultrasooq-api.duckdns.org"  -- when NEXT_PUBLIC_API_URL is set
 * // "http://192.168.1.42:3000"           -- when accessed via LAN IP in browser
 * ```
 */
export const getApiUrl = () => {
  // If API URL is explicitly set in env, use it
  if (process.env.NEXT_PUBLIC_API_URL) {
    return API_CONFIG.BASE_URL;
  }

  // In browser, detect current hostname and use same IP for backend
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    // If accessed via network IP, use network IP for backend
    // If accessed via localhost, use localhost for backend
    return `http://${hostname}:3000`;
  }

  // Server-side: default to localhost
  return API_CONFIG.BASE_URL;
};
