import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getCookie } from "cookies-next";
import axios from "axios";
import urlcat from "urlcat";

export const fetchWishList = (payload: { page: number; limit: number }) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${process.env.NEXT_PUBLIC_API_URL}/wishlist/getAllWishListByUser`,
      payload,
    ),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
