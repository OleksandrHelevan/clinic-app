package com.clinicapp.doctormodule.application.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DoctorResponse {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String specialization;
    private String phone;
}
