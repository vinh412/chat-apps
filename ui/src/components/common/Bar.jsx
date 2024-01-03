import { Box } from "@mui/joy";
import React from "react";

const Bar = props => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="start"
      p='8px'
      bgcolor="white"
      minHeight='64px'
    >
        {props.children}
    </Box>
  );
}

export default Bar;
