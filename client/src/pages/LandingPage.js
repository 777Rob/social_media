import { Text, Grid, } from "@mantine/core";
import React from "react";
import { ConnectButton } from "web3uikit";
import "../styling/App.css";

/* 
    Page shown to the user if the user is not authenticated.
    Provides with an ability to be authenticated using various web3 service providers.
*/
export const LandingPage = () => {
    
    // Return a grid consisting of three maximum size rows
    return (
        <Grid
          justify="center"
          align="center"
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            width: "100%",
            transform: "translateY(-50%)",
            /* transform: "translateY(-50%)" 
               After adding this gives a gray box after the connect button is clicked.
            */
          }}
          >
          {/* Name */}
          <Grid.Col span={12}>
            <Text weight={700} sx={{ fontSize: "40px", marginBottom: "20px" }}>
              Parsedia
            </Text>
          </Grid.Col>
  
          {/* Welcome message to the user */}
          <Grid.Col span={12}>
            <Text weight={500} sx={{ fontSize: "24px", marginBottom: "30px" }}>
              To continue please connect using Web3 Provider
            </Text>
          </Grid.Col>
  
          {/* Connect button */}
          <Grid.Col span={12}>
            <ConnectButton
              signingMessage="Welcome to Parsedia!"
              moralisAuth={true}
              />
          </Grid.Col>
        </Grid>
      );
};