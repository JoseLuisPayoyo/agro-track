package com.payoyo.agro_track.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payoyo.agro_track.models.Campaign;

public interface CampaignRepository extends JpaRepository<Campaign, UUID>{

    // listar campañas por finca
    List<Campaign> findByFarmId(UUID farmId);

    //listar camapas por cuadrilla
    List<Campaign> findByCrewId(UUID crewId);

    // buscar campañas por rango de fecha
    List<Campaign> findByStartDateBetween(LocalDate from, LocalDate to);
    
}
