export const PUREMOON_TOKEN_KEY: string = "puremoon_accessToken";

export const DAYS_OF_WEEK: string[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
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
