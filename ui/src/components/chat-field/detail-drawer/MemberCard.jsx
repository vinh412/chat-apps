import { Avatar, Box, Typography } from "@mui/joy";
import React from "react";

function MemberCard({name}) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      sx={{
        p: "8px",
        borderRadius: "8px",
        ":hover": { bgcolor: "whitesmoke", cursor: "pointer" },
      }}
    >
      <Box sx={{ paddingRight: "8px" }}>
        <Avatar />
      </Box>
      <Box>
        <Typography fontWeight="bold">{name}</Typography>
      </Box>
    </Box>
  );
}

export default MemberCard;
