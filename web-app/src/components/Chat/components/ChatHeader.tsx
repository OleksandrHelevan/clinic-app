import type {DoctorResponse} from "../../../domains/doctors/types.ts";


interface ChatHeaderProps {
    doctor: DoctorResponse;
    connected: boolean;
    onClose: () => void;
}

export const ChatHeader = ({ doctor, connected, onClose }: ChatHeaderProps) => (
    <header className="chat-header">
        <div className="chat-header-info">
            <span className="chat-header-title">
                {doctor.firstName} {doctor.lastName}
            </span>
            <div className="chat-header-status">
                <span className={`status-indicator ${connected ? 'online' : 'offline'}`}></span>
                {connected ? 'Online' : 'Offline'}
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