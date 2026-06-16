import { useState, useCallback } from 'react';
import { aiChatService } from '../service/aiChatService';
import type { AiMessage } from '../types';

const FALLBACK_MESSAGE: AiMessage = {
    role: 'assistant',
    message: 'Вибачте, сталася помилка. Спробуйте пізніше.',
    timestamp: new Date().toISOString()
};

export const useAiChat = (userId: string) => {
    const [messages, setMessages] = useState<AiMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);

    const loadHistory = useCallback(async () => {
        if (isHistoryLoaded) return;
        try {
            const data = await aiChatService.loadHistory(userId);
            setMessages(data);
        } catch (e) {
            console.error(e);
        } finally {
            setIsHistoryLoaded(true);
        }
    }, [userId, isHistoryLoaded]);

    const sendMessage = useCallback(async (text: string) => {
        setIsLoading(true);
        try {
            const { userMsg, assistantMsg } = await aiChatService.sendMessage(userId, text);
            setMessages(prev => [...prev, userMsg, assistantMsg]);
        } catch (e) {
            console.error(e);
            setMessages(prev => [...prev, FALLBACK_MESSAGE]);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    const clearHistory = useCallback(async () => {
        await aiChatService.clearHistory(userId);
        setMessages([]);
        setIsHistoryLoaded(false);
    }, [userId]);

    return { messages, isLoading, sendMessage, loadHistory, clearHistory };
};