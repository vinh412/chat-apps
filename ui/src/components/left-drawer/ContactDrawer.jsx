import { Typography } from "@mui/joy";
import * as React from "react";
import SearchBar from "./SearchBar";
import ContactItem from "./ContactItem";
import { Box } from "@mui/material";
import FloatingButton from "./FloatingButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannels, receiveMessage } from "../../features/chat/chatSlice";
import ContactItemLoading from "../loading/ContactItemLoading";
import { stompClient } from "../../ws";
import MyDrawer from "./MyDrawer";

function ContactDrawer() {
  const dispatch = useDispatch();

  const channels = useSelector((state) => state.chat.channels);
  const orderedChannels = channels.slice().sort((a, b) => {
    if (b.messages.length > 0 && a.messages.length > 0) {
      return b.messages
        .at(-1)
        .timestamp.localeCompare(a.messages.at(-1).timestamp);
    }
  });
  const channelsStatus = useSelector((state) => state.chat.status);
  const error = useSelector((state) => state.chat.error);
  const userId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.user.token);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [drawer, setDrawer] = React.useState();
  const [drawerTitle, setDrawerTitle] = React.useState();
  const onReceivedMessage = (message) => {
    dispatch(receiveMessage(JSON.parse(message.body)));
  };

  React.useEffect(() => {
    if (channelsStatus === "idle") {
      dispatch(fetchChannels(token));
    } else if (channelsStatus === "succeeded") {
      stompClient.activate();
      stompClient.onConnect = () => {
        console.log("Đã kết nối");
        stompClient.subscribe(`/user/${userId}`, onReceivedMessage);
        channels.forEach((channel) => {
          console.log("kết nối tới channel", channel.name);
          stompClient.subscribe(`/channel/${channel.id}`, onReceivedMessage);
        });
      };
    }
  }, [dispatch, channelsStatus, token]);

  let content;

  if (channelsStatus === "loading") {
    content = [];
    for (let i = 0; i < 8; i++) content.push(<ContactItemLoading key={i} />);
  } else if (channelsStatus === "succeeded") {
    content = orderedChannels.map((contact) => (
      <ContactItem contact={contact} key={contact.id} />
    ));
  } else if (channelsStatus === "failed") {
    content = <Typography>{error}</Typography>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ height: "100%" }}
      position="relative"
    >
      <SearchBar setOpenDrawer={setOpenDrawer} setDrawerTitle={setDrawerTitle} setDrawer={setDrawer}/>
      <Box
        p="8px"
        sx={{
          overflow: "auto",
          height: "100%",
        }}
      >
        {content}
      </Box>
      <FloatingButton setOpenCreateChannel={setOpenDrawer} setDrawerTitle={setDrawerTitle} setDrawer={setDrawer} />
      {openDrawer && (
        <MyDrawer title={drawerTitle} setOpen={setOpenDrawer}>
          {drawer}
        </MyDrawer>
      )}
    </Box>
  );
}

export default ContactDrawer;
