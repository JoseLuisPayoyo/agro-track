package com.payoyo.agro_track.dtos.workPartEntry;

import java.math.BigDecimal;
import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkPartEntryRequestDTO {

    @NotNull(message = "El parte de trabajo es obligatorio")
    private UUID workPartId;

    @NotNull(message = "El empleado es obligatorio")
    private UUID employeeId;

    @NotNull(message = "Las horas trabajadas son obligatorias")
    private BigDecimal hoursWorked;

    private BigDecimal quantityKg;
    
}
