package com.s3lv1n.unblockit.web.rest;

import com.s3lv1n.unblockit.domain.CasoSucesso;
import com.s3lv1n.unblockit.repository.CasoSucessoRepository;
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
 * REST controller for managing {@link com.s3lv1n.unblockit.domain.CasoSucesso}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CasoSucessoResource {

    private final Logger log = LoggerFactory.getLogger(CasoSucessoResource.class);

    private static final String ENTITY_NAME = "casoSucesso";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CasoSucessoRepository casoSucessoRepository;

    public CasoSucessoResource(CasoSucessoRepository casoSucessoRepository) {
        this.casoSucessoRepository = casoSucessoRepository;
    }

    /**
     * {@code POST  /caso-sucessos} : Create a new casoSucesso.
     *
     * @param casoSucesso the casoSucesso to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new casoSucesso, or with status {@code 400 (Bad Request)} if the casoSucesso has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/caso-sucessos")
    public ResponseEntity<CasoSucesso> createCasoSucesso(@RequestBody CasoSucesso casoSucesso) throws URISyntaxException {
        log.debug("REST request to save CasoSucesso : {}", casoSucesso);
        if (casoSucesso.getId() != null) {
            throw new BadRequestAlertException("A new casoSucesso cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CasoSucesso result = casoSucessoRepository.save(casoSucesso);
        return ResponseEntity.created(new URI("/api/caso-sucessos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /caso-sucessos} : Updates an existing casoSucesso.
     *
     * @param casoSucesso the casoSucesso to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated casoSucesso,
     * or with status {@code 400 (Bad Request)} if the casoSucesso is not valid,
     * or with status {@code 500 (Internal Server Error)} if the casoSucesso couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/caso-sucessos")
    public ResponseEntity<CasoSucesso> updateCasoSucesso(@RequestBody CasoSucesso casoSucesso) throws URISyntaxException {
        log.debug("REST request to update CasoSucesso : {}", casoSucesso);
        if (casoSucesso.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CasoSucesso result = casoSucessoRepository.save(casoSucesso);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, casoSucesso.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /caso-sucessos} : get all the casoSucessos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of casoSucessos in body.
     */
    @GetMapping("/caso-sucessos")
    public List<CasoSucesso> getAllCasoSucessos() {
        log.debug("REST request to get all CasoSucessos");
        return casoSucessoRepository.findAll();
    }

    /**
     * {@code GET  /caso-sucessos/:id} : get the "id" casoSucesso.
     *
     * @param id the id of the casoSucesso to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the casoSucesso, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/caso-sucessos/{id}")
    public ResponseEntity<CasoSucesso> getCasoSucesso(@PathVariable Long id) {
        log.debug("REST request to get CasoSucesso : {}", id);
        Optional<CasoSucesso> casoSucesso = casoSucessoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(casoSucesso);
    }

    /**
     * {@code DELETE  /caso-sucessos/:id} : delete the "id" casoSucesso.
     *
     * @param id the id of the casoSucesso to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/caso-sucessos/{id}")
    public ResponseEntity<Void> deleteCasoSucesso(@PathVariable Long id) {
        log.debug("REST request to delete CasoSucesso : {}", id);
        casoSucessoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
