import axios from "axios";
import { isEmpty } from "lodash";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getCookie } from "cookies-next";

export const createMember = (payload:any) => {
    return axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/team-member/create`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
      },
    });
  };
