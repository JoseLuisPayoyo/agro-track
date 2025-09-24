package com.payoyo.agro_track.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payoyo.agro_track.models.Parcel;

public interface ParcelRepository extends JpaRepository<Parcel, UUID>{
    
    // listar parcelas de una finca
    List<Parcel> findByFarmId(UUID farmId);
}
