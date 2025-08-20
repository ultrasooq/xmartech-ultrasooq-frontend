import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";

export interface UserStatus {
  isActive: boolean;
  isInactive: boolean;
  isSuspended: boolean;
  status: string;
}

/**
 * Check if a user has an allowed status
 * @param userStatus - The user's current status
 * @param allowedStatuses - Array of allowed statuses
 * @returns boolean indicating if access is allowed
 */
export const isStatusAllowed = (
  userStatus: string,
  allowedStatuses: string[],
): boolean => {
  return allowedStatuses.includes(userStatus);
};

/**
 * Get user status information from the current user data
 * @param userData - User data from API response
 * @returns UserStatus object with boolean flags
 */
export const getUserStatusInfo = (userData: any): UserStatus => {
  const status = userData?.data?.status || "UNKNOWN";

  return {
    isActive: status === "ACTIVE",
    isInactive: status === "INACTIVE",
    isSuspended: status === "SUSPENDED",
    status,
  };
};

/**
 * Check if user is authenticated (has token)
 * @returns boolean indicating if user has access token
 */
export const isAuthenticated = (): boolean => {
  return !!getCookie(PUREMOON_TOKEN_KEY);
};

/**
 * Get protected route configuration
 * @param routeName - Name of the route
 * @returns Route protection configuration
 */
export const getRouteProtection = (routeName: string) => {
  const routeConfig: Record<
    string,
    { allowedStatuses: string[]; redirectTo: string }
  > = {
    "manage-products": { allowedStatuses: ["ACTIVE"], redirectTo: "/home" },
    "manage-services": { allowedStatuses: ["ACTIVE"], redirectTo: "/home" },
    "team-members": { allowedStatuses: ["ACTIVE"], redirectTo: "/home" },
    "seller-orders": { allowedStatuses: ["ACTIVE"], redirectTo: "/home" },
    "rfq-quotes": { allowedStatuses: ["ACTIVE"], redirectTo: "/home" },
    "seller-rfq-request": {
      allowedStatuses: ["ACTIVE"],
      redirectTo: "/home",
    },
    "seller-rewards": { allowedStatuses: ["ACTIVE"], redirectTo: "/home" },
    "share-links": { allowedStatuses: ["ACTIVE"], redirectTo: "/home" },
    "my-settings": {
      allowedStatuses: ["ACTIVE", "INACTIVE"],
      redirectTo: "/home",
    },
    transactions: { allowedStatuses: ["ACTIVE"], redirectTo: "/home" },
    queries: { allowedStatuses: ["ACTIVE"], redirectTo: "/home" },
    "vendor-dashboard": { allowedStatuses: ["ACTIVE"], redirectTo: "/home" },
  };

  return (
    routeConfig[routeName] || {
      allowedStatuses: ["ACTIVE"],
      redirectTo: "/home",
    }
  );
};
