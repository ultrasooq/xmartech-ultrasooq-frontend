import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import axios from "axios";
import { getCookie } from "cookies-next";

export const submitQuery = (payload: {
    email: string;
    query: string;
}) => {
    return axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/user/help-center/create`,
        data: payload,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
        },
    });
};