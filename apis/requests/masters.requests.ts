import axios from "axios";

export const fetchCountries = () => {
  return axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}/product/countryList`,
  });
};

export const fetchBrands = () => {
  return axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}/brand/findAll`,
  });
};
