/**
 * @fileoverview Application-wide constants for the Ultrasooq marketplace frontend.
 *
 * Contains token storage keys, lookup lists (days, social media, tags,
 * business types, delivery statuses), regex patterns, menu and category IDs,
 * i18n/currency configs, user-status system configuration, product type
 * constants, and WhatsApp support settings.
 *
 * @module utils/constants
 * @dependencies SVG icon imports from @/public/images.
 */

import HomeIcon from "@/public/images/menu-icon-home.svg";
import TrendingIcon from "@/public/images/menu-icon-trending.svg";
import BuyIcon from "@/public/images/menu-icon-buy.svg";
import PosIcon from "@/public/images/menu-icon-pos.svg";
import RfqIcon from "@/public/images/menu-icon-rfq.svg";
import ServiceIcon from "@/public/images/menu-icon-service.svg";

/**
 * Cookie key used to store the user's primary JWT access token.
 * @const {string}
 */
export const PUREMOON_TOKEN_KEY: string = "puremoon_accessToken";

/**
 * Cookie key used to store a temporary JWT token during OTP verification flows.
 * @const {string}
 */
export const PUREMOON_TEMP_TOKEN_KEY: string = "puremoon_temp_accessToken";

/**
 * Days of the week as label/value pairs for form selectors.
 *
 * @description
 * Intent: Provides abbreviated day names for working-day checkboxes
 * in branch office schedule forms.
 *
 * Usage: Consumed by the working days multi-select in profile/branch forms.
 *
 * @const
 */
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

/**
 * Available social media platforms with their labels, values, and icon paths.
 *
 * @description
 * Intent: Provides the list of supported social media platforms for
 * user profile social link sections.
 *
 * Usage: Consumed by the social links form in buyer/company/freelancer profiles.
 *
 * @const
 */
export const SOCIAL_MEDIA_LIST: {
  label: string;
  value: string;
  icon: string;
}[] = [
  {
    label: "Facebook",
    value: "facebook",
    icon: "/images/social-facebook-icon.svg",
  },
  {
    label: "Twitter",
    value: "twitter",
    icon: "/images/social-twitter-icon.svg",
  },
  {
    label: "Instagram",
    value: "instagram",
    icon: "/images/social-instagram-icon.svg",
  },
  {
    label: "LinkedIn",
    value: "linkedIn",
    icon: "/images/social-linkedin-icon.svg",
  },
];

/**
 * Lookup map from social media platform key to its icon SVG path.
 *
 * @description
 * Intent: Allows quick icon resolution by platform name when rendering
 * social links in profile displays.
 *
 * @const
 */
export const SOCIAL_MEDIA_ICON: Record<string, string> = {
  facebook: "/images/social-facebook-icon.svg",
  twitter: "/images/social-twitter-icon.svg",
  instagram: "/images/social-instagram-icon.svg",
  linkedIn: "/images/social-linkedin-icon.svg",
};

/**
 * Predefined tag list for vendor/freelancer profile classification.
 *
 * @description
 * Intent: Provides a fixed set of business classification tags that
 * vendors and freelancers can apply to their profiles and branches.
 *
 * @const
 */
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

/**
 * Subset of business types available for freelancer profile classification.
 *
 * @description
 * Intent: Provides a reduced set of business types specific to freelancer
 * profiles (compared to the full TAG_LIST used by companies).
 *
 * @const
 */
export const BUSINESS_TYPE_LIST: { label: string; value: string }[] = [
  { label: "individual", value: "individual" },
  { label: "other", value: "other" },
  { label: "service provider", value: "service_provider" },
];

/**
 * Mapping of abbreviated day keys to their full day names.
 *
 * @description
 * Intent: Resolves short day keys (e.g., "sun") to full names (e.g., "Sunday")
 * for display in working-hours sections.
 *
 * Usage: Used by the {@link parsedDays} helper in helper.ts.
 *
 * @const
 */
export const DAYS_NAME_LIST: { [key: string]: string } = {
  sun: "Sunday",
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
};

/** Prefix string for freelancer unique identifiers. @const */
export const FREELANCER_UNIQUE_ID = "PUREFW";
/** Prefix string for company unique identifiers. @const */
export const COMPANY_UNIQUE_ID = "PUREFC";
/** Prefix string for member unique identifiers. @const */
export const MEMBER_UNIQUE_ID = "PUREFM";

/**
 * Full weekday names indexed by JavaScript Date.getDay() return values.
 *
 * @description
 * Intent: Provides index-based day name lookup where Sunday = index 0.
 *
 * Usage: Used by the {@link getCurrentDay} helper in helper.ts.
 *
 * @const
 */
export const WEEKDAYS_LIST = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * Regex pattern for validating lowercase-only email addresses.
 * @description Enforces all-lowercase email format in form validation.
 * @const
 */
export const EMAIL_REGEX_LOWERCASE = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

/**
 * Regex pattern allowing only alphabetic characters and spaces.
 * @description Used for validating name fields that should not contain digits.
 * @const
 */
export const ALPHABETS_REGEX = /^[a-zA-Z\s]*$/;

/**
 * Regex pattern allowing alphanumeric characters and spaces.
 * @description Used for validating fields like SKU numbers or codes.
 * @const
 */
export const ALPHANUMERIC_REGEX = /^[0-9a-zA-Z\s]*$/;

/**
 * All half-hour time slots in 24-hour format (HH:mm).
 *
 * @description
 * Intent: Provides time slot options for business hours selectors in
 * branch office schedule forms.
 *
 * @const
 */
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

/**
 * Ordered array of SVG icon paths for the main navigation menu bar.
 *
 * @description
 * Intent: Maps menu items to their corresponding icons by array index.
 *
 * Usage: Consumed by the main navigation/menu bar component.
 *
 * @const
 */
export const menuBarIconList: string[] = [
  HomeIcon,
  TrendingIcon,
  BuyIcon,
  PosIcon,
  RfqIcon,
  ServiceIcon,
];

/**
 * Hardcoded admin bearer token for development/testing purposes.
 * @deprecated TODO: Remove before production. This is a development-only constant.
 * @const
 */
export const ADMIN_BEARER =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwic3ViIjoxLCJpYXQiOjE3MTAzMTI0NTksImV4cCI6MTc0MTg3MDA1OX0.XiU8kkLVYPBxZ5dy8tk8XP5ooVTrAJTvlOUfqbrLyHI";

/**
 * Available trade roles for user registration and account creation.
 *
 * @description
 * Intent: Provides label/value pairs for the trade role selector
 * during registration and account management.
 *
 * @const
 */
export const TRADE_ROLE_LIST: { label: string; value: string }[] = [
  {
    label: "Buyer",
    value: "BUYER",
  },
  {
    label: "Freelancer",
    value: "FREELANCER",
  },
  {
    label: "Company",
    value: "COMPANY",
  },
];

/**
 * Gender options for profile forms.
 * @const
 */
export const GENDER_LIST: { label: string; value: string }[] = [
  {
    label: "Male",
    value: "MALE",
  },
  {
    label: "Female",
    value: "FEMALE",
  },
];

/**
 * Employee count range options for company profile forms.
 *
 * @description
 * Intent: Provides predefined employee count ranges for company profiles.
 *
 * @const
 */
export const NO_OF_EMPLOYEES_LIST: { label: string; value: string }[] = [
  {
    label: "1-10",
    value: "1-10",
  },
  {
    label: "10-50",
    value: "10-50",
  },
  {
    label: "50-100",
    value: "50-100",
  },
  {
    label: "100-500",
    value: "100-500",
  },
  {
    label: "500+",
    value: "500+",
  },
];

/**
 * Input field type options for dynamic form builders.
 *
 * @description
 * Intent: Provides input type choices when configuring custom fields
 * in product specifications or forms.
 *
 * @const
 */
export const INPUT_TYPE_LIST: { label: string; value: string }[] = [
  {
    label: "Text",
    value: "text",
  },
  {
    label: "Number",
    value: "number",
  },
];

/**
 * Size options for UI layout configuration (e.g., form field widths).
 * @const
 */
export const SIZE_LIST: { label: string; value: string }[] = [
  {
    label: "Full",
    value: "full",
  },
  {
    label: "Small",
    value: "small",
  },
];

/**
 * Maps backend order status codes to frontend CSS class suffixes for buyer views.
 *
 * @description
 * Intent: Translates server-side order status strings into UI-friendly
 * class names for the order tracking stepper component.
 *
 * Usage: Used in the buyer's "My Orders" tracking view.
 *
 * @const
 */
export const DELIVERY_STATUS: { [key: string]: string } = {
  PLACED: "order_placed",
  CONFIRMED: "order_placed",
  SHIPPED: "order_shipped",
  OFD: "order_out_for_delivery",
  DELIVERED: "order_delivered",
  CANCELLED: "order_cancelled",
};

/**
 * Maps backend order status codes to frontend CSS class suffixes for seller views.
 *
 * @description
 * Intent: Seller-specific variant of DELIVERY_STATUS that omits the
 * "PLACED" status (sellers see orders starting from "CONFIRMED").
 *
 * Usage: Used in the seller's order management dashboard.
 *
 * @const
 */
export const SELLER_DELIVERY_STATUS: { [key: string]: string } = {
  CONFIRMED: "order_placed",
  SHIPPED: "order_shipped",
  OFD: "order_out_for_delivery",
  DELIVERED: "order_delivered",
  CANCELLED: "order_cancelled",
};

/**
 * Order status options for seller order-update dropdowns.
 *
 * @description
 * Intent: Provides the list of statuses a seller can set on an order.
 *
 * @const
 */
export const STATUS_LIST: { label: string; value: string }[] = [
  {
    label: "Confirmed",
    value: "CONFIRMED",
  },
  {
    label: "Shipped",
    value: "SHIPPED",
  },
  {
    label: "On the way",
    value: "OFD",
  },
  {
    label: "Delivered",
    value: "DELIVERED",
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
  },
];

/**
 * Formats an ISO date string into a short US-locale date (e.g., "Jan 15, 2024").
 *
 * @param {string} formatDate - ISO date string to format.
 * @returns {string} Formatted date string in "MMM D, YYYY" format.
 */
export const formattedDate = (formatDate: string) =>
  new Date(formatDate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

/**
 * Recognized video file extensions for media type detection.
 * @description Used by {@link isVideo} in helper.ts to determine if a file path is a video.
 * @const
 */
export const videoExtensions: string[] = ["mp4", "mkv", "avi", "mov", "wmv"];

/**
 * Recognized image file extensions for media type detection.
 * @description Used by {@link isImage} in helper.ts to determine if a file path is an image.
 * @const
 */
export const imageExtensions: string[] = [
  "png",
  "jpg",
  "jpeg",
  "gif",
  "bmp",
  "webp",
];

/**
 * Consumer type options for product pricing visibility.
 *
 * @description
 * Intent: Determines who can see a product's price -- consumers only,
 * vendors only, or everyone.
 *
 * Usage: Selected during product price creation to control visibility.
 *
 * @const
 */
export const CONSUMER_TYPE_LIST = [
  {
    label: "consumer",
    value: "CONSUMER",
  },
  {
    label: "vendor",
    value: "VENDORS",
  },
  {
    label: "everyone",
    value: "EVERYONE",
  },
];

/**
 * Product selling type options for price listing configuration.
 *
 * @description
 * Intent: Categorizes how a product is sold -- normal sale, buy-group
 * (collective buying), trial, or wholesale.
 *
 * @const
 */
export const SELL_TYPE_LIST = [
  {
    label: "normal_sell",
    value: "NORMALSELL",
  },
  {
    label: "buy_group",
    value: "BUYGROUP",
  },
  {
    label: "trial_product",
    value: "TRIAL_PRODUCT",
  },
  {
    label: "wholesale_product",
    value: "WHOLESALE_PRODUCT",
  },
];

/**
 * Delivery timeframe options (in days) for product listings.
 *
 * @description
 * Intent: Lets sellers specify how many days after order placement
 * they will deliver the product.
 *
 * @const
 */
export const DELIVER_AFTER_LIST = [
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
  {
    label: "3",
    value: 3,
  },
  {
    label: "4",
    value: 4,
  },
  {
    label: "5",
    value: 5,
  },
  {
    label: "6",
    value: 6,
  },
  {
    label: "7",
    value: 7,
  },
];

/**
 * Product condition options for product listings.
 *
 * @description
 * Intent: Indicates whether a product is new, used/old, or refurbished.
 *
 * @const
 */
export const PRODUCT_CONDITION_LIST = [
  {
    label: "new",
    value: "NEW",
  },
  {
    label: "old",
    value: "OLD",
  },
  {
    label: "refurbished",
    value: "REFURBISHED",
  },
];

/**
 * Abbreviated month names indexed 0-11 for date formatting.
 * @const
 */
export const MONTHS: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Predefined chat message templates for automated chat actions.
 *
 * @description
 * Intent: Provides canned message text for chat price-request scenarios.
 *
 * Usage: Inserted into chat when a user requests an offer price.
 *
 * @const
 */
export const CHAT_REQUEST_MESSAGE = {
  priceRequest: {
    value: "Requested for Offer Price ",
  },
};

/** Menu item ID for the Store section. @const */
export const STORE_MENU_ID = 8;
/** Menu item ID for the Buy Group section. @const */
export const BUYGROUP_MENU_ID = 9;
/** Menu item ID for the Factories section. @const */
export const FACTORIES_MENU_ID = 10;
/** Menu item ID for the RFQ section. @const */
export const RFQ_MENU_ID = 11;

/** Root category ID for product categories. @const */
export const PRODUCT_CATEGORY_ID = 4;
/** Root category ID for service categories. @const */
export const SERVICE_CATEGORY_ID = 6;
/** Root category ID for business type categories. @const */
export const BUSINESS_TYPE_CATEGORY_ID = 5;

/**
 * Supported application languages with locale codes and text direction.
 *
 * @description
 * Intent: Configures the i18n language switcher with available locales.
 * Arabic uses RTL direction; English uses LTR.
 *
 * @const
 */
export const LANGUAGES = [
  {
    locale: "en",
    name: "English",
    direction: "ltr",
  },
  {
    locale: "ar",
    name: "Arabic",
    direction: "rtl",
  },
];

/**
 * Supported currencies with their ISO codes and display symbols.
 *
 * @description
 * Intent: Provides currency configuration for price formatting across
 * the marketplace, including optional Arabic symbol variants.
 *
 * @const
 */
export const CURRENCIES = [
  {
    code: "INR",
    symbol: "₹",
  },
  {
    code: "USD",
    symbol: "$",
  },
  {
    code: "AUD",
    symbol: "$",
  },
  {
    code: "OMR",
    symbol: "OMR", // English symbol
    symbolAr: "يال عماني", // Arabic symbol
  },
];

/**
 * User status options as label/value pairs for dropdowns and filters.
 *
 * @description
 * Intent: Lists all possible user account statuses for admin management UIs.
 *
 * @const
 */
export const USER_STATUS_LIST = [
  { value: "WAITING", label: "Waiting" },
  { value: "ACTIVE", label: "Active" },
  { value: "REJECT", label: "Reject" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "WAITING_FOR_SUPER_ADMIN", label: "Waiting for Super Admin" },
];

/**
 * Full configuration for each user status including colors, icons, and
 * allowed administrative actions.
 *
 * @description
 * Intent: Provides all display metadata and permission flags for each
 * user status, enabling status badges, admin action buttons, and
 * conditional UI rendering.
 *
 * Usage: Consumed by status badge components, admin user management,
 * and the {@link getStatusConfig} function in statusCheck.ts.
 *
 * @const
 */
export const USER_STATUS_CONFIG = {
  WAITING: {
    label: "Waiting",
    value: "WAITING",
    color: "#ffc107",
    bgColor: "#fff3cd",
    textColor: "#856404",
    icon: "clock-o",
    canApprove: true,
    canReject: true,
    canDeactivate: true,
  },
  ACTIVE: {
    label: "Active",
    value: "ACTIVE",
    color: "#28a745",
    bgColor: "#d4edda",
    textColor: "#155724",
    icon: "check-circle",
    canApprove: false,
    canReject: true,
    canDeactivate: true,
  },
  REJECT: {
    label: "Rejected",
    value: "REJECT",
    color: "#dc3545",
    bgColor: "#f8d7da",
    textColor: "#721c24",
    icon: "times-circle",
    canApprove: true,
    canReject: false,
    canDeactivate: true,
  },
  INACTIVE: {
    label: "Inactive",
    value: "INACTIVE",
    color: "#6c757d",
    bgColor: "#e2e3e5",
    textColor: "#495057",
    icon: "ban",
    canApprove: true,
    canReject: false,
    canDeactivate: false,
  },
  WAITING_FOR_SUPER_ADMIN: {
    label: "Waiting for Super Admin",
    value: "WAITING_FOR_SUPER_ADMIN",
    color: "#17a2b8",
    bgColor: "#d1ecf1",
    textColor: "#0c5460",
    icon: "user-secret",
    canApprove: true,
    canReject: true,
    canDeactivate: true,
  },
};

/**
 * Default account status assigned to newly created sub-accounts.
 * @description New sub-accounts start in "WAITING" status until approved by an admin.
 * @const
 */
export const DEFAULT_SUB_ACCOUNT_STATUS = "WAITING";

/**
 * Product type code constants mapping human-readable names to single-character codes.
 *
 * @description
 * Intent: Provides a type-safe lookup for the product type discriminator
 * used in product creation and filtering.
 *
 * @const
 */
export const PRODUCT_TYPES = {
  NORMAL: "P",
  RFQ: "R",
  FACTORY: "F",
  DROPSHIP: "D",
} as const;

/**
 * Reverse mapping from product type codes to human-readable labels.
 *
 * @description
 * Intent: Allows display of the product type name given its single-character code.
 *
 * @const
 */
export const PRODUCT_TYPE_LABELS = {
  P: "Normal Product",
  R: "RFQ Product",
  F: "Factory Product",
  D: "Dropship Product",
} as const;

/**
 * WhatsApp support phone number for the floating help button.
 * @description Should include the country code without "+" (e.g., "201234567890" for Egypt).
 * @const
 */
export const WHATSAPP_SUPPORT_NUMBER = "1234567890"; // Replace with your admin's WhatsApp number (with country code, e.g., "201234567890" for Egypt)

/**
 * Default pre-filled message when opening WhatsApp support chat.
 * @const
 */
export const WHATSAPP_SUPPORT_MESSAGE = "Hello, I need help with Ultrasooq"; // Default message
