package com.s3lv1n.unblockit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Pratica.
 */
@Entity
@Table(name = "pratica")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Pratica implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @ManyToOne
    @JsonIgnoreProperties(value = "praticas", allowSetters = true)
    private Capability capabilityPratica;

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

    public Pratica nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Capability getCapabilityPratica() {
        return capabilityPratica;
    }

    public Pratica capabilityPratica(Capability capability) {
        this.capabilityPratica = capability;
        return this;
    }

    public void setCapabilityPratica(Capability capability) {
        this.capabilityPratica = capability;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pratica)) {
            return false;
        }
        return id != null && id.equals(((Pratica) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pratica{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
