package com.s3lv1n.unblockit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.s3lv1n.unblockit.web.rest.TestUtil;

public class AndamentoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Andamento.class);
        Andamento andamento1 = new Andamento();
        andamento1.setId(1L);
        Andamento andamento2 = new Andamento();
        andamento2.setId(andamento1.getId());
        assertThat(andamento1).isEqualTo(andamento2);
        andamento2.setId(2L);
        assertThat(andamento1).isNotEqualTo(andamento2);
        andamento1.setId(null);
        assertThat(andamento1).isNotEqualTo(andamento2);
    }
}
