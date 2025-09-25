package com.payoyo.agro_track.controllers;

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

import com.payoyo.agro_track.dtos.employee.EmployeeRequestDTO;
import com.payoyo.agro_track.dtos.employee.EmployeeResponseDTO;
import com.payoyo.agro_track.models.enums.EmployeeStatus;
import com.payoyo.agro_track.services.EmployeeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;
    
    // crear empleado
    @PostMapping
    public ResponseEntity<EmployeeResponseDTO> create(@Valid @RequestBody EmployeeRequestDTO dto){
        EmployeeResponseDTO employeeCreated = employeeService.create(dto);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(employeeCreated);
    }

    // listar empleados
    @GetMapping
    public ResponseEntity<List<EmployeeResponseDTO>> findAll(){
        List<EmployeeResponseDTO> employees = employeeService.findAll();

        return ResponseEntity
            .ok(employees);
    }

    // listar empleados por id
    @GetMapping("/id/{id}")
    public ResponseEntity<EmployeeResponseDTO> findById(@PathVariable UUID id){
        EmployeeResponseDTO employe = employeeService.findById(id);

        return ResponseEntity
            .ok(employe);
    }

    // actualizar empleado
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> update(
        @PathVariable UUID id,
        @Valid @RequestBody EmployeeRequestDTO dto
    ){
        EmployeeResponseDTO employeeUpdated = employeeService.update(id, dto);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(employeeUpdated);
    }

    // eliminar empleado por id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id){
        employeeService.delete(id);

        return ResponseEntity
            .noContent()
            .build();
    }

    // buscar empleado por dni
    @GetMapping("/dni/{dni}")
    public ResponseEntity<EmployeeResponseDTO> findByDni(@PathVariable String dni){
        EmployeeResponseDTO employee = employeeService.findByDni(dni);

        return ResponseEntity
            .ok(employee);
    }

    // buscar empleados por estatus
    @GetMapping("/status/{status}")
    public ResponseEntity<List<EmployeeResponseDTO>> findByStatus(@PathVariable EmployeeStatus status){
        List<EmployeeResponseDTO> employees = employeeService.findByStatus(status);

        return ResponseEntity
            .ok(employees);
    }

    // listar empleados de cuadrilla
    @GetMapping("/crew/{crewId}")
    public ResponseEntity<List<EmployeeResponseDTO>> findByCrewId(@PathVariable UUID crewId){
        List<EmployeeResponseDTO> employees = employeeService.findByCrewId(crewId);

        return ResponseEntity
            .ok(employees);
    }

    // listar empleados de una finca
    @GetMapping("/farm/{farmId}")
    public ResponseEntity<List<EmployeeResponseDTO>> findByFarmId(@PathVariable UUID farmId){
        List<EmployeeResponseDTO> employees = employeeService.findByFarmId(farmId);

        return ResponseEntity
            .ok(employees);
    }
}
