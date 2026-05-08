import { useInbox } from "../../../domains/chat/useInbox/useInbox.ts";

interface ChatInboxViewProps {
    currentUserId: string;
    onSelectChat: (id: string) => void;
    onClose: () => void;
}

export const ChatInboxView = ({
                                  currentUserId,
                                  onSelectChat,
                                  onClose
                              }: ChatInboxViewProps) => {
    const { data: messages = [], isLoading, isError } = useInbox(currentUserId);

    return (
        <>
            <header className="chat-header">
                <div className="chat-header-info">
                    <span className="chat-header-title">Chats</span>
                </div>
                <button onClick={onClose} className="chat-close-btn" aria-label="Close chat">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </header>

            <div className="chat-messages" style={{ padding: 0, gap: 0, display: 'block' }}>
                {isLoading && <div className="inbox-status">Chats Loading...</div>}
                {isError && <div className="inbox-status error">Error</div>}
                {!isLoading && !isError && messages.length === 0 && (
                    <div className="inbox-status">No active messages</div>
                )}

                {!isLoading && messages.map((msg) => {
                    const partnerId = msg.senderId === currentUserId ? msg.recipientId : msg.senderId;
                    const isMine = msg.senderId === currentUserId;

                    return (
                        <div
                            key={msg.id}
                            className="chat-inbox-item"
                            onClick={() => onSelectChat(partnerId)}
                        >
                            <div className="inbox-item-header">
                                <strong>ID: {partnerId}</strong>
                            </div>
                            <div className="inbox-item-content">
                                {isMine && <span className="inbox-prefix">You: </span>}
                                <span className="inbox-text">{msg.content}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};