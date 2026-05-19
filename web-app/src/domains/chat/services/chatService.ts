import {chatApiClient} from "../api/chatApiClient.ts";
import type {GetHistoryResponse, GetInboxResponse} from "../types";

export const chatService = {
    getHistory: (senderId: string, recipientId: string, page: number):Promise<GetHistoryResponse> => {
        return chatApiClient.getHistory(senderId, recipientId, page)
    },
    getInbox: (userId: string): Promise<GetInboxResponse> => {
        return chatApiClient.getInbox(userId)
    }
}