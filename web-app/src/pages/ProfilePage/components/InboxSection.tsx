import React from "react";
import type {ChatMessage} from "../../../types/chat.ts";

interface InboxSectionProps {
    messages: ChatMessage[];
    currentUserId: string;
    onSelectPatient: (patientId: string) => void;
}

export const InboxSection: React.FC<InboxSectionProps> = ({ messages, currentUserId, onSelectPatient }) => {

    const latestMessagesMap = messages.reduce((acc: Record<string, ChatMessage>, msg) => {
        const partnerId = msg.senderId === currentUserId ? msg.recipientId : msg.senderId;

        if (!acc[partnerId] || new Date(msg.timestamp) > new Date(acc[partnerId].timestamp)) {
            acc[partnerId] = msg;
        }
        return acc;
    }, {});

    const sortedChats = Object.values(latestMessagesMap).sort((a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return (
        <div className="messages-section">
            <h3 className="section-title">Inbox</h3>

            <div className="inbox-list">
                {sortedChats.length === 0 ? (
                    <div className="empty-inbox">
                        <p>No messages yet</p>
                    </div>
                ) : (
                    sortedChats.map(lastMsg => {
                        const partnerId = lastMsg.senderId === currentUserId ? lastMsg.recipientId : lastMsg.senderId;
                        const isSentByMe = lastMsg.senderId === currentUserId;

                        return (
                            <div
                                key={partnerId}
                                onClick={() => onSelectPatient(partnerId)}
                                className="inbox-item"
                            >
                                <div className="inbox-item-avatar">
                                    {partnerId.slice(0, 2).toUpperCase()}
                                </div>
                                <div className="inbox-item-content">
                                    <div className="inbox-item-header">
                                        <span className="partner-name">User {partnerId.slice(-4)}</span>
                                        <span className="message-time">
                                            {new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="last-message-text">
                                        {isSentByMe && <span className="you-prefix">You: </span>}
                                        {lastMsg.content}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};