import { Box, IconButton, Typography } from "@mui/joy";
import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Bar from "../common/Bar";

function DetailBar({ onClick }) {
  return (
    <Bar>
      <IconButton size="lg" onClick={onClick}>
        <CloseRoundedIcon />
      </IconButton>
      <Box alignSelf="center">
        <Typography level="title-lg">Channel Detail</Typography>
      </Box>
    </Bar>
  );
}

export default DetailBar;
