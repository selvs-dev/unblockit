package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.domain.Ciclo;
import com.s3lv1n.unblockit.repository.CicloRepository;
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
 * REST controller for managing {@link com.s3lv1n.unblockit.domain.Ciclo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CicloResource {

    private final Logger log = LoggerFactory.getLogger(CicloResource.class);

    private static final String ENTITY_NAME = "ciclo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CicloRepository cicloRepository;

    public CicloResource(CicloRepository cicloRepository) {
        this.cicloRepository = cicloRepository;
    }

    /**
     * {@code POST  /ciclos} : Create a new ciclo.
     *
     * @param ciclo the ciclo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ciclo, or with status {@code 400 (Bad Request)} if the ciclo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ciclos")
    public ResponseEntity<Ciclo> createCiclo(@RequestBody Ciclo ciclo) throws URISyntaxException {
        log.debug("REST request to save Ciclo : {}", ciclo);
        if (ciclo.getId() != null) {
            throw new BadRequestAlertException("A new ciclo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ciclo result = cicloRepository.save(ciclo);
        return ResponseEntity.created(new URI("/api/ciclos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ciclos} : Updates an existing ciclo.
     *
     * @param ciclo the ciclo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ciclo,
     * or with status {@code 400 (Bad Request)} if the ciclo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ciclo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ciclos")
    public ResponseEntity<Ciclo> updateCiclo(@RequestBody Ciclo ciclo) throws URISyntaxException {
        log.debug("REST request to update Ciclo : {}", ciclo);
        if (ciclo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ciclo result = cicloRepository.save(ciclo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ciclo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ciclos} : get all the ciclos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ciclos in body.
     */
    @GetMapping("/ciclos")
    public List<Ciclo> getAllCiclos() {
        log.debug("REST request to get all Ciclos");
        return cicloRepository.findAll();
    }

    /**
     * {@code GET  /ciclos/:id} : get the "id" ciclo.
     *
     * @param id the id of the ciclo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ciclo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ciclos/{id}")
    public ResponseEntity<Ciclo> getCiclo(@PathVariable Long id) {
        log.debug("REST request to get Ciclo : {}", id);
        Optional<Ciclo> ciclo = cicloRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ciclo);
    }

    /**
     * {@code DELETE  /ciclos/:id} : delete the "id" ciclo.
     *
     * @param id the id of the ciclo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ciclos/{id}")
    public ResponseEntity<Void> deleteCiclo(@PathVariable Long id) {
        log.debug("REST request to delete Ciclo : {}", id);
        cicloRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
