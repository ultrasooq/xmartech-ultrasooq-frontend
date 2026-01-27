/**
 * @fileoverview TanStack React Query hooks for product categories.
 *
 * Provides hooks to fetch a single category, all top-level categories,
 * and sub-categories under a given parent category.
 *
 * @module queries/category
 */

import { useQuery } from "@tanstack/react-query";
import {
  fetchCategories,
  fetchCategory,
  fetchSubCategoriesById,
} from "../requests/category.requests";

/**
 * Query hook that fetches a single category by its ID.
 *
 * @param categoryId - The unique identifier of the category to retrieve.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the category details.
 *
 * @remarks
 * Query key: `["category", categoryId]`
 * Endpoint: Delegated to `fetchCategory` in category.requests.
 */
export const useCategory = (categoryId?: string, enabled = true) =>
  useQuery({
    queryKey: ["category", categoryId],
    queryFn: async () => {
      const res = await fetchCategory({ categoryId });
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook that fetches all top-level categories.
 *
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the list of categories.
 *
 * @remarks
 * Query key: `["categories"]`
 * Endpoint: Delegated to `fetchCategories` in category.requests.
 */
export const useCategories = (enabled = true) =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetchCategories();
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook that fetches sub-categories belonging to a parent category.
 *
 * @param id - The parent category ID whose sub-categories are requested.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the list of sub-categories.
 *
 * @remarks
 * Query key: `["sub-category-by-id", id]`
 * Endpoint: Delegated to `fetchSubCategoriesById` in category.requests.
 */
export const useSubCategoryById = (id: string, enabled = true) =>
  useQuery({
    queryKey: ["sub-category-by-id", id],
    queryFn: async () => {
      const res = await fetchSubCategoriesById({ categoryId: id });
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });
