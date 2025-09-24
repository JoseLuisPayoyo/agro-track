package com.payoyo.agro_track.mappers;

import com.payoyo.agro_track.dtos.employee.EmployeeRequestDTO;
import com.payoyo.agro_track.dtos.employee.EmployeeResponseDTO;
import com.payoyo.agro_track.models.Crew;
import com.payoyo.agro_track.models.Employee;
import com.payoyo.agro_track.models.Farm;

public class EmployeeMapper {

    public static Employee toEntity(EmployeeRequestDTO dto, Crew crew, Farm farm){
        return Employee.builder()
                .name(dto.getName())
                .lastName(dto.getLastName())
                .dni(dto.getDni())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .address(dto.getAddress())
                .jobTitle(dto.getJobTitle())
                .status(dto.getStatus())
                .hireDate(dto.getHireDate())
                .crew(crew)
                .farm(farm)
                .build();
    }

    public static EmployeeResponseDTO toDTO(Employee employee){
        return EmployeeResponseDTO.builder()
                .id(employee.getId())
                .name(employee.getName())
                .lastname(employee.getLastName())
                .dni(employee.getDni())
                .email(employee.getEmail())
                .phone(employee.getPhone())
                .address(employee.getAddress())
                .jobTitle(employee.getJobTitle())
                .status(employee.getStatus())
                .hireDate(employee.getHireDate())
                .crewId(employee.getCrew().getId())
                .crewName(employee.getCrew().getName())
                .farmId(employee.getFarm().getId())
                .farmName(employee.getFarm().getName())
                .farmId(employee.getFarm() != null ? employee.getFarm().getId() : null)
                .farmName(employee.getFarm() != null ? employee.getFarm().getName() : null)
                .build();                
    }
    
}
