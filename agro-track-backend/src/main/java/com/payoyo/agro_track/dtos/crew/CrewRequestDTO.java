package com.payoyo.agro_track.dtos.crew;

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
public class CrewRequestDTO {
    
    @NotBlank(message = "El nombre de la cuadrilla no puede ir vacio")
    @Size(max = 200)
    private String name;

    @NotNull(message = "El capataz es obligatorio")
    private UUID foremanId;

}
