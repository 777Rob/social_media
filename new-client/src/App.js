import { Box, Grid, Text } from "@mantine/core";
import SideBar from "components/SideBarLeft";
import SideBar2 from "components/SideBarRight";
import AccountCreation from "pages/AccountCreation";
import Home from "pages/Home";
import Profile from "pages/Profile";
import ProfileEdit from "pages/ProfileEdit";
import Settings from "pages/Settings";
import Rewards from "pages/Rewards";
import React from "react";
import { useMoralis } from "react-moralis";
import { Route, Routes } from "react-router-dom";
import { ConnectButton } from "web3uikit";
import "./App.css";

const App = () => {
  const { isAuthenticated, user } = useMoralis();
  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "400px",
          flexDirection: "column",
        }}
      >
        <Text
          sx={{ fontSize: "24px", fontWeight: "bold", marginBottom: "30px" }}
        >
          To continue please connect using Web3 Provider
        </Text>
        <ConnectButton moralisAuth={true} />;
      </Box>
    );
  }
  if(!user.attributes.profileCompleted){
    return <AccountCreation />
  }
  return (
    <Grid columns={9} justify="center">
      <Grid.Col span={2}>
        <SideBar />
      </Grid.Col>
      <Grid.Col span={4}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/AccountCreation" element={<AccountCreation />} />
          <Route path="/Rewards" element={<Rewards/>} />
        </Routes>
      </Grid.Col>
      <Grid.Col span={2}>
        <SideBar2 />
      </Grid.Col>
    </Grid>
  );
};

export default App;
