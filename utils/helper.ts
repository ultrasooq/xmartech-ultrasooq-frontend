import { DAYS_NAME_LIST } from "./constants";

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
