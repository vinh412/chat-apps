import { Avatar, Box, IconButton, Typography } from "@mui/joy";
import React from "react";
import MemberCard from "./MemberCard";
import { useSelector } from "react-redux";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import { Slide } from "@mui/material";
import SearchPeople from "./SearchPeople";

function MembersTabPanel() {
  const [openSearchPeople, setOpenSearchPeople] = React.useState(false);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const members = useSelector(
    (state) =>
      state.chat.channels.find((channel) => channel.id === currentChatId)
        .members
  );

  const searchPeople = (
    <Box
      position="fixed"
      top={0}
      right={0}
      width='25%'
      height="100%"
      bgcolor="white"
      zIndex={1050}
    >
      <SearchPeople setOpenSearchPeople={setOpenSearchPeople} />
    </Box>
  );
  return (
    <Box>
      <Box>
        {members.map((member) => (
          <MemberCard name={member.firstname + " " + member.lastname} />
        ))}
      </Box>
      <IconButton
        onClick={() => setOpenSearchPeople(true)}
        variant="solid"
        color="primary"
        sx={{
          "--IconButton-size": "56px",
          "--IconButton-radius": "50%",
          position: "fixed",
          right: "16px",
          bottom: "16px",
        }}
      >
        <GroupAddRoundedIcon />
      </IconButton>
      <Slide direction="left" in={openSearchPeople} mountOnEnter unmountOnExit>
        {searchPeople}
      </Slide>
    </Box>
  );
}

export default MembersTabPanel;
