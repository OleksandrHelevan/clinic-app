package com.clinicapp.doctorservice.application.service;

import com.clinicapp.common.dto.PatientResponse;
import com.clinicapp.doctorservice.application.dto.CreateDoctorRequest;
import com.clinicapp.doctorservice.application.dto.DoctorResponse;
import com.clinicapp.doctorservice.domain.doctor.Specialization;

import java.util.List;
import java.util.UUID;

public interface DoctorService {
    DoctorResponse getById(UUID id);
    DoctorResponse createDoctor(CreateDoctorRequest request);
    List<DoctorResponse> getDoctorsBySpecialization(Specialization specialization);
    PatientResponse getPatientInfo(UUID patientId);

}
