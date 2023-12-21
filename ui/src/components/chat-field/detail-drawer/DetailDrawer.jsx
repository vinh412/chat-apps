import { Box, IconButton, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import Tab, { tabClasses } from "@mui/joy/Tab";
import React from "react";
import Bar from "./Bar";
import MembersTabPanel from "./MembersTabPanel";

function DetailDrawer({ setOpen }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ p: "8px 0px", width: "50%", height: "100%" }}
    >
      <Bar onClick={() => setOpen(false)} />
      <Box height="100%">
        <Tabs defaultValue={0}>
          <TabList>
            <Tab>Members</Tab>
            <Tab>Media</Tab>
            <Tab>Files</Tab>
            <Tab>Links</Tab>
          </TabList>
          <TabPanel value={0} sx={{ p: "8px" }}>
            <MembersTabPanel />
          </TabPanel>
          <TabPanel value={1}>
            <b>Second</b> tab panel
          </TabPanel>
          <TabPanel value={2}>
            <b>Third</b> tab panel
          </TabPanel>
          <TabPanel value={3}>
            <b>Fourth</b> tab panel
          </TabPanel>
        </Tabs>
      </Box>
    </Box>
  );
}

export default DetailDrawer;
