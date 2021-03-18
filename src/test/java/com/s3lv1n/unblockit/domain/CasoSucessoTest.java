package com.s3lv1n.unblockit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.s3lv1n.unblockit.web.rest.TestUtil;

public class CasoSucessoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CasoSucesso.class);
        CasoSucesso casoSucesso1 = new CasoSucesso();
        casoSucesso1.setId(1L);
        CasoSucesso casoSucesso2 = new CasoSucesso();
        casoSucesso2.setId(casoSucesso1.getId());
        assertThat(casoSucesso1).isEqualTo(casoSucesso2);
        casoSucesso2.setId(2L);
        assertThat(casoSucesso1).isNotEqualTo(casoSucesso2);
        casoSucesso1.setId(null);
        assertThat(casoSucesso1).isNotEqualTo(casoSucesso2);
    }
}
