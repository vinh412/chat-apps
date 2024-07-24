package com.vinhdd.chatapi.controller;

import com.vinhdd.chatapi.model.Channel;
import com.vinhdd.chatapi.model.user.User;
import com.vinhdd.chatapi.payload.response.ApiResponse;
import com.vinhdd.chatapi.service.impl.ChannelServiceImpl;
import com.vinhdd.chatapi.model.membership.Membership;
import com.vinhdd.chatapi.payload.response.ChannelResponse;
import com.vinhdd.chatapi.payload.response.MemberResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/channels")
public class ChannelController {
    private final ChannelServiceImpl channelService;

    @PostMapping("/test")
    public ResponseEntity<Channel> test(@ModelAttribute("channel") Channel channel ){
        return ResponseEntity.ok(channelService.test(channel));
    }
    @GetMapping("")
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<List<ChannelResponse>> getAllChannelsOfUser(
    ){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(channelService.getAllChannelsOfUser(user.getId()));
    }
    @PostMapping("")
    public ResponseEntity<ChannelResponse> createChannel(
            @Valid @RequestBody Channel channel
    ){
        return ResponseEntity.ok(channelService.createChannel(channel));
    }
    @GetMapping("/{channelId}")
    public ResponseEntity<ChannelResponse> getChannelById(@PathVariable UUID channelId){
        return ResponseEntity.ok(channelService.getChannelById(channelId));
    }
    @PutMapping("/{channelId}")
    public ResponseEntity<ChannelResponse> updateChannel(@PathVariable UUID channelId, @RequestBody Channel channel){
        return ResponseEntity.ok(channelService.updateChannel(channelId, channel));
    }
    @DeleteMapping("/{channelId}")
    public ResponseEntity<ApiResponse> deleteChannel(@PathVariable UUID channelId){
        ApiResponse apiResponse = new ApiResponse(channelService.deleteChannel(channelId), "Deleted channel");
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/{channelId}/members")
    public ResponseEntity<List<MemberResponse>> getAllMembers(
            @PathVariable UUID channelId){
        return ResponseEntity.ok(channelService.getAllMembersOfChannel(channelId));
    }

    @PostMapping("/{channelId}/members")
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
                        .username(membership.getUser().getUsername())
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
                                        .username(membership.getUser().getUsername())
                                        .firstname(membership.getUser().getFirstname())
                                        .lastname(membership.getUser().getLastname())
                                        .role(membership.getRole())
                                        .status(membership.getStatus())
                                        .joiningDate(membership.getJoiningDate())
                                        .build())
                        .collect(Collectors.toList()));
    }

    @PostMapping("/{channelId}/requests")
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
}
