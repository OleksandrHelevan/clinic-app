import { useNavigate } from "react-router-dom";
import { useMe } from "../../domains/users/useMe/useMe.ts";
import Button from "../../components/Button/Button.tsx";

export default function ProfilePage() {
    const navigate = useNavigate();
    const { data: user, isLoading, isError } = useMe();

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

    if (isLoading) {
        return (
            <div className="wrapper profile-centered">
            <div className="loader">Завантаження профілю...</div>
        </div>
    );
    }

    // Стан 2: Помилка або користувач не знайдений (не авторизований)
    if (isError || !user) {
        return (
            <div className="wrapper profile-centered">
            <div className="profile-error-card">
                <h2>Помилка доступу</h2>
        <p>Схоже, ви не авторизовані або час сесії минув.</p>
        <Button variant="primary" onClick={() => navigate("/login")}>
        Перейти до входу
        </Button>
        </div>
        </div>
    );
    }

    // Стан 3: Успішне відображення профілю
    return (
        <div className="wrapper">
        <div className="profile-container">
        <div className="profile-header">
        <h1 className="profile-title">Особистий кабінет</h1>
    <p className="profile-subtitle">Платформа Avyro</p>
    </div>

    <div className="profile-card">
    <div className="profile-avatar">
        {/* Беремо першу літеру email для аватарки */}
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
    <div className="profile-info-item">
    <span className="info-label">ID Користувача</span>
    <span className="info-value text-muted">{user.profile.id}</span>
        </div>
        </div>
        </div>

        <div className="profile-actions">
    <Button variant="outline" onClick={handleLogout} className="w-full">
        Вийти з акаунту
    </Button>
    </div>
    </div>
    </div>
);
}