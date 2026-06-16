import type { GetDoctorsResponse, Specialization, UserResponse } from "../types.ts";
import { apiClient } from "../../../services/apiClient.ts";
import { DOCTORS_PAGE_SIZE } from "../contants.ts";

export const doctorApiClient = {
    getDoctorsBySpecialization: (spec: Specialization, page: number): Promise<GetDoctorsResponse> =>
        apiClient.get(`/doctors?specialization=${spec}&page=${page}&size=${DOCTORS_PAGE_SIZE}`),

    getDoctorById: (id: string): Promise<UserResponse> =>
        apiClient.get(`/doctors/${id}`),
};