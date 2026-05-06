import { useState } from 'react';
import { type ChatUser } from "./components/ChatHeader.tsx";
import { ChatInboxView } from "./components/ChatInboxView.tsx";
import './Chat.css';
import {ChatActiveView} from "./components/ChatActiveViewї.tsx";

interface ChatProps {
    user?: ChatUser;
    onClose: () => void;
    currentUserId: string;
}

export const Chat = ({ user, onClose, currentUserId }: ChatProps) => {
    const [selectedUser, setSelectedUser] = useState<ChatUser | undefined>(undefined);
    const [showInboxManually, setShowInboxManually] = useState(false);

    const activeUser = showInboxManually ? selectedUser : (user || selectedUser);

    const handleBack = () => {
        setShowInboxManually(true);
        setSelectedUser(undefined);
    };

    const handleSelectFromInbox = (id: string) => {
        setShowInboxManually(false);
        setSelectedUser({
            id,
            firstName: "User",
            lastName: id
        });
    };

    return (
        <div className="chat-overlay">
            <div className="chat-container">
                {!activeUser ? (
                    <ChatInboxView
                        currentUserId={currentUserId}
                        onSelectChat={handleSelectFromInbox}
                        onClose={onClose}
                    />
                ) : (
                    <ChatActiveView
                        user={activeUser}
                        currentUserId={currentUserId}
                        onClose={onClose}
                        onBack={handleBack}
                    />
                )}
            </div>
        </div>
    );
};