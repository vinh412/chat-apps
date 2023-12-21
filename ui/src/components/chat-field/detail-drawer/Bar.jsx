import { Box, IconButton, Typography } from "@mui/joy";
import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function Bar({onClick}) {
  return (
    <Box display="flex" flexDirection="row" justifyContent="start">
      <Box sx={{ p: "4px" }}>
        <IconButton size="lg" onClick={onClick}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Box sx={{ p: "4px" }} alignSelf="center">
        <Typography level="title-lg" sx={{ p: "0" }}>
          Group Detail
        </Typography>
      </Box>
    </Box>
  );
}

export default Bar;
