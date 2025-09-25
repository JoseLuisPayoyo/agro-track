package com.payoyo.agro_track.services.impl;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.payoyo.agro_track.dtos.employee.EmployeeRequestDTO;
import com.payoyo.agro_track.dtos.employee.EmployeeResponseDTO;
import com.payoyo.agro_track.exception.CrewNotFoundException;
import com.payoyo.agro_track.exception.EmployeeNotFoundException;
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

    // crear empleado
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

    // buscar empleado por id
    @Override
    public EmployeeResponseDTO findById(UUID id) {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new EmployeeNotFoundException(id));
        return EmployeeMapper.toDTO(employee);    
    }

    // listar todos los empleados
    @Override
    public List<EmployeeResponseDTO> findAll() {
        return employeeRepository.findAll()
            .stream()
            .map(EmployeeMapper::toDTO)
            .collect(Collectors.toList());
    }

    // actualizar empleado
    @Override
    public EmployeeResponseDTO update(UUID id, EmployeeRequestDTO dto) {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new EmployeeNotFoundException(id));
        Crew crew = crewRepository.findById(dto.getCrewId())
            .orElseThrow(() -> new CrewNotFoundException(dto.getCrewId()));
        Farm farm = farmRepository.findById(dto.getFarmId())
            .orElseThrow(() -> new FarmNotFoundException(dto.getFarmId()));
        
        // actualizamos los datos
        employee.setName(dto.getName());
        employee.setLastName(dto.getLastName());
        employee.setDni(dto.getDni());
        employee.setEmail(dto.getEmail());
        employee.setPhone(dto.getPhone());
        employee.setAddress(dto.getAddress());
        employee.setJobTitle(dto.getJobTitle());
        employee.setStatus(dto.getStatus());
        employee.setHireDate(dto.getHireDate());
        employee.setCrew(crew);
        employee.setFarm(farm);

        //guardamos en la db
        Employee employeeSave = employeeRepository.save(employee);

        //retornamos el dto
        return EmployeeMapper.toDTO(employeeSave);

    }

    // eliminar empleado por id
    @Override
    public void delete(UUID id) {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new EmployeeNotFoundException(id));
        employeeRepository.delete(employee);
    }

    // buscar empleado por id
    @Override
    public EmployeeResponseDTO findByDni(String dni) {
        Employee employee = employeeRepository.findByDni(dni)
            .orElseThrow(() -> new EmployeeNotFoundException(dni));
        return EmployeeMapper.toDTO(employee);    
    }

    // buscar empleado por estatus
    @Override
    public List<EmployeeResponseDTO> findByStatus(EmployeeStatus status) {
        return employeeRepository.findByStatus(status)
            .stream()
            .map(EmployeeMapper::toDTO)
            .collect(Collectors.toList());
    }

    // listar empleados de cuadrilla
    @Override
    public List<EmployeeResponseDTO> findByCrewId(UUID crewId) {
        return employeeRepository.findByCrewId(crewId)
            .stream()
            .map(EmployeeMapper::toDTO)
            .collect(Collectors.toList());
    }

    // listar empleados de una finca
    @Override
    public List<EmployeeResponseDTO> findByFarmId(UUID farmId) {
        return employeeRepository.findByFarmId(farmId)
            .stream()
            .map(EmployeeMapper::toDTO)
            .collect(Collectors.toList());
    }

    
    
}
