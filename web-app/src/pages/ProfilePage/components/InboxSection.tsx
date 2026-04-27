import React from "react";

interface InboxSectionProps {
    messages: any[];
    currentUserId: string;
    onSelectPatient: (patientId: string) => void;
}

export const InboxSection: React.FC<InboxSectionProps> = ({ messages, currentUserId, onSelectPatient }) => {
    const chatPartners = Array.from(
        new Set(messages.map(m => m.senderId === currentUserId ? m.recipientId : m.senderId))
    );

    return (
        <div className="messages-section">
            <h3 className="section-title">Inbox</h3>

            <div className="inbox-list">
                {chatPartners.length === 0 ? (
                    <div className="empty-inbox">
                        <p>No messages yet</p>
                    </div>
                ) : (
                    chatPartners.map(partnerId => (
                        <div
                            key={partnerId}
                            onClick={() => onSelectPatient(partnerId)}
                            className="inbox-item"
                        >
                            <div className="inbox-item-content">
                                <strong>Patient ID: {partnerId.slice(0, 8)}...</strong>
                                <p>Click to reply</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};