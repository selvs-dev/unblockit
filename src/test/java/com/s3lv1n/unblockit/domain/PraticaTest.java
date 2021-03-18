package com.s3lv1n.unblockit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.s3lv1n.unblockit.web.rest.TestUtil;

public class PraticaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pratica.class);
        Pratica pratica1 = new Pratica();
        pratica1.setId(1L);
        Pratica pratica2 = new Pratica();
        pratica2.setId(pratica1.getId());
        assertThat(pratica1).isEqualTo(pratica2);
        pratica2.setId(2L);
        assertThat(pratica1).isNotEqualTo(pratica2);
        pratica1.setId(null);
        assertThat(pratica1).isNotEqualTo(pratica2);
    }
}
