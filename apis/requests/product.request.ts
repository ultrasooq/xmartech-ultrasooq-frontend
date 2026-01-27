import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getCookie } from "cookies-next";
import axios from "axios";
import urlcat from "urlcat";
import { getApiUrl } from "@/config/api";
import {
  ICreateProductRequest,
  IDeleteProductRequest,
  IUpdateProductRequest,
} from "@/utils/types/product.types";

/**
 * Creates a new product listing.
 *
 * @param payload - The product creation data conforming to {@link ICreateProductRequest}.
 * @returns Axios promise resolving to the newly created product.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/product/create`
 * - **Auth:** Bearer token required.
 */
export const createProduct = (payload: ICreateProductRequest) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/product/create`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches products for a specific user with filtering, sorting, and pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.userId - The string user ID whose products to fetch.
 * @param payload.term - Optional search term.
 * @param payload.brandIds - Optional comma-separated brand IDs filter.
 * @param payload.status - Optional product status filter.
 * @param payload.expireDate - Optional expiration date filter.
 * @param payload.sellType - Optional sell type filter.
 * @param payload.discount - Optional discount flag filter.
 * @param payload.sort - Optional sort order.
 * @returns Axios promise resolving to the paginated list of products.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/findAll`
 * - **Auth:** None required.
 */
export const fetchProducts = (payload: {
  page: number;
  limit: number;
  userId: string;
  term?: string;
  brandIds?: string;
  status?: string;
  expireDate?: string;
  sellType?: string;
  discount?: boolean;
  sort?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/findAll`, payload),
  });
};

/**
 * Fetches a single product by its ID, optionally with user and shared link context.
 *
 * @param payload - The lookup parameters.
 * @param payload.productId - The string product ID to retrieve.
 * @param payload.userId - Optional numeric user ID for context.
 * @param payload.sharedLinkId - Optional shared link ID for referral tracking.
 * @returns Axios promise resolving to the product details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/findOne`
 * - **Auth:** Bearer token required.
 */
export const fetchProductById = (payload: {
  productId: string;
  userId?: number;
  sharedLinkId?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/findOne`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches a single product in the RFQ context by its ID.
 *
 * @param payload - The lookup parameters.
 * @param payload.productId - The string product ID.
 * @param payload.userId - Optional numeric user ID for context.
 * @returns Axios promise resolving to the RFQ product details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/rfqFindOne`
 * - **Auth:** Bearer token required.
 */
export const fetchRfqProductById = (payload: {
  productId: string;
  userId?: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/rfqFindOne`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Deletes a product by its ID.
 *
 * @param payload - The deletion data conforming to {@link IDeleteProductRequest}.
 * @returns Axios promise resolving to the deletion confirmation.
 *
 * @remarks
 * - **HTTP Method:** `DELETE`
 * - **Endpoint:** `/product/delete/:productId`
 * - **Auth:** Bearer token required.
 */
export const deleteProduct = (payload: IDeleteProductRequest) => {
  return axios({
    method: "DELETE",
    url: `${getApiUrl()}/product/delete/${payload.productId}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates an existing product's details.
 *
 * @param payload - The product update data conforming to {@link IUpdateProductRequest}.
 * @returns Axios promise resolving to the updated product.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/product/update`
 * - **Auth:** Bearer token required.
 */
export const updateProduct = (payload: IUpdateProductRequest) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/product/update`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Adds or updates a customized product entry.
 *
 * @param payload - The customization data (untyped).
 * @returns Axios promise resolving to the customized product response.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/product/addCustomizeProduct`
 * - **Auth:** Bearer token required.
 */
export const updateForCustomize = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/product/addCustomizeProduct`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Searches existing products in the catalog with various filters and pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.term - Optional search term.
 * @param payload.sort - Optional sort order.
 * @param payload.brandIds - Optional comma-separated brand IDs filter.
 * @param payload.priceMin - Optional minimum price filter.
 * @param payload.priceMax - Optional maximum price filter.
 * @param payload.brandAddedBy - Optional user ID who added the brand.
 * @param payload.categoryIds - Optional comma-separated category IDs filter.
 * @param payload.productType - Optional product type filter.
 * @param payload.type - Optional additional type filter.
 * @returns Axios promise resolving to the paginated list of existing products.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/searchExistingProducts`
 * - **Auth:** Bearer token required.
 */
export const fetchExistingProducts = (payload: {
  page: number;
  limit: number;
  term?: string;
  sort?: string;
  brandIds?: string;
  priceMin?: number;
  priceMax?: number;
  brandAddedBy?: number;
  categoryIds?: string;
  productType?: string;
  type?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/searchExistingProducts`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Searches existing products specifically for the "Add from Existing Product" copy functionality.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.term - Optional search term.
 * @param payload.sort - Optional sort order.
 * @param payload.brandIds - Optional comma-separated brand IDs filter.
 * @param payload.priceMin - Optional minimum price filter.
 * @param payload.priceMax - Optional maximum price filter.
 * @param payload.categoryIds - Optional comma-separated category IDs filter.
 * @returns Axios promise resolving to the paginated list of existing products for copy.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/searchExistingProductsForCopy`
 * - **Auth:** Bearer token required.
 */
// Dedicated function for "Add from Existing Product" functionality
export const fetchExistingProductForCopy = (payload: {
  page: number;
  limit: number;
  term?: string;
  sort?: string;
  brandIds?: string;
  priceMin?: number;
  priceMax?: number;
  categoryIds?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${getApiUrl()}/product/searchExistingProductsForCopy`,
      payload,
    ),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches the details of an existing product by its ID for the copy workflow.
 *
 * @param payload - The lookup parameters.
 * @param payload.existingProductId - The string ID of the existing product.
 * @returns Axios promise resolving to the existing product details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getExistingProductById`
 * - **Auth:** Bearer token required.
 */
// Fetch existing product by ID for copy functionality
export const fetchExistingProductById = (payload: {
  existingProductId: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/getExistingProductById`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all products across the platform with extensive filtering and pagination.
 * If `related` is true, delegates to {@link fetchAllProductsByUserBusinessCategory}.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.term - Optional search term.
 * @param payload.sort - Optional sort order.
 * @param payload.brandIds - Optional comma-separated brand IDs filter.
 * @param payload.priceMin - Optional minimum price filter.
 * @param payload.priceMax - Optional maximum price filter.
 * @param payload.userId - Optional user ID filter.
 * @param payload.categoryIds - Optional comma-separated category IDs filter.
 * @param payload.isOwner - Optional ownership filter.
 * @param payload.userType - Optional user type filter.
 * @param payload.related - If true, fetches products by user's business category instead.
 * @returns Axios promise resolving to the paginated list of all products.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getAllProduct`
 * - **Auth:** Bearer token required.
 */
export const fetchAllProducts = (payload: {
  page: number;
  limit: number;
  term?: string;
  sort?: string;
  brandIds?: string;
  priceMin?: number;
  priceMax?: number;
  userId?: number;
  categoryIds?: string;
  isOwner?: string;
  userType?: string;
  related?: boolean;
}) => {
  const related = payload.related;
  delete payload?.related;
  if (related) {
    return fetchAllProductsByUserBusinessCategory(payload);
  }
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/getAllProduct`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all products filtered by the authenticated user's business category.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.term - Optional search term.
 * @param payload.sort - Optional sort order.
 * @param payload.brandIds - Optional comma-separated brand IDs filter.
 * @param payload.priceMin - Optional minimum price filter.
 * @param payload.priceMax - Optional maximum price filter.
 * @param payload.userId - Optional user ID filter.
 * @param payload.categoryIds - Optional comma-separated category IDs filter.
 * @param payload.isOwner - Optional ownership filter.
 * @param payload.userType - Optional user type filter.
 * @returns Axios promise resolving to the paginated list of products by business category.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getAllProductByUserBusinessCategory`
 * - **Auth:** Bearer token required.
 */
export const fetchAllProductsByUserBusinessCategory = (payload: {
  page: number;
  limit: number;
  term?: string;
  sort?: string;
  brandIds?: string;
  priceMin?: number;
  priceMax?: number;
  userId?: number;
  categoryIds?: string;
  isOwner?: string;
  userType?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${getApiUrl()}/product/getAllProductByUserBusinessCategory`,
      payload,
    ),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all buy-group products with extensive filtering and pagination.
 * If `related` is true, delegates to {@link fetchAllBuyGroupProductsByUserBusinessCategory}.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.term - Optional search term.
 * @param payload.sort - Optional sort order.
 * @param payload.brandIds - Optional comma-separated brand IDs filter.
 * @param payload.priceMin - Optional minimum price filter.
 * @param payload.priceMax - Optional maximum price filter.
 * @param payload.userId - Optional user ID filter.
 * @param payload.categoryIds - Optional comma-separated category IDs filter.
 * @param payload.isOwner - Optional ownership filter.
 * @param payload.userType - Optional user type filter.
 * @param payload.related - If true, fetches buy-group products by user's business category instead.
 * @returns Axios promise resolving to the paginated list of buy-group products.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getAllBuyGroupProduct`
 * - **Auth:** Bearer token required.
 */
export const fetchAllBuyGroupProducts = (payload: {
  page: number;
  limit: number;
  term?: string;
  sort?: string;
  brandIds?: string;
  priceMin?: number;
  priceMax?: number;
  userId?: number;
  categoryIds?: string;
  isOwner?: string;
  userType?: string;
  related?: boolean;
}) => {
  const related = payload.related;
  delete payload?.related;
  if (related) {
    return fetchAllBuyGroupProductsByUserBusinessCategory(payload);
  }
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/getAllBuyGroupProduct`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all buy-group products filtered by the user's business category.
 *
 * @param payload - Query parameters (same as {@link fetchAllBuyGroupProducts} without `related`).
 * @returns Axios promise resolving to the paginated list of buy-group products by business category.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getAllBuyGroupProductByUserBusinessCategory`
 * - **Auth:** Bearer token required.
 */
export const fetchAllBuyGroupProductsByUserBusinessCategory = (payload: {
  page: number;
  limit: number;
  term?: string;
  sort?: string;
  brandIds?: string;
  priceMin?: number;
  priceMax?: number;
  userId?: number;
  categoryIds?: string;
  isOwner?: string;
  userType?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${getApiUrl()}/product/getAllBuyGroupProductByUserBusinessCategory`,
      payload,
    ),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches products from the same brand with pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.brandIds - Comma-separated brand IDs to match.
 * @param payload.userId - Optional user ID for context.
 * @param payload.productId - Optional product ID to exclude from results.
 * @returns Axios promise resolving to the paginated list of same-brand products.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/sameBrandAllProduct`
 * - **Auth:** None required.
 */
export const fetchSameBrandProducts = (payload: {
  page: number;
  limit: number;
  brandIds: string;
  userId?: number;
  productId?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/sameBrandAllProduct`, payload),
  });
};

/**
 * Fetches products related by tags with pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.tagIds - Comma-separated tag IDs to match for related products.
 * @param payload.userId - Optional user ID for context.
 * @param payload.productId - Optional product ID to exclude from results.
 * @returns Axios promise resolving to the paginated list of related products.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/relatedAllProduct`
 * - **Auth:** None required.
 */
export const fetchRelatedProducts = (payload: {
  page: number;
  limit: number;
  tagIds: string;
  userId?: number;
  productId?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/relatedAllProduct`, payload),
  });
};

/**
 * Adds multiple price entries for a product (e.g., different conditions or variants).
 *
 * @param payload - The multiple price data (untyped).
 * @returns Axios promise resolving to the created price entries.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/product/addMultiplePriceForProduct`
 * - **Auth:** Bearer token required.
 */
export const addMultiplePriceForProduct = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/product/addMultiplePriceForProduct`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates multiple product price entries in bulk.
 *
 * @param payload - The bulk price update data (untyped).
 * @returns Axios promise resolving to the updated price entries.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/product/updateMultipleProductPrice`
 * - **Auth:** Bearer token required.
 */
export const updateMultipleProductPrice = (payload: any) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/product/updateMultipleProductPrice`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all managed products (product prices) for the authenticated user with filtering and pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.term - Optional search term.
 * @param payload.selectedAdminId - Optional admin ID filter.
 * @param payload.brandIds - Optional comma-separated brand IDs filter.
 * @param payload.categoryIds - Optional comma-separated category IDs filter.
 * @param payload.status - Optional product status filter.
 * @param payload.expireDate - Optional expiration date filter.
 * @param payload.sellType - Optional sell type filter.
 * @param payload.discount - Optional discount flag filter.
 * @returns Axios promise resolving to the paginated list of managed product prices.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getAllProductPriceByUser`
 * - **Auth:** Bearer token required.
 */
export const getAllManagedProducts = (payload: {
  page: number;
  limit: number;
  term?: string;
  selectedAdminId?: number;
  brandIds?: string;
  categoryIds?: string;
  status?: string;
  expireDate?: string;
  sellType?: string;
  discount?: boolean;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/getAllProductPriceByUser`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches a single product along with its price details for a specific admin.
 *
 * @param payload - The lookup parameters.
 * @param payload.productId - The numeric product ID.
 * @param payload.adminId - The numeric admin/seller user ID.
 * @returns Axios promise resolving to the product with price details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/findOneWithProductPrice`
 * - **Auth:** Bearer token required.
 */
export const getOneWithProductPrice = (payload: {
  productId: number;
  adminId: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/findOneWithProductPrice`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches vendor/seller details by admin ID.
 *
 * @param payload - The lookup parameters.
 * @param payload.adminId - The string admin/seller ID.
 * @returns Axios promise resolving to the vendor details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/vendorDetails`
 * - **Auth:** Bearer token required.
 */
export const getVendorDetails = (payload: { adminId: string }) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/vendorDetails`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all products for a specific vendor/seller with filtering and pagination.
 *
 * @param payload - Query parameters.
 * @param payload.adminId - The string vendor/admin ID.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.term - Optional search term.
 * @param payload.brandIds - Optional comma-separated brand IDs filter.
 * @param payload.status - Optional product status filter.
 * @param payload.expireDate - Optional expiration date filter.
 * @param payload.sellType - Optional sell type filter.
 * @param payload.discount - Optional discount flag filter.
 * @param payload.sort - Optional sort order.
 * @returns Axios promise resolving to the paginated list of vendor products.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/vendorAllProduct`
 * - **Auth:** Bearer token required.
 */
export const getVendorProducts = (payload: {
  adminId: string;
  page: number;
  limit: number;
  term?: string;
  brandIds?: string;
  status?: string;
  expireDate?: string;
  sellType?: string;
  discount?: boolean;
  sort?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/vendorAllProduct`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches a single product by its product ID and product price ID for condition-based lookup.
 *
 * @param payload - The lookup parameters.
 * @param payload.productId - The numeric product ID.
 * @param payload.productPriceId - The numeric product price ID.
 * @returns Axios promise resolving to the product details by condition.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getOneProductByProductCondition`
 * - **Auth:** Bearer token required.
 */
export const getOneProductByProductCondition = (payload: {
  productId: number;
  productPriceId: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${getApiUrl()}/product/getOneProductByProductCondition`,
      payload,
    ),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates a product's price entry details including description, short descriptions,
 * specifications, and seller images.
 *
 * @param payload - The condition-based update data.
 * @param payload.description - The updated product description.
 * @param payload.productShortDescriptionList - Array of short description objects.
 * @param payload.productSpecificationList - Array of specification label-value objects.
 * @param payload.productSellerImageList - Array of seller image/video objects.
 * @returns Axios promise resolving to the updated product price entry.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/product/editProductPriceByProductCondition`
 * - **Auth:** Bearer token required.
 */
export const updateProductPriceByProductCondition = (payload: {
  description: string;
  productShortDescriptionList: {
    shortDescription: string;
  }[];
  productSpecificationList: {
    label: string;
    specification: string;
  }[];
  productSellerImageList: {
    productPriceId: string;
    imageName: string;
    image: string;
    videoName: string;
    video: string;
  }[];
}) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/product/editProductPriceByProductCondition`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates the status of a product price entry.
 *
 * @param payload - The status update data.
 * @param payload.productPriceId - The numeric product price ID.
 * @param payload.status - The new status value.
 * @returns Axios promise resolving to the updated product price.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/product/updateProductPrice`
 * - **Auth:** Bearer token required.
 */
export const updateProductStatus = (payload: {
  productPriceId: number;
  status: string;
}) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/product/updateProductPrice`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates a single product price entry with comprehensive pricing, stock, and configuration details.
 *
 * @param payload - The full product price update data including stock, pricing, discounts, and quantities.
 * @param payload.productPriceId - The numeric product price ID.
 * @param payload.stock - Available stock quantity.
 * @param payload.askForPrice - Whether to ask for price ("true"/"false").
 * @param payload.askForStock - Whether to ask for stock ("true"/"false").
 * @param payload.offerPrice - The offer/sale price.
 * @param payload.productPrice - The regular product price.
 * @param payload.status - The product status.
 * @param payload.productCondition - The condition of the product.
 * @param payload.consumerType - The consumer type.
 * @param payload.sellType - The sell type.
 * @param payload.deliveryAfter - Delivery time in days.
 * @param payload.timeOpen - Opening time.
 * @param payload.timeClose - Closing time.
 * @param payload.vendorDiscount - Vendor discount value.
 * @param payload.vendorDiscountType - Vendor discount type or null.
 * @param payload.consumerDiscount - Consumer discount value.
 * @param payload.consumerDiscountType - Consumer discount type or null.
 * @param payload.minQuantity - Minimum order quantity.
 * @param payload.maxQuantity - Maximum order quantity.
 * @param payload.minCustomer - Minimum customer count (for buy-group).
 * @param payload.maxCustomer - Maximum customer count (for buy-group).
 * @param payload.minQuantityPerCustomer - Minimum quantity per customer.
 * @param payload.maxQuantityPerCustomer - Maximum quantity per customer.
 * @returns Axios promise resolving to the updated product price.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/product/updateProductPrice`
 * - **Auth:** Bearer token required.
 */
export const updateSingleProducts = (payload: {
  productPriceId: number;
  stock: number;
  askForPrice: string;
  askForStock: string;
  offerPrice: number;
  productPrice: number;
  status: string;
  productCondition: string;
  consumerType: string;
  sellType: string;
  deliveryAfter: number;
  timeOpen: number;
  timeClose: number;
  vendorDiscount: number;
  vendorDiscountType: string | null;
  consumerDiscount: number;
  consumerDiscountType: string | null;
  minQuantity: number;
  maxQuantity: number;
  minCustomer: number;
  maxCustomer: number;
  minQuantityPerCustomer: number;
  maxQuantityPerCustomer: number;
}) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/product/updateProductPrice`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Removes a single product price entry by its ID.
 *
 * @param payload - The deletion parameters.
 * @param payload.productPriceId - The numeric product price ID to remove.
 * @returns Axios promise resolving to the deletion confirmation.
 *
 * @remarks
 * - **HTTP Method:** `DELETE`
 * - **Endpoint:** `/product/deleteOneProductPrice`
 * - **Auth:** Bearer token required.
 */
export const removeProduct = (payload: { productPriceId: number }) => {
  return axios({
    method: "DELETE",
    url: urlcat(`${getApiUrl()}/product/deleteOneProductPrice`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches product variant details for one or more product price IDs.
 *
 * @param productPriceId - Array of numeric product price IDs to fetch variants for.
 * @returns Axios promise resolving to the product variant details.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/product/getProductVariant`
 * - **Auth:** Bearer token required.
 */
export const fetchProductVariant = (productPriceId: number[]) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/product/getProductVariant`,
    data: {
      productPriceId,
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches products associated with a specific service with pagination.
 *
 * @param serviceId - The numeric service ID.
 * @param payload - Pagination parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @returns Axios promise resolving to the paginated list of products for the service.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/service/product/:serviceId`
 * - **Auth:** Bearer token required.
 */
export const getProductsByService = (
  serviceId: number,
  payload: {
    page: number;
    limit: number;
  },
) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/service/product/${serviceId}`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

// Dropshipping API requests

/**
 * Creates a new dropship product based on an original product.
 *
 * @param payload - The dropship product creation data.
 * @param payload.originalProductId - The numeric ID of the original product to dropship.
 * @param payload.customProductName - Custom name for the dropship product.
 * @param payload.customDescription - Custom description for the dropship product.
 * @param payload.marketingText - Optional marketing text.
 * @param payload.additionalImages - Optional array of additional image URLs.
 * @param payload.markup - The markup percentage/amount to apply.
 * @returns Axios promise resolving to the newly created dropship product.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/product/dropship`
 * - **Auth:** Bearer token required.
 */
export const createDropshipProduct = (payload: {
  originalProductId: number;
  customProductName: string;
  customDescription: string;
  marketingText?: string;
  additionalImages?: string[];
  markup: number;
}) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/product/dropship`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches products available for dropshipping with optional filtering and pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.term - Optional search term.
 * @param payload.categoryId - Optional category ID filter.
 * @param payload.priceMin - Optional minimum price filter.
 * @param payload.priceMax - Optional maximum price filter.
 * @returns Axios promise resolving to the paginated list of available dropship products.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/available-for-dropship`
 * - **Auth:** Bearer token required.
 */
export const getAvailableProductsForDropship = (payload: {
  page: number;
  limit: number;
  term?: string;
  categoryId?: number;
  priceMin?: number;
  priceMax?: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/available-for-dropship`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches the authenticated user's dropship products with optional status filter and pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.status - Optional status filter.
 * @returns Axios promise resolving to the paginated list of dropship products.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/dropship-products`
 * - **Auth:** Bearer token required.
 */
export const getDropshipProducts = (payload: {
  page: number;
  limit: number;
  status?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/dropship-products`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches the authenticated user's dropship earnings summary.
 *
 * @returns Axios promise resolving to the dropship earnings data.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/dropship-earnings`
 * - **Auth:** Bearer token required.
 */
export const getDropshipEarnings = () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/product/dropship-earnings`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates the status of a dropship product.
 *
 * @param id - The numeric dropship product ID.
 * @param status - The new status string.
 * @returns Axios promise resolving to the updated dropship product status.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/product/dropship/:id/status`
 * - **Auth:** Bearer token required.
 */
export const updateDropshipProductStatus = (id: number, status: string) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/product/dropship/${id}/status`,
    data: { status },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Deletes a dropship product by its ID.
 *
 * @param id - The numeric dropship product ID to delete.
 * @returns Axios promise resolving to the deletion confirmation.
 *
 * @remarks
 * - **HTTP Method:** `DELETE`
 * - **Endpoint:** `/product/dropship/:id`
 * - **Auth:** Bearer token required.
 */
export const deleteDropshipProduct = (id: number) => {
  return axios({
    method: "DELETE",
    url: `${getApiUrl()}/product/dropship/${id}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Marks a product as eligible for dropshipping with commission and markup settings.
 *
 * @param productId - The numeric product ID to mark as dropshipable.
 * @param payload - The dropship configuration data.
 * @param payload.isDropshipable - Whether the product is available for dropshipping.
 * @param payload.dropshipCommission - Optional dropship commission percentage.
 * @param payload.dropshipMinMarkup - Optional minimum markup allowed.
 * @param payload.dropshipMaxMarkup - Optional maximum markup allowed.
 * @param payload.dropshipSettings - Optional additional dropship settings.
 * @returns Axios promise resolving to the updated product dropship configuration.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/product/dropship/enable/:productId`
 * - **Auth:** Bearer token required.
 */
// Mark product as dropshipable
export const markProductAsDropshipable = (
  productId: number,
  payload: {
    isDropshipable: boolean;
    dropshipCommission?: number;
    dropshipMinMarkup?: number;
    dropshipMaxMarkup?: number;
    dropshipSettings?: any;
  }
) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/product/dropship/enable/${productId}`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches the vendor's own products that are marked as dropshipable.
 *
 * @param payload - Pagination parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @returns Axios promise resolving to the paginated list of vendor's dropshipable products.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/dropship/my-dropshipable-products`
 * - **Auth:** Bearer token required.
 */
// Get vendor's dropshipable products
export const getMyDropshipableProducts = (payload: {
  page: number;
  limit: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/dropship/my-dropshipable-products`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches dropship analytics/statistics for the authenticated user.
 *
 * @returns Axios promise resolving to the dropship analytics data.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/dropship/analytics`
 * - **Auth:** Bearer token required.
 */
// Get dropship analytics
export const getDropshipAnalytics = () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/product/dropship/analytics`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Bulk enables or disables dropshipping for multiple products at once.
 *
 * @param payload - The bulk update data.
 * @param payload.productIds - Array of numeric product IDs to update.
 * @param payload.isDropshipable - Whether to enable or disable dropshipping.
 * @param payload.dropshipCommission - Optional commission percentage to set.
 * @param payload.dropshipMinMarkup - Optional minimum markup to set.
 * @param payload.dropshipMaxMarkup - Optional maximum markup to set.
 * @returns Axios promise resolving to the bulk update confirmation.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/product/dropship/bulk-enable`
 * - **Auth:** Bearer token required.
 */
// Bulk enable/disable dropshipping
export const bulkUpdateDropshipable = (payload: {
  productIds: number[];
  isDropshipable: boolean;
  dropshipCommission?: number;
  dropshipMinMarkup?: number;
  dropshipMaxMarkup?: number;
}) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/product/dropship/bulk-enable`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches wholesale products with pagination.
 *
 * @param payload - Pagination parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @returns Axios promise resolving to the paginated list of wholesale products.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/wholesale/products`
 * - **Auth:** Bearer token required.
 */
// Get wholesale products
export const getWholesaleProducts = (payload: {
  page: number;
  limit: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/wholesale/products`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches the wholesale dashboard summary data.
 *
 * @returns Axios promise resolving to the wholesale dashboard data.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/wholesale/dashboard`
 * - **Auth:** Bearer token required.
 */
// Get wholesale dashboard
export const getWholesaleDashboard = () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/product/wholesale/dashboard`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches sales details for a specific wholesale product.
 *
 * @param productId - The numeric product ID.
 * @returns Axios promise resolving to the wholesale product sales details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/wholesale/product/:productId/sales`
 * - **Auth:** Bearer token required.
 */
// Get wholesale product sales details
export const getWholesaleProductSales = (productId: number) => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/product/wholesale/product/${productId}/sales`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches the user's own dropshipable products (productType = D, isDropshipable = true) with filtering.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.term - Optional search term.
 * @param payload.brandIds - Optional comma-separated brand IDs filter.
 * @param payload.categoryIds - Optional comma-separated category IDs filter.
 * @param payload.status - Optional product status filter.
 * @param payload.sort - Optional sort order.
 * @returns Axios promise resolving to the paginated list of user's own dropshipable products.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getUserOwnDropshipableProducts`
 * - **Auth:** Bearer token required.
 */
// Get user's own dropshipable products (productType = D, isDropshipable = true)
export const getUserOwnDropshipableProducts = (payload: {
  page: number;
  limit: number;
  term?: string;
  brandIds?: string;
  categoryIds?: string;
  status?: string;
  sort?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/getUserOwnDropshipableProducts`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches dropship products that were created from a specific original product.
 *
 * @param originalProductId - The numeric ID of the original source product.
 * @returns Axios promise resolving to the list of dropship products derived from the original.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getDropshipProductsFromOriginal/:originalProductId`
 * - **Auth:** Bearer token required.
 */
// Get dropship products created from a specific original product
export const getDropshipProductsFromOriginal = (originalProductId: number) => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/product/getDropshipProductsFromOriginal/${originalProductId}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Tracks a product view/impression and increments the view counter.
 *
 * @param payload - The tracking data.
 * @param payload.productId - The numeric product ID being viewed.
 * @param payload.deviceId - Optional device identifier for guest tracking.
 * @returns Axios promise resolving to the tracking confirmation.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/product/productViewCount`
 * - **Auth:** Bearer token required.
 */
// Track product view
export const trackProductView = (payload: {
  productId: number;
  deviceId?: string;
}) => {
  // Build query params manually to ensure deviceId is included
  const params: any = { productId: payload.productId };
  if (payload.deviceId) {
    params.deviceId = payload.deviceId;
  }

  return axios({
    method: "PATCH",
    url: urlcat(`${getApiUrl()}/product/productViewCount`, params),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Tracks a product click event for analytics purposes.
 *
 * @param payload - The click tracking data.
 * @param payload.productId - The numeric product ID that was clicked.
 * @param payload.clickSource - Optional source identifier for the click.
 * @param payload.deviceId - Optional device identifier for guest tracking.
 * @returns Axios promise resolving to the tracking confirmation.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/product/trackClick`
 * - **Auth:** Bearer token required.
 */
// Track product click
export const trackProductClick = (payload: {
  productId: number;
  clickSource?: string;
  deviceId?: string;
}) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/product/trackClick`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Tracks a product search event for analytics and search optimization.
 *
 * @param payload - The search tracking data.
 * @param payload.searchTerm - The search term used.
 * @param payload.productId - Optional product ID if a specific product was found.
 * @param payload.clicked - Optional flag indicating if the result was clicked.
 * @param payload.deviceId - Optional device identifier for guest tracking.
 * @returns Axios promise resolving to the tracking confirmation.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/product/trackSearch`
 * - **Auth:** Bearer token required.
 */
// Track product search
export const trackProductSearch = (payload: {
  searchTerm: string;
  productId?: number;
  clicked?: boolean;
  deviceId?: string;
}) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/product/trackSearch`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
