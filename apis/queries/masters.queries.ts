import { useQuery } from "@tanstack/react-query";
import { fetchBrands, fetchCountries } from "../requests/masters.requests";

export const useCountries = (enabled = true) =>
  useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await fetchCountries();
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

export const useBrands = (payload: { term?: string }, enabled = true) =>
  useQuery({
    queryKey: ["brands", payload],
    queryFn: async () => {
      const res = await fetchBrands(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });
