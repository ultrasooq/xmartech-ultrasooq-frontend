
export interface CreatePrivateRoomRequest {
    creatorId: string;
    participants: number[];
}

export interface FindRoomRequest {
    creatorId: number;
    buyerId: number;
}
