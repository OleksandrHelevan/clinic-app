import type {ChatMessage} from "../../../domains/chat/types";
import type {ChatUser} from "./ChatHeader.tsx";
import {ChatReplyBtn} from "./ChatReplyBtn.tsx";
import {ChatLikeBtn} from "./ChatLikeBtn.tsx";

interface ChatMessageItemProps {
    msg: ChatMessage;
    allMessages: ChatMessage[];
    currentUserId: string;
    otherUser: ChatUser;
    onLikeMessage: (messageId: string, currentLikedStatus: boolean) => void;
    onReplyMessage: (message: ChatMessage) => void;
}

export const ChatMessageItem = ({
                                    msg,
                                    allMessages,
                                    currentUserId,
                                    otherUser,
                                    onLikeMessage,
                                    onReplyMessage
                                }: ChatMessageItemProps) => {
    const isSentByMe = msg.senderId === currentUserId;
    const isActuallyLiked = msg.liked === true;

    const getReplySenderName = () => {
        const originalMessage = allMessages.find(m => m.id === msg.replyToMessageId);
        if (originalMessage) {
            return originalMessage.senderId === currentUserId
                ? "You"
                : `${otherUser.firstName} ${otherUser.lastName}`;
        }
        return "User";
    };

    return (
        <div className={`chat-bubble-wrapper ${isSentByMe ? 'sent' : 'received'}`}>
            <div className={`chat-bubble ${isSentByMe ? 'sent' : 'received'}`}>

                {msg.replyToMessageId && (
                    <div className="chat-message-reply-preview">
                        <small className="reply-sender">
                            {getReplySenderName()}
                        </small>
                        <p className="reply-text">{msg.replyPreview}</p>
                    </div>
                )}

                <div className="chat-message-content">
                    {msg.content}
                </div>

                <div className="chat-message-actions">
                    <ChatReplyBtn message={msg} onReplyMessage={onReplyMessage}/>
                    <ChatLikeBtn messageId={msg.id} isLiked={isActuallyLiked} onLikeMessage={onLikeMessage}/>
                </div>
            </div>
        </div>
    );
};