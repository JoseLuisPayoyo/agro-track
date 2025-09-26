package com.payoyo.agro_track.services;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import com.payoyo.agro_track.dtos.workPart.WorkPartRequestDTO;
import com.payoyo.agro_track.dtos.workPart.WorkPartResponseDTO;
import com.payoyo.agro_track.models.enums.WorkPartStatus;

public interface WorkPartService {
    
    // crud
    WorkPartResponseDTO create(WorkPartRequestDTO dto);
    List<WorkPartResponseDTO> findAll();
    WorkPartResponseDTO findById(UUID id);
    WorkPartResponseDTO update(UUID id, WorkPartRequestDTO dto);
    void delete(UUID id);

    // metodos personalizados
    List<WorkPartResponseDTO> findByDate(LocalDate date);
    List<WorkPartResponseDTO> findByStatus(WorkPartStatus status);
    List<WorkPartResponseDTO> findByCrewId(UUID crewId);
    List<WorkPartResponseDTO> findByCampaignId(UUID campainId);
}
