package com.s3lv1n.unblockit.repository;

import com.s3lv1n.unblockit.domain.Ciclo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Ciclo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CicloRepository extends JpaRepository<Ciclo, Long> {
}
