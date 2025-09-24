package com.payoyo.agro_track.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payoyo.agro_track.models.Farm;

public interface FarmRepository extends JpaRepository<Farm, UUID>{
    
    // buscar fincas por nombres
    Optional<Farm> findByName(String name);
}
