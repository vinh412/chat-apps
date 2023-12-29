import React from "react";
import BackBar from "./BackBar";
import { Box, IconButton, Input } from "@mui/joy";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Slide } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateChannel, receiveMessage } from "../../features/chat/chatSlice";
import { stompClient } from "../../ws";

function CreateChannel({ setOpenCreateChannel }) {
  const dispatch = useDispatch();
  const [channelName, setChannelName] = React.useState("");
  const token = useSelector(state => state.auth.user.token);
  const [createChannelStatus, setCreateChannelStatus] = React.useState('idle');

  const canCreate = channelName && createChannelStatus === 'idle';

  const handleCreateChannel = async () => {

    if(canCreate){
      try{
        setCreateChannelStatus('pending');
        await dispatch(fetchCreateChannel({channelName, jwt: token})).unwrap();
        // stompClient.subscribe(`/channel/${data.id}`, (message) => {
        //   console.log(message.body);
        //   dispatch(receiveMessage(JSON.parse(message.body)));
        // });

        // stompClient.publish({
        //   destination: `/app/channel/${data.id}`,
        //   body: JSON.stringify({
        //     key: { channelId: data.id, messageId: 1 },
        //     userId: user.id,
        //     content: `${user.firstname} created channel!`,
        //     type: "NOTICE",
        //     timestamp: Date.now(),
        //   }),
        // });
        setOpenCreateChannel(false);
      }catch(err){
        console.log('Failed to create channel: ', err);
      }finally{
        setCreateChannelStatus('idle');
      }
    }
  };

  const continueButton = (
    <IconButton
      variant="solid"
      color="primary"
      sx={{ "--IconButton-size": "64px", "--IconButton-radius": "50%" }}
      onClick={handleCreateChannel}
      disabled={!canCreate}
    >
      <ArrowForwardRoundedIcon />
    </IconButton>
  );
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ p: "8px 0px", height: "100%" }}
    >
      <BackBar
        title="New Channel"
        handleBack={() => setOpenCreateChannel(false)}
      />
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        mt="32px"
      >
        <Box
          sx={{
            p: "8px",
          }}
        >
          <Input
            placeholder="Channel name"
            size="lg"
            onChange={(event) => setChannelName(event.target.value)}
          />
        </Box>
        <Box alignSelf="end" p="16px">
          <Slide
            direction="up"
            in={channelName.length > 0}
            mountOnEnter
            unmountOnExit
          >
            {continueButton}
          </Slide>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateChannel;
