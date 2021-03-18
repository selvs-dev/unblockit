package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.UnblockItApp;
import com.s3lv1n.unblockit.domain.SquadMember;
import com.s3lv1n.unblockit.repository.SquadMemberRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.s3lv1n.unblockit.domain.enumeration.PERFILSQUAD;
/**
 * Integration tests for the {@link SquadMemberResource} REST controller.
 */
@SpringBootTest(classes = UnblockItApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SquadMemberResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final PERFILSQUAD DEFAULT_PERFIL = PERFILSQUAD.TEAM_LEAD;
    private static final PERFILSQUAD UPDATED_PERFIL = PERFILSQUAD.TECH_LEAD;

    private static final String DEFAULT_OBS = "AAAAAAAAAA";
    private static final String UPDATED_OBS = "BBBBBBBBBB";

    @Autowired
    private SquadMemberRepository squadMemberRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSquadMemberMockMvc;

    private SquadMember squadMember;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SquadMember createEntity(EntityManager em) {
        SquadMember squadMember = new SquadMember()
            .nome(DEFAULT_NOME)
            .perfil(DEFAULT_PERFIL)
            .obs(DEFAULT_OBS);
        return squadMember;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SquadMember createUpdatedEntity(EntityManager em) {
        SquadMember squadMember = new SquadMember()
            .nome(UPDATED_NOME)
            .perfil(UPDATED_PERFIL)
            .obs(UPDATED_OBS);
        return squadMember;
    }

    @BeforeEach
    public void initTest() {
        squadMember = createEntity(em);
    }

    @Test
    @Transactional
    public void createSquadMember() throws Exception {
        int databaseSizeBeforeCreate = squadMemberRepository.findAll().size();
        // Create the SquadMember
        restSquadMemberMockMvc.perform(post("/api/squad-members")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(squadMember)))
            .andExpect(status().isCreated());

        // Validate the SquadMember in the database
        List<SquadMember> squadMemberList = squadMemberRepository.findAll();
        assertThat(squadMemberList).hasSize(databaseSizeBeforeCreate + 1);
        SquadMember testSquadMember = squadMemberList.get(squadMemberList.size() - 1);
        assertThat(testSquadMember.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testSquadMember.getPerfil()).isEqualTo(DEFAULT_PERFIL);
        assertThat(testSquadMember.getObs()).isEqualTo(DEFAULT_OBS);
    }

    @Test
    @Transactional
    public void createSquadMemberWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = squadMemberRepository.findAll().size();

        // Create the SquadMember with an existing ID
        squadMember.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSquadMemberMockMvc.perform(post("/api/squad-members")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(squadMember)))
            .andExpect(status().isBadRequest());

        // Validate the SquadMember in the database
        List<SquadMember> squadMemberList = squadMemberRepository.findAll();
        assertThat(squadMemberList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSquadMembers() throws Exception {
        // Initialize the database
        squadMemberRepository.saveAndFlush(squadMember);

        // Get all the squadMemberList
        restSquadMemberMockMvc.perform(get("/api/squad-members?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(squadMember.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].perfil").value(hasItem(DEFAULT_PERFIL.toString())))
            .andExpect(jsonPath("$.[*].obs").value(hasItem(DEFAULT_OBS)));
    }
    
    @Test
    @Transactional
    public void getSquadMember() throws Exception {
        // Initialize the database
        squadMemberRepository.saveAndFlush(squadMember);

        // Get the squadMember
        restSquadMemberMockMvc.perform(get("/api/squad-members/{id}", squadMember.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(squadMember.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.perfil").value(DEFAULT_PERFIL.toString()))
            .andExpect(jsonPath("$.obs").value(DEFAULT_OBS));
    }
    @Test
    @Transactional
    public void getNonExistingSquadMember() throws Exception {
        // Get the squadMember
        restSquadMemberMockMvc.perform(get("/api/squad-members/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSquadMember() throws Exception {
        // Initialize the database
        squadMemberRepository.saveAndFlush(squadMember);

        int databaseSizeBeforeUpdate = squadMemberRepository.findAll().size();

        // Update the squadMember
        SquadMember updatedSquadMember = squadMemberRepository.findById(squadMember.getId()).get();
        // Disconnect from session so that the updates on updatedSquadMember are not directly saved in db
        em.detach(updatedSquadMember);
        updatedSquadMember
            .nome(UPDATED_NOME)
            .perfil(UPDATED_PERFIL)
            .obs(UPDATED_OBS);

        restSquadMemberMockMvc.perform(put("/api/squad-members")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSquadMember)))
            .andExpect(status().isOk());

        // Validate the SquadMember in the database
        List<SquadMember> squadMemberList = squadMemberRepository.findAll();
        assertThat(squadMemberList).hasSize(databaseSizeBeforeUpdate);
        SquadMember testSquadMember = squadMemberList.get(squadMemberList.size() - 1);
        assertThat(testSquadMember.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testSquadMember.getPerfil()).isEqualTo(UPDATED_PERFIL);
        assertThat(testSquadMember.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    public void updateNonExistingSquadMember() throws Exception {
        int databaseSizeBeforeUpdate = squadMemberRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSquadMemberMockMvc.perform(put("/api/squad-members")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(squadMember)))
            .andExpect(status().isBadRequest());

        // Validate the SquadMember in the database
        List<SquadMember> squadMemberList = squadMemberRepository.findAll();
        assertThat(squadMemberList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSquadMember() throws Exception {
        // Initialize the database
        squadMemberRepository.saveAndFlush(squadMember);

        int databaseSizeBeforeDelete = squadMemberRepository.findAll().size();

        // Delete the squadMember
        restSquadMemberMockMvc.perform(delete("/api/squad-members/{id}", squadMember.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SquadMember> squadMemberList = squadMemberRepository.findAll();
        assertThat(squadMemberList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
