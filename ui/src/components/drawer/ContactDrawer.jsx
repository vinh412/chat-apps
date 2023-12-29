import { Box, Typography } from "@mui/joy";
import React from "react";
import SearchBar from "./SearchBar";
import ContactItem from "./ContactItem";
import { Slide } from "@mui/material";
import CreateChannel from "./CreateChannel";
import FloatingButton from "./FloatingButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannels } from "../../features/chat/chatSlice";
import ContactItemLoading from "../loading/ContactItemLoading";

function ContactDrawer() {
  const dispatch = useDispatch();

  const channels = useSelector((state) => state.chat.channels);
  //const orderedChannels = channels.slice().sort((a, b) => b.messages.at(-1).timestamp.localeCompare(a.messages.at(-1).timestamp));
  const channelsStatus = useSelector((state) => state.chat.status);
  const error = useSelector((state) => state.chat.error);
  const token = useSelector((state) => state.auth.user.token);

  React.useEffect(() => {
    if (channelsStatus === "idle") {
      dispatch(fetchChannels(token));
    }
  }, [dispatch, channelsStatus, token]);

  let content;

  if (channelsStatus === "loading") {
    content = [];
    for (let i = 0; i < 8; i++) content.push(<ContactItemLoading key={i}/>);
  } else if (channelsStatus === "succeeded") {
    content = channels.map((contact) => (
      <ContactItem contact={contact} key={contact.id} />
    ));
  } else if (channelsStatus === "failed") {
    content = <Typography>{error}</Typography>;
  }

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
      position="relative"
    >
      <SearchBar />
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
        }}
      >
        {content}
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
