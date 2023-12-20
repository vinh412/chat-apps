import { Typography, Box } from "@mui/joy";
import React from "react";
import { useSelector } from "react-redux";

function MessageText({ message }) {
  const userId = useSelector((state) => state.auth.user.id);
  return userId === message.userId ? (
    <Box
      display="inline-block"
      sx={{
        marginBottom: "4px",
        p: "4px 12px",
        bgcolor: "Highlight",
        borderRadius: "16px",
        alignSelf: "end",
      }}
      maxWidth="60%"
    >
      <Typography sx={{ color: "#fff" }}>{message.content}</Typography>
    </Box>
  ) : (
    <Box
      display="inline-block"
      sx={{
        marginBottom: "4px",
        p: "4px 12px",
        bgcolor: "ghostwhite",
        borderRadius: "16px",
        alignSelf: "start"
      }}
      maxWidth="60%"
    >
      <Typography sx={{ color: "darkslategray" }}>{message.content}</Typography>
    </Box>
  );
}

export default MessageText;
