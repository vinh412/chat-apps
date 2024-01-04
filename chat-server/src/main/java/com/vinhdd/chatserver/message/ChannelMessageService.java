package com.vinhdd.chatserver.message;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChannelMessageService {
    private final ChannelMessageRepository channelMessageRepository;

    public List<ChannelMessage> getAllMessagesOfChannel(UUID channelId){
        return channelMessageRepository.findAllByKeyChannelIdOrderByKeyMessageIdAsc(channelId);
    }
}