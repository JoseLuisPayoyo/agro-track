package com.payoyo.agro_track.dtos.employee;

import java.time.LocalDate;
import java.util.UUID;

import com.payoyo.agro_track.models.enums.EmployeeStatus;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeRequestDTO {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 80)
    private String name;

    @NotBlank(message = "El apellido es obligatorio")
    @Size(max = 120)
    private String lastName;

    @NotBlank(message = "El dni es obligatorio")
    @Size(max = 20)
    private String dni;

    @Email(message = "El email tiene un formato invalido")
    @Size(max = 120)
    private String email;

    @Size(max = 20)
    private String phone;

    @Size(max = 200)
    private String address;

    @Size(max = 80)
    private String jobTitle;

    @NotNull(message = "El estado del empleado es obligatorio")
    private EmployeeStatus status;

    private LocalDate hireDate;

    @NotNull(message = "Debes asignar una cuadrilla")
    private UUID crewId;

    private UUID farmId;
    
}
