package com.payoyo.agro_track.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payoyo.agro_track.models.WorkPartEntry;

public interface WorkPartEntryRepository extends JpaRepository<WorkPartEntry, UUID>{

    // listar entradas por parte de trabajo
    List<WorkPartEntry> findByWorkPartId(UUID workPartId);

    // historial del empleado
    List<WorkPartEntry> findByEmployeeId(UUID employeeId);

    // filtrar por empleado y fechas
    List<WorkPartEntry> findByEmployeeIdAndWorkPartDateBetween(UUID employeeId, LocalDate start, LocalDate end);
    
}
