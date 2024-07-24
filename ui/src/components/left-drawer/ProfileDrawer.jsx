import { Box, Input } from '@mui/joy';
import React from 'react'
import BackBar from './BackBar';

function ProfileDrawer() {

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ height: "100%" }}
    >
      <BackBar
        title="My Profile"
        handleBack={() => console.log("back")}
      />
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        mt="32px"
      >
        <Box
          sx={{
            p: "8px",
          }}
        >
          <Input
            placeholder="Channel name"
            size="lg"
            onChange={(event) => setChannelName(event.target.value)}
          />
        </Box>
        <Box alignSelf="end" p="16px">
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileDrawer