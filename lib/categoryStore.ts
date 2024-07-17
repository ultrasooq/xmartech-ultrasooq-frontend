import { create } from "zustand";

export type State = {
  subCategories: any[];
  subSubCategories: any[];
};

export type Actions = {
  setSubCategories: (data: any[]) => void;
  setSubSubCategories: (data: any[]) => void;
};

export const initialCategoryState: State = {
  subCategories: [],
  subSubCategories: [],
};

export const useCategoryStore = create<State & Actions>()((set) => ({
  subCategories: initialCategoryState.subCategories,
  subSubCategories: initialCategoryState.subSubCategories,
  setSubCategories: (data) =>
    set((state) => ({ ...state, subCategories: data })),
  setSubSubCategories: (data) =>
    set((state) => ({ ...state, subSubCategories: data })),
}));
