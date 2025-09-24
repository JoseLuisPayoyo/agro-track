package com.payoyo.agro_track.dtos.farm;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FarmRequestDTO {
    
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 80)
    private String name;

    @Size(max = 200)
    private String location;
}
