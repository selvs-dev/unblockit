package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.UnblockItApp;
import com.s3lv1n.unblockit.domain.CasoSucesso;
import com.s3lv1n.unblockit.repository.CasoSucessoRepository;

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
 * Integration tests for the {@link CasoSucessoResource} REST controller.
 */
@SpringBootTest(classes = UnblockItApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CasoSucessoResourceIT {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String DEFAULT_CONFIRMADO = "AAAAAAAAAA";
    private static final String UPDATED_CONFIRMADO = "BBBBBBBBBB";

    @Autowired
    private CasoSucessoRepository casoSucessoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCasoSucessoMockMvc;

    private CasoSucesso casoSucesso;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CasoSucesso createEntity(EntityManager em) {
        CasoSucesso casoSucesso = new CasoSucesso()
            .descricao(DEFAULT_DESCRICAO)
            .confirmado(DEFAULT_CONFIRMADO);
        return casoSucesso;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CasoSucesso createUpdatedEntity(EntityManager em) {
        CasoSucesso casoSucesso = new CasoSucesso()
            .descricao(UPDATED_DESCRICAO)
            .confirmado(UPDATED_CONFIRMADO);
        return casoSucesso;
    }

    @BeforeEach
    public void initTest() {
        casoSucesso = createEntity(em);
    }

    @Test
    @Transactional
    public void createCasoSucesso() throws Exception {
        int databaseSizeBeforeCreate = casoSucessoRepository.findAll().size();
        // Create the CasoSucesso
        restCasoSucessoMockMvc.perform(post("/api/caso-sucessos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(casoSucesso)))
            .andExpect(status().isCreated());

        // Validate the CasoSucesso in the database
        List<CasoSucesso> casoSucessoList = casoSucessoRepository.findAll();
        assertThat(casoSucessoList).hasSize(databaseSizeBeforeCreate + 1);
        CasoSucesso testCasoSucesso = casoSucessoList.get(casoSucessoList.size() - 1);
        assertThat(testCasoSucesso.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testCasoSucesso.getConfirmado()).isEqualTo(DEFAULT_CONFIRMADO);
    }

    @Test
    @Transactional
    public void createCasoSucessoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = casoSucessoRepository.findAll().size();

        // Create the CasoSucesso with an existing ID
        casoSucesso.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCasoSucessoMockMvc.perform(post("/api/caso-sucessos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(casoSucesso)))
            .andExpect(status().isBadRequest());

        // Validate the CasoSucesso in the database
        List<CasoSucesso> casoSucessoList = casoSucessoRepository.findAll();
        assertThat(casoSucessoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCasoSucessos() throws Exception {
        // Initialize the database
        casoSucessoRepository.saveAndFlush(casoSucesso);

        // Get all the casoSucessoList
        restCasoSucessoMockMvc.perform(get("/api/caso-sucessos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(casoSucesso.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].confirmado").value(hasItem(DEFAULT_CONFIRMADO)));
    }
    
    @Test
    @Transactional
    public void getCasoSucesso() throws Exception {
        // Initialize the database
        casoSucessoRepository.saveAndFlush(casoSucesso);

        // Get the casoSucesso
        restCasoSucessoMockMvc.perform(get("/api/caso-sucessos/{id}", casoSucesso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(casoSucesso.getId().intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.confirmado").value(DEFAULT_CONFIRMADO));
    }
    @Test
    @Transactional
    public void getNonExistingCasoSucesso() throws Exception {
        // Get the casoSucesso
        restCasoSucessoMockMvc.perform(get("/api/caso-sucessos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCasoSucesso() throws Exception {
        // Initialize the database
        casoSucessoRepository.saveAndFlush(casoSucesso);

        int databaseSizeBeforeUpdate = casoSucessoRepository.findAll().size();

        // Update the casoSucesso
        CasoSucesso updatedCasoSucesso = casoSucessoRepository.findById(casoSucesso.getId()).get();
        // Disconnect from session so that the updates on updatedCasoSucesso are not directly saved in db
        em.detach(updatedCasoSucesso);
        updatedCasoSucesso
            .descricao(UPDATED_DESCRICAO)
            .confirmado(UPDATED_CONFIRMADO);

        restCasoSucessoMockMvc.perform(put("/api/caso-sucessos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCasoSucesso)))
            .andExpect(status().isOk());

        // Validate the CasoSucesso in the database
        List<CasoSucesso> casoSucessoList = casoSucessoRepository.findAll();
        assertThat(casoSucessoList).hasSize(databaseSizeBeforeUpdate);
        CasoSucesso testCasoSucesso = casoSucessoList.get(casoSucessoList.size() - 1);
        assertThat(testCasoSucesso.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testCasoSucesso.getConfirmado()).isEqualTo(UPDATED_CONFIRMADO);
    }

    @Test
    @Transactional
    public void updateNonExistingCasoSucesso() throws Exception {
        int databaseSizeBeforeUpdate = casoSucessoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCasoSucessoMockMvc.perform(put("/api/caso-sucessos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(casoSucesso)))
            .andExpect(status().isBadRequest());

        // Validate the CasoSucesso in the database
        List<CasoSucesso> casoSucessoList = casoSucessoRepository.findAll();
        assertThat(casoSucessoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCasoSucesso() throws Exception {
        // Initialize the database
        casoSucessoRepository.saveAndFlush(casoSucesso);

        int databaseSizeBeforeDelete = casoSucessoRepository.findAll().size();

        // Delete the casoSucesso
        restCasoSucessoMockMvc.perform(delete("/api/caso-sucessos/{id}", casoSucesso.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CasoSucesso> casoSucessoList = casoSucessoRepository.findAll();
        assertThat(casoSucessoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
