package com.payoyo.agro_track.mappers;

import com.payoyo.agro_track.dtos.workPartEntry.WorkPartEntryRequestDTO;
import com.payoyo.agro_track.dtos.workPartEntry.WorkPartEntryResponseDTO;
import com.payoyo.agro_track.models.Employee;
import com.payoyo.agro_track.models.WorkPart;
import com.payoyo.agro_track.models.WorkPartEntry;

public class WorkPartEntryMapper {

    public static WorkPartEntry toEntity(WorkPartEntryRequestDTO dto, WorkPart workPart, Employee employee){
        return WorkPartEntry.builder()
                .workPart(workPart)
                .employee(employee)
                .hoursWorked(dto.getHoursWorked())
                .quantityKg(dto.getQuantityKg())
                .build();
    }

    public static WorkPartEntryResponseDTO toDTO(WorkPartEntry workPartEntry){
        return WorkPartEntryResponseDTO.builder()
                .id(workPartEntry.getId())
                .workPartId(workPartEntry.getWorkPart().getId())
                .employeeId(workPartEntry.getEmployee().getId())
                .employeeName(workPartEntry.getEmployee().getName())
                .hoursWorked(workPartEntry.getHoursWorked())
                .quantityKg(workPartEntry.getQuantityKg())
                .build();
    }
    
}
