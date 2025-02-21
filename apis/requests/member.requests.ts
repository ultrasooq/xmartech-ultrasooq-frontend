import axios from "axios";
import { isEmpty } from "lodash";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getCookie } from "cookies-next";
import urlcat from "urlcat";

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

  export const fetchAllMembers = (payload: { page: number; limit: number;}) => {
    return axios({
      method: "GET",
      url: urlcat(`${process.env.NEXT_PUBLIC_API_URL}/team-member/getAllTeamMember`, payload,),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
      },
    });
  };
  
