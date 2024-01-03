import { Box } from "@mui/joy";
import React from "react";

const PeopleCard = (props) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      columnGap="12px"
      alignItems="center"
      sx={{
        p: "8px",
        borderRadius: "8px",
        ":hover": { bgcolor: "whitesmoke", cursor: "pointer" },
      }}
    >
      {props.children}
    </Box>
  );
};

export default PeopleCard;
