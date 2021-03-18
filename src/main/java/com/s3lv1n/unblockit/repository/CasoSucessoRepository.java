package com.s3lv1n.unblockit.repository;

import com.s3lv1n.unblockit.domain.CasoSucesso;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CasoSucesso entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CasoSucessoRepository extends JpaRepository<CasoSucesso, Long> {
}
