import { Box } from "@mui/joy";
import React from "react";
import BackBar from "./BackBar";

function MyDrawer({ children, setOpen, title }) {
  return (
    <Box
      position="absolute"
      left={0}
      top={0}
      width="100%"
      height="100%"
      bgcolor="white"
      zIndex={1050}
    >
      <Box display="flex" flexDirection="column" sx={{ height: "100%" }}>
        <BackBar title={title} handleBack={() => setOpen(false)} />
        {children}
      </Box>
    </Box>
  );
}

export default MyDrawer;
