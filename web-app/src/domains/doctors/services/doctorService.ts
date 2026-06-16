import type { GetDoctorsResponse, Specialization, UserResponse } from "../types.ts";
import { doctorApiClient } from "../api/doctorApiClient.ts";

export const doctorService = {
    getDoctorsBySpecialization: async (spec: Specialization, page: number): Promise<GetDoctorsResponse> =>
        doctorApiClient.getDoctorsBySpecialization(spec, page),

    getDoctorById: async (id: string): Promise<UserResponse> =>
        doctorApiClient.getDoctorById(id),
};