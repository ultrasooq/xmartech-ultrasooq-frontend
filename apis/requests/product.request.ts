import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getCookie } from "cookies-next";
import axios from "axios";

export const createProduct = (payload: any) => {
  return axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/user/addProduct`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
