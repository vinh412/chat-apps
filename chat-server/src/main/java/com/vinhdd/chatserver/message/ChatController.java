package com.vinhdd.chatserver.message;

import com.datastax.oss.driver.api.core.uuid.Uuids;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@Controller
public class ChatController {
    final private ChannelMessageRepository repository;
    final private ChannelMessageService channelMessageService;
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage){
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(
            @Payload ChatMessage chatMessage,
            SimpMessageHeaderAccessor headerAccessor
    ){
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }

    @MessageMapping("/channel/{channelId}")
    @SendTo("/channel/{channelId}")
    public ChannelMessage sendChannelMessage(
            @DestinationVariable UUID channelId,
            @Payload ChannelMessage channelMessage){
        channelMessage.getKey().setMessageId(Uuids.timeBased());
        System.out.println(channelMessage.toString());
        return repository.save(channelMessage);
    }

    @MessageMapping("/user/{userId}")
    @SendTo("/user/{userId}")
    public Map<String, Object> sendUserMessage(
            @DestinationVariable UUID userId,
            @Payload Map<String, Object> joinedChannelMessage
    ){
        return joinedChannelMessage;
    }
}
