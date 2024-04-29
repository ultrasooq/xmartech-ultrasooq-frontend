import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getCookie } from "cookies-next";
import axios from "axios";
import urlcat from "urlcat";

export const fetchRfqProducts = (payload: { page: number; limit: number }) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${process.env.NEXT_PUBLIC_API_URL}/product/getAllRfqProduct`,
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
