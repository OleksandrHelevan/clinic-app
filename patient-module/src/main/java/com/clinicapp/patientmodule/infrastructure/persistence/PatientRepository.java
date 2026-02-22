package com.clinicapp.patientmodule.infrastructure.persistence;

import com.clinicapp.patientmodule.domain.patient.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PatientRepository extends JpaRepository<Patient, UUID> {
}
