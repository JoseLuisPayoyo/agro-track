package com.payoyo.agro_track.services.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.payoyo.agro_track.dtos.workPartEntry.WorkPartEntryRequestDTO;
import com.payoyo.agro_track.dtos.workPartEntry.WorkPartEntryResponseDTO;
import com.payoyo.agro_track.exception.EmployeeNotFoundException;
import com.payoyo.agro_track.exception.WorkPartEntryNotFoundException;
import com.payoyo.agro_track.exception.WorkPartNotFoundException;
import com.payoyo.agro_track.mappers.WorkPartEntryMapper;
import com.payoyo.agro_track.models.Employee;
import com.payoyo.agro_track.models.WorkPart;
import com.payoyo.agro_track.models.WorkPartEntry;
import com.payoyo.agro_track.repositories.EmployeeRepository;
import com.payoyo.agro_track.repositories.WorkPartEntryRepository;
import com.payoyo.agro_track.repositories.WorkPartRepository;
import com.payoyo.agro_track.services.WorkPartEntryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WorkPartEntryServiceImpl implements WorkPartEntryService{
    
    private final WorkPartEntryRepository workPartEntryRepository;
    private final WorkPartRepository workPartRepository;
    private final EmployeeRepository employeeRepository;

    // crear parte de trabajador
    @Override
    public WorkPartEntryResponseDTO create(WorkPartEntryRequestDTO dto) {
        WorkPart workPart = workPartRepository.findById(dto.getWorkPartId())
            .orElseThrow(() -> new WorkPartNotFoundException(dto.getWorkPartId()));
        Employee employee = employeeRepository.findById(dto.getEmployeeId())
            .orElseThrow(() -> new EmployeeNotFoundException(dto.getEmployeeId()));
        
        WorkPartEntry workPartEntry = WorkPartEntryMapper.toEntity(dto, workPart, employee); 
        
        WorkPartEntry workPartEntrySaved = workPartEntryRepository.save(workPartEntry);

        return WorkPartEntryMapper.toDTO(workPartEntrySaved);
    }

    // listar todos los partes de los trabajadores
    @Override
    public List<WorkPartEntryResponseDTO> findAll() {
        return workPartEntryRepository.findAll()
            .stream()
            .map(WorkPartEntryMapper::toDTO)
            .collect(Collectors.toList());
    }

    // listar parte por id del parte
    @Override
    public WorkPartEntryResponseDTO findById(UUID id) {
        WorkPartEntry workPartEntry = workPartEntryRepository.findById(id)
            .orElseThrow(() -> new WorkPartEntryNotFoundException(id));

        return WorkPartEntryMapper.toDTO(workPartEntry);
    }

    // actualizar parte del trabajador
    @Override
    public WorkPartEntryResponseDTO update(UUID id, WorkPartEntryRequestDTO dto) {
        WorkPart workPart = workPartRepository.findById(dto.getWorkPartId())
            .orElseThrow(() -> new WorkPartNotFoundException(dto.getWorkPartId()));
        Employee employee = employeeRepository.findById(dto.getEmployeeId())
            .orElseThrow(() -> new EmployeeNotFoundException(dto.getEmployeeId()));
        WorkPartEntry workPartEntry = workPartEntryRepository.findById(id)
            .orElseThrow(() -> new WorkPartEntryNotFoundException(id));

        // actualizamos los datos
        workPartEntry.setWorkPart(workPart);
        workPartEntry.setEmployee(employee);
        workPartEntry.setHoursWorked(dto.getHoursWorked());
        workPartEntry.setQuantityKg(dto.getQuantityKg());

        WorkPartEntry workPartEntrySaved = workPartEntryRepository.save(workPartEntry);

        return WorkPartEntryMapper.toDTO(workPartEntrySaved);
    }

    // eliminar parte de trabajador
    @Override
    public void delete(UUID id) {
        WorkPartEntry workPartEntry = workPartEntryRepository.findById(id)
            .orElseThrow(() -> new WorkPartEntryNotFoundException(id));
        workPartEntryRepository.delete(workPartEntry);    
    }

    // buscar parte de trabajador en parte diario
    @Override
    public List<WorkPartEntryResponseDTO> findByWorkPartId(UUID workPartId) {
        workPartRepository.findById(workPartId)
            .orElseThrow(() -> new WorkPartNotFoundException(workPartId));
        List<WorkPartEntry> workPartsEntries = workPartEntryRepository.findByWorkPartId(workPartId);
        
        return workPartsEntries
            .stream()
            .map(WorkPartEntryMapper::toDTO)
            .collect(Collectors.toList());
    }

    // buscar partes de un empleado
    @Override
    public List<WorkPartEntryResponseDTO> findByEmployeeId(UUID employeeId) {
        workPartEntryRepository.findById(employeeId)
            .orElseThrow(() -> new EmployeeNotFoundException(employeeId));
        
        List<WorkPartEntry> workPartsEntries = workPartEntryRepository.findByEmployeeId(employeeId);

        return workPartsEntries
            .stream()
            .map(WorkPartEntryMapper::toDTO)
            .collect(Collectors.toList());
    }

    // buscar dato del empleado, y en un rango de fechas
    @Override
    public List<WorkPartEntryResponseDTO> findByEmployeeIdAndWorkPartDateBetween(UUID employeeId, LocalDate start, LocalDate end) {
        workPartEntryRepository.findById(employeeId)
            .orElseThrow(() -> new EmployeeNotFoundException(employeeId));
        
        List<WorkPartEntry> workPartsEntries = workPartEntryRepository.findByEmployeeIdAndWorkPartDateBetween(employeeId, start, end);
        
        return workPartsEntries
            .stream()
            .map(WorkPartEntryMapper::toDTO)
            .collect(Collectors.toList());
    }

    
    
}
