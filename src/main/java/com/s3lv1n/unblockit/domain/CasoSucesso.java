package com.s3lv1n.unblockit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A CasoSucesso.
 */
@Entity
@Table(name = "caso_sucesso")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CasoSucesso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "confirmado")
    private String confirmado;

    @ManyToOne
    @JsonIgnoreProperties(value = "casoSucessos", allowSetters = true)
    private Squad squadCasoSucesso;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public CasoSucesso descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getConfirmado() {
        return confirmado;
    }

    public CasoSucesso confirmado(String confirmado) {
        this.confirmado = confirmado;
        return this;
    }

    public void setConfirmado(String confirmado) {
        this.confirmado = confirmado;
    }

    public Squad getSquadCasoSucesso() {
        return squadCasoSucesso;
    }

    public CasoSucesso squadCasoSucesso(Squad squad) {
        this.squadCasoSucesso = squad;
        return this;
    }

    public void setSquadCasoSucesso(Squad squad) {
        this.squadCasoSucesso = squad;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CasoSucesso)) {
            return false;
        }
        return id != null && id.equals(((CasoSucesso) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CasoSucesso{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", confirmado='" + getConfirmado() + "'" +
            "}";
    }
}
