import {
  AppShell,
  Box,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import CommunityCategory from "components/Communities/CommunityCategory";
import CategoriesPage from "components/Communities/CategoriesPage";
import CommunitiesFeed from "components/Communities/CommunitiesFeed";
import CommunitiesLatest from "components/Communities/CommunitiesLatest";
import DisplayTopics from "components/Communities/DisplayTopics";
import { HeaderComponent } from "components/Navigation/HeaderComponent";
import { RightSidebar } from "components/Navigation/RightSidebar/RightSidebarComponent";
import AccountCreation from "pages/AccountCreationPage";
import Communities from "pages/Communities";
import Community from "pages/Community";
import CreateYourOwn from "pages/CreateYourOwn";
import Home from "pages/Home";
import { LandingPage } from "pages/LandingPage";
import Profile from "pages/Profile";
import ProfileEdit from "pages/ProfileEdit";
import Rewards from "pages/Rewards";
import Settings from "pages/Settings";
import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Route, Routes } from "react-router-dom";
import CommunityTopic from "components/Communities/CommunityTopic";
import { NavbarComponent } from "./components/Navigation/Navbar/NavbarComponent";
import "./styling/App.css";
import { theme } from "./styling/theme";
// Testuojam

const App = () => {
  const { isAuthenticated, user } = useMoralis();
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const [displayRightSideBar,setDisplayRightSidebar] = useState(true);

  if (!isAuthenticated) {
    // Page to be shown to the user that is not authenticated yet
    return <LandingPage />;
  } else {
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
                displayRightSidebar={displayRightSideBar}
                toggleColorScheme={toggleColorScheme}
                setDisplayRightSidebar={setDisplayRightSidebar}
              />
            }
            /* Navbar on the left that contains buttons that lead to other pages */
            navbar={<NavbarComponent />}
            /* Sidebar shown on the right */
            aside={<RightSidebar display={displayRightSideBar}/>}
          >
            {/* Main body of the screen */}
            <Box
              sx={{
                marginTop: 50,
                marginLeft: 210,
                marginRight: 210,
                padding: "5px",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<ProfileEdit />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/AccountCreation" element={<AccountCreation />} />
                <Route path="/Rewards" element={<Rewards />} />
                <Route path="/Communities" element={<Communities />} />

                <Route path="/Community/:address" element={<Community />}>
                  <Route path="categories" element={<CategoriesPage />} />
                  <Route path="topic/:topic" element={<CommunityTopic/>} />
                  <Route path="" element={<CommunitiesLatest />} />
                  <Route path="feed" element={<CommunitiesFeed />} />
                  <Route
                    path="categories/:category"
                    element={<CommunityCategory />}
                  />
                </Route>
                <Route path="/Communities/Create" element={<CreateYourOwn />} />
              </Routes>
            </Box>
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    );
  }
};

export default App;
