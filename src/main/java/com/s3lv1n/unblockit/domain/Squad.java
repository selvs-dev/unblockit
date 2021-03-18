package com.s3lv1n.unblockit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Squad.
 */
@Entity
@Table(name = "squad")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Squad implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "comunidade")
    private String comunidade;

    @Column(name = "obs")
    private String obs;

    @OneToMany(mappedBy = "squadCasoSucesso")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<CasoSucesso> casoSucessos = new HashSet<>();

    @OneToMany(mappedBy = "squadDepoimento")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Depoimento> depoimentos = new HashSet<>();

    @OneToMany(mappedBy = "squadFeedback")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Feedback> feedbacks = new HashSet<>();

    @OneToMany(mappedBy = "squadTarefa")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Tarefa> tarefas = new HashSet<>();

    @OneToMany(mappedBy = "squadSquadMember")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<SquadMember> squadMembers = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "squads", allowSetters = true)
    private Ciclo cicloSquad;

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

    public Squad nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getComunidade() {
        return comunidade;
    }

    public Squad comunidade(String comunidade) {
        this.comunidade = comunidade;
        return this;
    }

    public void setComunidade(String comunidade) {
        this.comunidade = comunidade;
    }

    public String getObs() {
        return obs;
    }

    public Squad obs(String obs) {
        this.obs = obs;
        return this;
    }

    public void setObs(String obs) {
        this.obs = obs;
    }

    public Set<CasoSucesso> getCasoSucessos() {
        return casoSucessos;
    }

    public Squad casoSucessos(Set<CasoSucesso> casoSucessos) {
        this.casoSucessos = casoSucessos;
        return this;
    }

    public Squad addCasoSucesso(CasoSucesso casoSucesso) {
        this.casoSucessos.add(casoSucesso);
        casoSucesso.setSquadCasoSucesso(this);
        return this;
    }

    public Squad removeCasoSucesso(CasoSucesso casoSucesso) {
        this.casoSucessos.remove(casoSucesso);
        casoSucesso.setSquadCasoSucesso(null);
        return this;
    }

    public void setCasoSucessos(Set<CasoSucesso> casoSucessos) {
        this.casoSucessos = casoSucessos;
    }

    public Set<Depoimento> getDepoimentos() {
        return depoimentos;
    }

    public Squad depoimentos(Set<Depoimento> depoimentos) {
        this.depoimentos = depoimentos;
        return this;
    }

    public Squad addDepoimento(Depoimento depoimento) {
        this.depoimentos.add(depoimento);
        depoimento.setSquadDepoimento(this);
        return this;
    }

    public Squad removeDepoimento(Depoimento depoimento) {
        this.depoimentos.remove(depoimento);
        depoimento.setSquadDepoimento(null);
        return this;
    }

    public void setDepoimentos(Set<Depoimento> depoimentos) {
        this.depoimentos = depoimentos;
    }

    public Set<Feedback> getFeedbacks() {
        return feedbacks;
    }

    public Squad feedbacks(Set<Feedback> feedbacks) {
        this.feedbacks = feedbacks;
        return this;
    }

    public Squad addFeedback(Feedback feedback) {
        this.feedbacks.add(feedback);
        feedback.setSquadFeedback(this);
        return this;
    }

    public Squad removeFeedback(Feedback feedback) {
        this.feedbacks.remove(feedback);
        feedback.setSquadFeedback(null);
        return this;
    }

    public void setFeedbacks(Set<Feedback> feedbacks) {
        this.feedbacks = feedbacks;
    }

    public Set<Tarefa> getTarefas() {
        return tarefas;
    }

    public Squad tarefas(Set<Tarefa> tarefas) {
        this.tarefas = tarefas;
        return this;
    }

    public Squad addTarefa(Tarefa tarefa) {
        this.tarefas.add(tarefa);
        tarefa.setSquadTarefa(this);
        return this;
    }

    public Squad removeTarefa(Tarefa tarefa) {
        this.tarefas.remove(tarefa);
        tarefa.setSquadTarefa(null);
        return this;
    }

    public void setTarefas(Set<Tarefa> tarefas) {
        this.tarefas = tarefas;
    }

    public Set<SquadMember> getSquadMembers() {
        return squadMembers;
    }

    public Squad squadMembers(Set<SquadMember> squadMembers) {
        this.squadMembers = squadMembers;
        return this;
    }

    public Squad addSquadMember(SquadMember squadMember) {
        this.squadMembers.add(squadMember);
        squadMember.setSquadSquadMember(this);
        return this;
    }

    public Squad removeSquadMember(SquadMember squadMember) {
        this.squadMembers.remove(squadMember);
        squadMember.setSquadSquadMember(null);
        return this;
    }

    public void setSquadMembers(Set<SquadMember> squadMembers) {
        this.squadMembers = squadMembers;
    }

    public Ciclo getCicloSquad() {
        return cicloSquad;
    }

    public Squad cicloSquad(Ciclo ciclo) {
        this.cicloSquad = ciclo;
        return this;
    }

    public void setCicloSquad(Ciclo ciclo) {
        this.cicloSquad = ciclo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Squad)) {
            return false;
        }
        return id != null && id.equals(((Squad) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Squad{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", comunidade='" + getComunidade() + "'" +
            ", obs='" + getObs() + "'" +
            "}";
    }
}
