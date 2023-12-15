package com.vinhdd.chatapi.channel.response;

import com.vinhdd.chatapi.channel.Channel;
import com.vinhdd.chatapi.channel.Membership;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateGroupResponse {
    private Long userId;
    private Channel channel;
    private Membership membership;
}
