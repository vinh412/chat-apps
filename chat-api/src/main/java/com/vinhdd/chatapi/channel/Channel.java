package com.vinhdd.chatapi.channel;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "channel")
public class Channel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private LocalDateTime dateCreated;
}
