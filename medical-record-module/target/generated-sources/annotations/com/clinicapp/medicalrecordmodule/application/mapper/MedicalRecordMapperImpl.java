package com.clinicapp.medicalrecordmodule.application.mapper;

import com.clinicapp.medicalrecordmodule.application.request.CreateMedicalRecordRequest;
import com.clinicapp.medicalrecordmodule.application.response.MedicalRecordResponse;
import com.clinicapp.medicalrecordmodule.domain.medicalrecord.MedicalRecord;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-01T11:36:10+0200",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class MedicalRecordMapperImpl implements MedicalRecordMapper {

    @Override
    public MedicalRecordResponse toDto(MedicalRecord medicalRecord) {
        if ( medicalRecord == null ) {
            return null;
        }

        MedicalRecordResponse medicalRecordResponse = new MedicalRecordResponse();

        if ( medicalRecord.getDiagnosis() != null ) {
            medicalRecordResponse.setDiagnosis( medicalRecord.getDiagnosis() );
        }
        if ( medicalRecord.getDoctorId() != null ) {
            medicalRecordResponse.setDoctorId( medicalRecord.getDoctorId() );
        }
        if ( medicalRecord.getId() != null ) {
            medicalRecordResponse.setId( medicalRecord.getId() );
        }
        if ( medicalRecord.getNotes() != null ) {
            medicalRecordResponse.setNotes( medicalRecord.getNotes() );
        }
        if ( medicalRecord.getPatientId() != null ) {
            medicalRecordResponse.setPatientId( medicalRecord.getPatientId() );
        }
        if ( medicalRecord.getRecordDate() != null ) {
            medicalRecordResponse.setRecordDate( medicalRecord.getRecordDate() );
        }

        return medicalRecordResponse;
    }

    @Override
    public MedicalRecord toEntity(CreateMedicalRecordRequest medicalRecordRequest) {
        if ( medicalRecordRequest == null ) {
            return null;
        }

        MedicalRecord medicalRecord = new MedicalRecord();

        if ( medicalRecordRequest.getDiagnosis() != null ) {
            medicalRecord.setDiagnosis( medicalRecordRequest.getDiagnosis() );
        }
        if ( medicalRecordRequest.getDoctorId() != null ) {
            medicalRecord.setDoctorId( medicalRecordRequest.getDoctorId() );
        }
        if ( medicalRecordRequest.getNotes() != null ) {
            medicalRecord.setNotes( medicalRecordRequest.getNotes() );
        }
        if ( medicalRecordRequest.getPatientId() != null ) {
            medicalRecord.setPatientId( medicalRecordRequest.getPatientId() );
        }
        if ( medicalRecordRequest.getRecordDate() != null ) {
            medicalRecord.setRecordDate( medicalRecordRequest.getRecordDate() );
        }

        return medicalRecord;
    }
}
