package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.UnblockItApp;
import com.s3lv1n.unblockit.domain.Capability;
import com.s3lv1n.unblockit.repository.CapabilityRepository;

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
 * Integration tests for the {@link CapabilityResource} REST controller.
 */
@SpringBootTest(classes = UnblockItApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CapabilityResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private CapabilityRepository capabilityRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCapabilityMockMvc;

    private Capability capability;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Capability createEntity(EntityManager em) {
        Capability capability = new Capability()
            .nome(DEFAULT_NOME);
        return capability;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Capability createUpdatedEntity(EntityManager em) {
        Capability capability = new Capability()
            .nome(UPDATED_NOME);
        return capability;
    }

    @BeforeEach
    public void initTest() {
        capability = createEntity(em);
    }

    @Test
    @Transactional
    public void createCapability() throws Exception {
        int databaseSizeBeforeCreate = capabilityRepository.findAll().size();
        // Create the Capability
        restCapabilityMockMvc.perform(post("/api/capabilities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(capability)))
            .andExpect(status().isCreated());

        // Validate the Capability in the database
        List<Capability> capabilityList = capabilityRepository.findAll();
        assertThat(capabilityList).hasSize(databaseSizeBeforeCreate + 1);
        Capability testCapability = capabilityList.get(capabilityList.size() - 1);
        assertThat(testCapability.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createCapabilityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = capabilityRepository.findAll().size();

        // Create the Capability with an existing ID
        capability.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCapabilityMockMvc.perform(post("/api/capabilities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(capability)))
            .andExpect(status().isBadRequest());

        // Validate the Capability in the database
        List<Capability> capabilityList = capabilityRepository.findAll();
        assertThat(capabilityList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCapabilities() throws Exception {
        // Initialize the database
        capabilityRepository.saveAndFlush(capability);

        // Get all the capabilityList
        restCapabilityMockMvc.perform(get("/api/capabilities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(capability.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getCapability() throws Exception {
        // Initialize the database
        capabilityRepository.saveAndFlush(capability);

        // Get the capability
        restCapabilityMockMvc.perform(get("/api/capabilities/{id}", capability.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(capability.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingCapability() throws Exception {
        // Get the capability
        restCapabilityMockMvc.perform(get("/api/capabilities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCapability() throws Exception {
        // Initialize the database
        capabilityRepository.saveAndFlush(capability);

        int databaseSizeBeforeUpdate = capabilityRepository.findAll().size();

        // Update the capability
        Capability updatedCapability = capabilityRepository.findById(capability.getId()).get();
        // Disconnect from session so that the updates on updatedCapability are not directly saved in db
        em.detach(updatedCapability);
        updatedCapability
            .nome(UPDATED_NOME);

        restCapabilityMockMvc.perform(put("/api/capabilities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCapability)))
            .andExpect(status().isOk());

        // Validate the Capability in the database
        List<Capability> capabilityList = capabilityRepository.findAll();
        assertThat(capabilityList).hasSize(databaseSizeBeforeUpdate);
        Capability testCapability = capabilityList.get(capabilityList.size() - 1);
        assertThat(testCapability.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingCapability() throws Exception {
        int databaseSizeBeforeUpdate = capabilityRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCapabilityMockMvc.perform(put("/api/capabilities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(capability)))
            .andExpect(status().isBadRequest());

        // Validate the Capability in the database
        List<Capability> capabilityList = capabilityRepository.findAll();
        assertThat(capabilityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCapability() throws Exception {
        // Initialize the database
        capabilityRepository.saveAndFlush(capability);

        int databaseSizeBeforeDelete = capabilityRepository.findAll().size();

        // Delete the capability
        restCapabilityMockMvc.perform(delete("/api/capabilities/{id}", capability.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Capability> capabilityList = capabilityRepository.findAll();
        assertThat(capabilityList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
