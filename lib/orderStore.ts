import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { safeStorage } from "@/utils/secureStorage";

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

export type Actions = {
  setOrders: (data: State["orders"]) => void;
  resetOrders: () => void;
  setTotal: (total: number) => void;
};

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

/**
 * Secure order store that only persists non-sensitive data
 * 
 * SECURITY: Does NOT persist:
 * - Names (firstName, lastName)
 * - Email addresses
 * - Phone numbers
 * - Full addresses (billing/shipping)
 * - Guest user PII
 * 
 * Only persists:
 * - Cart IDs (for session continuity)
 * - Delivery charges
 * - Shipping options (non-PII)
 * - Totals
 */
export const useOrderStore = create<State & Actions>()(
  persist(
    (set) => ({
      orders: initialOrderState.orders,

      setOrders: (data) => set({ orders: data }),

      resetOrders: () => set({ orders: initialOrderState.orders }),

      total: initialOrderState.total,

      setTotal: (total) => set({ total })
    }),
    {
      name: "order-storage",
      // Use sessionStorage (cleared on browser close) instead of localStorage
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
      // Only persist non-sensitive fields
      partialize: (state) => ({
        orders: {
          // Only persist cart IDs and shipping config - NO PII
          cartIds: state.orders.cartIds,
          serviceCartIds: state.orders.serviceCartIds,
          deliveryCharge: state.orders.deliveryCharge,
          shipping: state.orders.shipping,
          countryId: state.orders.countryId,
          stateId: state.orders.stateId,
          cityId: state.orders.cityId,
          userAddressId: state.orders.userAddressId,
          // Explicitly exclude: firstName, lastName, email, cc, phone, addresses, guestUser
        },
        total: state.total,
      }),
    }
  )
);
