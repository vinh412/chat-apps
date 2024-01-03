import { Avatar, Box, Typography } from "@mui/joy";
import React from "react";
import PeopleCard from "../common/PeopleCard";

function MemberCard({ name }) {
  return (
    <PeopleCard>
      <Avatar />
      <Typography fontWeight="bold">{name}</Typography>
    </PeopleCard>
  );
}

export default MemberCard;
