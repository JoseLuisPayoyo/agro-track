package com.payoyo.agro_track.dtos.parcel;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParcelResponseDTO {
    
    private UUID id;
    private String name;

    private UUID farmId;
    private String farmName;
}
