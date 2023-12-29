import { Avatar, Box, Typography } from "@mui/joy";
import React from "react";
import MemberCard from "./MemberCard";
import { useSelector } from "react-redux";

function MembersTabPanel() {
  const currentChatId = useSelector(state => state.chat.currentChatId);
  const members = useSelector(state => state.chat.channels.find(channel => channel.id === currentChatId).members);
  return (
    <Box>
      {members.map(member => <MemberCard name={member.firstname + ' ' + member.lastname}/>)}
    </Box>
  );
}

export default MembersTabPanel;
