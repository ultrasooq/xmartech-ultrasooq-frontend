import axios from "axios";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import urlcat from "urlcat";

export const fetchQuestions = (payload: {
  page: number;
  limit: number;
  productId: string;
  sortType?: "newest" | "oldest";
  userType?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${process.env.NEXT_PUBLIC_API_URL}/product/getAllQuestion`,
      payload,
    ),
  });
};

export const addQuestion = (payload: {
  productId: number;
  question: string;
}) => {
  return axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/askQuestion`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const updateAnswer = (payload: {
  productQuestionId: number;
  answer: string;
}) => {
  return axios({
    method: "PATCH",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/giveAnswer`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const fetchServiceQuestions = (payload: {
  page: number;
  limit: number;
  serviceId: string;
  sortType?: "latest" | "oldest";
  userType?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${process.env.NEXT_PUBLIC_API_URL}/service/getAllQuestion`,
      payload,
    ),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const addServiceQuestion = (payload: {
  serviceId: number;
  question: string;
}) => {
  return axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/service/ask-question`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

export const updateServiceAnswer = (payload: {
  serviceId: number;
  productQuestionId: number;
  answer: string;
}) => {
  return axios({
    method: "PATCH",
    url: `${process.env.NEXT_PUBLIC_API_URL}/service/giveAnswer`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
