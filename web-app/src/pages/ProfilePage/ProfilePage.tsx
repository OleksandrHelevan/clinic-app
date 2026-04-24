import { useNavigate } from "react-router-dom";
import { useMe } from "../../domains/users/useMe/useMe.ts";
import Button from "../../components/Button/Button.tsx";
import { useState } from "react";
import { useChat } from "../../hooks/useChat/useChat.ts";
import { Chat } from "../../components/Chat/Chat.tsx";
import type {DoctorResponse} from "../../domains/doctors/types.ts";

export default function ProfilePage() {
    const navigate = useNavigate();
    const { data: user, isLoading, isError } = useMe();

    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

    const { messages, connected } = useChat(user?.profile?.id || "");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
    };

    const getRoleLabel = (role?: string) => {
        switch (role) {
            case "PATIENT": return "Пацієнт";
            case "DOCTOR": return "Лікар";
            case "ADMIN": return "Адміністратор";
            default: return role || "Невідомо";
        }
    };

    if (isLoading) return <div className="wrapper profile-centered">Завантаження...</div>;

    if (isError || !user) {
        return (
            <div className="wrapper profile-centered">
                <div className="profile-error-card">
                    <h2>Помилка доступу</h2>
                    <Button variant="primary" onClick={() => navigate("/login")}>Вхід</Button>
                </div>
            </div>
        );
    }

    const chatPartners = Array.from(new Set(messages.map(m => m.senderId === user.profile.id ? m.recipientId : m.senderId)));

    return (
        <div className="wrapper">
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-avatar">
                        {user.profile.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="profile-info-list">
                        <div className="profile-info-item">
                            <span className="info-label">Email</span>
                            <span className="info-value">{user.profile.email}</span>
                        </div>
                        <div className="profile-info-item">
                            <span className="info-label">Роль</span>
                            <span className="info-value badge">{getRoleLabel(user.role)}</span>
                        </div>
                    </div>
                </div>

                {user.role === "DOCTOR" && (
                    <div className="messages-section" style={{ marginTop: '20px' }}>
                        <h3>📥 Вхідні повідомлення {connected ? '🟢' : '🔴'}</h3>
                        <div className="inbox-list" style={inboxContainerStyle}>
                            {chatPartners.length === 0 ? (
                                <p style={{ color: '#888' }}>Повідомлень поки немає</p>
                            ) : (
                                chatPartners.map(partnerId => (
                                    <div
                                        key={partnerId}
                                        onClick={() => setSelectedPatientId(partnerId)}
                                        style={inboxItemStyle}
                                    >
                                        <strong>Пацієнт ID: {partnerId.slice(0, 8)}...</strong>
                                        <p style={{ fontSize: '0.8rem', margin: 0 }}>Натисніть, щоб відповісти</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                <div className="profile-actions" style={{ marginTop: '20px' }}>
                    <Button variant="outline" onClick={handleLogout} className="w-full">
                        Вийти з акаунту
                    </Button>
                </div>
            </div>

            {selectedPatientId && (
                <Chat
                    currentUserId={user.profile.id}
                    onClose={() => setSelectedPatientId(null)}
                    doctor={{ id: selectedPatientId, firstName: "Пацієнт", lastName: "" } as DoctorResponse}
                />
            )}
        </div>
    );
}

const inboxContainerStyle: React.CSSProperties = {
    background: '#f9f9f9',
    borderRadius: '8px',
    padding: '10px',
    border: '1px solid #eee'
};

const inboxItemStyle: React.CSSProperties = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
    transition: 'background 0.2s'
};