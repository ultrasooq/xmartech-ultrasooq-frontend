
export interface CreatePrivateRoomRequest {
    creatorId: string;
    participants: number[];
}

export interface FindRoomRequest {
    rfqId: number;
    buyerId: number;
}


export interface SendMessageRequest {
    content: string;
    userId: number;
    roomId: number
}


export interface ChatHistoryRequest {
    roomId: number | null;
}
