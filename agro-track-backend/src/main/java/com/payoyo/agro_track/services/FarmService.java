package com.payoyo.agro_track.services;

import java.util.List;
import java.util.UUID;

import com.payoyo.agro_track.dtos.farm.FarmRequestDTO;
import com.payoyo.agro_track.dtos.farm.FarmResponseDTO;

public interface FarmService {

    // CRUD
    FarmResponseDTO create(FarmRequestDTO dto);
    List<FarmResponseDTO> findAll();
    FarmResponseDTO findById(UUID id);
    FarmResponseDTO update(UUID id, FarmRequestDTO dto);
    void delete(UUID id);

    // Métodos personalizados
    FarmResponseDTO findByName(String name);
    
}
