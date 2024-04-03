import axios from "axios";
import { isEmpty } from "lodash";

export const fetchCountries = () => {
  return axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/countryList`,
  });
};

export const fetchBrands = (payload: { term?: string }) => {
  const query = new URLSearchParams();
  if (!isEmpty(payload.term)) {
    query.append("term", String(payload.term));
  }

  return axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}/brand/findAll?${query}`,
  });
};
