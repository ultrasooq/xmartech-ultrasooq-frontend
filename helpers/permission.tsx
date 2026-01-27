/**
 * @fileoverview Permission checking utilities for the Ultrasooq marketplace.
 *
 * Provides helper functions to verify whether the current user (obtained
 * from {@link useAuth}) has a specific permission. These are designed to be
 * called from within React components or custom hooks, since they internally
 * invoke the `useAuth` hook.
 *
 * **Important:** Because these functions call `useAuth()`, they must follow
 * the Rules of Hooks -- they can only be used at the top level of a React
 * component or another custom hook.
 *
 * @module helpers/permission
 */

import { useAuth } from "@/context/AuthContext"

/**
 * Permission name constant for the Dashboard feature.
 * @constant {string}
 */
export const PERMISSION_DASHBOARD = "Dashboard";

/**
 * Permission name constant for the Team Members feature.
 * @constant {string}
 */
export const PERMISSION_TEAM_MEMBERS = "Team Member";

/**
 * Permission name constant for the Product management feature.
 * @constant {string}
 */
export const PERMISSION_PRODUCTS = "Product";

/**
 * Permission name constant for the Service management feature.
 * @constant {string}
 */
export const PERMISSION_SERVICES = "Service";

/**
 * Permission name constant for the Order management feature.
 * @constant {string}
 */
export const PERMISSION_ORDERS = "Order";

/**
 * Permission name constant for the RFQ Quotes feature.
 * @constant {string}
 */
export const PERMISSION_RFQ_QUOTES = "RFQ Quotes";

/**
 * Permission name constant for the RFQ Seller Requests feature.
 * @constant {string}
 */
export const PERMISSION_RFQ_SELLER_REQUESTS = "RFQ Seller Requests";

/**
 * Permission name constant for the Seller Reward feature.
 * @constant {string}
 */
export const PERMISSION_SELLER_REWARDS = "Seller Reward";

/**
 * Permission name constant for the Shared Link feature.
 * @constant {string}
 */
export const PERMISSION_SHARE_LINKS = "Shared Link";

/**
 * Permission name constant for the Message System feature.
 * @constant {string}
 */
export const PERMISSION_MESSAGE_SYSTEM = "Message System";

/**
 * Checks whether the current user has a specific permission.
 *
 * - Non-MEMBER users (e.g. main account holders) are granted all permissions
 *   automatically and this function returns `true`.
 * - MEMBER users (sub-accounts / team members) must have a matching
 *   `permissionDetail.name` entry in their permissions array.
 *
 * **Note:** This function calls `useAuth()` internally and therefore must
 * only be invoked from within a React component or custom hook body.
 *
 * @param {string} permissionName - The permission name to check (use one of the
 *   `PERMISSION_*` constants exported from this module).
 * @returns {boolean} `true` if the user has the specified permission; `false` otherwise.
 *
 * @example
 * ```tsx
 * const canViewProducts = checkPermission(PERMISSION_PRODUCTS);
 * if (!canViewProducts) return <AccessDenied />;
 * ```
 */
export const checkPermission = (permissionName: string): boolean => {
    const { user, permissions } = useAuth();

    if (user?.tradeRole != 'MEMBER') return true;

    if (user?.tradeRole == 'MEMBER' && !permissions.find((permission: any) => permission.permissionDetail?.name == permissionName)) {
        return false;
    }

    return true;
}

/**
 * Returns an array of permission name strings for the current user.
 *
 * Filters the user's permissions array to only include entries that have
 * a valid `permissionDetail` object, then maps each to its `.name` field.
 *
 * **Note:** This function calls `useAuth()` internally and therefore must
 * only be invoked from within a React component or custom hook body.
 *
 * @returns {string[]} Array of permission name strings the user holds.
 *
 * @example
 * ```tsx
 * const permissionNames = getPermissions();
 * // ["Dashboard", "Product", "Order"]
 * ```
 */
export const getPermissions = (): string[] => {
    const { user, permissions } = useAuth();

    return permissions
        .filter((permission: any) => permission.permissionDetail)
        .map((permission: any) => permission.permissionDetail.name);
};
