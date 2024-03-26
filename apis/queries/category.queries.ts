import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "../requests/category.requests";

export const useCategory = (enabled = true) =>
  useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const data = {
        categoryId: 1,
        menuId: 1,
      };
      const res = await fetchCategory();
      return res.data;
    },
    // onSuccess: () => {},
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });
