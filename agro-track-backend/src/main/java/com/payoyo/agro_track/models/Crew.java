package com.payoyo.agro_track.models;

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
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "crews")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Crew {
    
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, length = 200)
    @NotNull(message = "El nombre de la cuadrilla es obligatorio")
    private String name;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee foreman; //encargado de la cuadrilla

    @OneToMany(mappedBy = "crew", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Employee> members = new ArrayList<>();
}
