package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.UnblockItApp;
import com.s3lv1n.unblockit.domain.Andamento;
import com.s3lv1n.unblockit.repository.AndamentoRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AndamentoResource} REST controller.
 */
@SpringBootTest(classes = UnblockItApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AndamentoResourceIT {

    private static final LocalDate DEFAULT_DATA_ANDAMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_ANDAMENTO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private AndamentoRepository andamentoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAndamentoMockMvc;

    private Andamento andamento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Andamento createEntity(EntityManager em) {
        Andamento andamento = new Andamento()
            .dataAndamento(DEFAULT_DATA_ANDAMENTO)
            .descricao(DEFAULT_DESCRICAO);
        return andamento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Andamento createUpdatedEntity(EntityManager em) {
        Andamento andamento = new Andamento()
            .dataAndamento(UPDATED_DATA_ANDAMENTO)
            .descricao(UPDATED_DESCRICAO);
        return andamento;
    }

    @BeforeEach
    public void initTest() {
        andamento = createEntity(em);
    }

    @Test
    @Transactional
    public void createAndamento() throws Exception {
        int databaseSizeBeforeCreate = andamentoRepository.findAll().size();
        // Create the Andamento
        restAndamentoMockMvc.perform(post("/api/andamentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(andamento)))
            .andExpect(status().isCreated());

        // Validate the Andamento in the database
        List<Andamento> andamentoList = andamentoRepository.findAll();
        assertThat(andamentoList).hasSize(databaseSizeBeforeCreate + 1);
        Andamento testAndamento = andamentoList.get(andamentoList.size() - 1);
        assertThat(testAndamento.getDataAndamento()).isEqualTo(DEFAULT_DATA_ANDAMENTO);
        assertThat(testAndamento.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    public void createAndamentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = andamentoRepository.findAll().size();

        // Create the Andamento with an existing ID
        andamento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAndamentoMockMvc.perform(post("/api/andamentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(andamento)))
            .andExpect(status().isBadRequest());

        // Validate the Andamento in the database
        List<Andamento> andamentoList = andamentoRepository.findAll();
        assertThat(andamentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAndamentos() throws Exception {
        // Initialize the database
        andamentoRepository.saveAndFlush(andamento);

        // Get all the andamentoList
        restAndamentoMockMvc.perform(get("/api/andamentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(andamento.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataAndamento").value(hasItem(DEFAULT_DATA_ANDAMENTO.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }
    
    @Test
    @Transactional
    public void getAndamento() throws Exception {
        // Initialize the database
        andamentoRepository.saveAndFlush(andamento);

        // Get the andamento
        restAndamentoMockMvc.perform(get("/api/andamentos/{id}", andamento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(andamento.getId().intValue()))
            .andExpect(jsonPath("$.dataAndamento").value(DEFAULT_DATA_ANDAMENTO.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }
    @Test
    @Transactional
    public void getNonExistingAndamento() throws Exception {
        // Get the andamento
        restAndamentoMockMvc.perform(get("/api/andamentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAndamento() throws Exception {
        // Initialize the database
        andamentoRepository.saveAndFlush(andamento);

        int databaseSizeBeforeUpdate = andamentoRepository.findAll().size();

        // Update the andamento
        Andamento updatedAndamento = andamentoRepository.findById(andamento.getId()).get();
        // Disconnect from session so that the updates on updatedAndamento are not directly saved in db
        em.detach(updatedAndamento);
        updatedAndamento
            .dataAndamento(UPDATED_DATA_ANDAMENTO)
            .descricao(UPDATED_DESCRICAO);

        restAndamentoMockMvc.perform(put("/api/andamentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAndamento)))
            .andExpect(status().isOk());

        // Validate the Andamento in the database
        List<Andamento> andamentoList = andamentoRepository.findAll();
        assertThat(andamentoList).hasSize(databaseSizeBeforeUpdate);
        Andamento testAndamento = andamentoList.get(andamentoList.size() - 1);
        assertThat(testAndamento.getDataAndamento()).isEqualTo(UPDATED_DATA_ANDAMENTO);
        assertThat(testAndamento.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    public void updateNonExistingAndamento() throws Exception {
        int databaseSizeBeforeUpdate = andamentoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAndamentoMockMvc.perform(put("/api/andamentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(andamento)))
            .andExpect(status().isBadRequest());

        // Validate the Andamento in the database
        List<Andamento> andamentoList = andamentoRepository.findAll();
        assertThat(andamentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAndamento() throws Exception {
        // Initialize the database
        andamentoRepository.saveAndFlush(andamento);

        int databaseSizeBeforeDelete = andamentoRepository.findAll().size();

        // Delete the andamento
        restAndamentoMockMvc.perform(delete("/api/andamentos/{id}", andamento.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Andamento> andamentoList = andamentoRepository.findAll();
        assertThat(andamentoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
