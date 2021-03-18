package com.s3lv1n.unblockit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.s3lv1n.unblockit.web.rest.TestUtil;

public class SquadMemberTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SquadMember.class);
        SquadMember squadMember1 = new SquadMember();
        squadMember1.setId(1L);
        SquadMember squadMember2 = new SquadMember();
        squadMember2.setId(squadMember1.getId());
        assertThat(squadMember1).isEqualTo(squadMember2);
        squadMember2.setId(2L);
        assertThat(squadMember1).isNotEqualTo(squadMember2);
        squadMember1.setId(null);
        assertThat(squadMember1).isNotEqualTo(squadMember2);
    }
}
