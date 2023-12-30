package com.vinhdd.chatapi.message;

import com.vinhdd.chatapi.channel.response.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {
    final private RestTemplate restTemplate;

    public List<MessageResponse> fetchAllMessagesOfChannel(Long channelId){
        String apiUrl = "http://localhost:8080/api/v1/messages/" + channelId;
        MessageResponse[] messages = restTemplate.getForObject(apiUrl, MessageResponse[].class);
        if (messages != null) {
            return Arrays.stream(messages).toList();
        }
        return new ArrayList<>();
    }
}
