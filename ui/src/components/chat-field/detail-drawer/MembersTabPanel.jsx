import { Avatar, Box, Typography } from "@mui/joy";
import React from "react";
import MemberCard from "./MemberCard";

function MembersTabPanel() {
  return (
    <Box>
      <MemberCard name="Dương Vinh" />
      <MemberCard name="Tạ Xuân Kiên" />
    </Box>
  );
}

export default MembersTabPanel;
