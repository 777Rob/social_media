import {
    Text,
    Box,
  } from "@mantine/core";
  import React from "react";
  import "styling/App.css";

export const MessagesSection = () => {

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
            <Text sx={{  fontSize: "14px", fontWeight: "bold", padding: "10px", alignContent: "center" }}>
                Messages
            </Text>
            <Text>
                Messages 1
            </Text>
            <Text>
                Messages 2
            </Text>
            <Text>
                Messages 3
            </Text>
        </Box>
    );
  };

  /*
border: "1px solid black",
            borderRadius: "15px",
            padding: "10px"

  */