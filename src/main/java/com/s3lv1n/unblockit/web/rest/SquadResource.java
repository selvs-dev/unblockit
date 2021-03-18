package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.domain.Squad;
import com.s3lv1n.unblockit.repository.SquadRepository;
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
 * REST controller for managing {@link com.s3lv1n.unblockit.domain.Squad}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SquadResource {

    private final Logger log = LoggerFactory.getLogger(SquadResource.class);

    private static final String ENTITY_NAME = "squad";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SquadRepository squadRepository;

    public SquadResource(SquadRepository squadRepository) {
        this.squadRepository = squadRepository;
    }

    /**
     * {@code POST  /squads} : Create a new squad.
     *
     * @param squad the squad to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new squad, or with status {@code 400 (Bad Request)} if the squad has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/squads")
    public ResponseEntity<Squad> createSquad(@RequestBody Squad squad) throws URISyntaxException {
        log.debug("REST request to save Squad : {}", squad);
        if (squad.getId() != null) {
            throw new BadRequestAlertException("A new squad cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Squad result = squadRepository.save(squad);
        return ResponseEntity.created(new URI("/api/squads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /squads} : Updates an existing squad.
     *
     * @param squad the squad to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated squad,
     * or with status {@code 400 (Bad Request)} if the squad is not valid,
     * or with status {@code 500 (Internal Server Error)} if the squad couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/squads")
    public ResponseEntity<Squad> updateSquad(@RequestBody Squad squad) throws URISyntaxException {
        log.debug("REST request to update Squad : {}", squad);
        if (squad.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Squad result = squadRepository.save(squad);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, squad.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /squads} : get all the squads.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of squads in body.
     */
    @GetMapping("/squads")
    public List<Squad> getAllSquads() {
        log.debug("REST request to get all Squads");
        return squadRepository.findAll();
    }

    /**
     * {@code GET  /squads/:id} : get the "id" squad.
     *
     * @param id the id of the squad to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the squad, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/squads/{id}")
    public ResponseEntity<Squad> getSquad(@PathVariable Long id) {
        log.debug("REST request to get Squad : {}", id);
        Optional<Squad> squad = squadRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(squad);
    }

    /**
     * {@code DELETE  /squads/:id} : delete the "id" squad.
     *
     * @param id the id of the squad to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/squads/{id}")
    public ResponseEntity<Void> deleteSquad(@PathVariable Long id) {
        log.debug("REST request to delete Squad : {}", id);
        squadRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
