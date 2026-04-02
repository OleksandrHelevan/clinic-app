package com.clinicapp.doctorservice.application.dto;

import com.clinicapp.doctorservice.domain.doctor.Specialization;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateDoctorRequest {

    @NotBlank(message = "First name is required")
    @Size(max = 100)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 100)
    private String lastName;

    @NotNull(message = "Specialization is required")
    private Specialization specialization;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @Size(max = 255)
    private String email;

    @Pattern(
            regexp = "^\\+?[1-9]\\d{7,14}$",
            message = "Phone must be valid international format"
    )
    private String phone;
}