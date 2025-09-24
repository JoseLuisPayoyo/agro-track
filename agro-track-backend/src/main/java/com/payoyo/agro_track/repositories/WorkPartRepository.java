package com.payoyo.agro_track.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payoyo.agro_track.models.WorkPart;
import com.payoyo.agro_track.models.enums.WorkPartStatus;

public interface WorkPartRepository extends JpaRepository<WorkPart, UUID>{

    // listar partes por fechas
    List<WorkPart> findByDate(LocalDate date);

    // filtrar partes po estado
    List<WorkPart> findByStatus(WorkPartStatus status);

    // listar partes de una cuadrilla
    List<WorkPart> findByCrewId(UUID crewId);

    // listar partes de una campaña
    List<WorkPart> findByCampaignId(UUID campainId);
    
}
