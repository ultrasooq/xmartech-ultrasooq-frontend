import axios from "axios";
import { isEmpty } from "lodash";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getCookie } from "cookies-next";

export const fetchCountries = () => {
  return axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/countryList`,
  });
};

export const fetchBrands = (payload: { term?: string }) => {
  const query = new URLSearchParams();
  if (!isEmpty(payload.term)) {
    query.append("term", String(payload.term));
  }

  return axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}/brand/findAll?${query}`,
  });
};

export const createBrand = (payload: { brandName: string }) => {
  return axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/brand/addBrandByUser`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const fetchLocation = () => {
  return axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/locationList`,
  });
};
