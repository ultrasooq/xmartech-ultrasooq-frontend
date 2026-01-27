/**
 * @fileoverview Custom hook for resolving a vendor's business category IDs.
 *
 * Employs a two-method strategy to obtain the category IDs:
 * 1. **Token-based** -- Uses {@link useUserBusinessCategories}, which reads the
 *    authenticated user's business categories from a token-scoped API endpoint.
 *    This works correctly with the current sub-account context.
 * 2. **User-ID-based** (fallback) -- Uses {@link useUniqueUser} to look up the
 *    user by their numeric ID and extract `userBusinesCategoryDetail`.
 *
 * Returns an empty array when the user is not a vendor or has no associated
 * business categories.
 *
 * @module hooks/useVendorBusinessCategories
 */

import { useMemo } from "react";
import { useUniqueUser, useUserBusinessCategories } from "@/apis/queries/user.queries";
import { useAuth } from "@/context/AuthContext";
import { useCurrentAccount } from "@/apis/queries/auth.queries";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";

/**
 * Hook to get vendor's business category IDs
 * Returns empty array if user is not a vendor or has no business categories
 * Uses current account's user ID for multi-account support
 * Tries multiple methods: useUserBusinessCategories (token-based) and useUniqueUser (userId-based)
 *
 * @returns {number[]} An array of category IDs associated with the vendor's
 *   business profile. Returns `[]` when no categories are found.
 *
 * @example
 * ```ts
 * const categoryIds = useVendorBusinessCategories();
 * // categoryIds: [12, 34, 56]
 * ```
 */
export const useVendorBusinessCategories = () => {
  const { user } = useAuth();
  const currentAccount = useCurrentAccount();
  /** Access token cookie used to determine if Method 1 can be attempted. */
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);

  /**
   * Method 1: Token-based query.
   * Enabled when an access token cookie is present.
   * Returns the business categories scoped to the currently active sub-account.
   */
  const userBusinessCategoriesQuery = useUserBusinessCategories(!!accessToken);

  /**
   * Method 2: User-ID-based query (fallback).
   * Resolves the user ID from the current sub-account or the main user,
   * supporting multi-account scenarios.
   */
  const account = currentAccount?.data?.data?.account;
  const userId = account?.userId
    ? Number(account.userId)
    : (account?.id && !currentAccount?.data?.data?.isMainAccount)
      ? Number(account.id) // For sub-accounts, use account id if userId is not available
      : (user?.id ? Number(user.id) : undefined);

  const uniqueUser = useUniqueUser(
    { userId },
    !!userId
  );

  /**
   * Memoised derivation of category IDs.
   *
   * Attempts Method 1 first (token-based). If it yields results, those are
   * returned immediately. Otherwise falls back to Method 2 (user-ID-based)
   * and extracts IDs from `userBusinesCategoryDetail`.
   */
  const businessCategoryIds = useMemo(() => {
    // Try Method 1 first: useUserBusinessCategories (token-based)
    if (userBusinessCategoriesQuery?.data?.data) {
      const categories = userBusinessCategoriesQuery.data.data;
      // Backend now returns an array of UserBusinessCategory objects with categoryId
      // Extract category IDs from the response
      const categoryIds = Array.isArray(categories)
        ? categories.map((cat: any) => cat.categoryId || cat.id).filter(Boolean)
        : [];
      if (categoryIds.length > 0) {
        return categoryIds;
      }
    }

    // Fallback to Method 2: useUniqueUser
    if (!uniqueUser?.data?.data?.userBusinesCategoryDetail) {
      return [];
    }

    const categoryIds = uniqueUser.data.data.userBusinesCategoryDetail.map(
      (category: any) => category.categoryId
    );

    return categoryIds;
  }, [
    userBusinessCategoriesQuery?.data?.data,
    uniqueUser?.data?.data?.userBusinesCategoryDetail
  ]);

  return businessCategoryIds;
};
