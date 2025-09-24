package com.payoyo.agro_track.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payoyo.agro_track.models.Employee;

import java.util.List;
import com.payoyo.agro_track.models.enums.EmployeeStatus;


public interface EmployeeRepository extends JpaRepository<Employee, UUID>{

    Optional<Employee> findByDni(String dni);

    List<Employee> findByStatus(EmployeeStatus status);

    List<Employee> findByCrewId(UUID crewId);

    List<Employee> findByFarmId(UUID farmId);
    
} 
