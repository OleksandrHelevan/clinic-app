package com.clinicapp.medicalrecordmodule.domain.medicalrecord;

import com.clinicapp.medicalrecordmodule.application.request.CreateMedicalRecordRequest;
import com.clinicapp.medicalrecordmodule.application.response.MedicalRecordResponse;

import java.util.UUID;

public interface MedicalRecordService {
    MedicalRecordResponse createMedicalRecord(CreateMedicalRecordRequest medicalRecord);
    MedicalRecordResponse getMedicalRecordById(UUID id);
}
