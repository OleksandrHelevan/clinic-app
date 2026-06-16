package com.clinicapp.doctorservice.application.service;

import com.clinicapp.doctorservice.application.dto.AddDoctorProfileRequest;
import com.clinicapp.common.dto.DoctorResponse;
import com.clinicapp.common.dto.Specialization;
import org.springframework.data.domain.Page;


public interface DoctorService {
    DoctorResponse getById(String id);
    Page<DoctorResponse> getDoctorsBySpecialization(Specialization specialization, int page, int size) ;
    void createInitialProfile(String id, String email);
    boolean existsById(String id);
    DoctorResponse addDoctorProfile(String id, AddDoctorProfileRequest request);
}
