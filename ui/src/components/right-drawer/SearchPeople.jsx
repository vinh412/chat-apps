import { Avatar, Box, Checkbox, IconButton, Input, Typography } from "@mui/joy";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import React from "react";
import PeopleCard from "../common/PeopleCard";
import client from "../../fetchApi";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useDispatch, useSelector } from "react-redux";
import { Slide } from "@mui/material";
import { addMembersToChannel } from "../../features/chat/chatSlice";
import { stompClient } from "../../ws";

function SearchPeople({ setOpenSearchPeople }) {
  const dispatch = useDispatch();
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const members = useSelector((state) =>
    state.chat.channels.find((channel) => channel.id === currentChatId)
  ).members;
  const user = useSelector((state) => state.auth.user);
  const [users, setUsers] = React.useState([]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);

  const handleSearchTextChange = (event) => {
    const searchText = event.target.value;

    if (searchText !== "") {
      client
        .findUsersByEmail(searchText, user.token)
        .then((response) => response.json())
        .then((response) =>
          response.filter(
            (user) => !members.some((member) => member.id === user.id)
          )
        )
        .then((response) => setUsers(response))
        .catch((err) => console.log(err));
    }
  };

  const handleChangeSelectedUsers = (event) => {
    const selectedId = event.target.value;
    if (event.target.checked) {
      let arr = selectedUsers.filter((userId) => userId !== selectedId);
      arr.push(selectedId);
      setSelectedUsers(arr);
    } else {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== selectedId));
    }
  };

  const usersList = users.map((user) => (
    <PeopleCard key={user.id}>
      <Checkbox onChange={handleChangeSelectedUsers} value={user.id} />
      <Avatar />
      <Box>
        <Typography fontWeight="bold">
          {user.firstname + " " + user.lastname}
        </Typography>
        <Typography>{user.email}</Typography>
      </Box>
    </PeopleCard>
  ));

  const handleAddPeople = async () => {
    if (selectedUsers.length > 0) {
      const response = await dispatch(
        addMembersToChannel({
          jwt: user.token,
          channelId: currentChatId,
          userIds: selectedUsers,
        })
      ).unwrap();
      const data = response.data;
      data.newMembers.forEach((member) => {
        stompClient.publish({
          destination: `/app/channel/${data.channelId}`,
          body: JSON.stringify({
            key: { channelId: data.channelId },
            userId: user.id,
            content: `${user.firstname} added ${member.firstname} to channel!`,
            type: "NOTICE",
            timestamp: Date.now(),
          }),
        });

        stompClient.publish({
          destination: `/app/user/${member.id}`,
          body: JSON.stringify({
            type: "JOIN"
          })
        })
      });

      setOpenSearchPeople(false);
    }
  };

  const continueButton = (
    <IconButton
      variant="solid"
      color="primary"
      sx={{ "--IconButton-size": "56px", "--IconButton-radius": "50%" }}
      onClick={handleAddPeople}
    >
      <ArrowForwardRoundedIcon />
    </IconButton>
  );

  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection="row"
        p="8px"
        minHeight="64px"
        columnGap="4px"
      >
        <IconButton onClick={() => setOpenSearchPeople(false)} size="lg">
          <ArrowBackRoundedIcon />
        </IconButton>
        <Input
          onChange={handleSearchTextChange}
          variant="plain"
          fullWidth
          autoFocus
          sx={{ "--Input-focusedThickness": 0 }}
        />
      </Box>
      <Box p="8px">{usersList}</Box>
      <Box alignSelf="end" p="16px">
        <Slide
          direction="up"
          in={selectedUsers.length > 0}
          mountOnEnter
          unmountOnExit
        >
          {continueButton}
        </Slide>
      </Box>
    </Box>
  );
}

export default SearchPeople;
