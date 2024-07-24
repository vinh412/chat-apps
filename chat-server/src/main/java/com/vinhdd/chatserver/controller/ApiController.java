package com.vinhdd.chatserver.controller;

import com.vinhdd.chatserver.model.ChannelMessage;
import com.vinhdd.chatserver.service.ChannelMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/messages")
public class ApiController {
    final private ChannelMessageService channelMessageService;
    @GetMapping("/{channelId}")
    public ResponseEntity<List<ChannelMessage>> getAllMessagesOfChannel(@PathVariable UUID channelId){
        return ResponseEntity.ok(channelMessageService.getAllMessagesOfChannel(channelId));
    }
}
