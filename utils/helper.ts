import { DAYS_NAME_LIST, WEEKDAYS_LIST } from "./constants";

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
  const ampm = hours >= 12 ? "pm" : "am";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes} ${ampm}`;
};

export const getCurrentDay = () => {
  const date = new Date();
  const day = date.getDay();
  return WEEKDAYS_LIST[day];
};
