import React, { useState } from 'react';
import type { DoctorResponse } from "../../../domains/doctors/types.ts";
import './DoctorCard.css';
import { DefaultAvatar } from "../../../assets/DefaultAvatar.tsx";

interface DoctorCardProps {
    doctor: DoctorResponse;
    onWriteMessage: (doctor: DoctorResponse) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onWriteMessage }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="doctor-card">
            {doctor.avatarUrl && !imageError ? (
                <img
                    className="doctor-avatar"
                    src={doctor.avatarUrl}
                    alt={`${doctor.firstName} ${doctor.lastName}`}
                    onError={() => setImageError(true)}
                />
            ) : (
                <DefaultAvatar className="doctor-avatar" />
            )}

            <div className="doctor-info">
                <h3 className="doctor-name">
                    {doctor.firstName} {doctor.lastName}
                </h3>
                <p className="doctor-specialty">{doctor.specialization}</p>

                <div className="doctor-contacts">
                    <p>{doctor.email}</p>
                    <p>{doctor.phone}</p>
                </div>

                <button
                    className="btn-write"
                    onClick={() => onWriteMessage(doctor)}
                >
                    Message
                </button>
            </div>
        </div>
    );
};