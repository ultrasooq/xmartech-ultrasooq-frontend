/**
 * @fileoverview Common / shared type definitions used across the Ultrasooq
 * marketplace frontend.
 *
 * Contains API error shapes, geographic lookup types (countries, states,
 * cities), reference data (brands, locations, user roles), generic UI
 * option types, and product-rendering interfaces used in multiple
 * components.
 *
 * @module utils/types/common.types
 * @dependencies None (pure type definitions).
 */

/**
 * Standard shape for API error responses.
 *
 * @description
 * Intent: Provides a uniform error contract so error-handling utilities
 * and toast notifications can consume any API error consistently.
 *
 * Usage: Caught by Axios/Fetch interceptors and surfaced in mutation
 * onError callbacks.
 *
 * @property message - Human-readable error message.
 * @property status - Boolean indicating failure (typically false).
 * @property data - Additional error data from the backend.
 * @property response - Optional raw HTTP response object for debugging.
 */
export interface APIResponseError {
  message: string;
  status: boolean;
  data: any;
  response?: any;
}

/**
 * Country record from the platform's internal country list.
 *
 * @description
 * Intent: Represents a country as stored in the platform's custom
 * country table (used for marketplace-supported countries).
 *
 * Usage: Populates country dropdowns in address and profile forms.
 *
 * @property id - Unique database identifier.
 * @property countryName - Full country name.
 * @property createdAt - ISO timestamp of creation.
 * @property updatedAt - ISO timestamp of last update.
 * @property deletedAt - ISO timestamp of soft-delete, or null.
 * @property status - Active/inactive status string.
 */
export interface ICountries {
  id: number;
  countryName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  status: string;
}

/**
 * Full country record including phone code and ISO sort name.
 *
 * @description
 * Intent: Extended country model used for comprehensive country
 * lookups including phone code selection.
 *
 * Usage: Phone code pickers and international address forms.
 *
 * @property id - Unique database identifier.
 * @property name - Full country name.
 * @property sortname - ISO short code (e.g., "US", "IN").
 * @property phoneCode - International dialing code.
 * @property createdAt - ISO timestamp of creation.
 * @property updatedAt - ISO timestamp of last update.
 * @property deletedAt - ISO timestamp of soft-delete, or null.
 * @property status - Active/inactive status string.
 */
export interface IAllCountries {
  id: number;
  name: string;
  sortname: string;
  phoneCode: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  status: string;
}

/**
 * State/province record for geographic lookups.
 *
 * @description
 * Intent: Represents a state or province within a country.
 *
 * Usage: Populates state/province dropdowns filtered by selected country.
 *
 * @property id - Unique database identifier.
 * @property name - State/province name.
 * @property sortname - Short code or abbreviation.
 * @property phoneCode - Associated phone area code.
 * @property createdAt - ISO timestamp of creation.
 * @property updatedAt - ISO timestamp of last update.
 * @property deletedAt - ISO timestamp of soft-delete, or null.
 * @property status - Active/inactive status string.
 */
export interface IState {
  id: number;
  name: string;
  sortname: string;
  phoneCode: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  status: string;
}

/**
 * City record for geographic lookups.
 *
 * @description
 * Intent: Represents a city within a state/province.
 *
 * Usage: Populates city dropdowns filtered by selected state.
 *
 * @property id - Unique database identifier.
 * @property name - City name.
 * @property sortname - Short code or abbreviation.
 * @property phoneCode - Associated phone area code.
 * @property createdAt - ISO timestamp of creation.
 * @property updatedAt - ISO timestamp of last update.
 * @property deletedAt - ISO timestamp of soft-delete, or null.
 * @property status - Active/inactive status string.
 */
export interface ICity {
  id: number;
  name: string;
  sortname: string;
  phoneCode: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  status: string;
}

/**
 * Location record used for product place-of-origin selections.
 *
 * @description
 * Intent: Represents a named location in the platform's location master
 * data, used when specifying product origins.
 *
 * Usage: Populates location/origin dropdowns in product creation forms.
 *
 * @property id - Unique database identifier.
 * @property locationName - Human-readable location name.
 * @property createdAt - ISO timestamp of creation.
 * @property updatedAt - ISO timestamp of last update.
 * @property deletedAt - ISO timestamp of soft-delete, or null.
 * @property status - Active/inactive status string.
 */
export interface ILocations {
  id: number;
  locationName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  status: string;
}

/**
 * Brand record for product categorization.
 *
 * @description
 * Intent: Represents a product brand in the brand master data.
 *
 * Usage: Populates brand selection dropdowns in product creation/edit forms
 * and brand filter components.
 *
 * @property id - Unique database identifier.
 * @property brandName - Display name of the brand.
 * @property createdAt - ISO timestamp of creation.
 * @property updatedAt - ISO timestamp of last update.
 * @property deletedAt - ISO timestamp of soft-delete, or null.
 * @property status - Active/inactive status string.
 */
export interface IBrands {
  id: number;
  brandName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  status: string;
}

/**
 * User role record for role-based access configuration.
 *
 * @description
 * Intent: Represents a named user role used in the platform's RBAC system.
 *
 * Usage: Consumed by admin panels for role assignment and permission checks.
 *
 * @property id - Unique database identifier.
 * @property userRoleName - Display name of the role.
 * @property createdAt - ISO timestamp of creation.
 * @property updatedAt - ISO timestamp of last update.
 * @property deletedAt - ISO timestamp of soft-delete, or null.
 * @property status - Active/inactive status string.
 */
export interface IUserRoles {
  id: number;
  userRoleName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  status: string;
}

/**
 * Generic select/dropdown option with numeric value and nested children.
 *
 * @description
 * Intent: Used for cascading or tree-style select components where each
 * option may have child options (e.g., category hierarchies).
 *
 * Usage: Consumed by cascading select UI components.
 *
 * @property label - Display label for the option.
 * @property value - Numeric identifier for the option.
 * @property children - Array of child options (can be any shape).
 */
export interface ISelectOptions {
  label: string;
  value: number;
  children: any[];
}

/**
 * Shape of a product as rendered in product listing/grid components.
 *
 * @description
 * Intent: Flattened product view model consumed by product card components
 * for rendering in grids, search results, and management tables.
 *
 * Usage: Mapped from API product responses in listing pages and
 * product management dashboards.
 *
 * @property id - Unique product identifier.
 * @property productImage - URL of the primary product image.
 * @property productName - Display name of the product.
 * @property categoryName - Name of the product's category.
 * @property skuNo - Stock keeping unit number.
 * @property brandName - Brand name of the product.
 * @property productPrice - Formatted price string.
 * @property status - Optional product status (e.g., "ACTIVE", "INACTIVE").
 * @property priceStatus - Optional price approval status.
 * @property productProductPriceId - Optional product-price join ID.
 * @property productProductPrice - Optional formatted product price.
 * @property isOwner - Whether the current user owns/listed this product.
 */
export interface IRenderProduct {
  id: number;
  productImage: string;
  productName: string;
  categoryName: string;
  skuNo: string;
  brandName: string;
  productPrice: string;
  status?: string;
  priceStatus?: string;
  productProductPriceId?: number;
  productProductPrice?: string;
  isOwner: boolean;
}

/**
 * Basic label-value pair for string-based select/dropdown options.
 *
 * @description
 * Intent: Minimal option type used by simple select and radio components.
 *
 * Usage: Consumed by form select elements throughout the application.
 *
 * @property label - Display text for the option.
 * @property value - Underlying string value.
 */
export type OptionProps = {
  label: string;
  value: string;
};

/**
 * Extended product model for trending/featured product displays.
 *
 * @description
 * Intent: Carries all fields needed to render a product card in the
 * trending products section, including pricing, discounts, reviews,
 * and wishlist state.
 *
 * Usage: Consumed by the trending product carousel and featured product
 * grids on the homepage and category pages.
 *
 * Data Flow: API GET /products/trending -> TrendingProduct[].
 *
 * @property id - Unique product identifier.
 * @property productName - Display name.
 * @property productPrice - Original list price.
 * @property offerPrice - Discounted/offer price.
 * @property productImage - URL of the primary product image.
 * @property categoryName - Category label.
 * @property brandName - Brand label.
 * @property skuNo - SKU number.
 * @property shortDescription - Brief product description.
 * @property productReview - Array of review objects with rating values.
 * @property status - Product status string.
 * @property productWishlist - Optional wishlist entries for the current user.
 * @property inWishlist - Optional boolean shortcut for wishlist membership.
 * @property productProductPriceId - Optional product-price join ID.
 * @property productProductPrice - Optional formatted product price string.
 * @property consumerDiscount - Optional discount amount for consumers.
 * @property consumerDiscountType - Optional discount type for consumers.
 * @property vendorDiscount - Optional discount amount for vendors.
 * @property vendorDiscountType - Optional discount type for vendors.
 * @property askForPrice - Optional flag or message when price is not public.
 * @property productPrices - Optional array of all price variants.
 * @property sold - Optional quantity sold count.
 * @property categoryId - Optional category ID for filtering.
 * @property categoryLocation - Optional category hierarchy path string.
 * @property consumerType - Optional target audience for this product.
 */
export interface TrendingProduct {
  id: number;
  productName: string;
  productPrice: number;
  offerPrice: number;
  productImage: string;
  categoryName: string;
  brandName: string;
  skuNo: string;
  shortDescription: string;
  productReview: {
    rating: number;
  }[];
  status: string;
  productWishlist?: any[];
  inWishlist?: boolean;
  productProductPriceId?: number;
  productProductPrice?: string;
  consumerDiscount?: number;
  consumerDiscountType?: string;
  vendorDiscount?: number;
  vendorDiscountType?: string;
  askForPrice?: string;
  productPrices?: any[];
  sold?: number;
  categoryId?: number;
  categoryLocation?: string;
  consumerType?: "CONSUMER" | "VENDORS" | "EVERYONE";
}

/**
 * Props shape for a product image reference.
 *
 * @description
 * Intent: Lightweight image reference type used by image gallery and
 * upload components.
 *
 * @property path - URL or file path of the image.
 * @property id - Unique string identifier for the image.
 */
export type ProductImageProps = {
  path: string;
  id: string;
};

/**
 * Select option with an optional icon for controlled select components.
 *
 * @description
 * Intent: Extends {@link OptionProps} with an optional icon path for
 * select components that display icons next to labels (e.g., social media
 * link type selectors).
 *
 * @extends OptionProps
 * @property icon - Optional path to an icon asset.
 */
export interface ControlledSelectOptions extends OptionProps {
  icon?: string;
}

/**
 * Immutable label-value pair for read-only option lists.
 *
 * @description
 * Intent: Provides a readonly option type used in contexts where options
 * should not be mutated after creation (e.g., react-select options).
 *
 * @property label - Readonly display label.
 * @property value - Readonly string value.
 */
export interface IOption {
  readonly label: string;
  readonly value: string;
}
