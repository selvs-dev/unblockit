package com.s3lv1n.unblockit.repository;

import com.s3lv1n.unblockit.domain.Spec;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Spec entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpecRepository extends JpaRepository<Spec, Long> {
}
