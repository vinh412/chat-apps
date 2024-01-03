import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";

function FloatingButton({ setOpenCreateChannel }) {
  const actions = [
    { icon: <GroupRoundedIcon />, name: "New Channel", handleClick: () => {setOpenCreateChannel(true)} },
    { icon: <MessageRoundedIcon />, name: "New Message", handleClick: () => {} },
  ];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box position="relative">
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.handleClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

export default FloatingButton;
