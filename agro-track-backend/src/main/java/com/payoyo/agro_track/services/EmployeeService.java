package com.payoyo.agro_track.services;

import java.util.List;
import java.util.UUID;

import com.payoyo.agro_track.dtos.employee.EmployeeRequestDTO;
import com.payoyo.agro_track.dtos.employee.EmployeeResponseDTO;
import com.payoyo.agro_track.models.enums.EmployeeStatus;

public interface EmployeeService {

    // crud
    EmployeeResponseDTO create(EmployeeRequestDTO dto);
    EmployeeResponseDTO findById(UUID id);
    List<EmployeeResponseDTO> findAll();
    EmployeeResponseDTO update(UUID id, EmployeeRequestDTO dto);

    // métodos personalizados
    EmployeeResponseDTO findByDni(String dni);
    List<EmployeeResponseDTO> findByStatus(EmployeeStatus status);
    List<EmployeeResponseDTO> findByCrewId(UUID crewId);
    List<EmployeeResponseDTO> findByFarmId(UUID farmId);
    
}
