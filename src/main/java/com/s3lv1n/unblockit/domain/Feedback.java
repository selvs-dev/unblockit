package com.s3lv1n.unblockit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Feedback.
 */
@Entity
@Table(name = "feedback")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Feedback implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "acao")
    private String acao;

    @ManyToOne
    @JsonIgnoreProperties(value = "feedbacks", allowSetters = true)
    private Squad squadFeedback;

    @ManyToOne
    @JsonIgnoreProperties(value = "feedbacks", allowSetters = true)
    private SquadMember squadMemberFeedback;

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

    public Feedback descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getAcao() {
        return acao;
    }

    public Feedback acao(String acao) {
        this.acao = acao;
        return this;
    }

    public void setAcao(String acao) {
        this.acao = acao;
    }

    public Squad getSquadFeedback() {
        return squadFeedback;
    }

    public Feedback squadFeedback(Squad squad) {
        this.squadFeedback = squad;
        return this;
    }

    public void setSquadFeedback(Squad squad) {
        this.squadFeedback = squad;
    }

    public SquadMember getSquadMemberFeedback() {
        return squadMemberFeedback;
    }

    public Feedback squadMemberFeedback(SquadMember squadMember) {
        this.squadMemberFeedback = squadMember;
        return this;
    }

    public void setSquadMemberFeedback(SquadMember squadMember) {
        this.squadMemberFeedback = squadMember;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Feedback)) {
            return false;
        }
        return id != null && id.equals(((Feedback) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Feedback{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", acao='" + getAcao() + "'" +
            "}";
    }
}
