package com.s3lv1n.unblockit.repository;

import com.s3lv1n.unblockit.domain.Conteudo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Conteudo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConteudoRepository extends JpaRepository<Conteudo, Long> {
}
