import { useQuery } from "@tanstack/react-query";
import { fetchTags } from "../requests/tags.requests";

export const useTags = (enabled = true) =>
  useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await fetchTags();
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });
