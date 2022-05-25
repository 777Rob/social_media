import {Button, Aside, Grid, ScrollArea } from "@mantine/core";
import React, { useState } from "react";
import "styling/App.css";
import { MessagesSection } from "./MessagesSection";
import { CommunitiesSection } from "./CommunitiesSection";

export const RightSidebar = ({  display }) => {

  return (
    <Aside
      sx={{ display: display ? "flex" : "none", marginTop: "80px" }}
      width={{ base: display ? 220 : 220 }}
      p="xs"
      >
      <Grid
        justify="center"
        sx={{
          display: display ? "block" : "none",
          flexDirection: "column",
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
