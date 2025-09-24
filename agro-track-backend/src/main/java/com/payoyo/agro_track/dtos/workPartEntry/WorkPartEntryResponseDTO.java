package com.payoyo.agro_track.dtos.workPartEntry;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkPartEntryResponseDTO {
    
    private UUID id;
    private UUID workPartId;

    private UUID employeeId;
    private String employeeName;

    private BigDecimal hoursWorked;

    private BigDecimal quantityKg;
}
