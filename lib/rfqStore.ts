import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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

/**
 * RFQ Cart store - safe to persist (only contains product IDs and quantities)
 * Uses sessionStorage for session-only persistence
 */
export const useCartStore = create<State & Actions>()(
  persist(
    (set) => ({
      cart: initialOrderState.cart,
      updateCart: (data) =>
        set((state) => {
          const updateCart = state.cart.map((item) =>
            item.rfqProductId === data.rfqProductId
              ? { ...item, quantity: data.quantity }
              : item,
          );

          if (
            !state.cart.some((item) => item.rfqProductId === data.rfqProductId)
          ) {
            updateCart.push(data);
          }

          return { ...state, cart: updateCart };
        }),
      deleteCartItem: (rfqProductId) =>
        set((state) => ({
          ...state,
          cart: state.cart.filter((item) => item.rfqProductId !== rfqProductId),
        })),
    }),
    {
      name: "rfq-cart-storage",
      // Use sessionStorage (cleared on browser close) for better security
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          } as any;
        }
        return sessionStorage;
      }),
    },
  ),
);
