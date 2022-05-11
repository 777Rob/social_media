import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Button } from "@mantine/core";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FiSettings, FiMessageSquare } from "react-icons/fi";
import { SiAzuredataexplorer } from "react-icons/si";
import { MdNotifications } from "react-icons/md";
import { TiSocialTwitter } from "react-icons/ti";
import { Container } from "@mantine/core";
import Logo from "components/Logo";

// @TODO: Change Icons maybe use web3uikit
const Navigation = [
  {
    name: "Home",
    path: "/",
    icon: <AiFillHome />,
  },
  {
    name: "Profile",
    path: "/Profile",
    icon: <CgProfile />,
  },
  {
    name: "Settings",
    path: "/Settings",
    icon: <FiSettings />,
  },
  {
    name: "Rewards",
    path: "/Rewards",
    icon: <SiAzuredataexplorer />,
  },
  {
    name: "Notifications",
    path: "/Notifications",
    icon: <MdNotifications />,
  },
  {
    name: "Messages",
    path: "/Messages",
    icon: <FiMessageSquare />,
  },
];

const Styles = {
  logo: {
    fontSize: "40px",
    display: "flex",
    alignItems: "center",
    marginLeft: "15px",
    marginBottom: "10px",
  },
  navLink: {
    fontSize: "22px",
    height: "37px",
    display: "flex",
    padding: "5px",
    justifyContent: "space-between",
    margin: "3px",
  },
  navText: { fontSize: "20px", padding: "3px" },
};

const SideBar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ position: "fixed", width: "20%", marginTop: "10px" }}>
      <Text sx={Styles.logo}>
        <Logo sx={{ padding: "5px" }} width="50px" height="50px" />
        <Text
          weight={600}
          sx={{
            fontSize: "30px",
          }}
        >
          Parsedia
        </Text>
      </Text>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {Navigation.map((nav) => (
          <Button
            sx={Styles.navLink}
            onClick={() => navigate(nav.path)}
            radius="xl"
          >
            {nav.icon}
            <Text sx={Styles.navText}>{nav.name}</Text>
          </Button>
        ))}
      </Box>
    </Box>
  );
};
export default SideBar;
