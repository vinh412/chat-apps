package com.vinhdd.chatserver.message;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChannelMessageServiceImpl implements ChannelMessageService{
    private final ChannelMessageRepository channelMessageRepository;


}
