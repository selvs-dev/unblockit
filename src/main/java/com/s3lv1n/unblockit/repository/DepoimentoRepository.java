package com.s3lv1n.unblockit.repository;

import com.s3lv1n.unblockit.domain.Depoimento;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Depoimento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DepoimentoRepository extends JpaRepository<Depoimento, Long> {
}
