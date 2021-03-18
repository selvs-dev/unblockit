package com.s3lv1n.unblockit.config;

import io.github.jhipster.config.JHipsterProperties;
import io.github.jhipster.config.cache.PrefixedKeyGenerator;
import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {
    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.s3lv1n.unblockit.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.s3lv1n.unblockit.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.s3lv1n.unblockit.domain.User.class.getName());
            createCache(cm, com.s3lv1n.unblockit.domain.Authority.class.getName());
            createCache(cm, com.s3lv1n.unblockit.domain.User.class.getName() + ".authorities");
            createCache(cm, com.s3lv1n.unblockit.domain.Ciclo.class.getName());
            createCache(cm, com.s3lv1n.unblockit.domain.Ciclo.class.getName() + ".squads");
            createCache(cm, com.s3lv1n.unblockit.domain.Squad.class.getName());
            createCache(cm, com.s3lv1n.unblockit.domain.Squad.class.getName() + ".casoSucessos");
            createCache(cm, com.s3lv1n.unblockit.domain.Squad.class.getName() + ".depoimentos");
            createCache(cm, com.s3lv1n.unblockit.domain.Squad.class.getName() + ".feedbacks");
            createCache(cm, com.s3lv1n.unblockit.domain.Squad.class.getName() + ".tarefas");
            createCache(cm, com.s3lv1n.unblockit.domain.Squad.class.getName() + ".squadMembers");
            createCache(cm, com.s3lv1n.unblockit.domain.SquadMember.class.getName());
            createCache(cm, com.s3lv1n.unblockit.domain.SquadMember.class.getName() + ".feedbacks");
            createCache(cm, com.s3lv1n.unblockit.domain.Slot.class.getName());
            createCache(cm, com.s3lv1n.unblockit.domain.Slot.class.getName() + ".conteudos");
            createCache(cm, com.s3lv1n.unblockit.domain.Capability.class.getName());
            createCache(cm, com.s3lv1n.unblockit.domain.Capability.class.getName() + ".praticas");
            createCache(cm, com.s3lv1n.unblockit.domain.Conteudo.class.getName());
            createCache(cm, com.s3lv1n.unblockit.domain.Pratica.class.getName());
            createCache(cm, com.s3lv1n.unblockit.domain.Spec.class.getName());
            createCache(cm, com.s3lv1n.unblockit.domain.CasoSucesso.class.getName());
            createCache(cm, com.s3lv1n.unblockit.domain.Depoimento.class.getName());
            createCache(cm, com.s3lv1n.unblockit.domain.Feedback.class.getName());
            createCache(cm, com.s3lv1n.unblockit.domain.Tarefa.class.getName());
            createCache(cm, com.s3lv1n.unblockit.domain.Tarefa.class.getName() + ".andamentos");
            createCache(cm, com.s3lv1n.unblockit.domain.Andamento.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
