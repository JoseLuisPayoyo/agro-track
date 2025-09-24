package com.payoyo.agro_track.dtos.employee;

import java.time.LocalDate;
import java.util.UUID;

import com.payoyo.agro_track.models.enums.EmployeeStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeResponseDTO {

    private UUID id;
    private String name;
    private String lastname;
    private String dni;
    private String email;
    private String phone;
    private String address;
    private String jobTitle;
    private EmployeeStatus status;
    private LocalDate hireDate;

    private UUID crewId;
    private String crewName;

    private UUID farm_id;
    private String farmName;
}
