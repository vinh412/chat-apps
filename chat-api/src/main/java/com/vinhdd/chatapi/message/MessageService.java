package com.vinhdd.chatapi.message;

import com.vinhdd.chatapi.response.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessageService {
    final private RestTemplate restTemplate;

    public List<MessageResponse> fetchAllMessagesOfChannel(UUID channelId){
        String apiUrl = "http://localhost:8080/api/v1/messages/" + channelId;
        MessageResponse[] messages = restTemplate.getForObject(apiUrl, MessageResponse[].class);
        if (messages != null) {
            return Arrays.stream(messages).toList();
        }
        return new ArrayList<>();
    }
}
