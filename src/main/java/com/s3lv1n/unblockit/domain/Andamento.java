package com.s3lv1n.unblockit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Andamento.
 */
@Entity
@Table(name = "andamento")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Andamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "data_andamento")
    private LocalDate dataAndamento;

    @Column(name = "descricao")
    private String descricao;

    @ManyToOne
    @JsonIgnoreProperties(value = "andamentos", allowSetters = true)
    private Tarefa tarefaAndamento;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataAndamento() {
        return dataAndamento;
    }

    public Andamento dataAndamento(LocalDate dataAndamento) {
        this.dataAndamento = dataAndamento;
        return this;
    }

    public void setDataAndamento(LocalDate dataAndamento) {
        this.dataAndamento = dataAndamento;
    }

    public String getDescricao() {
        return descricao;
    }

    public Andamento descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Tarefa getTarefaAndamento() {
        return tarefaAndamento;
    }

    public Andamento tarefaAndamento(Tarefa tarefa) {
        this.tarefaAndamento = tarefa;
        return this;
    }

    public void setTarefaAndamento(Tarefa tarefa) {
        this.tarefaAndamento = tarefa;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Andamento)) {
            return false;
        }
        return id != null && id.equals(((Andamento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Andamento{" +
            "id=" + getId() +
            ", dataAndamento='" + getDataAndamento() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
