package com.s3lv1n.unblockit.repository;

import com.s3lv1n.unblockit.domain.SquadMember;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SquadMember entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SquadMemberRepository extends JpaRepository<SquadMember, Long> {
}
