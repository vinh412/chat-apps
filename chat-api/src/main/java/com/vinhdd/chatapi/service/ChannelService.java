package com.vinhdd.chatapi.service;
import com.vinhdd.chatapi.model.membership.Membership;
import com.vinhdd.chatapi.model.membership.Role;
import com.vinhdd.chatapi.model.Channel;
import com.vinhdd.chatapi.payload.response.ApiResponse;
import com.vinhdd.chatapi.payload.response.ChannelResponse;
import com.vinhdd.chatapi.payload.response.MemberResponse;

import java.util.List;
import java.util.UUID;

public interface ChannelService {
//    List<Membership> getAllChannelsOfUser(String username);
    ChannelResponse createChannel(Channel channel);
    List<ChannelResponse> getAllChannelsOfUser(UUID userId);
    ChannelResponse getChannelById(UUID channelId);
    ChannelResponse updateChannel(UUID channelId, Channel channel);
    boolean deleteChannel(UUID channelId);
    List<MemberResponse> getAllMembersOfChannel(UUID channelId);
    List<Membership> getAllRequestsOfChannel(UUID channelId);
    Membership requestJoinChannel(UUID channelId);
    Membership acceptJoinChannel(UUID channelId, UUID memberId);
    Membership declineJoinChannel(UUID channelId, UUID memberId);
    List<Membership> addMemberToChannel(UUID channelId, List<UUID> userIds);
    boolean leaveChannel(UUID userId, UUID channelId);
    Membership setMemberRole(UUID userId, UUID channelId, Role role);
    boolean deleteMember(UUID userId, UUID channelId);
}
