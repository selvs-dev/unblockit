package com.s3lv1n.unblockit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.s3lv1n.unblockit.web.rest.TestUtil;

public class SquadTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Squad.class);
        Squad squad1 = new Squad();
        squad1.setId(1L);
        Squad squad2 = new Squad();
        squad2.setId(squad1.getId());
        assertThat(squad1).isEqualTo(squad2);
        squad2.setId(2L);
        assertThat(squad1).isNotEqualTo(squad2);
        squad1.setId(null);
        assertThat(squad1).isNotEqualTo(squad2);
    }
}
