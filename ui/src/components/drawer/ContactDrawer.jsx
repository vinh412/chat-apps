import { Box } from "@mui/joy";
import React from "react";
import SearchBar from "./SearchBar";
import ContactItem from "./ContactItem";
import { Slide } from "@mui/material";
import CreateChannel from "./CreateChannel";
import FloatingButton from "./FloatingButton";
import { useDispatch, useSelector } from "react-redux";

function ContactDrawer({setSelectedContact}) {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.chat.channels);

  const [openCreateChannel, setOpenCreateChannel] = React.useState(false);
  const example = (
    <Box
      position="absolute"
      left={0}
      top={0}
      width="100%"
      height="100%"
      bgcolor="white"
      zIndex={1050}
    >
      <CreateChannel setOpenCreateChannel={setOpenCreateChannel} />
    </Box>
  );
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ p: "8px 0px", height: "100%" }}
      position='relative'
    >
      <SearchBar />
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
        }}
      >
        {channels.map(contact => (
          <ContactItem contact={contact} key={contact.id}/>
        ))}
      </Box>
      <FloatingButton setOpenCreateChannel={setOpenCreateChannel} />
      <Slide
        direction="right"
        in={openCreateChannel}
        mountOnEnter
        unmountOnExit
      >
        {example}
      </Slide>
    </Box>
  );
}

export default ContactDrawer;
