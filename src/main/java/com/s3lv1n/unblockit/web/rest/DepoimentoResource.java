package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.domain.Depoimento;
import com.s3lv1n.unblockit.repository.DepoimentoRepository;
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
 * REST controller for managing {@link com.s3lv1n.unblockit.domain.Depoimento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DepoimentoResource {

    private final Logger log = LoggerFactory.getLogger(DepoimentoResource.class);

    private static final String ENTITY_NAME = "depoimento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DepoimentoRepository depoimentoRepository;

    public DepoimentoResource(DepoimentoRepository depoimentoRepository) {
        this.depoimentoRepository = depoimentoRepository;
    }

    /**
     * {@code POST  /depoimentos} : Create a new depoimento.
     *
     * @param depoimento the depoimento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new depoimento, or with status {@code 400 (Bad Request)} if the depoimento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/depoimentos")
    public ResponseEntity<Depoimento> createDepoimento(@RequestBody Depoimento depoimento) throws URISyntaxException {
        log.debug("REST request to save Depoimento : {}", depoimento);
        if (depoimento.getId() != null) {
            throw new BadRequestAlertException("A new depoimento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Depoimento result = depoimentoRepository.save(depoimento);
        return ResponseEntity.created(new URI("/api/depoimentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /depoimentos} : Updates an existing depoimento.
     *
     * @param depoimento the depoimento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated depoimento,
     * or with status {@code 400 (Bad Request)} if the depoimento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the depoimento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/depoimentos")
    public ResponseEntity<Depoimento> updateDepoimento(@RequestBody Depoimento depoimento) throws URISyntaxException {
        log.debug("REST request to update Depoimento : {}", depoimento);
        if (depoimento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Depoimento result = depoimentoRepository.save(depoimento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, depoimento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /depoimentos} : get all the depoimentos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of depoimentos in body.
     */
    @GetMapping("/depoimentos")
    public List<Depoimento> getAllDepoimentos() {
        log.debug("REST request to get all Depoimentos");
        return depoimentoRepository.findAll();
    }

    /**
     * {@code GET  /depoimentos/:id} : get the "id" depoimento.
     *
     * @param id the id of the depoimento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the depoimento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/depoimentos/{id}")
    public ResponseEntity<Depoimento> getDepoimento(@PathVariable Long id) {
        log.debug("REST request to get Depoimento : {}", id);
        Optional<Depoimento> depoimento = depoimentoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(depoimento);
    }

    /**
     * {@code DELETE  /depoimentos/:id} : delete the "id" depoimento.
     *
     * @param id the id of the depoimento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/depoimentos/{id}")
    public ResponseEntity<Void> deleteDepoimento(@PathVariable Long id) {
        log.debug("REST request to delete Depoimento : {}", id);
        depoimentoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
