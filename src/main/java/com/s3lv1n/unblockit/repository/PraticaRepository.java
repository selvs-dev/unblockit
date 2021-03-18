package com.s3lv1n.unblockit.repository;

import com.s3lv1n.unblockit.domain.Pratica;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Pratica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PraticaRepository extends JpaRepository<Pratica, Long> {
}
