import {
    Aside,
    Grid,
    ScrollArea
  } from "@mantine/core";
  import React from "react";
  import "styling/App.css";
  import { MessagesSection } from "./MessagesSection";
  import { CommunitiesSection } from "./CommunitiesSection";

export const RightSidebar = () => {

    return (
        <Aside fixed={true} width={{ base: 220 }} p="xs">
          <Grid
          justify="center"
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            width: "100%"
          }}
          >
          {/* Communities */}
          <Grid.Col span={12} component={ScrollArea}>
            <CommunitiesSection/>
          </Grid.Col>
  
          {/* Messages */}
          <Grid.Col span={12} component={ScrollArea}>
            <MessagesSection/>
          </Grid.Col>
        </Grid>
        </Aside>
    );
  };