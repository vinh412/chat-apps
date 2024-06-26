import { Box } from "@mui/joy";
import React from "react";
import ContactDrawer from "../components/left-drawer/ContactDrawer";
import ChatField from "../components/chat-field/ChatField";

function Main() {
  
  return (
    <Box display="flex" flexDirection="row" height="100vh">
      <Box
        width="25%"
        sx={{ borderRight: "1px solid gainsboro" }}
        minWidth='300px'
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
