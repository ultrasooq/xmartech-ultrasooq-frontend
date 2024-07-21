import { create } from "zustand";

export type State = {
  subCategories: any[];
  subSubCategories: any[];
  categoryId?: string;
  subCategoryIndex?: number;
};

export type Actions = {
  setSubCategories: (data: any[]) => void;
  setSubSubCategories: (data: any[]) => void;
  setCategoryId: (data: string) => void;
  setSubCategoryIndex: (data: number) => void;
};

export const initialCategoryState: State = {
  subCategories: [],
  subSubCategories: [],
  categoryId: undefined,
  subCategoryIndex: undefined,
};

export const useCategoryStore = create<State & Actions>()((set) => ({
  subCategories: initialCategoryState.subCategories,
  subSubCategories: initialCategoryState.subSubCategories,
  setSubCategories: (data) =>
    set((state) => ({ ...state, subCategories: data })),
  setSubSubCategories: (data) =>
    set((state) => ({ ...state, subSubCategories: data })),
  setCategoryId: (data) => set((state) => ({ ...state, categoryId: data })),
  setSubCategoryIndex: (data) =>
    set((state) => ({ ...state, subCategoryIndex: data })),
}));
