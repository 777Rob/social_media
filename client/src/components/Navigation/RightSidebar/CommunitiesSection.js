import {
    Text,
    Box,
  } from "@mantine/core";
  import React from "react";
  import "styling/App.css";

export const CommunitiesSection = () => {

    return (
        <Box 
        sx={(theme) => ({
            width: "100%",
            border: "3px solid",
            padding: theme.spacing.xs,
            borderRadius: theme.radius.md,
            color:
              theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
          })}
        >
            <Text sx={{ fontSize: "14px", fontWeight: "bold", padding: "10px" }}>
                Communities
            </Text>
            <Text>
                My community 1
            </Text>
            <Text>
                My community 2
            </Text>
            <Text>
                My community 3
            </Text>
        </Box>
    );
  };