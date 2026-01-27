/**
 * @fileoverview General-purpose helper/utility functions for the Ultrasooq
 * marketplace frontend.
 *
 * Provides date formatting, string manipulation, media type detection,
 * device identification, country code lookups, and other frequently
 * used utility logic consumed across many components.
 *
 * @module utils/helper
 * @dependencies
 * - {@link module:utils/constants} - Day names, extensions, weekday lists.
 * - country-codes-list - Third-party country code data.
 */

import {
  DAYS_NAME_LIST,
  imageExtensions,
  videoExtensions,
  WEEKDAYS_LIST,
} from "./constants";
import countryCodes, { CountryProperty } from "country-codes-list";

/**
 * Parses a JSON-encoded working-days object and returns a comma-separated
 * string of active day names.
 *
 * @description
 * Intent: Converts a stringified working-days map (e.g., `{"sun":1,"mon":0,...}`)
 * into a human-readable list of active days (e.g., "Sunday, Tuesday").
 *
 * Usage: Displayed on branch office detail views to show operating days.
 *
 * Data Flow: JSON string from API -> parsed object -> filtered day names.
 *
 * @param {string} data - JSON string of day abbreviation keys mapped to 0 or 1.
 * @returns {string | undefined} Comma-separated day names, "NA" if none active, or undefined if input is falsy.
 */
export const parsedDays = (data: string) => {
  if (!data) return;
  const days = JSON.parse(data);
  const response = Object.keys(days)
    .map((day) => {
      if (days[day] === 1) {
        return DAYS_NAME_LIST[day];
      }
    })
    .filter((item) => item)
    .join(", ");
  return response || "NA";
};

/**
 * Extracts the first-letter initials from a first and last name.
 *
 * @description
 * Intent: Generates a two-character avatar placeholder string from a
 * user's name (e.g., "John Doe" -> "JD").
 *
 * Usage: Used by avatar/fallback components when no profile image exists.
 *
 * @param {string} firstName - User's first name.
 * @param {string} lastName - User's last name.
 * @returns {string} Two-character initials string, or fewer if names are empty.
 */
export const getInitials = (firstName: string, lastName: string) => {
  const firstInitial = firstName?.charAt(0) || "";
  const lastInitial = lastName?.charAt(0) || "";
  return `${firstInitial}${lastInitial}`;
};

/**
 * Converts a 24-hour time string (HH:mm) to 12-hour AM/PM format.
 *
 * @description
 * Intent: Transforms times like "14:30" into "2:30 PM" for user-friendly display.
 *
 * Usage: Displayed in branch office operating hours sections.
 *
 * @param {string} time - Time in "HH:mm" 24-hour format.
 * @returns {string | undefined} Formatted time string (e.g., "2:30 PM"), or undefined if input is falsy.
 */
export const getAmPm = (time: string) => {
  if (!time) return;
  const [hoursStr, minutes] = time.split(":");
  const hours = parseInt(hoursStr, 10);
  const ampm = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes} ${ampm}`;
};

/**
 * Returns the full name of the current day of the week.
 *
 * @description
 * Intent: Resolves the current day (e.g., "Monday") from the system clock.
 *
 * Usage: Used to highlight the current day in branch operating schedules.
 *
 * @returns {string} Full weekday name (e.g., "Sunday", "Monday").
 */
export const getCurrentDay = () => {
  const date = new Date();
  const day = date.getDay();
  return WEEKDAYS_LIST[day];
};

/**
 * Pre-built lookup object mapping country names to their calling codes.
 *
 * @description
 * Intent: Creates a { "CountryName": "+CallingCode" } map from the
 * country-codes-list library for phone code selection UIs.
 *
 * Usage: Consumed by phone number input components to display country
 * calling code options.
 *
 * @const
 */
export const countryObjs = countryCodes?.customList?.(
  // @ts-ignore
  "countryNameEn" as CountryProperty.countryNameEn,
  "+{countryCallingCode}",
) || {};

/**
 * The current time at module load in 24-hour "HH:mm" format.
 *
 * @description
 * Intent: Captures the current time once for default form values.
 *
 * Notes: This value is set at module import time and does NOT update.
 *
 * @const {string}
 */
export const getCurrentTime = new Date().toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: false,
});

/**
 * Generates an array of years from the current year back 200 years.
 *
 * @description
 * Intent: Provides year options for "Year of Establishment" dropdowns
 * in company profile forms.
 *
 * @returns {number[]} Array of years in descending order (e.g., [2024, 2023, ..., 1824]).
 */
export const getLastTwoHundredYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 200; i++) {
    years.push(currentYear - i);
  }
  return years;
};

/**
 * Generates a unique device identifier string.
 *
 * @description
 * Intent: Creates a device-specific ID combining a timestamp and random
 * alphanumeric strings for device fingerprinting / session tracking.
 *
 * Usage: Called by {@link getOrCreateDeviceId} when no device ID exists
 * in localStorage.
 *
 * @returns {string} A device ID in the format "device_{timestamp}_{randomString}".
 */
export const generateDeviceId = () => {
  const timestamp = new Date().getTime();
  const randomString =
    Math.random().toString(36).substring(2, 10) +
    Math.random().toString(36).substring(2, 10);
  const deviceId = `device_${timestamp}_${randomString}`;
  return deviceId;
};

/**
 * Checks whether the code is running in a browser environment.
 *
 * @description
 * Intent: Guards browser-only APIs (localStorage, window, etc.) from
 * being called during server-side rendering in Next.js.
 *
 * @returns {boolean} True if running in a browser, false if server-side.
 */
export const isBrowser = (): boolean => {
  return typeof window !== "undefined";
};

/**
 * Retrieves or creates a persistent device ID stored in localStorage.
 *
 * @description
 * Intent: Ensures each browser instance has a stable device identifier
 * for analytics and session management. Creates one if not present.
 *
 * Usage: Called during app initialization or authentication flows.
 *
 * Notes: Returns undefined when running server-side (SSR).
 *
 * @returns {string | undefined} The device ID string, or undefined on the server.
 */
export const getOrCreateDeviceId = () => {
  if (!isBrowser()) return;
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = generateDeviceId();
    localStorage.setItem("deviceId", deviceId);
  }
  return deviceId;
};

/**
 * Retrieves the stored login type from localStorage.
 *
 * @description
 * Intent: Returns the authentication method (e.g., "MANUAL", "GOOGLE")
 * used during the last login, if available.
 *
 * Notes: Returns undefined when running server-side.
 *
 * @returns {string | null | undefined} The login type string, null if not set, or undefined on server.
 */
export const getLoginType = () => {
  if (!isBrowser()) return;
  return localStorage.getItem("loginType");
};

/**
 * Strips all HTML tags from a string, returning plain text.
 *
 * @description
 * Intent: Sanitizes HTML content for display in contexts where
 * markup is not supported (e.g., meta descriptions, tooltips).
 *
 * @param {string} text - The HTML string to strip.
 * @returns {string} The input with all HTML tags removed.
 */
export const stripHTML = (text: string) => {
  return text.replace(/<[^>]*>/g, "");
};

/**
 * Generates a unique SKU number based on the current timestamp.
 *
 * @description
 * Intent: Provides a default auto-generated SKU when creating new products.
 *
 * @returns {number} Current timestamp in milliseconds as a numeric SKU.
 */
export const generateRandomSkuNoWithTimeStamp = () => new Date().getTime();

/**
 * Formats an ISO date string into a short US-locale date (e.g., "Jun 10, 2024").
 *
 * @description
 * Intent: Provides a standardized date display format throughout the app.
 *
 * Usage: Used in order dates, profile timestamps, and listing details.
 *
 * @param {string} isoString - ISO 8601 date string to format.
 * @returns {string} Formatted date string, or "-" if the input is invalid.
 */
export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);

  if (!date || date.toString() === "Invalid Date") return "-";
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

/**
 * Capitalizes the first letter of a word and lowercases the rest.
 *
 * @description
 * Intent: Normalizes display text to title case for a single word
 * (e.g., "ACTIVE" -> "Active").
 *
 * @param {string} word - The word to capitalize.
 * @returns {string} The capitalized word, or empty string if input is falsy.
 */
export const capitalizeWord = (word: string): string => {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

/**
 * Safely parses a JSON-encoded description string.
 *
 * @description
 * Intent: Attempts to parse product/service descriptions that are stored
 * as JSON strings (e.g., rich text editor output). Returns undefined
 * if parsing fails.
 *
 * Usage: Used before rendering rich-text descriptions that may be
 * stored as serialized JSON.
 *
 * @param {string} description - The JSON string to parse.
 * @returns {any | undefined} Parsed JSON object, or undefined if invalid/empty.
 */
export const handleDescriptionParse = (description: string) => {
  if (description) {
    try {
      const json = JSON.parse(description);
      return json;
    } catch (error) {
    }
  }
};

/**
 * Formats a numeric price with a currency symbol and thousand separators.
 *
 * @description
 * Intent: Produces a user-friendly price string (e.g., "$1,234.56") with
 * two decimal places and an optional currency symbol.
 *
 * Usage: Displayed on product cards, cart summaries, and order totals.
 *
 * @param {number} price - The numeric price value.
 * @param {string} [symbol='$'] - Currency symbol to prepend.
 * @returns {string} Formatted price string, or empty string if price is falsy (0 or undefined).
 */
export const formatPrice = (price: number, symbol: string = '$'): string => {
  if (!price) return "";
  const formattedTotal = price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formattedTotal}`;
};

/**
 * Determines whether a file path or object represents a video.
 *
 * @description
 * Intent: Checks the file extension against known video formats, or
 * returns true for object-type paths (e.g., File objects from uploads).
 *
 * Usage: Used to select the correct media renderer (video player vs image).
 *
 * Dependencies: Relies on {@link videoExtensions} from constants.ts.
 *
 * @param {string} path - File path/URL string, or a File object.
 * @returns {boolean | undefined} True if video, false if not, undefined for edge cases.
 */
export const isVideo = (path: string) => {
  if (typeof path === "string") {
    const extension = path.split(".").pop()?.toLowerCase();
    if (extension) {
      if (videoExtensions.includes(extension)) {
        return true;
      }
    }
    return false;
  } else if (typeof path === "object") {
    return true;
  }
};

/**
 * Determines whether a file path or object represents an image.
 *
 * @description
 * Intent: Checks the file extension against known image formats, or
 * inspects the MIME type for File objects from uploads.
 *
 * Usage: Used to select the correct media renderer (image vs fallback).
 *
 * Dependencies: Relies on {@link imageExtensions} from constants.ts.
 *
 * @param {any} path - File path/URL string, or a File object with a `type` property.
 * @returns {boolean | undefined} True if image, false if not, undefined for edge cases.
 */
export const isImage = (path: any) => {
  if (typeof path === "string") {
    const extension = path.split(".").pop()?.toLowerCase();
    if (extension) {
      if (imageExtensions.includes(extension)) {
        return true;
      }
    }
    return false;
  } else if (typeof path === "object" && path?.type?.includes("image")) {
    return true;
  }
};

/**
 * Generates a unique number by combining a timestamp with a random integer.
 *
 * @description
 * Intent: Produces a pseudo-unique numeric ID for temporary client-side
 * identification (e.g., optimistic UI keys, deduplication IDs).
 *
 * @returns {number} A unique numeric value.
 */
export const generateUniqueNumber = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000);
  return timestamp + randomNum;
}

/**
 * Converts an ISO date string to a localized date-time format (DD/MM/YYYY, HH:mm:ss AM/PM).
 *
 * @description
 * Intent: Provides a full date-time display in British locale format
 * with 12-hour clock for timestamps in order history, logs, etc.
 *
 * @param {string} dateString - ISO 8601 date string.
 * @returns {string} Formatted date-time string, or "-" if input is falsy.
 */
export const convertDateTime = (dateString: string) => {
  if (!dateString) {
    return "-";
  }
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    minute: "numeric",
    hour: "numeric",
    hour12: true,
    second: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  return formattedDate;
};

/**
 * Converts an ISO date string to a date-only format (DD/MM/YYYY).
 *
 * @description
 * Intent: Provides a date display without time in British locale format.
 *
 * @param {string} dateString - ISO 8601 date string.
 * @returns {string} Formatted date string, or "-" if input is falsy.
 */
export const convertDate = (dateString: string) => {
  if (!dateString) {
    return "-";
  }
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  return formattedDate;
};

/**
 * Converts an ISO date string to a time-only format (HH:mm:ss AM/PM).
 *
 * @description
 * Intent: Extracts and formats only the time portion from a datetime string.
 *
 * @param {string} dateString - ISO 8601 date string.
 * @returns {string} Formatted time string, or "-" if input is falsy.
 */
export const convertTime = (dateString: string) => {
  if (!dateString) {
    return "-";
  }
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    minute: "numeric",
    hour: "numeric",
    hour12: true,
    second: "numeric",
  };
  const formattedDate = date.toLocaleTimeString("en-GB", options);
  return formattedDate;
};

/**
 * Converts a local datetime string to a UTC-formatted string (YYYY-MM-DD HH:mm:ss).
 *
 * @description
 * Intent: Normalizes datetime values to UTC before sending to the backend,
 * ensuring consistent server-side storage regardless of client timezone.
 *
 * Usage: Called before API submissions that include datetime fields.
 *
 * @param {string} datetime - Local datetime string parseable by Date constructor.
 * @returns {string} UTC-formatted string in "YYYY-MM-DD HH:mm:ss" format.
 */
export const convertDateTimeToUTC = (datetime: string) => {
  const date = new Date(datetime);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() < 9 ? `0${date.getUTCMonth() + 1}` : (date.getUTCMonth() + 1).toString();
  const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate().toString();
  const hour = date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours().toString();
  const minutes = date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes().toString();
  const seconds = date.getUTCSeconds() < 10 ? `0${date.getUTCSeconds()}` : date.getUTCSeconds().toString();
  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}