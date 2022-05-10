import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Button } from "@mantine/core";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FiSettings, FiMessageSquare } from "react-icons/fi";
import { SiAzuredataexplorer } from "react-icons/si";
import { MdNotifications } from "react-icons/md";
import { TiSocialTwitter } from "react-icons/ti";

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
    name: "Explore",
    path: "/Explore",
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

const SideBar = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Text sx={{ fontSize: "40px" }}>
        <TiSocialTwitter />
      </Text>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {Navigation.map((nav) => (
          <Button
            sx={{
              fontSize: "30px",
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={() => navigate(nav.path)}
          >
            {nav.icon}
            <Text sx={{ fontSize: "24px", padding: "3px" }}>{nav.name}</Text>
          </Button>
        ))}
      </Box>
    </Box>
  );
};
export default SideBar;
