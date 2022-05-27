import { Navbar as NavbarMantine, ScrollArea } from "@mantine/core";
import { Navigation } from "../../../data/Navigation";
import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarFooter from "./NavbarFooter";
import NavbarButton from "./NavbarButton";

/* Navigation bar that is found on the left */
const Navbar = () => {
	return (
		<NavbarMantine fixed={true} width={{ base: 320 }} p="xs">
			{/* Holds links to other pages */}
			<NavbarMantine.Section grow component={ScrollArea} mt="md">
				{/* Map through Navigation elements and display them in NavbarComponentButton */}
				{Navigation.map(item => (
					<NavbarButton name={item.name} icon={item.icon} path={item.path} />
				))}
			</NavbarMantine.Section>

			{/* Holds link to user profile as well as a logout button*/}
			<NavbarMantine.Section>
				<NavbarFooter />
			</NavbarMantine.Section>
		</NavbarMantine>
	);
};

export default Navbar;
