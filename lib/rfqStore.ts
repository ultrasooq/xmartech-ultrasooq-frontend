import { create } from "zustand";

export type CartItem = {
  quantity: number;
  rfqProductId?: number;
};

export type State = {
  cart: CartItem[];
};

export type Actions = {
  updateCart: (data: CartItem) => void;
  deleteCartItem: (rfqProductId: number) => void;
};

export const initialOrderState: State = {
  cart: [],
};

export const useCartStore = create<State & Actions>()((set) => ({
  cart: initialOrderState.cart,
  updateCart: (data) =>
    set((state) => {
      const updateCart = state.cart.map((item) =>
        item.rfqProductId === data.rfqProductId
          ? { ...item, quantity: data.quantity }
          : item,
      );

      if (!state.cart.some((item) => item.rfqProductId === data.rfqProductId)) {
        updateCart.push(data);
      }

      return { ...state, cart: updateCart };
    }),
  deleteCartItem: (rfqProductId) =>
    set((state) => ({
      ...state,
      cart: state.cart.filter((item) => item.rfqProductId !== rfqProductId),
    })),
}));
