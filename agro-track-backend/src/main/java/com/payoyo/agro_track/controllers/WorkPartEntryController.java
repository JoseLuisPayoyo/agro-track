package com.payoyo.agro_track.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payoyo.agro_track.dtos.workPartEntry.WorkPartEntryRequestDTO;
import com.payoyo.agro_track.dtos.workPartEntry.WorkPartEntryResponseDTO;
import com.payoyo.agro_track.services.WorkPartEntryService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/work-parts-entries")
@RequiredArgsConstructor
public class WorkPartEntryController {
    
    private final WorkPartEntryService workPartEntryService;

    // crear parte de trabajador
    @PostMapping
    public ResponseEntity<WorkPartEntryResponseDTO> create(
        @Valid @RequestBody WorkPartEntryRequestDTO dto
    ){
        WorkPartEntryResponseDTO wp = workPartEntryService.create(dto);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(wp);
    }

    // listar todos los partes de los trabajadores
    @GetMapping
    public ResponseEntity<List<WorkPartEntryResponseDTO>> findAll(){
        List<WorkPartEntryResponseDTO> wps = workPartEntryService.findAll();

        return ResponseEntity
            .ok(wps);
    }

    // listar parte por id del parte
    @GetMapping("id/{id}")
    public ResponseEntity<WorkPartEntryResponseDTO> findById(@PathVariable UUID id){
        WorkPartEntryResponseDTO wp = workPartEntryService.findById(id);

        return ResponseEntity
            .ok(wp);
    }

    // actualizar parte del trabajador
    @PutMapping("/{id}")
    public ResponseEntity<WorkPartEntryResponseDTO> update(
        @PathVariable UUID id,
        @Valid @RequestBody WorkPartEntryRequestDTO dto
    ){
        WorkPartEntryResponseDTO wp = workPartEntryService.update(id, dto);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(wp);
    }

    // eliminar parte de trabajador
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id){
        workPartEntryService.delete(id);

        return ResponseEntity
            .noContent()
            .build();
    }

    // buscar parte de trabajador en parte diario
    @GetMapping("work-part/{workPartId}")
    public ResponseEntity<List<WorkPartEntryResponseDTO>> findByWorkPartId(@PathVariable UUID workPartId){
        List<WorkPartEntryResponseDTO> wps = workPartEntryService.findByWorkPartId(workPartId);

        return ResponseEntity
            .ok(wps);
    }

    // buscar partes de un empleado
    @GetMapping("/employe/{employeeId}")
    public ResponseEntity<List<WorkPartEntryResponseDTO>> findByEmployeeId(@PathVariable UUID employeeId){
        List<WorkPartEntryResponseDTO> wps = workPartEntryService.findByEmployeeId(employeeId);

        return ResponseEntity
                .ok(wps);
    }

    // buscar dato del empleado, y en un rango de fechas
    @GetMapping("/employe/{employeeId}/start/{start}/end/{end}")
    public ResponseEntity<List<WorkPartEntryResponseDTO>> findByEmployeeIdAndWorkPartDateBetween(
        @PathVariable UUID employeeId, 
        @PathVariable LocalDate start,
        @PathVariable LocalDate end
    ){
        List<WorkPartEntryResponseDTO> wps = workPartEntryService.findByEmployeeIdAndWorkPartDateBetween(employeeId, start, end);

        return ResponseEntity
            .ok(wps);
    }
}    
    
