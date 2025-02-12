import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getCookie } from "cookies-next";
import axios from "axios";
import urlcat from "urlcat";
import { AddRfqQuotesRequest } from "@/utils/types/rfq.types";

export const fetchRfqProducts = (payload: {
  page: number;
  limit: number;
  term?: string;
  adminId?: string;
  sortType?: "newest" | "oldest";
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${process.env.NEXT_PUBLIC_API_URL}/product/getAllRfqProduct`,
      payload,
    ),
  });
};

export const fetchFactoriesProducts = (payload: {
  page: number;
  limit: number;
  term?: string;
  adminId?: string;
  sortType?: "newest" | "oldest";
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${process.env.NEXT_PUBLIC_API_URL}/product/getAllFactoriesProduct`,
      payload,
    ),
  });
};

export const addRfqProduct = (payload: {
  productNote: string;
  rfqProductName: string;
  rfqProductImagesList: { imageName: string; image: string }[];
}) => {
  return axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/addRfqProduct`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const updateRfqProduct = (payload: {
  rFqProductId: number;
  productNote: string;
  rfqProductName: string;
  rfqProductImagesList: { imageName: string; image: string }[];
}) => {
  return axios({
    method: "PATCH",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/editRfqProduct`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const fetchRfqProductById = (payload: { rfqProductId: string }) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${process.env.NEXT_PUBLIC_API_URL}/product/getOneRfqProduct`,
      payload,
    ),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const fetchRfqCartByUserId = (payload: {
  page: number;
  limit: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${process.env.NEXT_PUBLIC_API_URL}/cart/rfqCartlist`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const updateRfqCartWithLogin = (payload: {
  productId: number;
  quantity: number;
  offerPrice: number;
  note: string;
}) => {
  return axios({
    method: "PATCH",
    url: `${process.env.NEXT_PUBLIC_API_URL}/cart/updateRfqCart`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const addFactoriesProductApi = (payload: {
  productId: number;
}) => {
  return axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/addProductDuplicateFactories`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const deleteRfqCartItem = (payload: { rfqCartId: number }) => {
  return axios({
    method: "DELETE",
    url: urlcat(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/rfqCartDelete`,
      payload,
    ),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const fetchAllRfqQuotesByBuyerId = (payload: {
  page: number;
  limit: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${process.env.NEXT_PUBLIC_API_URL}/product/getAllRfqQuotesByBuyerID`,
      payload,
    ),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const fetchAllRfqQuotesUsersByBuyerId = (payload: {
  page: number;
  limit: number;
  rfqQuotesId: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${process.env.NEXT_PUBLIC_API_URL}/product/getAllRfqQuotesUsersByBuyerID`,
      payload,
    ),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const fetchOneRfqQuotesUsersByBuyerID = (payload: {
  rfqQuotesId?: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${process.env.NEXT_PUBLIC_API_URL}/product/getOneRfqQuotesUsersByBuyerID`,
      payload,
    ),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const fetchAllRfqQuotesUsersBySellerId = (payload: {
  page: number;
  limit: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${process.env.NEXT_PUBLIC_API_URL}/product/getAllRfqQuotesUsersBySellerID`,
      payload,
    ),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const addRfqQuotes = (payload: AddRfqQuotesRequest) => {
  return axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/addRfqQuotes`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const addProductDuplicateRfq = (payload: { productId: number }) => {
  return axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/addProductDuplicateRfq`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const deleteRfqQuote = (payload: { rfqQuotesId: number }) => {
  return axios({
    method: "DELETE",
    url: urlcat(
      `${process.env.NEXT_PUBLIC_API_URL}/product/deleteOneRfqQuote`,
      payload,
    ),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
