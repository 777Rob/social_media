import "./styling/App.css";
import { theme } from "./styling/theme";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useLocation, Route, Routes, useNavigate } from "react-router-dom";
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
import Header from "components/Navigation/Header";
import RightSidebar from "components/Navigation/RightSidebar";
import Communities from "pages/Communities";
import Community from "pages/Community";
import CreateYourOwn from "pages/CreateYourOwn";
import Home from "pages/Home";
import LenSignInButton from "components/Common/LenSignInButton";
import Profile from "pages/Account/Profile";
import ProfileLoaded from "pages/Account/ProfileLoaded";
import ProfileEdit from "pages/Account/ProfileEdit";
import Rewards from "pages/Rewards";
import Settings from "pages/Account/Settings";
import Explore from "pages/Explore";
import Topic from "components/Communities/Topic";
import Navbar from "components/Navigation/Navbar";
import Advertising from "pages/Advertising";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_USER_DATA } from "redux/User";

const App = () => {
	const { isAuthenticated, user } = useMoralis();
	const dispatch = useDispatch();
	const userState = useSelector(state => state.user);
	const locationObject = useLocation();
	// Set initial state for the color scheme to light
	const [colorScheme, setColorScheme] = useState("light");

	// Change the color scheme to opposite of the current one
	const toggleColorScheme = value =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	// Set initial state for the displayRightSidebar to true
	const [displayRightSideBar, setDisplayRightSidebar] = useState(true);
	// If the user is not authenticated, display the landing page

	useEffect(() => {
		console.log(userState);

	});

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
					styles={theme => ({
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
					aside={
						<RightSidebar
							display={displayRightSideBar}
							setDisplay={setDisplayRightSidebar}
						/>
					}
				>
					{/* Main body of the screen */}
					<Box
						sx={{
							marginTop: 50,
							width: "1000px",
							marginLeft: "auto",
							marginRight: "auto",
							padding: "10px",
						}}
					>
						{/* Routes */}
						<Routes>
							<Route path="/" element={<Explore />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/profile/:address" element={<ProfileLoaded />} />
							<Route path="/profile/edit" element={<ProfileEdit />} />
							<Route path="/settings" element={<Settings />} />
							<Route path="/Rewards" element={<Rewards />} />
							<Route path="/Communities" element={<Communities />} />
							<Route path="/Advertising" element={<Advertising />} />
							<Route path="/Search/:query" element={<SearchResults />} />
							<Route path="/Feed" element={<Home />} />
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
};

export default App;
