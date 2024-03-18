export const PUREMOON_TOKEN_KEY: string = "puremoon_accessToken";
export const PUREMOON_TEMP_TOKEN_KEY: string = "puremoon_temp_accessToken";

export const DAYS_OF_WEEK: {
  label: string;
  value: string;
}[] = [
  {
    label: "Sun",
    value: "sun",
  },
  {
    label: "Mon",
    value: "mon",
  },
  {
    label: "Tues",
    value: "tue",
  },
  {
    label: "Wed",
    value: "wed",
  },
  {
    label: "Thurs",
    value: "thu",
  },
  {
    label: "Fri",
    value: "fri",
  },
  {
    label: "Sat",
    value: "sat",
  },
];

export const SOCIAL_MEDIA_LIST: { type: string; icon: string }[] = [
  {
    type: "facebook",
    icon: "/images/social-facebook-icon.svg",
  },
  {
    type: "twitter",
    icon: "/images/social-twitter-icon.svg",
  },
  {
    type: "instagram",
    icon: "/images/social-instagram-icon.svg",
  },
  {
    type: "linkedIn",
    icon: "/images/social-linkedin-icon.svg",
  },
];

export const SOCIAL_MEDIA_ICON: Record<string, string> = {
  facebook: "/images/social-facebook-icon.svg",
  twitter: "/images/social-twitter-icon.svg",
  instagram: "/images/social-instagram-icon.svg",
  linkedIn: "/images/social-linkedin-icon.svg",
};

export const TAG_LIST: { label: string; value: string }[] = [
  { label: "online shope", value: "online_shope" },
  { label: "manufacturer / factory", value: "manufacturer_factory" },
  { label: "trading company", value: "trading_company" },
  { label: "distributor / wholesaler", value: "distributor_wholesaler" },
  { label: "retailer", value: "retailer" },
  { label: "individual", value: "individual" },
  { label: "other", value: "other" },
  { label: "service provider", value: "service_provider" },
];

export const BUSINESS_TYPE_LIST: { label: string; value: string }[] = [
  { label: "individual", value: "individual" },
  { label: "other", value: "other" },
  { label: "service provider", value: "service_provider" },
];

export const DAYS_NAME_LIST: { [key: string]: string } = {
  sun: "Sunday",
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
};

export const FREELANCER_UNIQUE_ID = "PUREFW";
export const COMPANY_UNIQUE_ID = "PUREFC";

export const WEEKDAYS_LIST = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const EMAIL_REGEX_LOWERCASE = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

export const HOURS_24_FORMAT = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];
