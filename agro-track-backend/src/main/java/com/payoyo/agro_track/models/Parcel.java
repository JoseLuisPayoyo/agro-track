package com.payoyo.agro_track.models;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "parcels")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Parcel {
    
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, length = 80)
    @NotNull(message = "El nombre de la parcela es obligatorio")
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "farm_id", nullable = false)
    @NotNull(message = "La finca es obligatoria")
    private Farm farm;
}
