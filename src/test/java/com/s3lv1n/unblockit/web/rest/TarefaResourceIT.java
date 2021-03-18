package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.UnblockItApp;
import com.s3lv1n.unblockit.domain.Tarefa;
import com.s3lv1n.unblockit.repository.TarefaRepository;

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
 * Integration tests for the {@link TarefaResource} REST controller.
 */
@SpringBootTest(classes = UnblockItApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TarefaResourceIT {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATA_LIMITE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_LIMITE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CONCLUIDA = "AAAAAAAAAA";
    private static final String UPDATED_CONCLUIDA = "BBBBBBBBBB";

    @Autowired
    private TarefaRepository tarefaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTarefaMockMvc;

    private Tarefa tarefa;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tarefa createEntity(EntityManager em) {
        Tarefa tarefa = new Tarefa()
            .descricao(DEFAULT_DESCRICAO)
            .dataLimite(DEFAULT_DATA_LIMITE)
            .concluida(DEFAULT_CONCLUIDA);
        return tarefa;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tarefa createUpdatedEntity(EntityManager em) {
        Tarefa tarefa = new Tarefa()
            .descricao(UPDATED_DESCRICAO)
            .dataLimite(UPDATED_DATA_LIMITE)
            .concluida(UPDATED_CONCLUIDA);
        return tarefa;
    }

    @BeforeEach
    public void initTest() {
        tarefa = createEntity(em);
    }

    @Test
    @Transactional
    public void createTarefa() throws Exception {
        int databaseSizeBeforeCreate = tarefaRepository.findAll().size();
        // Create the Tarefa
        restTarefaMockMvc.perform(post("/api/tarefas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tarefa)))
            .andExpect(status().isCreated());

        // Validate the Tarefa in the database
        List<Tarefa> tarefaList = tarefaRepository.findAll();
        assertThat(tarefaList).hasSize(databaseSizeBeforeCreate + 1);
        Tarefa testTarefa = tarefaList.get(tarefaList.size() - 1);
        assertThat(testTarefa.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testTarefa.getDataLimite()).isEqualTo(DEFAULT_DATA_LIMITE);
        assertThat(testTarefa.getConcluida()).isEqualTo(DEFAULT_CONCLUIDA);
    }

    @Test
    @Transactional
    public void createTarefaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tarefaRepository.findAll().size();

        // Create the Tarefa with an existing ID
        tarefa.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTarefaMockMvc.perform(post("/api/tarefas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tarefa)))
            .andExpect(status().isBadRequest());

        // Validate the Tarefa in the database
        List<Tarefa> tarefaList = tarefaRepository.findAll();
        assertThat(tarefaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTarefas() throws Exception {
        // Initialize the database
        tarefaRepository.saveAndFlush(tarefa);

        // Get all the tarefaList
        restTarefaMockMvc.perform(get("/api/tarefas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tarefa.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].dataLimite").value(hasItem(DEFAULT_DATA_LIMITE.toString())))
            .andExpect(jsonPath("$.[*].concluida").value(hasItem(DEFAULT_CONCLUIDA)));
    }
    
    @Test
    @Transactional
    public void getTarefa() throws Exception {
        // Initialize the database
        tarefaRepository.saveAndFlush(tarefa);

        // Get the tarefa
        restTarefaMockMvc.perform(get("/api/tarefas/{id}", tarefa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tarefa.getId().intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.dataLimite").value(DEFAULT_DATA_LIMITE.toString()))
            .andExpect(jsonPath("$.concluida").value(DEFAULT_CONCLUIDA));
    }
    @Test
    @Transactional
    public void getNonExistingTarefa() throws Exception {
        // Get the tarefa
        restTarefaMockMvc.perform(get("/api/tarefas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTarefa() throws Exception {
        // Initialize the database
        tarefaRepository.saveAndFlush(tarefa);

        int databaseSizeBeforeUpdate = tarefaRepository.findAll().size();

        // Update the tarefa
        Tarefa updatedTarefa = tarefaRepository.findById(tarefa.getId()).get();
        // Disconnect from session so that the updates on updatedTarefa are not directly saved in db
        em.detach(updatedTarefa);
        updatedTarefa
            .descricao(UPDATED_DESCRICAO)
            .dataLimite(UPDATED_DATA_LIMITE)
            .concluida(UPDATED_CONCLUIDA);

        restTarefaMockMvc.perform(put("/api/tarefas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTarefa)))
            .andExpect(status().isOk());

        // Validate the Tarefa in the database
        List<Tarefa> tarefaList = tarefaRepository.findAll();
        assertThat(tarefaList).hasSize(databaseSizeBeforeUpdate);
        Tarefa testTarefa = tarefaList.get(tarefaList.size() - 1);
        assertThat(testTarefa.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testTarefa.getDataLimite()).isEqualTo(UPDATED_DATA_LIMITE);
        assertThat(testTarefa.getConcluida()).isEqualTo(UPDATED_CONCLUIDA);
    }

    @Test
    @Transactional
    public void updateNonExistingTarefa() throws Exception {
        int databaseSizeBeforeUpdate = tarefaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTarefaMockMvc.perform(put("/api/tarefas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tarefa)))
            .andExpect(status().isBadRequest());

        // Validate the Tarefa in the database
        List<Tarefa> tarefaList = tarefaRepository.findAll();
        assertThat(tarefaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTarefa() throws Exception {
        // Initialize the database
        tarefaRepository.saveAndFlush(tarefa);

        int databaseSizeBeforeDelete = tarefaRepository.findAll().size();

        // Delete the tarefa
        restTarefaMockMvc.perform(delete("/api/tarefas/{id}", tarefa.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Tarefa> tarefaList = tarefaRepository.findAll();
        assertThat(tarefaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
