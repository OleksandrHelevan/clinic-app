import type { AiMessage } from '../types';
import { apiClient } from '../../../services/apiClient';

export const aiApi = {
    getHistory: (userId: string): Promise<AiMessage[]> =>
        apiClient.get(`/ai/history/${userId}`),

    sendMessage: (userId: string, message: string): Promise<AiMessage> =>
        apiClient.post('/ai/chat', { userId, message }),

    clearHistory: (userId: string): Promise<void> =>
        apiClient.delete(`/ai/history/${userId}`),
};