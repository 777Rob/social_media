import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Settings from "./pages/Settings";
import { Grid } from "@mantine/core";
import SideBar from "./components/SideBar";
import SideBar2 from "./components/SideBar2";
import { useMoralis } from "react-moralis";
import { Box, Text } from "@mantine/core";
import { ConnectButton } from "web3uikit";

const App = () => {
  const { isAuthenticated } = useMoralis();
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
  return (
    <Grid>
      <Grid.Col span={3}>
        <SideBar />
      </Grid.Col>
      <Grid.Col span={6}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Grid.Col>
      <Grid.Col span={3}>
        <SideBar2 />
      </Grid.Col>
    </Grid>
  );
};

export default App;
