package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.UnblockItApp;
import com.s3lv1n.unblockit.domain.Squad;
import com.s3lv1n.unblockit.repository.SquadRepository;

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

/**
 * Integration tests for the {@link SquadResource} REST controller.
 */
@SpringBootTest(classes = UnblockItApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SquadResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_COMUNIDADE = "AAAAAAAAAA";
    private static final String UPDATED_COMUNIDADE = "BBBBBBBBBB";

    private static final String DEFAULT_OBS = "AAAAAAAAAA";
    private static final String UPDATED_OBS = "BBBBBBBBBB";

    @Autowired
    private SquadRepository squadRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSquadMockMvc;

    private Squad squad;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Squad createEntity(EntityManager em) {
        Squad squad = new Squad()
            .nome(DEFAULT_NOME)
            .comunidade(DEFAULT_COMUNIDADE)
            .obs(DEFAULT_OBS);
        return squad;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Squad createUpdatedEntity(EntityManager em) {
        Squad squad = new Squad()
            .nome(UPDATED_NOME)
            .comunidade(UPDATED_COMUNIDADE)
            .obs(UPDATED_OBS);
        return squad;
    }

    @BeforeEach
    public void initTest() {
        squad = createEntity(em);
    }

    @Test
    @Transactional
    public void createSquad() throws Exception {
        int databaseSizeBeforeCreate = squadRepository.findAll().size();
        // Create the Squad
        restSquadMockMvc.perform(post("/api/squads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(squad)))
            .andExpect(status().isCreated());

        // Validate the Squad in the database
        List<Squad> squadList = squadRepository.findAll();
        assertThat(squadList).hasSize(databaseSizeBeforeCreate + 1);
        Squad testSquad = squadList.get(squadList.size() - 1);
        assertThat(testSquad.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testSquad.getComunidade()).isEqualTo(DEFAULT_COMUNIDADE);
        assertThat(testSquad.getObs()).isEqualTo(DEFAULT_OBS);
    }

    @Test
    @Transactional
    public void createSquadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = squadRepository.findAll().size();

        // Create the Squad with an existing ID
        squad.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSquadMockMvc.perform(post("/api/squads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(squad)))
            .andExpect(status().isBadRequest());

        // Validate the Squad in the database
        List<Squad> squadList = squadRepository.findAll();
        assertThat(squadList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSquads() throws Exception {
        // Initialize the database
        squadRepository.saveAndFlush(squad);

        // Get all the squadList
        restSquadMockMvc.perform(get("/api/squads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(squad.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].comunidade").value(hasItem(DEFAULT_COMUNIDADE)))
            .andExpect(jsonPath("$.[*].obs").value(hasItem(DEFAULT_OBS)));
    }
    
    @Test
    @Transactional
    public void getSquad() throws Exception {
        // Initialize the database
        squadRepository.saveAndFlush(squad);

        // Get the squad
        restSquadMockMvc.perform(get("/api/squads/{id}", squad.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(squad.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.comunidade").value(DEFAULT_COMUNIDADE))
            .andExpect(jsonPath("$.obs").value(DEFAULT_OBS));
    }
    @Test
    @Transactional
    public void getNonExistingSquad() throws Exception {
        // Get the squad
        restSquadMockMvc.perform(get("/api/squads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSquad() throws Exception {
        // Initialize the database
        squadRepository.saveAndFlush(squad);

        int databaseSizeBeforeUpdate = squadRepository.findAll().size();

        // Update the squad
        Squad updatedSquad = squadRepository.findById(squad.getId()).get();
        // Disconnect from session so that the updates on updatedSquad are not directly saved in db
        em.detach(updatedSquad);
        updatedSquad
            .nome(UPDATED_NOME)
            .comunidade(UPDATED_COMUNIDADE)
            .obs(UPDATED_OBS);

        restSquadMockMvc.perform(put("/api/squads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSquad)))
            .andExpect(status().isOk());

        // Validate the Squad in the database
        List<Squad> squadList = squadRepository.findAll();
        assertThat(squadList).hasSize(databaseSizeBeforeUpdate);
        Squad testSquad = squadList.get(squadList.size() - 1);
        assertThat(testSquad.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testSquad.getComunidade()).isEqualTo(UPDATED_COMUNIDADE);
        assertThat(testSquad.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    public void updateNonExistingSquad() throws Exception {
        int databaseSizeBeforeUpdate = squadRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSquadMockMvc.perform(put("/api/squads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(squad)))
            .andExpect(status().isBadRequest());

        // Validate the Squad in the database
        List<Squad> squadList = squadRepository.findAll();
        assertThat(squadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSquad() throws Exception {
        // Initialize the database
        squadRepository.saveAndFlush(squad);

        int databaseSizeBeforeDelete = squadRepository.findAll().size();

        // Delete the squad
        restSquadMockMvc.perform(delete("/api/squads/{id}", squad.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Squad> squadList = squadRepository.findAll();
        assertThat(squadList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
