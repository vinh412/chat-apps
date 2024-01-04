package com.vinhdd.chatapi.response;

import com.vinhdd.chatapi.channel.Channel;
import com.vinhdd.chatapi.channel.Membership;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateGroupResponse {
    private UUID userId;
    private Channel channel;
    private Membership membership;
}
