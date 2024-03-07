import axios from "axios";

export const fetchTags = () => {
  return axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}/user/viewTags`,
  });
};
