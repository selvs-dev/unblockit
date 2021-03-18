package com.s3lv1n.unblockit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.s3lv1n.unblockit.web.rest.TestUtil;

public class ConteudoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Conteudo.class);
        Conteudo conteudo1 = new Conteudo();
        conteudo1.setId(1L);
        Conteudo conteudo2 = new Conteudo();
        conteudo2.setId(conteudo1.getId());
        assertThat(conteudo1).isEqualTo(conteudo2);
        conteudo2.setId(2L);
        assertThat(conteudo1).isNotEqualTo(conteudo2);
        conteudo1.setId(null);
        assertThat(conteudo1).isNotEqualTo(conteudo2);
    }
}
