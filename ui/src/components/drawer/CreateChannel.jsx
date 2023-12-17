import React from "react";
import BackBar from "./BackBar";
import { Box, IconButton, Input } from "@mui/joy";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Slide } from "@mui/material";

function CreateChannel({ setOpenCreateChannel }) {
  const [channelName, setChannelName] = React.useState("");
  const continueButton = (
    <IconButton
      variant="solid"
      color="primary"
      sx={{ "--IconButton-size": "64px", "--IconButton-radius": "50%" }}
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
          <Slide direction="up" in={channelName.length > 0} mountOnEnter unmountOnExit>
            {continueButton}
          </Slide>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateChannel;
