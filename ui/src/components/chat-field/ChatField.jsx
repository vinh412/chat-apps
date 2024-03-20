import React from "react";
import ContactBar from "./ContactBar";
import Conversation from "./Conversation";
import ChatTextField from "./ChatTextField";
import { Box, Container } from "@mui/joy";
import { useSelector } from "react-redux";
import DetailDrawer from "../right-drawer/DetailDrawer";

function ChatField() {
  const currentChatId = useSelector(state => state.chat.currentChatId);
  const currentChat = useSelector((state) => state.chat.channels.find(channel => channel.id === currentChatId));
  const [openDetailDrawer, setOpenDetailDrawer] = React.useState(false);

  return currentChat ? (
    <Box display="flex" flexDirection="row">
      <Box
        display="flex"
        flexDirection="column"
        height="100vh"
        bgcolor="blanchedalmond"
        width="100%"
      >
        <ContactBar
          contactName={currentChat.name}
          onClick={setOpenDetailDrawer}
        />
        <Box sx={{ overflow: "auto", height: "100%" }}>
          <Container maxWidth="md" sx={{ p: "8px" }}>
            <Conversation messages={currentChat.messages} members={currentChat.members} />
          </Container>
        </Box>
        <Container maxWidth="md" sx={{ p: "8px" }}>
          <ChatTextField />
        </Container>
      </Box>

      {openDetailDrawer && <DetailDrawer setOpen={setOpenDetailDrawer} />}
    </Box>
  ) : (
    <Box height="100vh" bgcolor="blanchedalmond"></Box>
  );
}

export default ChatField;
