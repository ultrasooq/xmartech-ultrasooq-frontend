import { APIResponseError } from "../../utils/types/common.types";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { CreatePrivateRoomRequest } from "../../utils/types/chat.types";
import { createPrivateRoom, findRoomId } from "../requests/chat.requests";

export const useCreatePrivateRoom = () => {
    const queryClient = useQueryClient();
    return useMutation<
        { data: any; message: string; status: boolean },
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


export const useFindRoom = (creatorId: number, buyerId: number) =>
    useQuery<{ roomId: number | null }, APIResponseError>({
        queryKey: ['find-room', { creatorId, buyerId }],
        queryFn: async () => {
            const res = await findRoomId({ creatorId, buyerId });
            return res.data;
        },
        enabled: !!creatorId && !!buyerId, // Only run the query if both creatorId and buyerId are provided
    });