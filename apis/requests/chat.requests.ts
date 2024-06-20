import { PUREMOON_TOKEN_KEY } from '../../utils/constants';
import axios from "axios";
import urlcat from "urlcat";
import { getCookie } from "cookies-next";
import { CreatePrivateRoomRequest, FindRoomRequest } from "../../utils/types/chat.types";


export const createPrivateRoom = (payload: CreatePrivateRoomRequest) => {
    return axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/chat/createPrivateRoom`,
        data: payload,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
        },
    });
};


export const findRoomId = (payload: FindRoomRequest) => {
    return axios({
        method: "GET",
        url: urlcat(
            `${process.env.NEXT_PUBLIC_API_URL}/chat/find-room`,
            payload,
        ),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
        },
    });
};