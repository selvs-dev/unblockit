package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.domain.SquadMember;
import com.s3lv1n.unblockit.repository.SquadMemberRepository;
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
 * REST controller for managing {@link com.s3lv1n.unblockit.domain.SquadMember}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SquadMemberResource {

    private final Logger log = LoggerFactory.getLogger(SquadMemberResource.class);

    private static final String ENTITY_NAME = "squadMember";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SquadMemberRepository squadMemberRepository;

    public SquadMemberResource(SquadMemberRepository squadMemberRepository) {
        this.squadMemberRepository = squadMemberRepository;
    }

    /**
     * {@code POST  /squad-members} : Create a new squadMember.
     *
     * @param squadMember the squadMember to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new squadMember, or with status {@code 400 (Bad Request)} if the squadMember has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/squad-members")
    public ResponseEntity<SquadMember> createSquadMember(@RequestBody SquadMember squadMember) throws URISyntaxException {
        log.debug("REST request to save SquadMember : {}", squadMember);
        if (squadMember.getId() != null) {
            throw new BadRequestAlertException("A new squadMember cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SquadMember result = squadMemberRepository.save(squadMember);
        return ResponseEntity.created(new URI("/api/squad-members/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /squad-members} : Updates an existing squadMember.
     *
     * @param squadMember the squadMember to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated squadMember,
     * or with status {@code 400 (Bad Request)} if the squadMember is not valid,
     * or with status {@code 500 (Internal Server Error)} if the squadMember couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/squad-members")
    public ResponseEntity<SquadMember> updateSquadMember(@RequestBody SquadMember squadMember) throws URISyntaxException {
        log.debug("REST request to update SquadMember : {}", squadMember);
        if (squadMember.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SquadMember result = squadMemberRepository.save(squadMember);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, squadMember.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /squad-members} : get all the squadMembers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of squadMembers in body.
     */
    @GetMapping("/squad-members")
    public List<SquadMember> getAllSquadMembers() {
        log.debug("REST request to get all SquadMembers");
        return squadMemberRepository.findAll();
    }

    /**
     * {@code GET  /squad-members/:id} : get the "id" squadMember.
     *
     * @param id the id of the squadMember to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the squadMember, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/squad-members/{id}")
    public ResponseEntity<SquadMember> getSquadMember(@PathVariable Long id) {
        log.debug("REST request to get SquadMember : {}", id);
        Optional<SquadMember> squadMember = squadMemberRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(squadMember);
    }

    /**
     * {@code DELETE  /squad-members/:id} : delete the "id" squadMember.
     *
     * @param id the id of the squadMember to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/squad-members/{id}")
    public ResponseEntity<Void> deleteSquadMember(@PathVariable Long id) {
        log.debug("REST request to delete SquadMember : {}", id);
        squadMemberRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
