import React, { useState } from "react";

interface ProfileInfoCardProps {
    user: {
        role: string;
        profile: {
            firstName: string;
            lastName: string;
            email: string;
            phone?: string;
            avatarUrl?: string;
            specialization?: string;
        };
    };
}

export const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({ user }) => {
    const { profile, role } = user;
    const [imageError, setImageError] = useState(false);

    const getRoleLabel = (r?: string) => {
        switch (r) {
            case "PATIENT": return "Patient";
            case "DOCTOR": return "Doctor";
            case "ADMIN": return "Admin";
            default: return r || "Unknown";
        }
    };

    return (
        <div className="profile-card">
            <div className="profile-header">
                {profile.avatarUrl && !imageError ? (
                    <img
                        className="profile-avatar-img"
                        src={profile.avatarUrl}
                        alt={`${profile.firstName} ${profile.lastName}`}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="profile-avatar-fallback">
                        {profile.firstName ? profile.firstName.charAt(0).toUpperCase() : profile.email.charAt(0).toUpperCase()}
                    </div>
                )}

                <div className="profile-titles">
                    <h2>{profile.firstName} {profile.lastName}</h2>
                    <span className="badge">{getRoleLabel(role)}</span>
                    {role === "DOCTOR" && profile.specialization && (
                        <span className="specialization-text">{profile.specialization}</span>
                    )}
                </div>
            </div>

            <div className="profile-info-grid">
                <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{profile.email}</span>
                </div>
                {profile.phone && (
                    <div className="info-item">
                        <span className="info-label">Phone</span>
                        <span className="info-value">{profile.phone}</span>
                    </div>
                )}
            </div>
        </div>
    );
};