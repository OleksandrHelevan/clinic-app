import type {Specialization} from "./types.ts";

export const DOCTORS_PAGE_SIZE = 20;

export const ALL_SPECIALIZATIONS: Specialization[] = [
    "THERAPIST", "DERMATOLOGIST", "CARDIOLOGIST", "NEUROLOGIST", "SURGEON", "PEDIATRICIAN"
];

export const SPEC_LABELS: Record<string, string> = {
    CARDIOLOGIST: 'Cardiologist',
    NEUROLOGIST: 'Neurologist',
    DERMATOLOGIST: 'Dermatologist',
    ORTHOPEDIST: 'Orthopedist',
    THERAPIST: 'Therapist',
    OPHTHALMOLOGIST: 'Ophthalmologist',
    ENT: 'ENT Specialist',
    GASTROENTEROLOGIST: 'Gastroenterologist',
    ENDOCRINOLOGIST: 'Endocrinologist',
    SURGEON: 'Surgeon',
};