package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.domain.Slot;
import com.s3lv1n.unblockit.repository.SlotRepository;
import com.s3lv1n.unblockit.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.s3lv1n.unblockit.domain.Slot}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SlotResource {

    private final Logger log = LoggerFactory.getLogger(SlotResource.class);

    private static final String ENTITY_NAME = "slot";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SlotRepository slotRepository;

    public SlotResource(SlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    /**
     * {@code POST  /slots} : Create a new slot.
     *
     * @param slot the slot to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new slot, or with status {@code 400 (Bad Request)} if the slot has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/slots")
    public ResponseEntity<Slot> createSlot(@RequestBody Slot slot) throws URISyntaxException {
        log.debug("REST request to save Slot : {}", slot);
        if (slot.getId() != null) {
            throw new BadRequestAlertException("A new slot cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Slot result = slotRepository.save(slot);
        return ResponseEntity.created(new URI("/api/slots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /slots} : Updates an existing slot.
     *
     * @param slot the slot to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated slot,
     * or with status {@code 400 (Bad Request)} if the slot is not valid,
     * or with status {@code 500 (Internal Server Error)} if the slot couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/slots")
    public ResponseEntity<Slot> updateSlot(@RequestBody Slot slot) throws URISyntaxException {
        log.debug("REST request to update Slot : {}", slot);
        if (slot.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Slot result = slotRepository.save(slot);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, slot.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /slots} : get all the slots.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of slots in body.
     */
    @GetMapping("/slots")
    public List<Slot> getAllSlots() {
        log.debug("REST request to get all Slots");
        return slotRepository.findAll();
    }

    /**
     * {@code GET  /slots/:id} : get the "id" slot.
     *
     * @param id the id of the slot to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the slot, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/slots/{id}")
    public ResponseEntity<Slot> getSlot(@PathVariable Long id) {
        log.debug("REST request to get Slot : {}", id);
        Optional<Slot> slot = slotRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(slot);
    }

    /**
     * {@code DELETE  /slots/:id} : delete the "id" slot.
     *
     * @param id the id of the slot to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/slots/{id}")
    public ResponseEntity<Void> deleteSlot(@PathVariable Long id) {
        log.debug("REST request to delete Slot : {}", id);
        slotRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
