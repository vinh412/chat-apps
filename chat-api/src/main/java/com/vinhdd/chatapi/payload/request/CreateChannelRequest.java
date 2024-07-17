package com.vinhdd.chatapi.payload.request;

import com.vinhdd.chatapi.model.Channel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateChannelRequest {
    private UUID userId;
    private Channel channel;
}
