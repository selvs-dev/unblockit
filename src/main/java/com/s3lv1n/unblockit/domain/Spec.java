package com.s3lv1n.unblockit.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.s3lv1n.unblockit.domain.enumeration.PERFILSPEC;

/**
 * A Spec.
 */
@Entity
@Table(name = "spec")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Spec implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(name = "perfil")
    private PERFILSPEC perfil;

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

    public Spec nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public PERFILSPEC getPerfil() {
        return perfil;
    }

    public Spec perfil(PERFILSPEC perfil) {
        this.perfil = perfil;
        return this;
    }

    public void setPerfil(PERFILSPEC perfil) {
        this.perfil = perfil;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Spec)) {
            return false;
        }
        return id != null && id.equals(((Spec) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Spec{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", perfil='" + getPerfil() + "'" +
            "}";
    }
}
