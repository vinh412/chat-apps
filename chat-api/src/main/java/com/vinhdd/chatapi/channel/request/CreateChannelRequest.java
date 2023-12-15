package com.vinhdd.chatapi.channel.request;

import com.vinhdd.chatapi.channel.Channel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateChannelRequest {
    private Long userId;
    private Channel channel;
}
