package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.UnblockItApp;
import com.s3lv1n.unblockit.domain.Pratica;
import com.s3lv1n.unblockit.repository.PraticaRepository;

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
 * Integration tests for the {@link PraticaResource} REST controller.
 */
@SpringBootTest(classes = UnblockItApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PraticaResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private PraticaRepository praticaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPraticaMockMvc;

    private Pratica pratica;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pratica createEntity(EntityManager em) {
        Pratica pratica = new Pratica()
            .nome(DEFAULT_NOME);
        return pratica;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pratica createUpdatedEntity(EntityManager em) {
        Pratica pratica = new Pratica()
            .nome(UPDATED_NOME);
        return pratica;
    }

    @BeforeEach
    public void initTest() {
        pratica = createEntity(em);
    }

    @Test
    @Transactional
    public void createPratica() throws Exception {
        int databaseSizeBeforeCreate = praticaRepository.findAll().size();
        // Create the Pratica
        restPraticaMockMvc.perform(post("/api/praticas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pratica)))
            .andExpect(status().isCreated());

        // Validate the Pratica in the database
        List<Pratica> praticaList = praticaRepository.findAll();
        assertThat(praticaList).hasSize(databaseSizeBeforeCreate + 1);
        Pratica testPratica = praticaList.get(praticaList.size() - 1);
        assertThat(testPratica.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createPraticaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = praticaRepository.findAll().size();

        // Create the Pratica with an existing ID
        pratica.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPraticaMockMvc.perform(post("/api/praticas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pratica)))
            .andExpect(status().isBadRequest());

        // Validate the Pratica in the database
        List<Pratica> praticaList = praticaRepository.findAll();
        assertThat(praticaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPraticas() throws Exception {
        // Initialize the database
        praticaRepository.saveAndFlush(pratica);

        // Get all the praticaList
        restPraticaMockMvc.perform(get("/api/praticas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pratica.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getPratica() throws Exception {
        // Initialize the database
        praticaRepository.saveAndFlush(pratica);

        // Get the pratica
        restPraticaMockMvc.perform(get("/api/praticas/{id}", pratica.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pratica.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingPratica() throws Exception {
        // Get the pratica
        restPraticaMockMvc.perform(get("/api/praticas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePratica() throws Exception {
        // Initialize the database
        praticaRepository.saveAndFlush(pratica);

        int databaseSizeBeforeUpdate = praticaRepository.findAll().size();

        // Update the pratica
        Pratica updatedPratica = praticaRepository.findById(pratica.getId()).get();
        // Disconnect from session so that the updates on updatedPratica are not directly saved in db
        em.detach(updatedPratica);
        updatedPratica
            .nome(UPDATED_NOME);

        restPraticaMockMvc.perform(put("/api/praticas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPratica)))
            .andExpect(status().isOk());

        // Validate the Pratica in the database
        List<Pratica> praticaList = praticaRepository.findAll();
        assertThat(praticaList).hasSize(databaseSizeBeforeUpdate);
        Pratica testPratica = praticaList.get(praticaList.size() - 1);
        assertThat(testPratica.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingPratica() throws Exception {
        int databaseSizeBeforeUpdate = praticaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPraticaMockMvc.perform(put("/api/praticas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pratica)))
            .andExpect(status().isBadRequest());

        // Validate the Pratica in the database
        List<Pratica> praticaList = praticaRepository.findAll();
        assertThat(praticaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePratica() throws Exception {
        // Initialize the database
        praticaRepository.saveAndFlush(pratica);

        int databaseSizeBeforeDelete = praticaRepository.findAll().size();

        // Delete the pratica
        restPraticaMockMvc.perform(delete("/api/praticas/{id}", pratica.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pratica> praticaList = praticaRepository.findAll();
        assertThat(praticaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
