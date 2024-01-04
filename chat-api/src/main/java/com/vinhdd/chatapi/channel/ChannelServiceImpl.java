package com.vinhdd.chatapi.channel;

import com.vinhdd.chatapi.response.ChannelResponse;
import com.vinhdd.chatapi.response.MemberResponse;
import com.vinhdd.chatapi.message.MessageService;
import com.vinhdd.chatapi.user.User;
import com.vinhdd.chatapi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChannelServiceImpl implements ChannelService {
    private final MessageService messageService;
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
                            .messages(messageService.fetchAllMessagesOfChannel(membership.getChannel().getId()))
                    .build());
        }
        return result;
    }

    @Override
    public ChannelResponse createChannel(Channel channel) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        channel.setDateCreated(LocalDateTime.now());
        Channel newChannel = channelRepository.save(channel);

        Membership membership = membershipRepository.save(
                Membership.builder()
                        .id(new MembershipKey(newChannel.getId(), user.getId()))
                        .channel(newChannel)
                        .user(user)
                        .status(Status.ACCEPTED)
                        .role(Role.ADMIN)
                        .joiningDate(LocalDateTime.now())
                        .build()
        );
        return ChannelResponse.builder()
                .id(newChannel.getId())
                .name(newChannel.getName())
                .dateCreated(newChannel.getDateCreated())
                .members(List.of(
                        MemberResponse.builder()
                                .id(membership.getUser().getId())
                                .email(membership.getUser().getEmail())
                                .firstname(membership.getUser().getFirstname())
                                .lastname(membership.getUser().getLastname())
                                .role(membership.getRole())
                                .joiningDate(membership.getJoiningDate())
                                .status(membership.getStatus())
                                .build()
                        )
                )
                .messages(new ArrayList<>())
                .build();
    }

    @Override
    public List<MemberResponse> getAllMembersOfChannel(UUID channelId) {
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
    public List<Membership> getAllRequestsOfChannel(UUID channelId){
        return membershipRepository.findAllRequestsByChannelId(channelId).orElseThrow();
    }

    @Override
    public Membership requestJoinChannel(UUID channelId) {
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
    public Membership acceptJoinChannel(UUID channelId, UUID memberId) {
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
    public Membership declineJoinChannel(UUID channelId, UUID memberId){
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
    public List<Membership> addMemberToChannel(UUID channelId, List<UUID> userIds) {
        User admin = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Channel channel = channelRepository.findById(channelId).orElseThrow();
        Membership adminMembership = membershipRepository.findById(new MembershipKey(channelId, admin.getId())).orElseThrow();
        if(adminMembership.getRole() != Role.ADMIN){
            return null;
        }
        return userIds.stream().map(userId -> {
            User user = userRepository.findById(userId).orElseThrow();
            return membershipRepository.save(Membership.builder()
                        .id(new MembershipKey(channelId, userId))
                        .channel(channel)
                        .user(user)
                        .joiningDate(LocalDateTime.now())
                        .role(Role.USER)
                        .status(Status.ACCEPTED)
                .build());
        }).collect(Collectors.toList());
    }

    @Override
    public boolean leaveChannel(UUID userId, UUID channelId) {
        return false;
    }

    @Override
    public Membership setMemberRole(UUID userId, UUID channelId, Role role) {
        return null;
    }

    @Override
    public boolean deleteMember(UUID userId, UUID channelId) {
        return false;
    }

}
