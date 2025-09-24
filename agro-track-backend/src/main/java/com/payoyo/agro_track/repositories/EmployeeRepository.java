package com.payoyo.agro_track.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payoyo.agro_track.models.Employee;

import java.util.List;
import com.payoyo.agro_track.models.enums.EmployeeStatus;


public interface EmployeeRepository extends JpaRepository<Employee, UUID>{

    // permite recuperar un empleado concreto mediante su documento de identidad
    Optional<Employee> findByDni(String dni);

    // devuelve todos los empleados con un estado determinado 
    List<Employee> findByStatus(EmployeeStatus status);

    // permite obtener todos los miembros asignados a una cuadrilla concreta
    List<Employee> findByCrewId(UUID crewId);

    // filtra empleados que están asignados a una finca específica
    List<Employee> findByFarmId(UUID farmId);
    
} 
