import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import type { ChatMessage, ChatEvent, ChatCallbacks, SendMessagePayload } from '../types.ts';
import { getFromStorage } from "../../../utils/localStorageUtil.ts";

export class ChatService {
    private client: Client | null = null;
    private currentUserId: string | null = null;
    private readonly WS_BASE_URL = '/api/chat';

    public connect(userId: string, callbacks: ChatCallbacks): void {
        if (this.client?.active) return;

        this.currentUserId = userId;
        const token = getFromStorage("token");

        const wsUrlWithToken = `${this.WS_BASE_URL}?token=${token}`;

        this.client = new Client({
            webSocketFactory: () => new SockJS(wsUrlWithToken),
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("WebSocket Connected as user:", userId);
                callbacks.onConnect();

                this.client?.subscribe('/user/queue/messages', (payload) => {
                    const message: ChatMessage = JSON.parse(payload.body);
                    callbacks.onMessage(message);
                });

                this.client?.subscribe('/user/queue/events', (payload) => {
                    const event: ChatEvent = JSON.parse(payload.body);
                    callbacks.onEvent(event);
                });
            },
            onDisconnect: () => {
                callbacks.onDisconnect();
            },
            onStompError: (frame) => {
                console.error('STOMP Error:', frame.headers['message']);
            }
        });

        this.client.activate();
    }

    public disconnect(): void {
        if (this.client?.active) {
            this.client.deactivate();
        }
        this.client = null;
        this.currentUserId = null;
    }

    public get isConnected(): boolean {
        return !!this.client?.connected;
    }

    public sendMessage(payload: SendMessagePayload): void {
        if (!this.isConnected) return;

        this.client!.publish({
            destination: '/app/chat',
            body: JSON.stringify(payload),
        });
    }

    public sendEvent(eventParams: Partial<ChatEvent> & { type: ChatEvent["type"], recipientId: string }): void {
        if (!this.isConnected || !this.currentUserId) return;

        const fullEvent: ChatEvent = {
            ...eventParams,
            senderId: this.currentUserId
        } as ChatEvent;

        this.client!.publish({
            destination: '/app/chat.sendEvent',
            body: JSON.stringify(fullEvent),
        });
    }
}