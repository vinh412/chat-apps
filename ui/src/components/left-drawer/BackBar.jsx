import { Box, IconButton, Typography } from "@mui/joy";
import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Bar from "../common/Bar";

function BackBar({ title, handleBack }) {
  return (
    <Bar>
      <Box sx={{ p: "4px" }}>
        <IconButton size="lg" onClick={handleBack}>
          <ArrowBackRoundedIcon />
        </IconButton>
      </Box>
      <Box sx={{ p: "4px" }} alignSelf="center">
        <Typography level="title-lg" sx={{ p: "0" }}>
          {title}
        </Typography>
      </Box>
    </Bar>
  );
}

export default BackBar;
