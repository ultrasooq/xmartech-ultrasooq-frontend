import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWishList } from "../requests/wishlist.requests";

export const useWishlist = (
  payload: {
    page: number;
    limit: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["wishlist", payload],
    queryFn: async () => {
      const res = await fetchWishList(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });
