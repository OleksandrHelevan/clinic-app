import React from 'react';
import type { DoctorResponse } from "../../../domains/doctors/types.ts";

interface DoctorCardProps {
    doctor: DoctorResponse;
    onWriteMessage: (doctor: DoctorResponse) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onWriteMessage }) => {
    return (
        <div style={cardStyle}>
            <img
                src={doctor.avatarUrl || 'https://via.placeholder.com/100'}
                alt={doctor.lastName || 'Doctor'}
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 8px 0' }}>
                    {doctor.firstName} {doctor.lastName}
                </h3>
                <p style={{ color: '#666', fontWeight: 'bold', margin: '4px 0' }}>{doctor.specialization}</p>
                <p style={{ fontSize: '0.85rem', margin: '2px 0' }}>{doctor.email}</p>
                <p style={{ fontSize: '0.85rem', margin: '2px 0' }}>{doctor.phone}</p>

                <button
                    onClick={() => onWriteMessage(doctor)}
                    style={writeButtonStyle}
                >
                    Написати
                </button>
            </div>
        </div>
    );
};

const cardStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '16px',
    borderRadius: '8px',
    display: 'flex',
    gap: '15px',
    backgroundColor: '#fff'
};

const writeButtonStyle: React.CSSProperties = {
    marginTop: '10px',
    padding: '6px 12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};