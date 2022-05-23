import { Aside, Grid, ScrollArea } from "@mantine/core";
import React from "react";
import "styling/App.css";
import { MessagesSection } from "./MessagesSection";
import { CommunitiesSection } from "./CommunitiesSection";
import { useSelector } from "react-redux";

export const RightSidebar = ({ displayRightSideBar }) => {
 const sidebar = useSelector(state => state.appUtils.sidebar);

  return (
    <Aside sx={{display: sidebar ? "flex" : "none"}} fixed={true} width={{ base: sidebar ? 220 : 0 }} p="xs">
      <Grid
        justify="center"
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          width: "100%",
        }}
      >
        {/* Communities */}
        <Grid.Col span={12} component={ScrollArea}>
          <CommunitiesSection />
        </Grid.Col>

        {/* Messages */}
        <Grid.Col span={12} component={ScrollArea}>
          <MessagesSection />
        </Grid.Col>
      </Grid>
    </Aside>
  );
};
