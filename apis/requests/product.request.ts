import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getCookie } from "cookies-next";
import axios from "axios";
import { isEmpty } from "lodash";
import {
  IDeleteProductRequest,
  IUpdateProductRequest,
} from "@/utils/types/product.types";

export const createProduct = (payload: any) => {
  return axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/create`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const fetchProducts = (payload: {
  page: number;
  limit: number;
  userId: string;
}) => {
  const query = new URLSearchParams({
    page: payload.page.toString(),
    limit: payload.limit.toString(),
  });

  if (!isEmpty(payload.userId)) {
    query.append("userId", String(payload.userId));
  }

  return axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/findAll?${query}`,
  });
};

export const fetchProductById = (payload: { productId: string }) => {
  const query = new URLSearchParams();

  if (!isEmpty(payload.productId)) {
    query.append("productId", String(payload.productId));
  }

  return axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/findOne?${query}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const deleteProduct = (payload: IDeleteProductRequest) => {
  return axios({
    method: "DELETE",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/delete/${payload.productId}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const updateProduct = (payload: IUpdateProductRequest) => {
  return axios({
    method: "PATCH",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/update`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
