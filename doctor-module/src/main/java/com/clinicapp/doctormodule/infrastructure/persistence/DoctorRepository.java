package com.clinicapp.doctormodule.infrastructure.persistence;

import com.clinicapp.doctormodule.domain.doctor.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, UUID> {
    boolean existsDoctorByEmail(String email);
}
