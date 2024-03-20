import { Typography, Box, Avatar } from "@mui/joy";
import React from "react";
import { useSelector } from "react-redux";

function MessageText({ message, member }) {
  const userId = useSelector((state) => state.auth.user.id);
  if (message.type === "NOTICE") {
    return (
      <Box
        display="inline-block"
        sx={{
          marginBottom: "4px",
          p: "4px 12px",
          bgcolor: "gray",
          borderRadius: "16px",
          alignSelf: "center",
        }}
        maxWidth="60%"
      >
        <Typography level="body-xs" sx={{ color: "#fff" }}>
          {message.content}
        </Typography>
      </Box>
    );
  }
  return userId === member.id ? (
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
      <Typography level="body-lg" sx={{ color: "#fff" }}>
        {message.content}
      </Typography>
    </Box>
  ) : (
    <Box>
      <Typography level="body-sm" sx={{marginLeft: '40px', marginBottom: '4px'}}>{member.firstname + ' ' + member.lastname}</Typography>
      <Box display="flex" columnGap="4px">
        <Avatar size="sm" />
        <Box
          display="inline-block"
          sx={{
            marginBottom: "4px",
            p: "4px 12px",
            bgcolor: "ghostwhite",
            borderRadius: "16px",
            alignSelf: "start",
          }}
          maxWidth="60%"
        >
          <Typography level="body-lg" sx={{ color: "darkslategray" }}>
            {message.content}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default MessageText;
