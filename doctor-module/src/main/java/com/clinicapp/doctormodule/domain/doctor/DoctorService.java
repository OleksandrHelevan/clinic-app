package com.clinicapp.doctormodule.domain.doctor;

import com.clinicapp.doctormodule.application.request.CreateDoctorRequest;
import com.clinicapp.doctormodule.application.response.DoctorResponse;

import java.util.UUID;

public interface DoctorService {
    DoctorResponse createDoctor(CreateDoctorRequest doctor);
    DoctorResponse getDoctorById(UUID id);
}
