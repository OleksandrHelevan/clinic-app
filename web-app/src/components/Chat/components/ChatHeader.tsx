export interface ChatUser {
    id: string;
    firstName: string;
    lastName: string;
}

interface ChatHeaderProps {
    user: ChatUser;
    connected: boolean;
    onClose: () => void;
    onBack?: () => void;
}

export const ChatHeader = ({ user, onClose, onBack }: ChatHeaderProps) => (
    <header className="chat-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {onBack && (
                <button
                    onClick={onBack}
                    aria-label="Back to inbox"
                    style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', padding: 0 }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>
            )}
            <div className="chat-header-info">
                <span className="chat-header-title">
                    {user.firstName} {user.lastName}
                </span>
            </div>
        </div>

        <button onClick={onClose} className="chat-close-btn" aria-label="Close chat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    </header>
);