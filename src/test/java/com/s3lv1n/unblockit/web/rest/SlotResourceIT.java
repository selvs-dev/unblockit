package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.UnblockItApp;
import com.s3lv1n.unblockit.domain.Slot;
import com.s3lv1n.unblockit.repository.SlotRepository;

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
 * Integration tests for the {@link SlotResource} REST controller.
 */
@SpringBootTest(classes = UnblockItApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SlotResourceIT {

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_OBS = "AAAAAAAAAA";
    private static final String UPDATED_OBS = "BBBBBBBBBB";

    private static final Boolean DEFAULT_CONFIRMADO = false;
    private static final Boolean UPDATED_CONFIRMADO = true;

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSlotMockMvc;

    private Slot slot;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Slot createEntity(EntityManager em) {
        Slot slot = new Slot()
            .data(DEFAULT_DATA)
            .obs(DEFAULT_OBS)
            .confirmado(DEFAULT_CONFIRMADO);
        return slot;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Slot createUpdatedEntity(EntityManager em) {
        Slot slot = new Slot()
            .data(UPDATED_DATA)
            .obs(UPDATED_OBS)
            .confirmado(UPDATED_CONFIRMADO);
        return slot;
    }

    @BeforeEach
    public void initTest() {
        slot = createEntity(em);
    }

    @Test
    @Transactional
    public void createSlot() throws Exception {
        int databaseSizeBeforeCreate = slotRepository.findAll().size();
        // Create the Slot
        restSlotMockMvc.perform(post("/api/slots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(slot)))
            .andExpect(status().isCreated());

        // Validate the Slot in the database
        List<Slot> slotList = slotRepository.findAll();
        assertThat(slotList).hasSize(databaseSizeBeforeCreate + 1);
        Slot testSlot = slotList.get(slotList.size() - 1);
        assertThat(testSlot.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testSlot.getObs()).isEqualTo(DEFAULT_OBS);
        assertThat(testSlot.isConfirmado()).isEqualTo(DEFAULT_CONFIRMADO);
    }

    @Test
    @Transactional
    public void createSlotWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = slotRepository.findAll().size();

        // Create the Slot with an existing ID
        slot.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSlotMockMvc.perform(post("/api/slots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(slot)))
            .andExpect(status().isBadRequest());

        // Validate the Slot in the database
        List<Slot> slotList = slotRepository.findAll();
        assertThat(slotList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSlots() throws Exception {
        // Initialize the database
        slotRepository.saveAndFlush(slot);

        // Get all the slotList
        restSlotMockMvc.perform(get("/api/slots?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(slot.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].obs").value(hasItem(DEFAULT_OBS)))
            .andExpect(jsonPath("$.[*].confirmado").value(hasItem(DEFAULT_CONFIRMADO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getSlot() throws Exception {
        // Initialize the database
        slotRepository.saveAndFlush(slot);

        // Get the slot
        restSlotMockMvc.perform(get("/api/slots/{id}", slot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(slot.getId().intValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.obs").value(DEFAULT_OBS))
            .andExpect(jsonPath("$.confirmado").value(DEFAULT_CONFIRMADO.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingSlot() throws Exception {
        // Get the slot
        restSlotMockMvc.perform(get("/api/slots/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSlot() throws Exception {
        // Initialize the database
        slotRepository.saveAndFlush(slot);

        int databaseSizeBeforeUpdate = slotRepository.findAll().size();

        // Update the slot
        Slot updatedSlot = slotRepository.findById(slot.getId()).get();
        // Disconnect from session so that the updates on updatedSlot are not directly saved in db
        em.detach(updatedSlot);
        updatedSlot
            .data(UPDATED_DATA)
            .obs(UPDATED_OBS)
            .confirmado(UPDATED_CONFIRMADO);

        restSlotMockMvc.perform(put("/api/slots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSlot)))
            .andExpect(status().isOk());

        // Validate the Slot in the database
        List<Slot> slotList = slotRepository.findAll();
        assertThat(slotList).hasSize(databaseSizeBeforeUpdate);
        Slot testSlot = slotList.get(slotList.size() - 1);
        assertThat(testSlot.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testSlot.getObs()).isEqualTo(UPDATED_OBS);
        assertThat(testSlot.isConfirmado()).isEqualTo(UPDATED_CONFIRMADO);
    }

    @Test
    @Transactional
    public void updateNonExistingSlot() throws Exception {
        int databaseSizeBeforeUpdate = slotRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSlotMockMvc.perform(put("/api/slots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(slot)))
            .andExpect(status().isBadRequest());

        // Validate the Slot in the database
        List<Slot> slotList = slotRepository.findAll();
        assertThat(slotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSlot() throws Exception {
        // Initialize the database
        slotRepository.saveAndFlush(slot);

        int databaseSizeBeforeDelete = slotRepository.findAll().size();

        // Delete the slot
        restSlotMockMvc.perform(delete("/api/slots/{id}", slot.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Slot> slotList = slotRepository.findAll();
        assertThat(slotList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
