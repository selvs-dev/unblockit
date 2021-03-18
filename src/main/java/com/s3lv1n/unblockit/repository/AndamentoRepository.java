package com.s3lv1n.unblockit.repository;

import com.s3lv1n.unblockit.domain.Andamento;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Andamento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AndamentoRepository extends JpaRepository<Andamento, Long> {
}
