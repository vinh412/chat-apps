import React from "react";
import ContactBar from "./ContactBar";
import Conversation from "./Conversation";
import ChatTextField from "./ChatTextField";
import { Box, Container } from "@mui/joy";
import { useSelector } from "react-redux";
function ChatField() {
  const currentChat = useSelector((state) => state.chat.currentChat);
  return currentChat ? (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      bgcolor="blanchedalmond"
    >
      <ContactBar contactName={currentChat.name} />
      <Box sx={{ overflow: "auto", height: "100%" }}>
        <Container maxWidth="md" sx={{ p: "8px" }}>
          <Conversation messages={currentChat.messages} />
        </Container>
      </Box>
      <Container maxWidth="md" sx={{ p: "8px" }}>
        <ChatTextField />
      </Container>
    </Box>
  ) : (
    <Box height="100vh" bgcolor="blanchedalmond"></Box>
  );
}

export default ChatField;
