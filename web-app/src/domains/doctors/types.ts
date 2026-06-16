import type { PaginationResponse } from "../../types/pagination.ts";

export type Specialization =
    | "THERAPIST"
    | "DERMATOLOGIST"
    | "CARDIOLOGIST"
    | "NEUROLOGIST"
    | "SURGEON"
    | "PEDIATRICIAN"
    | "OPHTHALMOLOGIST"
    | "ORTHOPEDIST"
    | "ENT"
    | "GASTROENTEROLOGIST"
    | "ENDOCRINOLOGIST";

export interface ProfileResponse {
    avatarUrl: string | null;
    phone: string | null;
    firstName: string | null;
    lastName: string | null;
    createdAt: string | null;
    updatedAt: string | null;
}

export interface UserResponse extends ProfileResponse {
    id: string;
    specialization: Specialization | null;
    email: string;
}

export type GetDoctorsResponse = PaginationResponse<UserResponse>;