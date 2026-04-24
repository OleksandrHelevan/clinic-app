import type {GetDoctorsResponse, Specialization} from "../types.ts";
import {doctorApiClient} from "../api/doctorApiClient.ts";

export const doctorService = {
    getDoctorsBySpecialization: async (spec: Specialization, page: number): Promise<GetDoctorsResponse> => {
        return doctorApiClient.getDoctorsBySpecialization(spec, page);
    }
}