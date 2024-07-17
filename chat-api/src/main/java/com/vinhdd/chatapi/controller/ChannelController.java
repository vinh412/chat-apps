package com.vinhdd.chatapi.controller;

import com.vinhdd.chatapi.model.Channel;
import com.vinhdd.chatapi.service.impl.ChannelServiceImpl;
import com.vinhdd.chatapi.model.membership.Membership;
import com.vinhdd.chatapi.payload.response.ChannelResponse;
import com.vinhdd.chatapi.payload.response.MemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/channel")
public class ChannelController {
    private final ChannelServiceImpl channelService;

    @PostMapping("/test")
    public ResponseEntity<Channel> test(@ModelAttribute("channel") Channel channel ){
        return ResponseEntity.ok(channelService.test(channel));
    }
    @PostMapping("/create")
    public ResponseEntity<ChannelResponse> createChannel(
            @RequestBody Channel channel
    ){
        return ResponseEntity.ok(channelService.createChannel(channel));
    }

    @GetMapping("/{channelId}/members")
    public ResponseEntity<List<MemberResponse>> getAllMembers(
            @PathVariable UUID channelId){
        return ResponseEntity.ok(channelService.getAllMembersOfChannel(channelId));
    }

    @GetMapping("/{channelId}/requests")
    public ResponseEntity<List<MemberResponse>> getAllRequests(
            @PathVariable UUID channelId
    ){
        List<Membership> membershipList = channelService.getAllRequestsOfChannel(channelId);
        return ResponseEntity.ok(
                membershipList.stream().map(membership ->
                        MemberResponse.builder()
                                .id(membership.getId().getUserId())
                                .email(membership.getUser().getEmail())
                                .firstname(membership.getUser().getFirstname())
                                .lastname(membership.getUser().getLastname())
                                .role(membership.getRole())
                                .status(membership.getStatus())
                                .joiningDate(membership.getJoiningDate())
                                .build())
                .collect(Collectors.toList()));
    }

    @PostMapping("/{channelId}/add")
    public ResponseEntity<Map<String, Object>> addMemberToChannel(
            @PathVariable UUID channelId,
            @RequestBody Map<String, List<UUID>> body){
        Map<String, Object> response = new HashMap<>();
        try{
            Map<String, Object> data = new HashMap<>();
            List<Membership> membershipList = channelService.addMemberToChannel(channelId, body.get("userIds"));
            List<MemberResponse> memberResponseList = membershipList.stream().map(membership -> {
                return MemberResponse.builder()
                        .id(membership.getUser().getId())
                        .email(membership.getUser().getEmail())
                        .firstname(membership.getUser().getFirstname())
                        .lastname(membership.getUser().getLastname())
                        .role(membership.getRole())
                        .status(membership.getStatus())
                        .joiningDate(membership.getJoiningDate())
                        .build();
            }).collect(Collectors.toList());
            data.put("newMembers", memberResponseList);
            data.put("channelId", channelId);
            response.put("data", data);
        }catch(Exception exception){
            response.put("error", exception.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        return ResponseEntity.ok(response);
    }
    @GetMapping("/{channelId}/join")
    public ResponseEntity<Membership> requestJoinChannel(
            @PathVariable UUID channelId
    ){
        return ResponseEntity.ok(channelService.requestJoinChannel(channelId));
    }

    @GetMapping("/{channelId}/accept/{memberId}")
    public ResponseEntity<Membership> acceptJoinChannel(
            @PathVariable UUID channelId,
            @PathVariable UUID memberId
    ){
        return ResponseEntity.ok(channelService.acceptJoinChannel(channelId, memberId));
    }

    @GetMapping("/{channelId}/decline/{memberId}")
    public ResponseEntity<Membership> declineJoinChannel(
            @PathVariable UUID channelId,
            @PathVariable UUID memberId
    ){
        return ResponseEntity.ok(channelService.declineJoinChannel(channelId, memberId));
    }

    @GetMapping("/allOfUser")
    public ResponseEntity<List<ChannelResponse>> getAllChannelsOfUser(
    ){
        return ResponseEntity.ok(channelService.getAllChannelsOfUser());
    }
}
