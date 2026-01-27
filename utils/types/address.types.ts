/**
 * @fileoverview Address type definitions for the Ultrasooq marketplace.
 *
 * Defines the shape of address data as returned from the API, as well as
 * request payloads for creating and updating user addresses.
 *
 * @module utils/types/address.types
 * @dependencies None (pure type definitions).
 */

/**
 * Represents a single user address as returned by the backend API.
 *
 * @description
 * Intent: Provides a fully-hydrated address record including optional nested
 * detail objects for city, state, and country that carry both the ID and
 * human-readable name.
 *
 * Usage: Consumed by address list components, checkout flows, and the
 * user settings page to display saved shipping/billing addresses.
 *
 * Data Flow: API GET /user-addresses -> parsed JSON -> AddressItem[].
 *
 * @property id - Unique database identifier for the address record.
 * @property firstName - First name of the address holder.
 * @property lastName - Last name of the address holder.
 * @property cc - Country calling code (e.g., "+1", "+91") used alongside phoneNumber.
 * @property phoneNumber - Contact phone number for this address.
 * @property address - Street address line.
 * @property town - Town or locality name.
 * @property cityDetail - Optional nested object with city id and name.
 * @property stateDetail - Optional nested object with state/province id and name.
 * @property countryDetail - Optional nested object with country id and name.
 * @property postCode - Postal / ZIP code.
 */
export interface AddressItem {
  id: number;
  firstName: string;
  lastName: string;
  cc: string;
  phoneNumber: string;
  address: string;
  town: string;
  cityDetail?: { id: number; name: string; };
  stateDetail?: { id: number; name: string; };
  countryDetail?: { id: number; name: string; };
  postCode: string;
}

/**
 * Request payload for creating a new user address.
 *
 * @description
 * Intent: Captures all required fields the backend needs to persist a new
 * address record for the authenticated user.
 *
 * Usage: Passed as the body of a POST request to the create-address endpoint.
 *
 * Data Flow: Address form (React component) -> mutation hook -> API POST.
 *
 * Notes: `countryId`, `stateId`, and `cityId` accept both string and number
 * to accommodate form inputs that may serialize values as strings.
 *
 * @property firstName - First name of the address holder.
 * @property lastName - Last name of the address holder.
 * @property phoneNumber - Contact phone number.
 * @property cc - Country calling code prefix (e.g., "+1").
 * @property address - Street address line.
 * @property countryId - ID of the selected country.
 * @property stateId - ID of the selected state/province.
 * @property cityId - ID of the selected city.
 * @property town - Town or locality name.
 * @property postCode - Postal / ZIP code.
 */
export interface AddressCreateRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  cc: string;
  address: string;
  countryId: string | number;
  stateId: string | number;
  cityId: string | number;
  town: string;
  postCode: string;
}

/**
 * Request payload for updating an existing user address.
 *
 * @description
 * Intent: Extends {@link AddressCreateRequest} with the address record ID
 * so the backend knows which record to update.
 *
 * Usage: Passed as the body of a PUT/PATCH request to the update-address
 * endpoint.
 *
 * Data Flow: Edit address form -> mutation hook -> API PUT/PATCH.
 *
 * @extends AddressCreateRequest
 * @property userAddressId - The database ID of the address to update.
 */
export interface AddressUpdateRequest extends AddressCreateRequest {
  userAddressId: number;
}
