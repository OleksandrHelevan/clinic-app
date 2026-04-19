package com.clinicapp.patientservice.infrastructure.persistence;

import com.clinicapp.patientservice.domain.patient.model.Patient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PatientRepository extends CrudRepository<Patient, String> {
}
