import {chatApiClient} from "../api/chatApiClient.ts";

export const chatService = {
    getHistory: (senderId: string, recipientId: string, page: number) => {
        return chatApiClient.getHistory(senderId, recipientId, page)
    },
    getInbox: (userId: string) => {
        return chatApiClient.getInbox(userId)
    }
}