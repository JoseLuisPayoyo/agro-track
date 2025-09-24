package com.payoyo.agro_track.dtos.farm;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FarmResponseDTO {

    private UUID id;
    private String name;
    private String location;
    
}
