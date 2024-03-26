import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import axios from "axios";
import { getCookie } from "cookies-next";

const ADMIN_BEARER =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwic3ViIjoxLCJpYXQiOjE3MTAzMTI0NTksImV4cCI6MTc0MTg3MDA1OX0.XiU8kkLVYPBxZ5dy8tk8XP5ooVTrAJTvlOUfqbrLyHI";
export const fetchCategory = () => {
  return axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}/category/findOne?categoryId=1&menuId=1`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
      Authorization: "Bearer " + ADMIN_BEARER,
    },
  });
};
