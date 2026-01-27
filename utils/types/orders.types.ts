/**
 * @fileoverview Order type definitions for the Ultrasooq marketplace.
 *
 * Defines the contact and address details captured during the checkout
 * process for both shipping and billing.
 *
 * @module utils/types/orders.types
 * @dependencies None (pure type definitions).
 */

/**
 * Contact and address details associated with an order.
 *
 * @description
 * Intent: Captures the buyer's personal information plus optional
 * shipping and billing addresses submitted during checkout.
 *
 * Usage: Populated from checkout form data and sent as part of the
 * order creation payload.
 *
 * Data Flow: Checkout form -> order creation mutation -> API POST /orders.
 *
 * Notes: Shipping and billing fields are optional to support scenarios
 * where the buyer selects a saved address or where digital products
 * do not require a shipping address.
 *
 * @property firstName - Buyer's first name.
 * @property lastName - Buyer's last name.
 * @property email - Buyer's email address for order confirmation.
 * @property cc - Country calling code for the phone number.
 * @property phone - Buyer's phone number.
 * @property shippingAddress - Optional shipping street address.
 * @property shippingCity - Optional shipping city.
 * @property shippingProvince - Optional shipping province/state.
 * @property shippingCountry - Optional shipping country.
 * @property shippingPostCode - Optional shipping postal code.
 * @property billingAddress - Optional billing street address.
 * @property billingCity - Optional billing city.
 * @property billingProvince - Optional billing province/state.
 * @property billingCountry - Optional billing country.
 * @property billingPostCode - Optional billing postal code.
 */
export type OrderDetails = {
  firstName: string;
  lastName: string;
  email: string;
  cc: string;
  phone: string;
  shippingAddress?: string;
  shippingCity?: string;
  shippingProvince?: string;
  shippingCountry?: string;
  shippingPostCode?: string;
  billingAddress?: string;
  billingCity?: string;
  billingProvince?: string;
  billingCountry?: string;
  billingPostCode?: string;
};
