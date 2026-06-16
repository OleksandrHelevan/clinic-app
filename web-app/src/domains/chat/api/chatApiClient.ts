import type {GetHistoryResponse, GetInboxResponse} from "../types.ts";
import {apiClient} from "../../../services/apiClient.ts";

export const chatApiClient = {
    getHistory: (senderId: string, recipientId: string, page: number): Promise<GetHistoryResponse> =>
        apiClient.get(`/chat/history/${senderId}/${recipientId}?page=${page}`),
    getInbox: (userId: string): Promise<GetInboxResponse> =>
        apiClient.get(`/chat/inbox/${userId}`),
}