import { Avatar, Box, Skeleton, Typography } from "@mui/joy";
import React from "react";

function ContactItemLoading({ contact }) {
  return (
    <Box sx={{ p: "0px 8px" }}>
      <Box
        display="flex"
        flexDirection="row"
        sx={{
          bgcolor: "white",
          p: "8px",
          marginRight: "8xp",
          borderRadius: "8px",
        }}
      >
        <Box sx={{ paddingRight: "8px" }}>
          <Avatar size="lg">
            <Skeleton />
          </Avatar>
        </Box>
        <Box display="flex" flexDirection="column" width="100%">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography><Skeleton>Họ và tên sdfjsdjfs fa sdf adsf</Skeleton></Typography>
            <Typography level="body-sm"><Skeleton>Jul 19</Skeleton></Typography>
          </Box>
          <Typography><Skeleton>Messagesshgfjsd</Skeleton></Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ContactItemLoading;
