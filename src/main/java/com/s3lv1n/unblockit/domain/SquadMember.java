package com.s3lv1n.unblockit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.s3lv1n.unblockit.domain.enumeration.PERFILSQUAD;

/**
 * A SquadMember.
 */
@Entity
@Table(name = "squad_member")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SquadMember implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(name = "perfil")
    private PERFILSQUAD perfil;

    @Column(name = "obs")
    private String obs;

    @OneToMany(mappedBy = "squadMemberFeedback")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Feedback> feedbacks = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "squadMembers", allowSetters = true)
    private Squad squadSquadMember;

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

    public SquadMember nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public PERFILSQUAD getPerfil() {
        return perfil;
    }

    public SquadMember perfil(PERFILSQUAD perfil) {
        this.perfil = perfil;
        return this;
    }

    public void setPerfil(PERFILSQUAD perfil) {
        this.perfil = perfil;
    }

    public String getObs() {
        return obs;
    }

    public SquadMember obs(String obs) {
        this.obs = obs;
        return this;
    }

    public void setObs(String obs) {
        this.obs = obs;
    }

    public Set<Feedback> getFeedbacks() {
        return feedbacks;
    }

    public SquadMember feedbacks(Set<Feedback> feedbacks) {
        this.feedbacks = feedbacks;
        return this;
    }

    public SquadMember addFeedback(Feedback feedback) {
        this.feedbacks.add(feedback);
        feedback.setSquadMemberFeedback(this);
        return this;
    }

    public SquadMember removeFeedback(Feedback feedback) {
        this.feedbacks.remove(feedback);
        feedback.setSquadMemberFeedback(null);
        return this;
    }

    public void setFeedbacks(Set<Feedback> feedbacks) {
        this.feedbacks = feedbacks;
    }

    public Squad getSquadSquadMember() {
        return squadSquadMember;
    }

    public SquadMember squadSquadMember(Squad squad) {
        this.squadSquadMember = squad;
        return this;
    }

    public void setSquadSquadMember(Squad squad) {
        this.squadSquadMember = squad;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SquadMember)) {
            return false;
        }
        return id != null && id.equals(((SquadMember) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SquadMember{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", perfil='" + getPerfil() + "'" +
            ", obs='" + getObs() + "'" +
            "}";
    }
}
