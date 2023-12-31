package com.vinhdd.chatapi.channel;
import com.vinhdd.chatapi.response.ChannelResponse;
import com.vinhdd.chatapi.response.MemberResponse;

import java.util.List;
import java.util.UUID;

public interface ChannelService {
//    List<Membership> getAllChannelsOfUser(String username);
    ChannelResponse createChannel(Channel channel);
    List<ChannelResponse> getAllChannelsOfUser();
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
