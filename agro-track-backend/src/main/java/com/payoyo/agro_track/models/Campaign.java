package com.payoyo.agro_track.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "campaigns")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Campaign {
    
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, length = 80)
    @NotNull(message = "El nombre de la camapa es obligatorio")
    private String name;

    @Column(nullable = false)
    @NotNull(message = "La fecha de inicio es obligatoria")
    private LocalDate startDate;

    private LocalDate endDate;

    @Column(nullable = false ,length = 200)
    @NotNull(message = "La tarea principal de la campaña es obligatoria")
    private String mainTask;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "farm_id", nullable = false)
    @NotNull(message = "La finca es obligatoria")
    private Farm farm;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id", nullable = false)
    @NotNull(message = "La cuadrilla es obligatoria")
    private Crew crew;

    @OneToMany(mappedBy = "campaign", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = false)
    private List<WorkPart> workParts = new ArrayList<>();

}
