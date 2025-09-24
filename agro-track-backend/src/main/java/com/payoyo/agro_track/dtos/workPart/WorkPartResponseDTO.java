package com.payoyo.agro_track.dtos.workPart;

import java.time.LocalDate;
import java.util.UUID;

import com.payoyo.agro_track.models.enums.WorkPartStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkPartResponseDTO {
    
    private UUID id;
    private LocalDate date;
    private String task;
    private WorkPartStatus status;
    private String notes;

    private UUID farmId;
    private String farmName;

    private UUID parcelId;
    private String parcelName;

    private UUID campaignId;
    private String campaignName;

    private UUID crewId;
    private String crewName;
}
