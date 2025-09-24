package com.payoyo.agro_track.dtos.parcel;

import java.util.UUID;

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
public class ParcelRequestDTO {
    
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 80)
    private String name;

    @NotNull(message = "La finca es obligatoria")
    private UUID farmId;
}
