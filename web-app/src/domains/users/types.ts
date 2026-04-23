export interface LoginRequest {
    email: string;
    password: string;
}
export type AvailableRole = 'DOCTOR' | 'PATIENT';
export type Role = AvailableRole | 'ADMIN' | 'CLINIC';

export const RoleDisplay: Record<AvailableRole, string> = {
    DOCTOR: 'Лікар',
    PATIENT: 'Пацієнт'
};

export interface LoginResponse {
    token: string;
    role: Role;
    exp: number;
    userId: string;
}

export interface SignUpRequest {
    email: string;
    password: string;
    role: AvailableRole;
}

export interface UserResponse{
    id: string;
    email: string;
    role: Role;
}

export interface MeResponse {
    userId: string;
    role: Role;
    profile: {
        email: string;
        id: string;
    }
}