import { APIResponseError } from "../../utils/types/common.types";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { CreatePrivateRoomRequest } from "../../utils/types/chat.types";
import { createPrivateRoom, findRoomId } from "../requests/chat.requests";

export const useCreatePrivateRoom = () => {
    const queryClient = useQueryClient();
    return useMutation<
        { data: any; message: string; status: boolean, id: string },
        APIResponseError,
        CreatePrivateRoomRequest
    >({
        mutationFn: async (payload) => {
            const res = await createPrivateRoom(payload);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["chat"],
            });
        },
        onError: (err: APIResponseError) => {
            console.log(err);
        },
    });
};