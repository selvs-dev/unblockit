package com.s3lv1n.unblockit.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Slot.
 */
@Entity
@Table(name = "slot")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Slot implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "data")
    private LocalDate data;

    @Column(name = "obs")
    private String obs;

    @Column(name = "confirmado")
    private Boolean confirmado;

    @OneToMany(mappedBy = "slotConteudo")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Conteudo> conteudos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public Slot data(LocalDate data) {
        this.data = data;
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getObs() {
        return obs;
    }

    public Slot obs(String obs) {
        this.obs = obs;
        return this;
    }

    public void setObs(String obs) {
        this.obs = obs;
    }

    public Boolean isConfirmado() {
        return confirmado;
    }

    public Slot confirmado(Boolean confirmado) {
        this.confirmado = confirmado;
        return this;
    }

    public void setConfirmado(Boolean confirmado) {
        this.confirmado = confirmado;
    }

    public Set<Conteudo> getConteudos() {
        return conteudos;
    }

    public Slot conteudos(Set<Conteudo> conteudos) {
        this.conteudos = conteudos;
        return this;
    }

    public Slot addConteudo(Conteudo conteudo) {
        this.conteudos.add(conteudo);
        conteudo.setSlotConteudo(this);
        return this;
    }

    public Slot removeConteudo(Conteudo conteudo) {
        this.conteudos.remove(conteudo);
        conteudo.setSlotConteudo(null);
        return this;
    }

    public void setConteudos(Set<Conteudo> conteudos) {
        this.conteudos = conteudos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Slot)) {
            return false;
        }
        return id != null && id.equals(((Slot) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Slot{" +
            "id=" + getId() +
            ", data='" + getData() + "'" +
            ", obs='" + getObs() + "'" +
            ", confirmado='" + isConfirmado() + "'" +
            "}";
    }
}
