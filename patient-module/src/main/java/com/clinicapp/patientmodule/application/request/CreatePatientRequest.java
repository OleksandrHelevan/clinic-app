package com.clinicapp.patientmodule.application.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreatePatientRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private int age;
}
