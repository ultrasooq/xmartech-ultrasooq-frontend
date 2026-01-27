/**
 * @fileoverview RFQ (Request For Quotation) and Factories quote type
 * definitions for the Ultrasooq marketplace.
 *
 * Defines the request payloads for submitting RFQ quotes and factory
 * quotes, both of which include cart item IDs, contact details, and
 * delivery addresses.
 *
 * @module utils/types/rfq.types
 * @dependencies None (pure type definitions).
 */

/**
 * Request payload for submitting an RFQ quote.
 *
 * @description
 * Intent: Bundles the selected RFQ cart items with the buyer's contact
 * information and delivery address to create a formal RFQ submission.
 *
 * Usage: Submitted from the RFQ checkout page after the buyer has
 * added products to the RFQ cart.
 *
 * Data Flow: RFQ checkout form -> mutation hook -> API POST /rfq-quotes.
 *
 * @property rfqCartIds - Array of RFQ cart item IDs to include in the quote.
 * @property firstName - Buyer's first name.
 * @property lastName - Buyer's last name.
 * @property phoneNumber - Buyer's phone number.
 * @property cc - Country calling code (e.g., "+1").
 * @property address - Delivery street address.
 * @property city - Delivery city.
 * @property province - Delivery province/state.
 * @property country - Delivery country.
 * @property postCode - Delivery postal code.
 * @property rfqDate - Requested delivery or quote deadline date (ISO string).
 */
export interface AddRfqQuotesRequest {
  rfqCartIds: number[];
  firstName: string;
  lastName: string;
  phoneNumber: string;
  cc: string;
  address: string;
  city: string;
  province: string;
  country: string;
  postCode: string;
  rfqDate: string;
}

/**
 * Request payload for submitting a factories quote.
 *
 * @description
 * Intent: Similar to {@link AddRfqQuotesRequest} but for factory-sourced
 * products. Bundles factory cart items with contact and delivery details.
 *
 * Usage: Submitted from the factories checkout page.
 *
 * Data Flow: Factories checkout form -> mutation hook -> API POST /factories-quotes.
 *
 * @property factoriesCartIds - Array of factory cart item IDs to include.
 * @property firstName - Buyer's first name.
 * @property lastName - Buyer's last name.
 * @property phoneNumber - Buyer's phone number.
 * @property cc - Country calling code.
 * @property address - Delivery street address.
 * @property city - Delivery city.
 * @property province - Delivery province/state.
 * @property country - Delivery country.
 * @property postCode - Delivery postal code.
 * @property factoriesDate - Requested delivery or quote deadline date (ISO string).
 */
export interface AddFactoriesQuotesRequest {
  factoriesCartIds: number[];
  firstName: string;
  lastName: string;
  phoneNumber: string;
  cc: string;
  address: string;
  city: string;
  province: string;
  country: string;
  postCode: string;
  factoriesDate: string;
}
