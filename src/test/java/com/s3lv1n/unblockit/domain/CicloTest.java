package com.s3lv1n.unblockit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.s3lv1n.unblockit.web.rest.TestUtil;

public class CicloTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ciclo.class);
        Ciclo ciclo1 = new Ciclo();
        ciclo1.setId(1L);
        Ciclo ciclo2 = new Ciclo();
        ciclo2.setId(ciclo1.getId());
        assertThat(ciclo1).isEqualTo(ciclo2);
        ciclo2.setId(2L);
        assertThat(ciclo1).isNotEqualTo(ciclo2);
        ciclo1.setId(null);
        assertThat(ciclo1).isNotEqualTo(ciclo2);
    }
}
