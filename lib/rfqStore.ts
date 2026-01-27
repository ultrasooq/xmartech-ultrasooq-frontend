/**
 * @fileoverview Zustand store for the RFQ (Request for Quotation) cart.
 *
 * Manages a lightweight cart of RFQ product items. Each item tracks a
 * quantity and an optional `rfqProductId`. The store is persisted to
 * `localStorage` under the key `"rfq-cart-storage"` via the Zustand
 * `persist` middleware with JSON serialisation.
 *
 * @module lib/rfqStore
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Represents a single item in the RFQ cart.
 *
 * @export
 * @typedef {Object} CartItem
 * @property {number} quantity - The requested quantity for this product.
 * @property {number} [rfqProductId] - The RFQ product identifier. Used as the unique key for upsert / delete operations.
 */
export type CartItem = {
  quantity: number;
  rfqProductId?: number;
};

/**
 * Shape of the RFQ cart store state.
 *
 * @export
 * @typedef {Object} State
 * @property {CartItem[]} cart - The array of items currently in the RFQ cart.
 */
export type State = {
  cart: CartItem[];
};

/**
 * Actions available on the RFQ cart store.
 *
 * @export
 * @typedef {Object} Actions
 * @property {(data: CartItem) => void} updateCart - Adds a new item or updates the quantity of an existing item identified by `rfqProductId`.
 * @property {(rfqProductId: number) => void} deleteCartItem - Removes the item with the given `rfqProductId` from the cart.
 */
export type Actions = {
  updateCart: (data: CartItem) => void;
  deleteCartItem: (rfqProductId: number) => void;
};

/**
 * Default / empty cart state used for initialisation.
 *
 * @constant
 * @type {State}
 */
export const initialOrderState: State = {
  cart: [],
};

/**
 * Zustand store hook for the RFQ cart.
 *
 * Persisted to `localStorage` under the key `"rfq-cart-storage"`.
 *
 * - **updateCart**: If an item with the same `rfqProductId` already exists, its
 *   quantity is updated in-place. Otherwise the item is appended to the cart.
 * - **deleteCartItem**: Filters out the item whose `rfqProductId` matches.
 *
 * @example
 * ```ts
 * const { cart, updateCart, deleteCartItem } = useCartStore();
 * updateCart({ rfqProductId: 10, quantity: 3 });
 * deleteCartItem(10);
 * ```
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
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
