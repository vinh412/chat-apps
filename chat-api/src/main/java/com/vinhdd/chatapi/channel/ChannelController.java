package com.vinhdd.chatapi.channel;

import com.vinhdd.chatapi.channel.response.MemberResponse;
import com.vinhdd.chatapi.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/channel")
public class ChannelController {
    private final ChannelServiceImpl channelService;
    private final JwtService jwtService;

    @PostMapping("/test")
    public ResponseEntity<Channel> test(@ModelAttribute("channel") Channel channel ){
        return ResponseEntity.ok(channelService.test(channel));
    }
    @PostMapping("/create")
    public ResponseEntity<Channel> createChannel(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
            @RequestBody Channel channel
    ){
        String jwt = authorizationHeader.substring(7);
        String username = jwtService.extractUsername(jwt);
        return ResponseEntity.ok(channelService.createChannel(username, channel));
    }

    @GetMapping("/{channelId}/members")
    public ResponseEntity<List<MemberResponse>> getAllMembers(
            @PathVariable Long channelId){
        List<Membership> membershipList = channelService.getAllMembersOfChannel(channelId);
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
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
            @PathVariable Long channelId
    ){
        String jwt = authorizationHeader.substring(7);
        String username = jwtService.extractUsername(jwt);
        return ResponseEntity.ok(channelService.requestJoinChannel(username, channelId));
    }

    @GetMapping("/{channelId}/accept/{memberId}")
    public ResponseEntity<Membership> acceptJoinChannel(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
            @PathVariable Long channelId,
            @PathVariable Long memberId
    ){
        String jwt = authorizationHeader.substring(7);
        String username = jwtService.extractUsername(jwt);
        return ResponseEntity.ok(channelService.acceptJoinChannel(username, channelId, memberId));
    }

    @GetMapping("/{channelId}/decline/{memberId}")
    public ResponseEntity<Membership> declineJoinChannel(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
            @PathVariable Long channelId,
            @PathVariable Long memberId
    ){
        String jwt = authorizationHeader.substring(7);
        String username = jwtService.extractUsername(jwt);
        return ResponseEntity.ok(channelService.declineJoinChannel(username, channelId, memberId));
    }

//    @GetMapping("")
//    public ResponseEntity<List<ChannelResponse>> getAllChannelsOfUser(
//            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader
//    ){
//        String jwt = authorizationHeader.substring(7);
//        String username = jwtService.extractUsername(jwt);
//        return ResponseEntity.ok(channelService.getAllChannelsOfUser(username));
//    }
}
