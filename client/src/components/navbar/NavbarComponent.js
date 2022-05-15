import { Navbar } from "@mantine/core";
import { Navigation } from "../../data/Navigation";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NavbarComponentFooter } from "./NavbarComponentFooter";
import { NavbarComponentButton } from "./NavbarComponentButton";


/* Navigation bar that is found on the left */
export const NavbarComponent = () => {
  return (
    <Navbar fixed={true} width={{ base: 220 }} p="xs">

      {/* Holds links to other pages */}
      <Navbar.Section grow mt="md">
        {Navigation.map((item) => (
          <NavbarComponentButton name={item.name} icon={item.icon} path={item.path} />
        ))}
      </Navbar.Section>
      
      {/* Holds link to user profile as well as a logout button*/}
      <Navbar.Section>
        <NavbarComponentFooter />
      </Navbar.Section>{" "}
    </Navbar>
  );
};
