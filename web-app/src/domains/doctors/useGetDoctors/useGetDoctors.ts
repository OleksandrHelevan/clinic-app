import {useQuery} from "@tanstack/react-query";
import type {GetDoctorsResponse, Specialization} from "../types.ts";
import {doctorService} from "../services/doctorService.ts";


export const useGetDoctors = (spec: Specialization | undefined, page: number) => {
    return useQuery<GetDoctorsResponse>({
        queryKey: ['doctors', spec, page],
        queryFn: () => {
            if (!spec) throw new Error("Specialization is required");
            return doctorService.getDoctorsBySpecialization(spec, page);
        },
        enabled: !!spec && page >= 0,
        placeholderData: (previousData) => previousData,
    })
}