package com.vinhdd.chatapi.channel;

import com.vinhdd.chatapi.channel.response.ChannelResponse;
import com.vinhdd.chatapi.channel.response.MemberResponse;
import com.vinhdd.chatapi.config.JwtService;
import com.vinhdd.chatapi.user.User;
import com.vinhdd.chatapi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ChannelServiceImpl implements ChannelService {
    private final ChannelRepository channelRepository;
    private final MembershipRepository membershipRepository;
    private final UserRepository userRepository;

    public Channel test(Channel channel){
        return channelRepository.save(
                Channel.builder()
                        .name(channel.getName())
                        .dateCreated(LocalDateTime.now())
                        .build()
        );
    }
    @Override
    public List<ChannelResponse> getAllChannelsOfUser(){
        List<ChannelResponse> result = new ArrayList<>();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Membership> membershipList = membershipRepository.findAllByUserId(user.getId()).orElseThrow();
        for(Membership membership : membershipList){
            result.add(ChannelResponse.builder()
                            .id(membership.getChannel().getId())
                            .name(membership.getChannel().getName())
                            .dateCreated(membership.getChannel().getDateCreated())
                            .members(getAllMembersOfChannel(membership.getChannel().getId()))
                            .messages(new ArrayList<>())
                    .build());
        }
        return result;
    }

    @Override
    public Channel createChannel(Channel channel) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        channel.setDateCreated(LocalDateTime.now());
        Channel newChannel = channelRepository.save(channel);

        Membership membership = Membership.builder()
                .id(new MembershipKey(newChannel.getId(), user.getId()))
                .channel(newChannel)
                .user(user)
                .status(Status.ACCEPTED)
                .role(Role.ADMIN)
                .joiningDate(LocalDateTime.now())
                .build();

        membershipRepository.save(membership);
        return newChannel;
    }

    @Override
    public List<MemberResponse> getAllMembersOfChannel(Long channelId) {
        List<MemberResponse> result = new ArrayList<>();
        List<Membership> membershipList = membershipRepository.findAllMembersByChannelId(channelId).orElseThrow();
        for(Membership membership : membershipList){
            result.add(MemberResponse.builder()
                            .id(membership.getUser().getId())
                            .email(membership.getUser().getEmail())
                            .firstname(membership.getUser().getFirstname())
                            .lastname(membership.getUser().getLastname())
                            .role(membership.getRole())
                            .joiningDate(membership.getJoiningDate())
                            .status(membership.getStatus())
                    .build());
        }
        return result;
    }

    @Override
    public List<Membership> getAllRequestsOfChannel(Long channelId){
        return membershipRepository.findAllRequestsByChannelId(channelId).orElseThrow();
    }

    @Override
    public Membership requestJoinChannel(Long channelId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Channel channel = channelRepository.findById(channelId).orElseThrow();

        if(membershipRepository.findById(new MembershipKey(channelId, user.getId())).isPresent())
            return null;

        Membership membership = Membership.builder()
                .id(new MembershipKey(channelId, user.getId()))
                .user(user)
                .channel(channel)
                .status(Status.PENDING)
                .role(Role.USER)
                .joiningDate(LocalDateTime.now())
                .build();

        return membershipRepository.save(membership);
    }

    @Override
    public Membership acceptJoinChannel(Long channelId, Long memberId) {
        User admin = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Membership adminMembership = membershipRepository.findById(new MembershipKey(channelId, admin.getId())).orElseThrow();
        Membership membership = membershipRepository.findById(new MembershipKey(channelId, memberId)).orElseThrow();
        if(adminMembership.getRole() != Role.ADMIN || membership.getStatus() != Status.PENDING){
            return null;
        }
        membership.setStatus(Status.ACCEPTED);
        membership.setJoiningDate(LocalDateTime.now());
        return membershipRepository.save(membership);
    }

    @Override
    public Membership declineJoinChannel(Long channelId, Long memberId){
        User admin = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Membership adminMembership = membershipRepository.findById(new MembershipKey(channelId, admin.getId())).orElseThrow();
        Membership membership = membershipRepository.findById(new MembershipKey(channelId, memberId)).orElseThrow();
        if(adminMembership.getRole() != Role.ADMIN || membership.getStatus() != Status.PENDING){
            return null;
        }
        membershipRepository.delete(membership);
        return null;
    }

    @Override
    public Membership addMember(Long userId, Long channelId) {
        return null;
    }

    @Override
    public boolean leaveChannel(Long userId, Long channelId) {
        return false;
    }

    @Override
    public Membership setMemberRole(Long userId, Long channelId, Role role) {
        return null;
    }

    @Override
    public boolean deleteMember(Long userId, Long channelId) {
        return false;
    }

}
