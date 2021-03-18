package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.domain.Pratica;
import com.s3lv1n.unblockit.repository.PraticaRepository;
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
 * REST controller for managing {@link com.s3lv1n.unblockit.domain.Pratica}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PraticaResource {

    private final Logger log = LoggerFactory.getLogger(PraticaResource.class);

    private static final String ENTITY_NAME = "pratica";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PraticaRepository praticaRepository;

    public PraticaResource(PraticaRepository praticaRepository) {
        this.praticaRepository = praticaRepository;
    }

    /**
     * {@code POST  /praticas} : Create a new pratica.
     *
     * @param pratica the pratica to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pratica, or with status {@code 400 (Bad Request)} if the pratica has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/praticas")
    public ResponseEntity<Pratica> createPratica(@RequestBody Pratica pratica) throws URISyntaxException {
        log.debug("REST request to save Pratica : {}", pratica);
        if (pratica.getId() != null) {
            throw new BadRequestAlertException("A new pratica cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pratica result = praticaRepository.save(pratica);
        return ResponseEntity.created(new URI("/api/praticas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /praticas} : Updates an existing pratica.
     *
     * @param pratica the pratica to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pratica,
     * or with status {@code 400 (Bad Request)} if the pratica is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pratica couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/praticas")
    public ResponseEntity<Pratica> updatePratica(@RequestBody Pratica pratica) throws URISyntaxException {
        log.debug("REST request to update Pratica : {}", pratica);
        if (pratica.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Pratica result = praticaRepository.save(pratica);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pratica.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /praticas} : get all the praticas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of praticas in body.
     */
    @GetMapping("/praticas")
    public List<Pratica> getAllPraticas() {
        log.debug("REST request to get all Praticas");
        return praticaRepository.findAll();
    }

    /**
     * {@code GET  /praticas/:id} : get the "id" pratica.
     *
     * @param id the id of the pratica to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pratica, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/praticas/{id}")
    public ResponseEntity<Pratica> getPratica(@PathVariable Long id) {
        log.debug("REST request to get Pratica : {}", id);
        Optional<Pratica> pratica = praticaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pratica);
    }

    /**
     * {@code DELETE  /praticas/:id} : delete the "id" pratica.
     *
     * @param id the id of the pratica to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/praticas/{id}")
    public ResponseEntity<Void> deletePratica(@PathVariable Long id) {
        log.debug("REST request to delete Pratica : {}", id);
        praticaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
