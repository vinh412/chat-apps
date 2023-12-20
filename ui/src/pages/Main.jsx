import { Box } from "@mui/joy";
import React from "react";
import ContactDrawer from "../components/drawer/ContactDrawer";
import ChatField from "../components/chat-field/ChatField";
import { stompClient } from "../ws";

function Main() {
  stompClient.activate();
  return (
    <Box display="flex" flexDirection="row" height="100vh">
      <Box
        width="25%"
        minWidth="384px"
        sx={{ borderRight: "1px solid gainsboro" }}
      >
        <ContactDrawer />
      </Box>
      <Box width="75%">
        <ChatField />
      </Box>
    </Box>
  );
}

export default Main;
