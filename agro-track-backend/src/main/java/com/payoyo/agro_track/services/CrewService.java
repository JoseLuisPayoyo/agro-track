package com.payoyo.agro_track.services;

import java.util.List;
import java.util.UUID;

import com.payoyo.agro_track.dtos.crew.CrewRequestDTO;
import com.payoyo.agro_track.dtos.crew.CrewResponseDTO;

public interface CrewService {

    // CRUD
    CrewResponseDTO create(CrewRequestDTO dto);
    CrewResponseDTO findById(UUID id);
    List<CrewResponseDTO> findAll();
    CrewResponseDTO update(UUID id, CrewRequestDTO dto);
    void delete(UUID id);

    // metodos personalizados
    CrewResponseDTO findByName(String name);
    List<CrewResponseDTO> findByForemanId(UUID employeeId);
    
}
