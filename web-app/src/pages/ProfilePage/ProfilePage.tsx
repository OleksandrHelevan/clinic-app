import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMe } from "../../domains/users/useMe/useMe.ts";
import Button from "../../components/Button/Button.tsx";
import { Chat } from "../../components/Chat/Chat.tsx";
import { Loader } from "../../components/Loader/Loader.tsx";
import type { UserResponse } from "../../domains/doctors/types.ts";

import "./ProfilePage.css";
import { ProfileInfoCard } from "./components/ProfileInfoCard.tsx";
import {LOGIN_PATH} from "../../constants/paths.ts";

export default function ProfilePage() {
    const navigate = useNavigate();
    const { data: user, isLoading, isError } = useMe();
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate(LOGIN_PATH);
    };

    if (isLoading) {
        return (
            <div className="profile-centered">
                <Loader text="Loading profile..." />
            </div>
        );
    }

    if (isError || !user) {
        return (
            <div className="profile-centered">
                <div className="profile-error-card">
                    <h2>Access Denied</h2>
                    <p>Please log in to view your profile.</p>
                    <Button variant="primary" onClick={() => navigate(LOGIN_PATH)}>
                        Log in
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-wrapper">
            <div className="profile-container">

                <ProfileInfoCard user={user} />

                <div className="profile-actions">
                    <button className="btn-logout" onClick={handleLogout}>
                        Log out
                    </button>
                </div>
            </div>

            {selectedPatientId && user.profile?.id && (
                <Chat
                    currentUserId={user.profile.id}
                    onClose={() => setSelectedPatientId(null)}
                    doctor={{ id: selectedPatientId, firstName: "Patient", lastName: "" } as UserResponse}
                />
            )}
        </div>
    );
}