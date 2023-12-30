package com.vinhdd.chatserver.counter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CounterService {
    final private CounterRepository counterRepository;

    public Long generateMessageId(Long channelId){
        Counter counter = counterRepository.findById(channelId)
                .orElseGet(()->new Counter(channelId, 0L));
        counter.setValue(counter.getValue() + 1);
        counterRepository.save(counter);
        return counter.getValue();
    }
}
