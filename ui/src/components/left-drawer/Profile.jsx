import { Avatar, Box } from "@mui/joy";
import BackBar from "./BackBar";

function Profile() {
  return (
    <Box display="flex" flexDirection="column" sx={{ height: "100%" }}>
      <BackBar title="Profile" handleBack={() => 0} />
      <Box display="flex" flexDirection="column">
        <Box>
          <Avatar />
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
