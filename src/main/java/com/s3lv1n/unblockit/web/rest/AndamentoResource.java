package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.domain.Andamento;
import com.s3lv1n.unblockit.repository.AndamentoRepository;
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
 * REST controller for managing {@link com.s3lv1n.unblockit.domain.Andamento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AndamentoResource {

    private final Logger log = LoggerFactory.getLogger(AndamentoResource.class);

    private static final String ENTITY_NAME = "andamento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AndamentoRepository andamentoRepository;

    public AndamentoResource(AndamentoRepository andamentoRepository) {
        this.andamentoRepository = andamentoRepository;
    }

    /**
     * {@code POST  /andamentos} : Create a new andamento.
     *
     * @param andamento the andamento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new andamento, or with status {@code 400 (Bad Request)} if the andamento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/andamentos")
    public ResponseEntity<Andamento> createAndamento(@RequestBody Andamento andamento) throws URISyntaxException {
        log.debug("REST request to save Andamento : {}", andamento);
        if (andamento.getId() != null) {
            throw new BadRequestAlertException("A new andamento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Andamento result = andamentoRepository.save(andamento);
        return ResponseEntity.created(new URI("/api/andamentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /andamentos} : Updates an existing andamento.
     *
     * @param andamento the andamento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated andamento,
     * or with status {@code 400 (Bad Request)} if the andamento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the andamento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/andamentos")
    public ResponseEntity<Andamento> updateAndamento(@RequestBody Andamento andamento) throws URISyntaxException {
        log.debug("REST request to update Andamento : {}", andamento);
        if (andamento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Andamento result = andamentoRepository.save(andamento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, andamento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /andamentos} : get all the andamentos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of andamentos in body.
     */
    @GetMapping("/andamentos")
    public List<Andamento> getAllAndamentos() {
        log.debug("REST request to get all Andamentos");
        return andamentoRepository.findAll();
    }

    /**
     * {@code GET  /andamentos/:id} : get the "id" andamento.
     *
     * @param id the id of the andamento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the andamento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/andamentos/{id}")
    public ResponseEntity<Andamento> getAndamento(@PathVariable Long id) {
        log.debug("REST request to get Andamento : {}", id);
        Optional<Andamento> andamento = andamentoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(andamento);
    }

    /**
     * {@code DELETE  /andamentos/:id} : delete the "id" andamento.
     *
     * @param id the id of the andamento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/andamentos/{id}")
    public ResponseEntity<Void> deleteAndamento(@PathVariable Long id) {
        log.debug("REST request to delete Andamento : {}", id);
        andamentoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
