import {
  ActionIcon,
  AppShell,
  Box,
  ColorSchemeProvider,
  Group,
  Header,
  MantineProvider,
  Text,
  No,
  useMantineTheme,
} from "@mantine/core";
import { LogoText } from "data/Logo";
import { Navigation } from "data/Navigation";
import AccountCreation from "pages/AccountCreation";
import Home from "pages/Home";
import Profile from "pages/Profile";
import ProfileEdit from "pages/ProfileEdit";
import Rewards from "pages/Rewards";
import Communities from "pages/Communities";
import Settings from "pages/Settings";
import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Route, Routes, useLocation } from "react-router-dom";
import { MoonStars, Sun } from "tabler-icons-react";
import { ConnectButton } from "web3uikit";
import "./App.css";
import { NavbarComponent } from "./components/NavbarComponent";
import { theme } from "./theme";

const HeaderComponent = ({ toggleColorScheme, colorScheme }) => {
  const theme = useMantineTheme();
  const locationObject = useLocation();
  const locationName = Navigation.filter(
    (item) => locationObject.pathname == item.path
  )[0].name;
  console.log(locationName);
  return (
    <Header height={60} p="xs" fixed={true}>
      <Group sx={{ height: "100%" }} px={10} position="apart">
        <LogoText size="45px" />

        <Text sx={theme.headings.sizes.h1}>{locationName}</Text>

        <ActionIcon
          variant="default"
          onClick={() => toggleColorScheme()}
          size={30}
        >
          {colorScheme === "dark" ? <Sun size={16} /> : <MoonStars size={16} />}
        </ActionIcon>
      </Group>
    </Header>
  );
};

const App = () => {
  const { isAuthenticated, user } = useMoralis();
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

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
        <ConnectButton signingMessage="Welcome to Parsedia." moralisAuth={true} />;
      </Box>
    );
  }
  if (!user.attributes.profileCompleted) {
    return <AccountCreation />;
  }
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ ...theme, colorScheme: colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          padding="xs"
          margin="xs"
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
          navbar={<NavbarComponent />}
          header={
            <HeaderComponent
              colorScheme={colorScheme}
              toggleColorScheme={toggleColorScheme}
            />
          }
        >
          <Box sx={{ marginTop: 50, marginLeft: 210, padding: "5px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<ProfileEdit />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/AccountCreation" element={<AccountCreation />} />
              <Route path="/Rewards" element={<Rewards />} />
              <Route path="/Communities" element={<Communities />} />
            </Routes>
          </Box>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
