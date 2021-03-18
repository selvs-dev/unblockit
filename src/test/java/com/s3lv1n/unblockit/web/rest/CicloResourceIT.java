package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.UnblockItApp;
import com.s3lv1n.unblockit.domain.Ciclo;
import com.s3lv1n.unblockit.repository.CicloRepository;

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
 * Integration tests for the {@link CicloResource} REST controller.
 */
@SpringBootTest(classes = UnblockItApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CicloResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private CicloRepository cicloRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCicloMockMvc;

    private Ciclo ciclo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ciclo createEntity(EntityManager em) {
        Ciclo ciclo = new Ciclo()
            .nome(DEFAULT_NOME);
        return ciclo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ciclo createUpdatedEntity(EntityManager em) {
        Ciclo ciclo = new Ciclo()
            .nome(UPDATED_NOME);
        return ciclo;
    }

    @BeforeEach
    public void initTest() {
        ciclo = createEntity(em);
    }

    @Test
    @Transactional
    public void createCiclo() throws Exception {
        int databaseSizeBeforeCreate = cicloRepository.findAll().size();
        // Create the Ciclo
        restCicloMockMvc.perform(post("/api/ciclos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ciclo)))
            .andExpect(status().isCreated());

        // Validate the Ciclo in the database
        List<Ciclo> cicloList = cicloRepository.findAll();
        assertThat(cicloList).hasSize(databaseSizeBeforeCreate + 1);
        Ciclo testCiclo = cicloList.get(cicloList.size() - 1);
        assertThat(testCiclo.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createCicloWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cicloRepository.findAll().size();

        // Create the Ciclo with an existing ID
        ciclo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCicloMockMvc.perform(post("/api/ciclos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ciclo)))
            .andExpect(status().isBadRequest());

        // Validate the Ciclo in the database
        List<Ciclo> cicloList = cicloRepository.findAll();
        assertThat(cicloList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCiclos() throws Exception {
        // Initialize the database
        cicloRepository.saveAndFlush(ciclo);

        // Get all the cicloList
        restCicloMockMvc.perform(get("/api/ciclos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ciclo.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getCiclo() throws Exception {
        // Initialize the database
        cicloRepository.saveAndFlush(ciclo);

        // Get the ciclo
        restCicloMockMvc.perform(get("/api/ciclos/{id}", ciclo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ciclo.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingCiclo() throws Exception {
        // Get the ciclo
        restCicloMockMvc.perform(get("/api/ciclos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCiclo() throws Exception {
        // Initialize the database
        cicloRepository.saveAndFlush(ciclo);

        int databaseSizeBeforeUpdate = cicloRepository.findAll().size();

        // Update the ciclo
        Ciclo updatedCiclo = cicloRepository.findById(ciclo.getId()).get();
        // Disconnect from session so that the updates on updatedCiclo are not directly saved in db
        em.detach(updatedCiclo);
        updatedCiclo
            .nome(UPDATED_NOME);

        restCicloMockMvc.perform(put("/api/ciclos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCiclo)))
            .andExpect(status().isOk());

        // Validate the Ciclo in the database
        List<Ciclo> cicloList = cicloRepository.findAll();
        assertThat(cicloList).hasSize(databaseSizeBeforeUpdate);
        Ciclo testCiclo = cicloList.get(cicloList.size() - 1);
        assertThat(testCiclo.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingCiclo() throws Exception {
        int databaseSizeBeforeUpdate = cicloRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCicloMockMvc.perform(put("/api/ciclos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ciclo)))
            .andExpect(status().isBadRequest());

        // Validate the Ciclo in the database
        List<Ciclo> cicloList = cicloRepository.findAll();
        assertThat(cicloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCiclo() throws Exception {
        // Initialize the database
        cicloRepository.saveAndFlush(ciclo);

        int databaseSizeBeforeDelete = cicloRepository.findAll().size();

        // Delete the ciclo
        restCicloMockMvc.perform(delete("/api/ciclos/{id}", ciclo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ciclo> cicloList = cicloRepository.findAll();
        assertThat(cicloList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
