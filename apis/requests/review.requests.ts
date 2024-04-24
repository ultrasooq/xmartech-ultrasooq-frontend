import axios from "axios";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import urlcat from "urlcat";

export const fetchReviews = (payload: {
  page: number;
  limit: number;
  productId: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${process.env.NEXT_PUBLIC_API_URL}/product/getAllProductReview`,
      payload,
    ),
  });
};

export const addReview = (payload: {
  productId: number;
  title: string;
  description: string;
  rating: number;
}) => {
  return axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/addProductReview`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
