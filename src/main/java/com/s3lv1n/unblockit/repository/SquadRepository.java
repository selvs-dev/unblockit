package com.s3lv1n.unblockit.repository;

import com.s3lv1n.unblockit.domain.Squad;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Squad entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SquadRepository extends JpaRepository<Squad, Long> {
}
