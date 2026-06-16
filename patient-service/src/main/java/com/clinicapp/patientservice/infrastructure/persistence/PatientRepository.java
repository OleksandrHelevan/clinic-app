package com.clinicapp.patientservice.infrastructure.persistence;

import com.clinicapp.patientservice.domain.patient.model.Patient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends CrudRepository<Patient, String> {
}
