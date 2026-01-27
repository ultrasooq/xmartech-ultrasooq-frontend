import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getCookie } from "cookies-next";
import axios from "axios";
import urlcat from "urlcat";
import { getApiUrl } from "@/config/api";
import {
  AddRfqQuotesRequest,
  AddFactoriesQuotesRequest,
} from "@/utils/types/rfq.types";

/**
 * Fetches all RFQ (Request for Quotation) products with filtering, sorting, and pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.term - Optional search term.
 * @param payload.adminId - Optional admin/seller ID filter.
 * @param payload.sortType - Optional sort order (`"newest"` or `"oldest"`).
 * @param payload.brandIds - Optional comma-separated brand IDs filter.
 * @param payload.isOwner - Optional ownership filter.
 * @returns Axios promise resolving to the paginated list of RFQ products.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getAllRfqProduct`
 * - **Auth:** Bearer token required.
 */
export const fetchRfqProducts = (payload: {
  page: number;
  limit: number;
  term?: string;
  adminId?: string;
  sortType?: "newest" | "oldest";
  brandIds?: string;
  isOwner?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/getAllRfqProduct`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all factories products with filtering, sorting, and pagination.
 * If `related` is true, delegates to {@link fetchFactoriesProductsByUserBusinessCategory}.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.term - Optional search term.
 * @param payload.adminId - Optional admin/seller ID filter.
 * @param payload.sortType - Optional sort order (`"newest"` or `"oldest"`).
 * @param payload.brandIds - Optional comma-separated brand IDs filter.
 * @param payload.isOwner - Optional ownership filter.
 * @param payload.related - If true, fetches products by user's business category instead.
 * @returns Axios promise resolving to the paginated list of factories products.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getAllFactoriesProduct`
 * - **Auth:** Bearer token required.
 */
export const fetchFactoriesProducts = (payload: {
  page: number;
  limit: number;
  term?: string;
  adminId?: string;
  sortType?: "newest" | "oldest";
  brandIds?: string;
  isOwner?: string;
  related?: boolean;
}) => {
  const related = payload.related;
  delete payload?.related;
  if (related) {
    return fetchFactoriesProductsByUserBusinessCategory(payload);
  }
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/getAllFactoriesProduct`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all factories products filtered by the user's business category.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.term - Optional search term.
 * @param payload.adminId - Optional admin/seller ID filter.
 * @param payload.sortType - Optional sort order (`"newest"` or `"oldest"`).
 * @param payload.brandIds - Optional comma-separated brand IDs filter.
 * @param payload.isOwner - Optional ownership filter.
 * @returns Axios promise resolving to the paginated list of factories products by business category.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getAllFactoriesProductByUserBusinessCategory`
 * - **Auth:** Bearer token required.
 */
export const fetchFactoriesProductsByUserBusinessCategory = (payload: {
  page: number;
  limit: number;
  term?: string;
  adminId?: string;
  sortType?: "newest" | "oldest";
  brandIds?: string;
  isOwner?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${getApiUrl()}/product/getAllFactoriesProductByUserBusinessCategory`,
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
 * Creates a new RFQ product listing with images and notes.
 *
 * @param payload - The RFQ product creation data.
 * @param payload.productNote - Notes describing the product requirements.
 * @param payload.rfqProductName - The name/title of the RFQ product.
 * @param payload.rfqProductImagesList - Array of image objects with `imageName` and `image` URL.
 * @returns Axios promise resolving to the newly created RFQ product.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/product/addRfqProduct`
 * - **Auth:** Bearer token required.
 */
export const addRfqProduct = (payload: {
  productNote: string;
  rfqProductName: string;
  rfqProductImagesList: { imageName: string; image: string }[];
}) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/product/addRfqProduct`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates an existing RFQ product's details and images.
 *
 * @param payload - The RFQ product update data.
 * @param payload.rFqProductId - The numeric ID of the RFQ product to update.
 * @param payload.productNote - Updated product requirement notes.
 * @param payload.rfqProductName - Updated product name.
 * @param payload.rfqProductImagesList - Updated array of image objects.
 * @returns Axios promise resolving to the updated RFQ product.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/product/editRfqProduct`
 * - **Auth:** Bearer token required.
 */
export const updateRfqProduct = (payload: {
  rFqProductId: number;
  productNote: string;
  rfqProductName: string;
  rfqProductImagesList: { imageName: string; image: string }[];
}) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/product/editRfqProduct`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches a single RFQ product by its ID.
 *
 * @param payload - The lookup parameters.
 * @param payload.rfqProductId - The string ID of the RFQ product.
 * @returns Axios promise resolving to the RFQ product details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getOneRfqProduct`
 * - **Auth:** Bearer token required.
 */
export const fetchRfqProductById = (payload: { rfqProductId: string }) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/getOneRfqProduct`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches the RFQ cart items for the authenticated user with pagination.
 *
 * @param payload - Pagination parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @returns Axios promise resolving to the paginated list of RFQ cart items.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/cart/rfqCartlist`
 * - **Auth:** Bearer token required.
 */
export const fetchRfqCartByUserId = (payload: {
  page: number;
  limit: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/cart/rfqCartlist`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches the factories cart items for the authenticated user with pagination.
 *
 * @param payload - Pagination parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @returns Axios promise resolving to the paginated list of factories cart items.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/cart/getAllFactoriesCart`
 * - **Auth:** Bearer token required.
 */
export const fetchFactoriesCartByUserId = (payload: {
  page: number;
  limit: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/cart/getAllFactoriesCart`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates the RFQ cart for the authenticated user (add/update product and pricing).
 *
 * @param payload - The RFQ cart update data.
 * @param payload.productId - The numeric product ID to add/update.
 * @param payload.quantity - The desired quantity.
 * @param payload.productType - Optional product type (`"SAME"` or `"SIMILAR"`).
 * @param payload.offerPriceFrom - Optional minimum offer price.
 * @param payload.offerPriceTo - Optional maximum offer price.
 * @param payload.note - Optional note for the RFQ.
 * @returns Axios promise resolving to the updated RFQ cart.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/cart/updateRfqCart`
 * - **Auth:** Bearer token required.
 */
export const updateRfqCartWithLogin = (payload: {
  productId: number;
  quantity: number;
  productType?: "SAME" | "SIMILAR";
  offerPriceFrom?: number;
  offerPriceTo?: number;
  note?: string;
}) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/cart/updateRfqCart`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates the factories cart for the authenticated user.
 *
 * @param payload - The factories cart update data.
 * @param payload.productId - The numeric product ID.
 * @param payload.quantity - The desired quantity.
 * @param payload.customizeProductId - The numeric customized product ID.
 * @returns Axios promise resolving to the updated factories cart.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/cart/updateFactoriesCart`
 * - **Auth:** Bearer token required.
 */
export const updateFactoriesCartWithLogin = (payload: {
  productId: number;
  quantity: number;
  customizeProductId: number;
}) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/cart/updateFactoriesCart`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Duplicates a product for use in the factories context.
 *
 * @param payload - The duplication parameters.
 * @param payload.productId - The numeric product ID to duplicate.
 * @returns Axios promise resolving to the duplicated factories product.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/product/addProductDuplicateFactories`
 * - **Auth:** Bearer token required.
 */
export const addFactoriesProductApi = (payload: { productId: number }) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/product/addProductDuplicateFactories`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Creates a customize product request with pricing details and notes.
 *
 * @param payload - The customization data.
 * @param payload.productId - The numeric product ID to customize.
 * @param payload.note - Notes describing customization requirements.
 * @param payload.fromPrice - The minimum acceptable price.
 * @param payload.toPrice - The maximum acceptable price.
 * @returns Axios promise resolving to the newly created customized product.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/product/addCustomizeProduct`
 * - **Auth:** Bearer token required.
 */
export const addCustomizeProductApi = (payload: {
  productId: number;
  note: string;
  fromPrice: number;
  toPrice: number;
}) => {
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
 * Deletes an item from the RFQ cart.
 *
 * @param payload - The deletion parameters.
 * @param payload.rfqCartId - The numeric RFQ cart item ID to delete.
 * @returns Axios promise resolving to the deletion confirmation.
 *
 * @remarks
 * - **HTTP Method:** `DELETE`
 * - **Endpoint:** `/cart/rfqCartDelete`
 * - **Auth:** Bearer token required.
 */
export const deleteRfqCartItem = (payload: { rfqCartId: number }) => {
  return axios({
    method: "DELETE",
    url: urlcat(`${getApiUrl()}/cart/rfqCartDelete`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Deletes an item from the factories cart.
 *
 * @param payload - The deletion parameters.
 * @param payload.factoriesCartId - The numeric factories cart item ID to delete.
 * @returns Axios promise resolving to the deletion confirmation.
 *
 * @remarks
 * - **HTTP Method:** `DELETE`
 * - **Endpoint:** `/cart/deleteFactoriesCart`
 * - **Auth:** Bearer token required.
 */
export const deleteFactoriesCartItem = (payload: {
  factoriesCartId: number;
}) => {
  return axios({
    method: "DELETE",
    url: urlcat(`${getApiUrl()}/cart/deleteFactoriesCart`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all RFQ quotes submitted by the authenticated buyer with pagination.
 *
 * @param payload - Pagination parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @returns Axios promise resolving to the paginated list of buyer's RFQ quotes.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getAllRfqQuotesByBuyerID`
 * - **Auth:** Bearer token required.
 */
export const fetchAllRfqQuotesByBuyerId = (payload: {
  page: number;
  limit: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/getAllRfqQuotesByBuyerID`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all RFQ quote responses (from sellers) for a specific RFQ quote by buyer ID.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.rfqQuotesId - The numeric RFQ quotes ID.
 * @returns Axios promise resolving to the paginated list of RFQ quote users/responses.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getAllRfqQuotesUsersByBuyerID`
 * - **Auth:** Bearer token required.
 */
export const fetchAllRfqQuotesUsersByBuyerId = (payload: {
  page: number;
  limit: number;
  rfqQuotesId: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${getApiUrl()}/product/getAllRfqQuotesUsersByBuyerID`,
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
 * Fetches a single RFQ quote user response by RFQ quotes ID for the buyer.
 *
 * @param payload - The lookup parameters.
 * @param payload.rfqQuotesId - Optional numeric RFQ quotes ID.
 * @returns Axios promise resolving to the RFQ quote user details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getOneRfqQuotesUsersByBuyerID`
 * - **Auth:** Bearer token required.
 */
export const fetchOneRfqQuotesUsersByBuyerID = (payload: {
  rfqQuotesId?: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${getApiUrl()}/product/getOneRfqQuotesUsersByBuyerID`,
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
 * Fetches all RFQ quote responses assigned to the authenticated seller with pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.showHidden - Optional flag to include hidden RFQ requests.
 * @returns Axios promise resolving to the paginated list of seller's RFQ quote responses.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getAllRfqQuotesUsersBySellerID`
 * - **Auth:** Bearer token required.
 */
export const fetchAllRfqQuotesUsersBySellerId = (payload: {
  page: number;
  limit: number;
  showHidden?: boolean;
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${getApiUrl()}/product/getAllRfqQuotesUsersBySellerID`,
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
 * Submits a new RFQ quote request from the buyer.
 *
 * @param payload - The RFQ quotes data conforming to {@link AddRfqQuotesRequest}.
 * @returns Axios promise resolving to the newly created RFQ quote.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/product/addRfqQuotes`
 * - **Auth:** Bearer token required.
 */
export const addRfqQuotes = (payload: AddRfqQuotesRequest) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/product/addRfqQuotes`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Submits a new factories quote request from the buyer.
 *
 * @param payload - The factories quotes data conforming to {@link AddFactoriesQuotesRequest}.
 * @returns Axios promise resolving to the newly created factories quote.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/product/createFactoriesRequest`
 * - **Auth:** Bearer token required.
 */
export const addFactoriesQuotes = (payload: AddFactoriesQuotesRequest) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/product/createFactoriesRequest`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Duplicates a product for use in the RFQ context.
 *
 * @param payload - The duplication parameters.
 * @param payload.productId - The numeric product ID to duplicate for RFQ.
 * @returns Axios promise resolving to the duplicated RFQ product.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/product/addProductDuplicateRfq`
 * - **Auth:** Bearer token required.
 */
export const addProductDuplicateRfq = (payload: { productId: number }) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/product/addProductDuplicateRfq`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Deletes an RFQ quote by its ID.
 *
 * @param payload - The deletion parameters.
 * @param payload.rfqQuotesId - The numeric RFQ quote ID to delete.
 * @returns Axios promise resolving to the deletion confirmation.
 *
 * @remarks
 * - **HTTP Method:** `DELETE`
 * - **Endpoint:** `/product/deleteOneRfqQuote`
 * - **Auth:** Bearer token required.
 */
export const deleteRfqQuote = (payload: { rfqQuotesId: number }) => {
  return axios({
    method: "DELETE",
    url: urlcat(`${getApiUrl()}/product/deleteOneRfqQuote`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Hides or unhides an RFQ request from the seller's view.
 *
 * @param payload - The hide/unhide data.
 * @param payload.rfqQuotesUserId - The numeric RFQ quotes user ID.
 * @param payload.isHidden - Whether to hide (`true`) or unhide (`false`) the request.
 * @returns Axios promise resolving to the update confirmation.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/product/hideRfqRequest`
 * - **Auth:** Bearer token required.
 */
export const hideRfqRequest = (payload: {
  rfqQuotesUserId: number;
  isHidden: boolean;
}) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/product/hideRfqRequest`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
