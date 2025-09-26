package com.payoyo.agro_track.services;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import com.payoyo.agro_track.dtos.workPartEntry.WorkPartEntryRequestDTO;
import com.payoyo.agro_track.dtos.workPartEntry.WorkPartEntryResponseDTO;

public interface WorkPartEntryService {
    
    // crud
    WorkPartEntryResponseDTO create(WorkPartEntryRequestDTO dto);
    List<WorkPartEntryResponseDTO> findAll();
    WorkPartEntryResponseDTO findById(UUID id);
    WorkPartEntryResponseDTO update(UUID id, WorkPartEntryRequestDTO dto);
    void delete(UUID id);

    // metodos personalizados
    List<WorkPartEntryResponseDTO> findByWorkPartId(UUID workPartId);
    List<WorkPartEntryResponseDTO> findByEmployeeId(UUID employeeId);
    List<WorkPartEntryResponseDTO> findByEmployeeIdAndWorkPartDateBetween(UUID employeeId, LocalDate start, LocalDate end);
}
