import { Avatar, Box, Checkbox, IconButton, Input, Typography } from "@mui/joy";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import React from "react";
import PeopleCard from "../common/PeopleCard";

function SearchPeople({ setOpenSearchPeople }) {
  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection="row"
        p="8px"
        minHeight="64px"
        columnGap="4px"
      >
        <IconButton onClick={() => setOpenSearchPeople(false)} size="lg">
          <ArrowBackRoundedIcon />
        </IconButton>
        <Input
          variant="plain"
          fullWidth
          autoFocus
          sx={{ "--Input-focusedThickness": 0 }}
        />
      </Box>
      <Box p='8px'>
        <PeopleCard>
          <Checkbox />
          <Avatar />
          <Box>
            <Typography fontWeight="bold">Nguyễn Hùng</Typography>
            <Typography>nguyenhung@gmail.com</Typography>
          </Box>
        </PeopleCard>
      </Box>
    </Box>
  );
}

export default SearchPeople;
