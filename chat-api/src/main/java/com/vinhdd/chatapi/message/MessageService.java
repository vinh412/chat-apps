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
        String apiUrl = "https://5488-2405-4802-1ca4-5be0-e52c-3919-dba4-9241.ngrok-free.app/api/v1/messages/" + channelId;
        MessageResponse[] messages = restTemplate.getForObject(apiUrl, MessageResponse[].class);
        if (messages != null) {
            return Arrays.stream(messages).toList();
        }
        return new ArrayList<>();
    }
}
