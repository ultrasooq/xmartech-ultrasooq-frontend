import axios from "axios";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import urlcat from "urlcat";
import { getApiUrl } from "@/config/api";

/**
 * Fetches all reviews for a specific product with optional sorting and pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.productId - The string product ID to fetch reviews for.
 * @param payload.sortType - Optional sort order (`"highest"`, `"lowest"`, or `"newest"`).
 * @returns Axios promise resolving to the paginated list of product reviews.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getAllProductReview`
 * - **Auth:** None required.
 */
export const fetchReviews = (payload: {
  page: number;
  limit: number;
  productId: string;
  sortType?: "highest" | "lowest" | "newest";
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/getAllProductReview`, payload),
  });
};

/**
 * Adds a new review for a product.
 *
 * @param payload - The review data.
 * @param payload.productId - The numeric product ID to review.
 * @param payload.title - The review title.
 * @param payload.description - The review body text.
 * @param payload.rating - The numeric rating value.
 * @returns Axios promise resolving to the newly created product review.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/product/addProductReview`
 * - **Auth:** Bearer token required.
 */
export const addReview = (payload: {
  productId: number;
  title: string;
  description: string;
  rating: number;
}) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/product/addProductReview`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates an existing product review.
 *
 * @param payload - The review update data.
 * @param payload.productReviewId - The numeric ID of the review to update.
 * @param payload.title - The updated review title.
 * @param payload.description - The updated review body text.
 * @param payload.rating - The updated numeric rating value.
 * @returns Axios promise resolving to the updated product review.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/product/editProductReview`
 * - **Auth:** Bearer token required.
 */
export const updateReview = (payload: {
  productReviewId: number;
  title: string;
  description: string;
  rating: number;
}) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/product/editProductReview`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches a single product review by its ID.
 *
 * @param payload - The lookup parameters.
 * @param payload.productReviewId - The numeric ID of the review to retrieve.
 * @returns Axios promise resolving to the review details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getOneProductReview`
 * - **Auth:** Bearer token required.
 */
export const fetchReviewById = (payload: { productReviewId: number }) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/getOneProductReview`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

// export const fetchAllReviewBySellerId = (payload: {
//   page: number;
//   limit: number;
//   sortType?: "highest" | "lowest" | "newest";
// }) => {
//   return axios({
//     method: "GET",
//     url: urlcat(
//       `${getApiUrl()}/product/getAllProductReviewBySellerId`,
//       payload,
//     ),
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
//     },
//   });
// };

/**
 * Adds a new review for a specific seller's product price entry.
 *
 * @param payload - The seller review data.
 * @param payload.productPriceId - The numeric product price entry ID.
 * @param payload.adminId - The numeric seller/admin user ID.
 * @param payload.productId - The numeric product ID.
 * @param payload.title - The review title.
 * @param payload.description - The review body text.
 * @param payload.rating - The numeric rating value.
 * @returns Axios promise resolving to the newly created seller review.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/product/addProductPriceReview`
 * - **Auth:** Bearer token required.
 */
export const addSellerReview = (payload: {
  productPriceId: number;
  adminId: number;
  productId: number;
  title: string;
  description: string;
  rating: number;
}) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/product/addProductPriceReview`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates an existing seller product price review.
 *
 * @param payload - The seller review update data.
 * @param payload.productReviewId - The numeric ID of the review to update.
 * @param payload.title - The updated review title.
 * @param payload.description - The updated review body text.
 * @param payload.rating - The updated numeric rating value.
 * @returns Axios promise resolving to the updated seller review.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/product/updateOneProductPriceReview`
 * - **Auth:** Bearer token required.
 */
export const updateSellerReview = (payload: {
  productReviewId: number;
  title: string;
  description: string;
  rating: number;
}) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/product/updateOneProductPriceReview`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches a single seller product price review by its ID.
 *
 * @param payload - The lookup parameters.
 * @param payload.productPriceReviewId - The numeric ID of the seller review to retrieve.
 * @returns Axios promise resolving to the seller review details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getOneProductPriceReview`
 * - **Auth:** Bearer token required.
 */
export const fetchSellerReviewById = (payload: {
  productPriceReviewId: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/getOneProductPriceReview`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all product price reviews for a specific seller with sorting and pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.sortType - Optional sort order (`"highest"`, `"lowest"`, or `"newest"`).
 * @param payload.sellerId - The string seller ID to filter reviews for.
 * @returns Axios promise resolving to the paginated list of seller reviews.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getAllProductPriceReviewBySellerId`
 * - **Auth:** Bearer token required.
 */
export const fetchAllProductPriceReviewBySellerId = (payload: {
  page: number;
  limit: number;
  sortType?: "highest" | "lowest" | "newest";
  sellerId: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${getApiUrl()}/product/getAllProductPriceReviewBySellerId`,
      payload,
    ),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
