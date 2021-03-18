package com.s3lv1n.unblockit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.s3lv1n.unblockit.web.rest.TestUtil;

public class DepoimentoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Depoimento.class);
        Depoimento depoimento1 = new Depoimento();
        depoimento1.setId(1L);
        Depoimento depoimento2 = new Depoimento();
        depoimento2.setId(depoimento1.getId());
        assertThat(depoimento1).isEqualTo(depoimento2);
        depoimento2.setId(2L);
        assertThat(depoimento1).isNotEqualTo(depoimento2);
        depoimento1.setId(null);
        assertThat(depoimento1).isNotEqualTo(depoimento2);
    }
}
