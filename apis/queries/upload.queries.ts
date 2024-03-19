import { APIResponseError } from "@/utils/types/common.types";
import { IUploadFile } from "@/utils/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../requests/upload.requests";

export const useUploadFile = () =>
  useMutation<IUploadFile, APIResponseError, {}>({
    mutationFn: async (payload) => {
      const res = await uploadFile(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
      console.log(err);
    },
  });
