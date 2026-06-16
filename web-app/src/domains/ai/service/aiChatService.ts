import type { AiMessage } from '../types';
import {aiApi} from "../api/aiApiClient.ts";

export const aiChatService = {
    loadHistory: async (userId: string): Promise<AiMessage[]> => {
        return aiApi.getHistory(userId);
    },

    sendMessage: async (
        userId: string,
        text: string
    ): Promise<{ userMsg: AiMessage; assistantMsg: AiMessage }> => {
        const userMsg: AiMessage = {
            role: 'user',
            message: text,
            timestamp: new Date().toISOString()
        };
        const assistantMsg = await aiApi.sendMessage(userId, text);
        return { userMsg, assistantMsg };
    },

    clearHistory: async (userId: string): Promise<void> => {
        return aiApi.clearHistory(userId);
    }
};