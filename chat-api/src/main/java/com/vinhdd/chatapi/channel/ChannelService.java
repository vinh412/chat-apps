package com.vinhdd.chatapi.channel;
import java.util.List;

public interface ChannelService {
//    List<Membership> getAllChannelsOfUser(String username);
    Channel createChannel(String username, Channel channel);
    List<Membership> getAllMembersOfChannel(Long channelId);
    List<Membership> getAllRequestsOfChannel(Long channelId);
    Membership requestJoinChannel(String username, Long channelId);
    Membership acceptJoinChannel(String username, Long channelId, Long memberId);
    Membership declineJoinChannel(String username, Long channelId, Long memberId);
    Membership addMember(Long userId, Long channelId);
    boolean leaveChannel(Long userId, Long channelId);
    Membership setMemberRole(Long userId, Long channelId, Role role);
    boolean deleteMember(Long userId, Long channelId);
}
