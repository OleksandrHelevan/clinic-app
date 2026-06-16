export interface LoginRequest {
    email: string;
    password: string;
}

export type AvailableRole = 'DOCTOR' | 'PATIENT';
export type Role = AvailableRole | 'ADMIN' | 'CLINIC';

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

export interface UserResponse {
    id: string;
    email: string;
    role: Role;
}

export interface Profile {
    email: string;
    id: string;
    firstName: string;
    lastName: string;
    specialization: string;
    avatarUrl: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
}

export interface MeResponse {
    userId: string;
    role: Role;
    profile: Profile;
}