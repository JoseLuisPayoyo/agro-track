package com.payoyo.agro_track.dtos.workPart;

import java.time.LocalDate;
import java.util.UUID;

import com.payoyo.agro_track.models.enums.WorkPartStatus;

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
public class WorkPartRequestDTO {
    
    @NotNull(message = "La fecha es obligatoria")
    private LocalDate date;

    @NotBlank(message = "La tarea es obligatoria")
    @Size(max = 120)
    private String task;

    @NotNull(message = "El estado es obligatorio")
    private WorkPartStatus status;

    @Size(max = 200)
    private String notes;

    @NotNull(message = "La finca es obligatoria")
    private UUID farmId;

    private UUID parcelId;

    @NotNull(message = "La cuadrilla es obligatoria")
    private UUID crewId;

    @NotNull(message = "La campaña es obligatoria")
    private UUID campaignId;
}
