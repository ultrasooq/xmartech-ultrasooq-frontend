import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import axios from "axios";
import { getCookie } from "cookies-next";

export const uploadFile = (payload: any) => {
  return axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/user/presignedUrlUpload`,
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
