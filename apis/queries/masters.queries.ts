import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createBrand,
  fetchBrands,
  fetchCountries,
  fetchLocation,
} from "../requests/masters.requests";
import { APIResponseError } from "@/utils/types/common.types";

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

export const useBrands = (payload: { term?: string, addedBy?: number, type?: string }, enabled = true) =>
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

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { brandName: string }
  >({
    mutationFn: async (payload) => {
      const res = await createBrand(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
};

export const useLocation = (enabled = true) =>
  useQuery({
    queryKey: ["location"],
    queryFn: async () => {
      const res = await fetchLocation();
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });
