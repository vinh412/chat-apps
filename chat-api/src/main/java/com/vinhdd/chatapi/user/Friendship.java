package com.vinhdd.chatapi.user;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "friendship")
public class Friendship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private UUID userId;
    private UUID friendId;
}
