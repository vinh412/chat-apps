import React from "react";
import { Avatar, Box, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChatId } from "../../features/chat/chatSlice";
import { timeAgo } from "../../ultils";

function ContactItem({ contact }) {
  const dispatch = useDispatch();
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  const handleClick = () => {
    dispatch(setCurrentChatId(contact.id));
  };

  const clicked = currentChatId === contact.id;
  return (
    <Box sx={{ p: "0px 8px" }}>
      <Box
        onClick={handleClick}
        display="flex"
        flexDirection="row"
        sx={{
          bgcolor: clicked ? "Highlight" : "white",
          p: "8px",
          marginRight: "8xp",
          borderRadius: "8px",
          ":hover": !clicked && { bgcolor: "whitesmoke", cursor: "pointer" },
        }}
      >
        <Box sx={{ paddingRight: "8px" }}>
          <Avatar size="lg"></Avatar>
        </Box>
        <Box display="flex" flexDirection="column" width="100%">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography
              fontWeight="bold"
              sx={{ color: clicked ? "white" : "black" }}
            >
              {contact.name}
            </Typography>
            <Typography
              level="body-sm"
              sx={{ color: clicked ? "white" : "black" }}
            >
              {contact.messages &&
                contact.messages.length > 0 &&
                timeAgo(contact.messages.at(-1).timestamp)}
            </Typography>
          </Box>
          <Typography sx={{ color: clicked ? "white" : "black" }}>
            {contact.messages &&
              contact.messages.length > 0 &&
              contact.messages.at(-1).content}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ContactItem;
