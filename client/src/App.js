import "./styling/App.css";
import { theme } from "./styling/theme";
import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Route, Routes } from "react-router-dom";
import {
  AppShell,
  Box,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";

import CommunityCategory from "components/Communities/Category";
import Categories from "components/Communities/Categories";
import CommunitiesFeed from "components/Communities/Feed";
import SearchResults from "pages/SearchResults";
import Latest from "components/Communities/Latest";
import DisplayTopics from "components/Communities/Topic/DisplayTopics";
import Header from "components/Navigation/Header";
import RightSidebar from "components/Navigation/RightSidebar";
import AccountCreation from "pages/AccountCreationPage";
import Communities from "pages/Communities";
import Community from "pages/Community";
import CreateYourOwn from "pages/CreateYourOwn";
import Home from "pages/Home";
import LandingPage from "pages/LandingPage";
import Profile from "pages/Account/Profile";
import ProfileEdit from "pages/Account/ProfileEdit";
import Rewards from "pages/Rewards";
import Settings from "pages/Account/Settings";
import Explore from "pages/Explore";
import Topic from "components/Communities/Topic";
import Navbar from "components/Navigation/Navbar";
import Advertising from "pages/Advertising";

const App = () => {
  const { isAuthenticated, user } = useMoralis();

  // Set initial state for the color scheme to light
  const [colorScheme, setColorScheme] = useState("light");

  // Change the color scheme to opposite of the current one
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  // Set initial state for the displayRightSidebar to true
  const [displayRightSideBar, setDisplayRightSidebar] = useState(true);

  // If the user is not authenticated, display the landing page
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

      // Color scheme provider used to change the color scheme of the app
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >

        {/* Mantine provider used for theming */}
        <MantineProvider
          theme={{ ...theme, colorScheme: colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >

          {/* App shell with header and two sidebars that wrap the app */}
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
              <Header
                colorScheme={colorScheme}
                displayRightSidebar={displayRightSideBar}
                toggleColorScheme={toggleColorScheme}
                setDisplayRightSidebar={setDisplayRightSidebar}
              />
            }

            /* Navbar on the left that contains buttons that lead to other pages */
            navbar={<Navbar />}

            /* Sidebar shown on the right */
            aside={<RightSidebar display={displayRightSideBar} setDisplay={setDisplayRightSidebar} />}
          >

            {/* Main body of the screen */}
            <Box
              sx={{
                marginTop: 50,
                marginLeft: "auto",
                marginRight: "150px",
                width: "1000px",
                padding: "10px",

              }}
            >

              {/* Routes */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<ProfileEdit />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/AccountCreation" element={<AccountCreation />} />
                <Route path="/Rewards" element={<Rewards />} />
                <Route path="/Communities" element={<Communities />} />
                <Route path="/Advertising" element={<Advertising />} />
                <Route path="/Search/:query" element={<SearchResults />} />
                <Route path="/Explore" element={<Explore />} />
                <Route path="/Community/:address" element={<Community />}>
                  <Route path="categories" element={<Categories />} />
                  <Route path="topic/:topic" element={<Topic />} />
                  <Route path="" element={<Latest />} />
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
