package com.s3lv1n.unblockit.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Ciclo.
 */
@Entity
@Table(name = "ciclo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Ciclo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToMany(mappedBy = "cicloSquad")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Squad> squads = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Ciclo nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Squad> getSquads() {
        return squads;
    }

    public Ciclo squads(Set<Squad> squads) {
        this.squads = squads;
        return this;
    }

    public Ciclo addSquad(Squad squad) {
        this.squads.add(squad);
        squad.setCicloSquad(this);
        return this;
    }

    public Ciclo removeSquad(Squad squad) {
        this.squads.remove(squad);
        squad.setCicloSquad(null);
        return this;
    }

    public void setSquads(Set<Squad> squads) {
        this.squads = squads;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ciclo)) {
            return false;
        }
        return id != null && id.equals(((Ciclo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ciclo{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
