package com.vinhdd.chatapi.channel;
import com.vinhdd.chatapi.channel.response.ChannelResponse;
import com.vinhdd.chatapi.channel.response.MemberResponse;

import java.util.List;

public interface ChannelService {
//    List<Membership> getAllChannelsOfUser(String username);
    Channel createChannel(Channel channel);
    List<ChannelResponse> getAllChannelsOfUser();
    List<MemberResponse> getAllMembersOfChannel(Long channelId);
    List<Membership> getAllRequestsOfChannel(Long channelId);
    Membership requestJoinChannel(Long channelId);
    Membership acceptJoinChannel(Long channelId, Long memberId);
    Membership declineJoinChannel(Long channelId, Long memberId);
    Membership addMember(Long userId, Long channelId);
    boolean leaveChannel(Long userId, Long channelId);
    Membership setMemberRole(Long userId, Long channelId, Role role);
    boolean deleteMember(Long userId, Long channelId);
}
