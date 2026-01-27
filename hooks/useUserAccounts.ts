/**
 * @fileoverview Custom hook for batch-fetching user account data by ID.
 *
 * Given an array of user IDs, this hook fetches each user's profile from
 * the API in parallel and returns a `Map<number, UserAccount>` keyed by
 * user ID. Failed individual fetches fall back to a placeholder account
 * so the UI always has something to render.
 *
 * @module hooks/useUserAccounts
 */

import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "@/apis/requests/user.requests";
import { useMemo, useState, useEffect } from "react";

/**
 * Shape of a resolved user account record.
 *
 * @interface UserAccount
 * @property {number} id - User ID.
 * @property {string} firstName - First name.
 * @property {string} lastName - Last name.
 * @property {string} accountName - Display-friendly account name.
 * @property {string} email - Email address.
 * @property {string} phoneNumber - Phone number.
 * @property {string | null} profilePicture - URL to the profile picture, or `null`.
 * @property {string} tradeRole - Marketplace role (e.g. "VENDOR").
 * @property {any[]} userProfile - Extended profile information.
 */
interface UserAccount {
  id: number;
  firstName: string;
  lastName: string;
  accountName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string | null;
  tradeRole: string;
  userProfile: any[];
}

/**
 * Fetches user account data for a list of user IDs in parallel.
 *
 * On individual fetch failure, a fallback placeholder account is generated
 * so the map is always fully populated for the requested IDs.
 *
 * @param {number[]} userIds - Array of user IDs to fetch.
 * @returns {Object} Result object.
 * @returns {Map<number, UserAccount>} return.usersMap - A map from user ID to the resolved account data.
 * @returns {boolean} return.isLoading - `true` while any fetch is in-flight.
 * @returns {any} return.error - The error object if the entire batch fails, otherwise `null`.
 *
 * @example
 * ```ts
 * const { usersMap, isLoading } = useUserAccounts([1, 2, 3]);
 * const user = usersMap.get(1);
 * console.log(user?.firstName);
 * ```
 */
export const useUserAccounts = (userIds: number[]) => {
  /** Map of user ID to resolved {@link UserAccount} objects. */
  const [usersData, setUsersData] = useState<Map<number, UserAccount>>(
    new Map(),
  );
  /** Whether the batch fetch is currently in progress. */
  const [isLoading, setIsLoading] = useState(false);
  /** Error object from the batch-level catch, if any. */
  const [error, setError] = useState<any>(null);

  /**
   * Effect that triggers parallel user fetches whenever the `userIds` array
   * changes. Each user ID is fetched independently via {@link fetchUserById}.
   *
   * On per-user failure, a placeholder {@link UserAccount} is generated so
   * the resulting map is always complete for the requested IDs.
   */
  useEffect(() => {
    const fetchUsers = async () => {
      if (userIds.length === 0) return;

      setIsLoading(true);
      setError(null);

      try {
        const userPromises = userIds.map(async (userId) => {
          try {
            const response = await fetchUserById({ userId });
            if (response.data?.data) {
              const userData = response.data.data;
              return {
                userId,
                data: {
                  id: userId,
                  firstName: userData.firstName || "",
                  lastName: userData.lastName || "",
                  accountName: userData.accountName || `Account ${userId}`,
                  email: userData.email || "",
                  phoneNumber: userData.phoneNumber || "",
                  profilePicture: userData.profilePicture || null,
                  tradeRole: userData.tradeRole || "VENDOR",
                  userProfile: userData.userProfile || [],
                },
              };
            }
            return null;
          } catch (err) {
            return {
              userId,
              data: {
                id: userId,
                firstName: `Account`,
                lastName: `${userId}`,
                accountName: `Account ${userId}`,
                email: `account${userId}@example.com`,
                phoneNumber: "",
                profilePicture: null,
                tradeRole: "VENDOR",
                userProfile: [],
              },
            };
          }
        });

        const results = await Promise.all(userPromises);
        const newUsersMap = new Map<number, UserAccount>();

        results.forEach((result) => {
          if (result) {
            newUsersMap.set(result.userId, result.data);
          }
        });

        setUsersData(newUsersMap);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [userIds]);

  return {
    usersMap: usersData,
    isLoading,
    error,
  };
};
