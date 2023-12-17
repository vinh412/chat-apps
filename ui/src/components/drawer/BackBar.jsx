import {
  Box,
  IconButton,
  Typography,
} from "@mui/joy";
import React from "react";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function BackBar({title, handleBack}) {
  return (
    <Box display="flex" flexDirection="row" justifyContent='start'>
      <Box sx={{ p: "4px" }}>
        <IconButton size="lg" onClick={handleBack}>
            <ArrowBackRoundedIcon />
        </IconButton>
      </Box>
      <Box sx={{p: "4px"}} alignSelf='center'>
        <Typography level="title-lg" sx={{p: '0'}}>{title}</Typography>
      </Box>
    </Box>
  );
}

export default BackBar;
