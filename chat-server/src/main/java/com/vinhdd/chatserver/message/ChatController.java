package com.vinhdd.chatserver.message;

import com.vinhdd.chatserver.counter.CounterService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class ChatController {
    final private ChannelMessageRepository repository;
    final private ChannelMessageService channelMessageService;
    final private CounterService counterService;
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
            @DestinationVariable Long channelId,
            @Payload ChannelMessage channelMessage){
        channelMessage.getKey().setMessageId(counterService.generateMessageId(channelId));
//        List<ChannelMessage> test = channelMessageService.getAllMessagesOfChannel(channelId);
//        for(ChannelMessage message : test) System.out.println(message.toString());
        System.out.println(channelMessage.toString());
        return repository.save(channelMessage);
    }
}
