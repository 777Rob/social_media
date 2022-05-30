import {
	Box,
	Button,
	Group,
	Text,
	Popover,
	UnstyledButton,
	useMantineTheme,
	Menu,
	MenuItem,
	Divider,
} from "@mantine/core";
import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import {
	ChevronLeft,
	ChevronRight,
	UserCircle,
	Logout,
	Settings,
} from "tabler-icons-react";
import Avatar from "../../Common/Avatar";

/*
    Located at the bottom of the navbar
    Provides functionality to visit user's profile page or log out
*/
const NavbarFooter = () => {
	const theme = useMantineTheme();
	const { user, account, isAuthenticated, Moralis } = useMoralis();
	const [opened, setOpened] = useState(false);
	const navigate = useNavigate();

	return (
		<Menu
			control={
				/* 
        Button which holds the avatar, name, wallet address and upon clicking shows menu
        with various option
      */
				<UnstyledButton
					onClick={() => setOpened(o => !o)}
					sx={{
						display: "block",
						width: "100%",
						padding: theme.spacing.xs,
						borderRadius: theme.radius.sm,
						color:
							theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

						"&:hover": {
							backgroundColor:
								theme.colorScheme === "dark"
									? theme.colors.dark[6]
									: theme.colors.gray[0],
						},
					}}
				>
					<Group sx={{ display: "flex", justifyContent: "center" }}>
						<Avatar />
						{theme.dir === "ltr" ? (
							<ChevronRight size={18} />
						) : (
							<ChevronLeft size={18} />
						)}
						{/* Name and wallet address */}
						{isAuthenticated && (
							<Box sx={{ flex: 1, flexDirection: "row" }}>
								<Text size="sm" weight={500}>
									{"Username"}
									<Text
										color="dimmed"
										sx={{ width: "150px", fontSize: "10px", overflow: "clip" }}
									>
										{account}
									</Text>
								</Text>
							</Box>
						)}
					</Group>
				</UnstyledButton>
			}
		>
			<Menu.Item
				icon={<UserCircle size={14} />}
				onClick={() => navigate("/Profile")}
			>
				Profile
			</Menu.Item>
			<Menu.Item
				icon={<Settings size={14} />}
				onClick={() => navigate("/Settings")}
			>
				Settings
			</Menu.Item>
			<Divider />
			<Menu.Item
				color="red"
				icon={<Logout size={14} />}
				onClick={() => {
					Moralis.User.logOut().then(() => {
						const currentUser = Moralis.User.current(); // this will now be null
						window.location.reload();
					});
				}}
			>
				Log out
			</Menu.Item>
		</Menu>
	);
};

export default NavbarFooter;
