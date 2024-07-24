import * as React from "react";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
} from "@mui/joy";

function Profile() {
  const [canNotEdit, setCanNotEdit] = React.useState(true);
  return (
    <Box display="flex" flexDirection="column" sx={{ height: "100%" }}>
      <AspectRatio>
        <img src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800" />
        {!canNotEdit && (
          <>
            <Box
              position="absolute"
              width="100%"
              height="100%"
              sx={{ opacity: "30%" }}
              bgcolor="GrayText"
            ></Box>
            <Box
              position="absolute"
              width="100%"
              height="100%"
              alignContent="center"
              textAlign="center"
            >
              <Button variant="outlined" color="neutral">
                Upload
              </Button>
            </Box>
          </>
        )}
      </AspectRatio>
      <Box sx={{ p: "8px" }}>
        <FormControl>
          <FormLabel>Lastname</FormLabel>
          <Input defaultValue="Dương" disabled={canNotEdit} />
        </FormControl>
        <FormControl>
          <FormLabel>Firstname</FormLabel>
          <Input defaultValue="Vinh" disabled={canNotEdit} />
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input startDecorator="@" defaultValue="" disabled={canNotEdit} />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input defaultValue="vinhduong412@gmail.com" disabled={canNotEdit} />
        </FormControl>
      </Box>
      <Box p="8px">
        {canNotEdit ? (
          <Link
            onClick={() => {
              setCanNotEdit(false);
            }}
          >
            Edit profile
          </Link>
        ) : (
          <Box gap="8px" display="flex" justifyContent="flex-end">
            <Button color="neutral" onClick={() => setCanNotEdit(true)}>
              Cancel
            </Button>
            <Button onClick={() => setCanNotEdit(true)}>Save</Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Profile;
