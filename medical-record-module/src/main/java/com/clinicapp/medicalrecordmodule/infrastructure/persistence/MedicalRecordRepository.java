package com.clinicapp.medicalrecordmodule.infrastructure.persistence;

import com.clinicapp.medicalrecordmodule.domain.medicalrecord.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, UUID> {
}
