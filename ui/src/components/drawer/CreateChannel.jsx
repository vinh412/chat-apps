import React from "react";
import BackBar from "./BackBar";
import { Box, IconButton, Input, Snackbar } from "@mui/joy";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Slide } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { logout } from "../../features/auth/authSlice";

function CreateChannel({ setOpenCreateChannel }) {
  const dispatch = useDispatch();
  const [channelName, setChannelName] = React.useState("");
  const user = useSelector((state) => state.auth.user);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleCreateChannel = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/channel/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aW5oQGRldi5jb20iLCJpYXQiOjE3MDI2MTYyMzEsImV4cCI6MTcwMjcwMjYzMX0.xUwHhWbcFZI73TR7LUjUz7tSU8P2YNX6jTQk9xY0W5g",
          },
          mode: "no-cors",
          credentials: "include",
          body: JSON.stringify({ name: channelName }),
        }
      );

      if (!response.ok) {
        setOpenSnackbar(true);
        // dispatch(logout());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const continueButton = (
    <IconButton
      variant="solid"
      color="primary"
      sx={{ "--IconButton-size": "64px", "--IconButton-radius": "50%" }}
      onClick={handleCreateChannel}
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        variant="soft"
        color="danger"
        invertedColors
        size="lg"
        startDecorator={<ErrorOutlineRoundedIcon />}
      >
        The authorization has been expired! Please login to continue
      </Snackbar>
    </Box>
  );
}

export default CreateChannel;
