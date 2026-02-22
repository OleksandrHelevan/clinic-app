package com.clinicapp.doctormodule.application.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateDoctorRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String specialization;
    private String phone;
}
