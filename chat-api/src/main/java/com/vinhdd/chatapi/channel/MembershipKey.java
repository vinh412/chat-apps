package com.vinhdd.chatapi.channel;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
public class MembershipKey implements Serializable {
    @Column(name = "channel_id")
    private Long channelId;

    @Column(name = "user_id")
    private Long userId;
}
