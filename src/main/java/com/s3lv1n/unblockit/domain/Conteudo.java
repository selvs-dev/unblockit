package com.s3lv1n.unblockit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.s3lv1n.unblockit.domain.enumeration.TIPOCONTEUDO;

/**
 * A Conteudo.
 */
@Entity
@Table(name = "conteudo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Conteudo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TIPOCONTEUDO tipo;

    @Column(name = "obs")
    private String obs;

    @Column(name = "confirmado")
    private Boolean confirmado;

    @ManyToOne
    @JsonIgnoreProperties(value = "conteudos", allowSetters = true)
    private Slot slotConteudo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TIPOCONTEUDO getTipo() {
        return tipo;
    }

    public Conteudo tipo(TIPOCONTEUDO tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TIPOCONTEUDO tipo) {
        this.tipo = tipo;
    }

    public String getObs() {
        return obs;
    }

    public Conteudo obs(String obs) {
        this.obs = obs;
        return this;
    }

    public void setObs(String obs) {
        this.obs = obs;
    }

    public Boolean isConfirmado() {
        return confirmado;
    }

    public Conteudo confirmado(Boolean confirmado) {
        this.confirmado = confirmado;
        return this;
    }

    public void setConfirmado(Boolean confirmado) {
        this.confirmado = confirmado;
    }

    public Slot getSlotConteudo() {
        return slotConteudo;
    }

    public Conteudo slotConteudo(Slot slot) {
        this.slotConteudo = slot;
        return this;
    }

    public void setSlotConteudo(Slot slot) {
        this.slotConteudo = slot;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Conteudo)) {
            return false;
        }
        return id != null && id.equals(((Conteudo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Conteudo{" +
            "id=" + getId() +
            ", tipo='" + getTipo() + "'" +
            ", obs='" + getObs() + "'" +
            ", confirmado='" + isConfirmado() + "'" +
            "}";
    }
}
