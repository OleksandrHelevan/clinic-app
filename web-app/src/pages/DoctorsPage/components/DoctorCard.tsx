import { useState } from 'react';
import type { UserResponse } from "../../../domains/doctors/types.ts";
import './DoctorCard.css';
import { DefaultAvatar } from "../../../assets/DefaultAvatar.tsx";
import Button from "../../../components/Button/Button.tsx";

interface DoctorCardProps {
    doctor: UserResponse;
    onWriteMessage: (doctor: UserResponse) => void;
}

export const DoctorCard = ({ doctor, onWriteMessage }: DoctorCardProps) => {
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

                <Button
                    className="btn-write"
                    onClick={() => onWriteMessage(doctor)}
                >
                    Message
                </Button>
            </div>
        </div>
    );
};