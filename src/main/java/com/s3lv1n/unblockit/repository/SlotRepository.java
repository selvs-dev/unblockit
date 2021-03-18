package com.s3lv1n.unblockit.repository;

import com.s3lv1n.unblockit.domain.Slot;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Slot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SlotRepository extends JpaRepository<Slot, Long> {
}
