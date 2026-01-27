/**
 * @fileoverview Zustand store for checkout / order state.
 *
 * Persists order details (contact info, billing/shipping addresses, selected
 * cart IDs, delivery charges, etc.) to `localStorage` under the key
 * `"order-storage"` so that the checkout flow survives page refreshes.
 *
 * @module lib/orderStore
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Shape of the order store state.
 *
 * @export
 * @typedef {Object} State
 * @property {Object} orders - The order payload under construction during checkout.
 * @property {Object} [orders.guestUser] - Guest checkout user details (when not authenticated).
 * @property {string} orders.guestUser.firstName - Guest first name.
 * @property {string} orders.guestUser.lastName - Guest last name.
 * @property {string} orders.guestUser.email - Guest email address.
 * @property {string} orders.guestUser.cc - Guest country calling code.
 * @property {string} orders.guestUser.phoneNumber - Guest phone number.
 * @property {number[]} orders.cartIds - IDs of product cart items selected for this order.
 * @property {number[]} orders.serviceCartIds - IDs of service cart items selected for this order.
 * @property {string} orders.firstName - Contact first name.
 * @property {string} orders.lastName - Contact last name.
 * @property {string} orders.email - Contact email address.
 * @property {string} orders.cc - Contact country calling code.
 * @property {string} orders.phone - Contact phone number.
 * @property {string} [orders.billingAddress] - Billing street address.
 * @property {string} [orders.billingCity] - Billing city.
 * @property {string} [orders.billingProvince] - Billing province / state.
 * @property {string} [orders.billingCountry] - Billing country.
 * @property {string} [orders.billingPostCode] - Billing postal code.
 * @property {string} [orders.shippingAddress] - Shipping street address.
 * @property {string} [orders.shippingCity] - Shipping city.
 * @property {string} [orders.shippingProvince] - Shipping province / state.
 * @property {string} [orders.shippingCountry] - Shipping country.
 * @property {string} [orders.shippingPostCode] - Shipping postal code.
 * @property {string} [orders.town] - Town name.
 * @property {number} [orders.countryId] - Selected country ID.
 * @property {number} [orders.stateId] - Selected state ID.
 * @property {number} [orders.cityId] - Selected city ID.
 * @property {number} [orders.userAddressId] - ID of a saved user address to use.
 * @property {number} [orders.deliveryCharge] - Calculated delivery charge amount.
 * @property {any[]} orders.shipping - Shipping option selections per vendor / item group.
 * @property {number} total - The calculated order total.
 */
export type State = {
  orders: {
    guestUser?: {
      firstName: string;
      lastName: string;
      email: string;
      cc: string;
      phoneNumber: string;
    };
    cartIds: number[];
    serviceCartIds: number[];
    firstName: string;
    lastName: string;
    email: string;
    cc: string;
    phone: string;
    billingAddress?: string;
    billingCity?: string;
    billingProvince?: string;
    billingCountry?: string;
    billingPostCode?: string;
    shippingAddress?: string;
    shippingCity?: string;
    shippingProvince?: string;
    shippingCountry?: string;
    shippingPostCode?: string;
    town?: string;
    countryId?: number;
    stateId?: number;
    cityId?: number;
    userAddressId?: number;
    deliveryCharge?: number;
    shipping: any[]
  };
  total: number;
};

// export type Actions = {
//   setOrders: (data: State["orders"]) => void;
// };

/**
 * Actions available on the order store.
 *
 * @export
 * @typedef {Object} Actions
 * @property {(data: State["orders"]) => void} setOrders - Replaces the entire `orders` object.
 * @property {() => void} resetOrders - Resets `orders` to its initial empty state.
 * @property {(total: number) => void} setTotal - Updates the order total.
 */
export type Actions = {
  setOrders: (data: State["orders"]) => void;
  resetOrders: () => void;
  setTotal: (total: number) => void;
};

/**
 * Default / empty order state used for initialisation and reset.
 *
 * @constant
 * @type {State}
 */
export const initialOrderState: State = {
  orders: {
    guestUser: undefined,
    cartIds: [],
    serviceCartIds: [],
    firstName: "",
    lastName: "",
    email: "",
    cc: "",
    phone: "",
    billingAddress: "",
    billingCity: "",
    billingProvince: "",
    billingCountry: "",
    billingPostCode: "",
    shippingAddress: "",
    shippingCity: "",
    shippingProvince: "",
    shippingCountry: "",
    shippingPostCode: "",
    deliveryCharge: 0,
    shipping: []
  },
  total: 0
};

// export const useOrderStore = create<State & Actions>()((set) => ({
//   orders: initialOrderState.orders,
//   setOrders: (data) => set((state) => ({ ...state, orders: data })),
// }));

/**
 * Zustand store hook for order / checkout state.
 *
 * Uses the `persist` middleware to save state to `localStorage` under
 * the key `"order-storage"`, ensuring checkout progress survives page
 * refreshes.
 *
 * @example
 * ```ts
 * const { orders, setOrders, resetOrders, setTotal } = useOrderStore();
 * setOrders({ ...orders, firstName: "Jane" });
 * ```
 */
export const useOrderStore = create<State & Actions>()(
  persist(
    (set) => ({
      orders: initialOrderState.orders,

      /** @see Actions.setOrders */
      setOrders: (data) => set({ orders: data }),

      /** @see Actions.resetOrders */
      resetOrders: () => set({ orders: initialOrderState.orders }),

      total: initialOrderState.total,

      /** @see Actions.setTotal */
      setTotal: (total) => set({ total: total })
    }),
    {
      name: "order-storage", // Key to store in localStorage
      getStorage: () => localStorage, // Use localStorage (or sessionStorage if needed)
    }
  )
);
