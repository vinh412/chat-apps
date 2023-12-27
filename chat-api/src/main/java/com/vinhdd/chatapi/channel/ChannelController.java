package com.vinhdd.chatapi.channel;

import com.vinhdd.chatapi.channel.response.ChannelResponse;
import com.vinhdd.chatapi.channel.response.MemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    public ResponseEntity<Channel> createChannel(
            @RequestBody Channel channel
    ){
        return ResponseEntity.ok(channelService.createChannel(channel));
    }

    @GetMapping("/{channelId}/members")
    public ResponseEntity<List<MemberResponse>> getAllMembers(
            @PathVariable Long channelId){
        return ResponseEntity.ok(channelService.getAllMembersOfChannel(channelId));
    }

    @GetMapping("/{channelId}/requests")
    public ResponseEntity<List<MemberResponse>> getAllRequests(
            @PathVariable Long channelId
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
    @GetMapping("/{channelId}/join")
    public ResponseEntity<Membership> requestJoinChannel(
            @PathVariable Long channelId
    ){
        return ResponseEntity.ok(channelService.requestJoinChannel(channelId));
    }

    @GetMapping("/{channelId}/accept/{memberId}")
    public ResponseEntity<Membership> acceptJoinChannel(
            @PathVariable Long channelId,
            @PathVariable Long memberId
    ){
        return ResponseEntity.ok(channelService.acceptJoinChannel(channelId, memberId));
    }

    @GetMapping("/{channelId}/decline/{memberId}")
    public ResponseEntity<Membership> declineJoinChannel(
            @PathVariable Long channelId,
            @PathVariable Long memberId
    ){
        return ResponseEntity.ok(channelService.declineJoinChannel(channelId, memberId));
    }

    @GetMapping("/allOfUser")
    public ResponseEntity<List<ChannelResponse>> getAllChannelsOfUser(
    ){
        return ResponseEntity.ok(channelService.getAllChannelsOfUser());
    }
}
