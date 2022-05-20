import {
  AppShell,
  Box,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import AccountCreation from "pages/AccountCreationPage";
import Home from "pages/Home";
import Profile from "pages/Profile";
import ProfileEdit from "pages/ProfileEdit";
import Rewards from "pages/Rewards";
import Communities from "pages/Communities";
import CreateYourOwn from "pages/CreateYourOwn";
import Settings from "pages/Settings";
import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Route, Routes } from "react-router-dom";
import "./styling/App.css";
import { NavbarComponent } from "./components/navbar/NavbarComponent";
import { HeaderComponent } from "components/HeaderComponent";
import { theme } from "./styling/theme";
import { LandingPage } from "pages/LandingPage";
import { RightSidebar } from "components/rightSidebar/RightSidebarComponent";

// Testuojam

const App = () => {
  const { isAuthenticated, user } = useMoralis();
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  if (!isAuthenticated) {
    // Page to be shown to the user that is not authenticated yet
    return <LandingPage />
  }
  else {
    // If a user is authenticated already, but his/her profile is not completed yet,
    // redirect to the AccountCreation page

    /*
    if (!user.attributes.profileCompleted) {
      return <AccountCreation />;
    }
    */
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
            /* What is always show at the top of every page */
            header={
              <HeaderComponent
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
              />
            }
            /* Navbar on the left that contains buttons that lead to other pages */
            navbar={<NavbarComponent/>}
            /* Sidebar shown on the right */
            aside={<RightSidebar/>}
          >
            {/* Main body of the screen */}
            <Box sx={{ marginTop: 50, marginLeft: 210, marginRight: 210, padding: "5px" }}>
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
  }
};

export default App;
