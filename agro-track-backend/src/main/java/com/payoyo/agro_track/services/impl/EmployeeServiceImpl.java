package com.payoyo.agro_track.services.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.payoyo.agro_track.dtos.employee.EmployeeRequestDTO;
import com.payoyo.agro_track.dtos.employee.EmployeeResponseDTO;
import com.payoyo.agro_track.exception.CrewNotFoundException;
import com.payoyo.agro_track.exception.FarmNotFoundException;
import com.payoyo.agro_track.mappers.EmployeeMapper;
import com.payoyo.agro_track.models.Crew;
import com.payoyo.agro_track.models.Employee;
import com.payoyo.agro_track.models.Farm;
import com.payoyo.agro_track.models.enums.EmployeeStatus;
import com.payoyo.agro_track.repositories.CrewRepository;
import com.payoyo.agro_track.repositories.EmployeeRepository;
import com.payoyo.agro_track.repositories.FarmRepository;
import com.payoyo.agro_track.services.EmployeeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{

    private final EmployeeRepository employeeRepository;
    private final CrewRepository crewRepository;
    private final FarmRepository farmRepository;

    @Override
    public EmployeeResponseDTO create(EmployeeRequestDTO dto) {
        // obtenemos la cuadrilla si existe
        Crew crew = crewRepository.findById(dto.getCrewId())
            .orElseThrow(() -> new CrewNotFoundException(dto.getCrewId()));
        
        // obtenemos la finca si existe
        Farm farm = farmRepository.findById(dto.getFarmId())
            .orElseThrow(() -> new FarmNotFoundException(dto.getFarmId()));
        
        // convertimos dto a enitdad
        Employee employee = EmployeeMapper.toEntity(dto, crew, farm);

        //guardamos en la db
        Employee employeeSave = employeeRepository.save(employee);

        //devolvemos el dto
        return EmployeeMapper.toDTO(employeeSave);
    }

    @Override
    public EmployeeResponseDTO findById(UUID id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }

    @Override
    public List<EmployeeResponseDTO> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    @Override
    public EmployeeResponseDTO update(UUID id, EmployeeRequestDTO dto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public EmployeeResponseDTO findByDni(String dni) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByDni'");
    }

    @Override
    public List<EmployeeResponseDTO> findByStatus(EmployeeStatus status) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByStatus'");
    }

    @Override
    public List<EmployeeResponseDTO> findByCrewId(UUID crewId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByCrewId'");
    }

    @Override
    public List<EmployeeResponseDTO> findByFarmId(UUID farmId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByFarmId'");
    }
    
}
