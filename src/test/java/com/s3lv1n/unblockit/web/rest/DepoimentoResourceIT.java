package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.UnblockItApp;
import com.s3lv1n.unblockit.domain.Depoimento;
import com.s3lv1n.unblockit.repository.DepoimentoRepository;

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
 * Integration tests for the {@link DepoimentoResource} REST controller.
 */
@SpringBootTest(classes = UnblockItApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DepoimentoResourceIT {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String DEFAULT_CONFIRMADO = "AAAAAAAAAA";
    private static final String UPDATED_CONFIRMADO = "BBBBBBBBBB";

    @Autowired
    private DepoimentoRepository depoimentoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDepoimentoMockMvc;

    private Depoimento depoimento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Depoimento createEntity(EntityManager em) {
        Depoimento depoimento = new Depoimento()
            .descricao(DEFAULT_DESCRICAO)
            .confirmado(DEFAULT_CONFIRMADO);
        return depoimento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Depoimento createUpdatedEntity(EntityManager em) {
        Depoimento depoimento = new Depoimento()
            .descricao(UPDATED_DESCRICAO)
            .confirmado(UPDATED_CONFIRMADO);
        return depoimento;
    }

    @BeforeEach
    public void initTest() {
        depoimento = createEntity(em);
    }

    @Test
    @Transactional
    public void createDepoimento() throws Exception {
        int databaseSizeBeforeCreate = depoimentoRepository.findAll().size();
        // Create the Depoimento
        restDepoimentoMockMvc.perform(post("/api/depoimentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(depoimento)))
            .andExpect(status().isCreated());

        // Validate the Depoimento in the database
        List<Depoimento> depoimentoList = depoimentoRepository.findAll();
        assertThat(depoimentoList).hasSize(databaseSizeBeforeCreate + 1);
        Depoimento testDepoimento = depoimentoList.get(depoimentoList.size() - 1);
        assertThat(testDepoimento.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testDepoimento.getConfirmado()).isEqualTo(DEFAULT_CONFIRMADO);
    }

    @Test
    @Transactional
    public void createDepoimentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = depoimentoRepository.findAll().size();

        // Create the Depoimento with an existing ID
        depoimento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDepoimentoMockMvc.perform(post("/api/depoimentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(depoimento)))
            .andExpect(status().isBadRequest());

        // Validate the Depoimento in the database
        List<Depoimento> depoimentoList = depoimentoRepository.findAll();
        assertThat(depoimentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDepoimentos() throws Exception {
        // Initialize the database
        depoimentoRepository.saveAndFlush(depoimento);

        // Get all the depoimentoList
        restDepoimentoMockMvc.perform(get("/api/depoimentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(depoimento.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].confirmado").value(hasItem(DEFAULT_CONFIRMADO)));
    }
    
    @Test
    @Transactional
    public void getDepoimento() throws Exception {
        // Initialize the database
        depoimentoRepository.saveAndFlush(depoimento);

        // Get the depoimento
        restDepoimentoMockMvc.perform(get("/api/depoimentos/{id}", depoimento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(depoimento.getId().intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.confirmado").value(DEFAULT_CONFIRMADO));
    }
    @Test
    @Transactional
    public void getNonExistingDepoimento() throws Exception {
        // Get the depoimento
        restDepoimentoMockMvc.perform(get("/api/depoimentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDepoimento() throws Exception {
        // Initialize the database
        depoimentoRepository.saveAndFlush(depoimento);

        int databaseSizeBeforeUpdate = depoimentoRepository.findAll().size();

        // Update the depoimento
        Depoimento updatedDepoimento = depoimentoRepository.findById(depoimento.getId()).get();
        // Disconnect from session so that the updates on updatedDepoimento are not directly saved in db
        em.detach(updatedDepoimento);
        updatedDepoimento
            .descricao(UPDATED_DESCRICAO)
            .confirmado(UPDATED_CONFIRMADO);

        restDepoimentoMockMvc.perform(put("/api/depoimentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDepoimento)))
            .andExpect(status().isOk());

        // Validate the Depoimento in the database
        List<Depoimento> depoimentoList = depoimentoRepository.findAll();
        assertThat(depoimentoList).hasSize(databaseSizeBeforeUpdate);
        Depoimento testDepoimento = depoimentoList.get(depoimentoList.size() - 1);
        assertThat(testDepoimento.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testDepoimento.getConfirmado()).isEqualTo(UPDATED_CONFIRMADO);
    }

    @Test
    @Transactional
    public void updateNonExistingDepoimento() throws Exception {
        int databaseSizeBeforeUpdate = depoimentoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDepoimentoMockMvc.perform(put("/api/depoimentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(depoimento)))
            .andExpect(status().isBadRequest());

        // Validate the Depoimento in the database
        List<Depoimento> depoimentoList = depoimentoRepository.findAll();
        assertThat(depoimentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDepoimento() throws Exception {
        // Initialize the database
        depoimentoRepository.saveAndFlush(depoimento);

        int databaseSizeBeforeDelete = depoimentoRepository.findAll().size();

        // Delete the depoimento
        restDepoimentoMockMvc.perform(delete("/api/depoimentos/{id}", depoimento.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Depoimento> depoimentoList = depoimentoRepository.findAll();
        assertThat(depoimentoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
