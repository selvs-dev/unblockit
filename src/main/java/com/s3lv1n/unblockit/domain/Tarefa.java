package com.s3lv1n.unblockit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Tarefa.
 */
@Entity
@Table(name = "tarefa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Tarefa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "data_limite")
    private LocalDate dataLimite;

    @Column(name = "concluida")
    private String concluida;

    @OneToMany(mappedBy = "tarefaAndamento")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Andamento> andamentos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "tarefas", allowSetters = true)
    private Squad squadTarefa;

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

    public Tarefa descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDate getDataLimite() {
        return dataLimite;
    }

    public Tarefa dataLimite(LocalDate dataLimite) {
        this.dataLimite = dataLimite;
        return this;
    }

    public void setDataLimite(LocalDate dataLimite) {
        this.dataLimite = dataLimite;
    }

    public String getConcluida() {
        return concluida;
    }

    public Tarefa concluida(String concluida) {
        this.concluida = concluida;
        return this;
    }

    public void setConcluida(String concluida) {
        this.concluida = concluida;
    }

    public Set<Andamento> getAndamentos() {
        return andamentos;
    }

    public Tarefa andamentos(Set<Andamento> andamentos) {
        this.andamentos = andamentos;
        return this;
    }

    public Tarefa addAndamento(Andamento andamento) {
        this.andamentos.add(andamento);
        andamento.setTarefaAndamento(this);
        return this;
    }

    public Tarefa removeAndamento(Andamento andamento) {
        this.andamentos.remove(andamento);
        andamento.setTarefaAndamento(null);
        return this;
    }

    public void setAndamentos(Set<Andamento> andamentos) {
        this.andamentos = andamentos;
    }

    public Squad getSquadTarefa() {
        return squadTarefa;
    }

    public Tarefa squadTarefa(Squad squad) {
        this.squadTarefa = squad;
        return this;
    }

    public void setSquadTarefa(Squad squad) {
        this.squadTarefa = squad;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tarefa)) {
            return false;
        }
        return id != null && id.equals(((Tarefa) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Tarefa{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", dataLimite='" + getDataLimite() + "'" +
            ", concluida='" + getConcluida() + "'" +
            "}";
    }
}
