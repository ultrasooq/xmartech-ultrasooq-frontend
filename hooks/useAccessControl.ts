/**
 * @fileoverview Custom hook for role- and status-based access control.
 *
 * Derives a comprehensive set of access-control flags from the current user's
 * account status. Checks are memoised so that consuming components only
 * re-render when the underlying status or account data actually changes.
 *
 * Relies on:
 * - {@link useMe} -- React Query hook for the `/me` endpoint.
 * - {@link useCurrentAccount} -- React Query hook for the active sub-account.
 * - Utility functions from `@/utils/statusCheck` for route and access-level checks.
 *
 * @module hooks/useAccessControl
 */

import { useMemo } from "react";
import { useMe } from "@/apis/queries/user.queries";
import { useCurrentAccount } from "@/apis/queries/auth.queries";
import {
  hasRouteAccess,
  hasLimitedAccess,
  hasFullAccess,
  getStatusConfig,
} from "@/utils/statusCheck";

/**
 * Provides granular, memoised access-control flags for the authenticated user.
 *
 * The hook resolves the user's effective status from the current sub-account
 * first, falling back to the `/me` endpoint, and finally defaulting to
 * `"WAITING"` if neither source is available yet.
 *
 * @returns {Object} An object containing:
 *
 * **Status checks**
 * @returns {boolean} return.isActive - `true` when status is `"ACTIVE"`.
 * @returns {boolean} return.isWaiting - `true` when status is `"WAITING"`.
 * @returns {boolean} return.isInactive - `true` when status is `"INACTIVE"`.
 * @returns {boolean} return.isRejected - `true` when status is `"REJECT"`.
 *
 * **Access-level checks**
 * @returns {boolean} return.hasFullAccess - `true` when the user has unrestricted access.
 * @returns {boolean} return.hasLimitedAccess - `true` when the user has limited (non-ACTIVE) access.
 *
 * **Route access**
 * @returns {(routeName: string) => boolean} return.canAccessRoute - Checks whether the user may navigate to the named route.
 *
 * **Feature access (requires ACTIVE status)**
 * @returns {boolean} return.canManageProducts
 * @returns {boolean} return.canManageServices
 * @returns {boolean} return.canAccessOrders
 * @returns {boolean} return.canAccessRFQ
 * @returns {boolean} return.canAccessDashboard
 * @returns {boolean} return.canAccessTransactions
 * @returns {boolean} return.canAccessQueries
 * @returns {boolean} return.canAccessTeamMembers
 * @returns {boolean} return.canAccessShareLinks
 * @returns {boolean} return.canAccessSellerRewards
 *
 * **Profile / settings access (ACTIVE, WAITING, or INACTIVE)**
 * @returns {boolean} return.canAccessProfile
 * @returns {boolean} return.canAccessSettings
 * @returns {boolean} return.canAccessAccounts
 *
 * **Status-specific actions**
 * @returns {boolean} return.canCreateSubAccounts - Only ACTIVE users may create sub-accounts.
 * @returns {boolean} return.canSwitchAccounts - Only ACTIVE users may switch accounts.
 * @returns {boolean} return.canEditProfile - Allowed for ACTIVE, WAITING, and INACTIVE users.
 *
 * **Metadata**
 * @returns {string} return.userStatus - The raw status string.
 * @returns {Object} return.statusConfig - Configuration object from {@link getStatusConfig}.
 * @returns {Object | undefined} return.currentAccount - The current account object, if available.
 * @returns {boolean | undefined} return.isMainAccount - Whether the active account is the main account.
 *
 * @example
 * ```tsx
 * const { canManageProducts, isActive, canAccessRoute } = useAccessControl();
 *
 * if (!canAccessRoute("orders")) {
 *   return <AccessDenied />;
 * }
 * ```
 */
export const useAccessControl = () => {
  const { data: me } = useMe();
  const { data: currentAccount } = useCurrentAccount();

  /**
   * Resolves the effective user status.
   * Priority: current sub-account status > /me endpoint status > "WAITING" fallback.
   */
  const userStatus = useMemo(() => {
    if (currentAccount?.data?.account?.status) {
      return currentAccount.data.account.status;
    }
    if (me?.data?.data?.status) {
      return me.data.data.status;
    }
    return "WAITING"; // Default fallback
  }, [currentAccount, me?.data?.data]);

  /** Memoised status configuration derived from the effective status. */
  const statusConfig = useMemo(() => {
    return getStatusConfig(userStatus);
  }, [userStatus]);

  /** Memoised access-control flag object. */
  const accessControl = useMemo(() => {
    return {
      // Status checks
      isActive: userStatus === "ACTIVE",
      isWaiting: userStatus === "WAITING",
      isInactive: userStatus === "INACTIVE",
      isRejected: userStatus === "REJECT",

      // Access level checks
      hasFullAccess: hasFullAccess(userStatus),
      hasLimitedAccess: hasLimitedAccess(userStatus),

      // Route access checks
      canAccessRoute: (routeName: string) =>
        hasRouteAccess(userStatus, routeName),

      // Feature access checks
      canManageProducts: userStatus === "ACTIVE",
      canManageServices: userStatus === "ACTIVE",
      canAccessOrders: userStatus === "ACTIVE",
      canAccessRFQ: userStatus === "ACTIVE",
      canAccessDashboard: userStatus === "ACTIVE",
      canAccessTransactions: userStatus === "ACTIVE",
      canAccessQueries: userStatus === "ACTIVE",
      canAccessTeamMembers: userStatus === "ACTIVE",
      canAccessShareLinks: userStatus === "ACTIVE",
      canAccessSellerRewards: userStatus === "ACTIVE",

      // Profile and settings access
      canAccessProfile: ["ACTIVE", "WAITING", "INACTIVE"].includes(userStatus),
      canAccessSettings: ["ACTIVE", "WAITING", "INACTIVE"].includes(userStatus),
      canAccessAccounts: ["ACTIVE", "WAITING", "INACTIVE"].includes(userStatus),

      // Status-specific actions
      canCreateSubAccounts: userStatus === "ACTIVE",
      canSwitchAccounts: userStatus === "ACTIVE",
      canEditProfile: ["ACTIVE", "WAITING", "INACTIVE"].includes(userStatus),

      // Current user info
      userStatus,
      statusConfig,
      currentAccount: currentAccount?.data?.account,
      isMainAccount: currentAccount?.data?.isMainAccount,
    };
  }, [userStatus, statusConfig, currentAccount]);

  return accessControl;
};
