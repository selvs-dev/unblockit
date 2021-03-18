package com.s3lv1n.unblockit.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Capability.
 */
@Entity
@Table(name = "capability")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Capability implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToMany(mappedBy = "capabilityPratica")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Pratica> praticas = new HashSet<>();

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

    public Capability nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Pratica> getPraticas() {
        return praticas;
    }

    public Capability praticas(Set<Pratica> praticas) {
        this.praticas = praticas;
        return this;
    }

    public Capability addPratica(Pratica pratica) {
        this.praticas.add(pratica);
        pratica.setCapabilityPratica(this);
        return this;
    }

    public Capability removePratica(Pratica pratica) {
        this.praticas.remove(pratica);
        pratica.setCapabilityPratica(null);
        return this;
    }

    public void setPraticas(Set<Pratica> praticas) {
        this.praticas = praticas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Capability)) {
            return false;
        }
        return id != null && id.equals(((Capability) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Capability{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
