import { DAYS_NAME_LIST, WEEKDAYS_LIST } from "./constants";
import countryCodes, { CountryProperty } from "country-codes-list";

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

export const getInitials = (firstName: string, lastName: string) => {
  const firstInitial = firstName?.charAt(0) || "";
  const lastInitial = lastName?.charAt(0) || "";
  return `${firstInitial}${lastInitial}`;
};

export const getAmPm = (time: string) => {
  if (!time) return;
  const [hoursStr, minutes] = time.split(":");
  const hours = parseInt(hoursStr, 10);
  const ampm = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes} ${ampm}`;
};

export const getCurrentDay = () => {
  const date = new Date();
  const day = date.getDay();
  return WEEKDAYS_LIST[day];
};

export const countryObjs = countryCodes.customList(
  "countryNameEn" as CountryProperty.countryNameEn,
  "+{countryCallingCode}",
);

export const getCurrentTime = new Date().toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: false,
});

export const getLastTwoHundredYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 200; i++) {
    years.push(currentYear - i);
  }
  return years;
};

export const generateDeviceId = () => {
  const timestamp = new Date().getTime();
  const randomString =
    Math.random().toString(36).substring(2, 10) +
    Math.random().toString(36).substring(2, 10);
  const deviceId = `device_${timestamp}_${randomString}`;
  return deviceId;
};

export const isBrowser = (): boolean => {
  return typeof window !== "undefined";
};

export const getOrCreateDeviceId = () => {
  if (!isBrowser()) return;
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = generateDeviceId();
    localStorage.setItem("deviceId", deviceId);
  }
  return deviceId;
};

export const getLoginType = () => {
  if (!isBrowser()) return;
  return localStorage.getItem("loginType");
};

export const stripHTML = (text: string) => {
  return text.replace(/<[^>]*>/g, "");
};

export const generateRandomSkuNoWithTimeStamp = () => new Date().getTime();
