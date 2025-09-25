package com.payoyo.agro_track.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payoyo.agro_track.dtos.employee.EmployeeRequestDTO;
import com.payoyo.agro_track.dtos.employee.EmployeeResponseDTO;
import com.payoyo.agro_track.services.EmployeeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;
    
    @PostMapping
    public ResponseEntity<EmployeeResponseDTO> create(@Valid @RequestBody EmployeeRequestDTO dto){
        EmployeeResponseDTO employeeCreated = employeeService.create(dto);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(employeeCreated);
    }
}
