import { ADMIN_BEARER, PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getCookie } from "cookies-next";
import axios from "axios";

export const createProduct = (payload: any) => {
  return axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/create`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // TODO: remove later
      // Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
      Authorization: "Bearer " + ADMIN_BEARER,
    },
  });
};

export const fetchProducts = () => {
  return axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/findAll`,
  });
};
