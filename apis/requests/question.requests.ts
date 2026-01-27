import axios from "axios";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import urlcat from "urlcat";
import { getApiUrl } from "@/config/api";

/**
 * Fetches all questions for a specific product with optional sorting and pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.productId - The string product ID to fetch questions for.
 * @param payload.sortType - Optional sort order (`"newest"` or `"oldest"`).
 * @param payload.userType - Optional user type filter.
 * @returns Axios promise resolving to the paginated list of product questions.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getAllQuestion`
 * - **Auth:** None required.
 */
export const fetchQuestions = (payload: {
  page: number;
  limit: number;
  productId: string;
  sortType?: "newest" | "oldest";
  userType?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/getAllQuestion`, payload),
  });
};

/**
 * Submits a new question for a product.
 *
 * @param payload - The question submission data.
 * @param payload.productId - The numeric product ID to ask about.
 * @param payload.question - The question text.
 * @returns Axios promise resolving to the newly created question.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/product/askQuestion`
 * - **Auth:** Bearer token required.
 */
export const addQuestion = (payload: {
  productId: number;
  question: string;
}) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/product/askQuestion`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates/provides an answer to an existing product question.
 *
 * @param payload - The answer data.
 * @param payload.productQuestionId - The numeric ID of the question to answer.
 * @param payload.answer - The answer text.
 * @returns Axios promise resolving to the updated question with the answer.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/product/giveAnswer`
 * - **Auth:** Bearer token required.
 */
export const updateAnswer = (payload: {
  productQuestionId: number;
  answer: string;
}) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/product/giveAnswer`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all questions for a specific service with optional sorting and pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.serviceId - The string service ID to fetch questions for.
 * @param payload.sortType - Optional sort order (`"latest"` or `"oldest"`).
 * @param payload.userType - Optional user type filter.
 * @returns Axios promise resolving to the paginated list of service questions.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/service/getAllQuestion`
 * - **Auth:** Bearer token required.
 */
export const fetchServiceQuestions = (payload: {
  page: number;
  limit: number;
  serviceId: string;
  sortType?: "latest" | "oldest";
  userType?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/service/getAllQuestion`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Submits a new question for a service.
 *
 * @param payload - The question submission data.
 * @param payload.serviceId - The numeric service ID to ask about.
 * @param payload.question - The question text.
 * @returns Axios promise resolving to the newly created service question.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/service/ask-question`
 * - **Auth:** Bearer token required.
 */
export const addServiceQuestion = (payload: {
  serviceId: number;
  question: string;
}) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/service/ask-question`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Provides an answer to an existing service question.
 *
 * @param payload - The answer data.
 * @param payload.serviceId - The numeric service ID.
 * @param payload.productQuestionId - The numeric question ID to answer.
 * @param payload.answer - The answer text.
 * @returns Axios promise resolving to the updated question with the answer.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/service/giveAnswer`
 * - **Auth:** Bearer token required.
 */
export const updateServiceAnswer = (payload: {
  serviceId: number;
  productQuestionId: number;
  answer: string;
}) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/service/giveAnswer`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
