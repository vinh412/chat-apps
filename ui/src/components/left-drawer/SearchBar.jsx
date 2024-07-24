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
import Profile from "./Profile";

function SearchBar({ setOpenDrawer, setDrawerTitle, setDrawer }) {
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
            <MenuItem
              onClick={() => {
                setOpenDrawer(true);
                setDrawerTitle("My Profile")
                setDrawer(<Profile />);
              }}
            >
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
      <Box sx={{ p: "4px" }} minWidth="200px">
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
