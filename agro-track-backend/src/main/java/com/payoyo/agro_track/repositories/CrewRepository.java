package com.payoyo.agro_track.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payoyo.agro_track.models.Crew;

public interface CrewRepository extends JpaRepository<Crew, UUID>{

    // buscar cuadrilla por nombre
    Optional<Crew> findByName(String name);

    // buscar cuadrilla por capataz
    List<Crew> findByForemanId(UUID employeeId);
    
}
