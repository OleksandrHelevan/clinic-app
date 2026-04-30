import type { DoctorResponse } from "../../domains/doctors/types.ts";
import { useChat } from "../../domains/chat/useChat/useChat.ts";
import { ChatHeader } from "./components/ChatHeader";
import { ChatMessages } from "./components//ChatMessages";
import { ChatInput } from "./components//ChatInput";
import './Chat.css';

interface ChatProps {
    doctor: DoctorResponse;
    onClose: () => void;
    currentUserId: string;
}

export const Chat = ({ doctor, onClose, currentUserId }: ChatProps) => {
    const {
        messages,
        isTyping,
        connected,
        sendMessage,
        sendTypingEvent
    } = useChat(currentUserId, doctor.id);

    return (
        <div className="chat-overlay">
            <div className="chat-container">
                <ChatHeader
                    doctor={doctor}
                    connected={connected}
                    onClose={onClose}
                />

                <ChatMessages
                    messages={messages}
                    currentUserId={currentUserId}
                    isTyping={isTyping}
                />

                <ChatInput
                    onSendMessage={sendMessage}
                    onTyping={sendTypingEvent}
                    placeholder={isTyping ? `${doctor.firstName} typing...` : "Type a message..."}
                />
            </div>
        </div>
    );
};