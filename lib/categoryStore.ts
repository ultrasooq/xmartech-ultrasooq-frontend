/**
 * @fileoverview Zustand store for category navigation state.
 *
 * Manages the multi-level category hierarchy used across the marketplace
 * (top-level categories, sub-categories, and sub-sub-categories). Stores
 * the currently selected indices and parent names so that breadcrumb and
 * filter UI components can stay in sync.
 *
 * This store is **not** persisted -- category selections reset on page reload.
 *
 * @module lib/categoryStore
 */

import { create } from "zustand";

/**
 * Shape of the category store state.
 *
 * @export
 * @typedef {Object} State
 * @property {any[]} subCategories - The list of second-level (sub) categories currently loaded.
 * @property {any[]} subSubCategories - The list of third-level (sub-sub) categories currently loaded.
 * @property {string} [categoryId] - The currently selected top-level category ID (stringified).
 * @property {string} [categoryIds] - Comma-separated category ID string used for multi-select filtering.
 * @property {number} [subCategoryIndex] - Index of the selected sub-category within {@link subCategories}.
 * @property {number} [secondLevelCategoryIndex] - Index of the selected second-level category.
 * @property {string} [subCategoryParentName] - Display name of the parent of the current sub-category.
 * @property {string} [subSubCategoryParentName] - Display name of the parent of the current sub-sub-category.
 */
export type State = {
  subCategories: any[];
  subSubCategories: any[];
  categoryId?: string;
  categoryIds?: string;
  subCategoryIndex?: number;
  secondLevelCategoryIndex?: number;
  subCategoryParentName?: string;
  subSubCategoryParentName?: string;
};

/**
 * Actions available on the category store.
 *
 * @export
 * @typedef {Object} Actions
 * @property {(data: any[]) => void} setSubCategories - Replaces the sub-categories array.
 * @property {(data: any[]) => void} setSubSubCategories - Replaces the sub-sub-categories array.
 * @property {(data: string) => void} setCategoryId - Sets the selected top-level category ID.
 * @property {(data: string) => void} setCategoryIds - Sets the comma-separated category IDs string.
 * @property {(data: number) => void} setSubCategoryIndex - Sets the selected sub-category index.
 * @property {(data: number) => void} setSecondLevelCategoryIndex - Sets the selected second-level category index.
 * @property {(data: string) => void} setSubCategoryParentName - Sets the sub-category parent display name.
 * @property {(data: string) => void} setSubSubCategoryParentName - Sets the sub-sub-category parent display name.
 */
export type Actions = {
  setSubCategories: (data: any[]) => void;
  setSubSubCategories: (data: any[]) => void;
  setCategoryId: (data: string) => void;
  setCategoryIds: (data: string) => void;
  setSubCategoryIndex: (data: number) => void;
  setSecondLevelCategoryIndex: (data: number) => void;
  setSubCategoryParentName: (data: string) => void;
  setSubSubCategoryParentName: (data: string) => void;
};

/**
 * Default / empty category state used to initialise the store.
 *
 * @constant
 * @type {State}
 */
export const initialCategoryState: State = {
  subCategories: [],
  subSubCategories: [],
  categoryId: undefined,
  categoryIds: undefined,
  subCategoryIndex: undefined,
  secondLevelCategoryIndex: 0,
  subCategoryParentName: undefined,
  subSubCategoryParentName: undefined,
};

/**
 * Zustand store hook for category navigation state.
 *
 * Each setter merges the updated field into the existing state via the
 * spread operator, preserving other fields.
 *
 * @example
 * ```ts
 * const { subCategories, setSubCategories, setCategoryId } = useCategoryStore();
 * setCategoryId("42");
 * setSubCategories(fetchedSubCategories);
 * ```
 */
export const useCategoryStore = create<State & Actions>()((set) => ({
  subCategories: initialCategoryState.subCategories,
  subSubCategories: initialCategoryState.subSubCategories,
  setSubCategories: (data) =>
    set((state) => ({ ...state, subCategories: data })),
  setSubSubCategories: (data) =>
    set((state) => ({ ...state, subSubCategories: data })),
  setCategoryId: (data) => set((state) => ({ ...state, categoryId: data })),
  setCategoryIds: (data) => set((state) => ({ ...state, categoryIds: data })),
  setSubCategoryIndex: (data) =>
    set((state) => ({ ...state, subCategoryIndex: data })),
  setSecondLevelCategoryIndex: (data) =>
    set((state) => ({ ...state, secondLevelCategoryIndex: data })),
  setSubCategoryParentName: (data) =>
    set((state) => ({ ...state, subCategoryParentName: data })),
  setSubSubCategoryParentName: (data) =>
    set((state) => ({ ...state, subSubCategoryParentName: data })),
}));
