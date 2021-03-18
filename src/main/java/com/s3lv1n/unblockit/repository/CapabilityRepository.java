package com.s3lv1n.unblockit.repository;

import com.s3lv1n.unblockit.domain.Capability;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Capability entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CapabilityRepository extends JpaRepository<Capability, Long> {
}
