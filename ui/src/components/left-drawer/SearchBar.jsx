import {
  Box,
  Dropdown,
  IconButton,
  Input,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import Bar from "../common/Bar";

function SearchBar() {
  const dispatch = useDispatch();
  return (
    <Bar>
      <Box sx={{ p: "4px" }}>
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { size: "lg" } }}
          >
            <MenuRoundedIcon />
          </MenuButton>
          <Menu placement="bottom-start">
            <MenuItem>
              <ListItemDecorator>
                <AccountCircleRoundedIcon />
              </ListItemDecorator>
              Profile
            </MenuItem>
            <MenuItem onClick={() => dispatch(logout())}>
              <ListItemDecorator>
                <LogoutRoundedIcon />
              </ListItemDecorator>
              Logout
            </MenuItem>
          </Menu>
        </Dropdown>
      </Box>
      <Box sx={{ p: "4px" }} width="-webkit-fill-available">
        <Input
          endDecorator={<SearchRoundedIcon />}
          sx={{ p: "8px" }}
          size="lg"
          variant="soft"
        />
      </Box>
    </Bar>
  );
}

export default SearchBar;
