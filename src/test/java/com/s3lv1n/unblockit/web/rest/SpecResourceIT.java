package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.UnblockItApp;
import com.s3lv1n.unblockit.domain.Spec;
import com.s3lv1n.unblockit.repository.SpecRepository;

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

import com.s3lv1n.unblockit.domain.enumeration.PERFILSPEC;
/**
 * Integration tests for the {@link SpecResource} REST controller.
 */
@SpringBootTest(classes = UnblockItApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SpecResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final PERFILSPEC DEFAULT_PERFIL = PERFILSPEC.AGILISTA;
    private static final PERFILSPEC UPDATED_PERFIL = PERFILSPEC.SRE;

    @Autowired
    private SpecRepository specRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSpecMockMvc;

    private Spec spec;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Spec createEntity(EntityManager em) {
        Spec spec = new Spec()
            .nome(DEFAULT_NOME)
            .perfil(DEFAULT_PERFIL);
        return spec;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Spec createUpdatedEntity(EntityManager em) {
        Spec spec = new Spec()
            .nome(UPDATED_NOME)
            .perfil(UPDATED_PERFIL);
        return spec;
    }

    @BeforeEach
    public void initTest() {
        spec = createEntity(em);
    }

    @Test
    @Transactional
    public void createSpec() throws Exception {
        int databaseSizeBeforeCreate = specRepository.findAll().size();
        // Create the Spec
        restSpecMockMvc.perform(post("/api/specs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(spec)))
            .andExpect(status().isCreated());

        // Validate the Spec in the database
        List<Spec> specList = specRepository.findAll();
        assertThat(specList).hasSize(databaseSizeBeforeCreate + 1);
        Spec testSpec = specList.get(specList.size() - 1);
        assertThat(testSpec.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testSpec.getPerfil()).isEqualTo(DEFAULT_PERFIL);
    }

    @Test
    @Transactional
    public void createSpecWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = specRepository.findAll().size();

        // Create the Spec with an existing ID
        spec.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSpecMockMvc.perform(post("/api/specs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(spec)))
            .andExpect(status().isBadRequest());

        // Validate the Spec in the database
        List<Spec> specList = specRepository.findAll();
        assertThat(specList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSpecs() throws Exception {
        // Initialize the database
        specRepository.saveAndFlush(spec);

        // Get all the specList
        restSpecMockMvc.perform(get("/api/specs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(spec.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].perfil").value(hasItem(DEFAULT_PERFIL.toString())));
    }
    
    @Test
    @Transactional
    public void getSpec() throws Exception {
        // Initialize the database
        specRepository.saveAndFlush(spec);

        // Get the spec
        restSpecMockMvc.perform(get("/api/specs/{id}", spec.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(spec.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.perfil").value(DEFAULT_PERFIL.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSpec() throws Exception {
        // Get the spec
        restSpecMockMvc.perform(get("/api/specs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSpec() throws Exception {
        // Initialize the database
        specRepository.saveAndFlush(spec);

        int databaseSizeBeforeUpdate = specRepository.findAll().size();

        // Update the spec
        Spec updatedSpec = specRepository.findById(spec.getId()).get();
        // Disconnect from session so that the updates on updatedSpec are not directly saved in db
        em.detach(updatedSpec);
        updatedSpec
            .nome(UPDATED_NOME)
            .perfil(UPDATED_PERFIL);

        restSpecMockMvc.perform(put("/api/specs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSpec)))
            .andExpect(status().isOk());

        // Validate the Spec in the database
        List<Spec> specList = specRepository.findAll();
        assertThat(specList).hasSize(databaseSizeBeforeUpdate);
        Spec testSpec = specList.get(specList.size() - 1);
        assertThat(testSpec.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testSpec.getPerfil()).isEqualTo(UPDATED_PERFIL);
    }

    @Test
    @Transactional
    public void updateNonExistingSpec() throws Exception {
        int databaseSizeBeforeUpdate = specRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSpecMockMvc.perform(put("/api/specs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(spec)))
            .andExpect(status().isBadRequest());

        // Validate the Spec in the database
        List<Spec> specList = specRepository.findAll();
        assertThat(specList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSpec() throws Exception {
        // Initialize the database
        specRepository.saveAndFlush(spec);

        int databaseSizeBeforeDelete = specRepository.findAll().size();

        // Delete the spec
        restSpecMockMvc.perform(delete("/api/specs/{id}", spec.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Spec> specList = specRepository.findAll();
        assertThat(specList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
