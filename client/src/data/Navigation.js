import React from "react";
import { AiFillHome } from "react-icons/ai";
import { CgCommunity, CgProfile } from "react-icons/cg";
import { FiSettings, FiMessageSquare } from "react-icons/fi";
import { SiAzuredataexplorer } from "react-icons/si";
import { MdNotifications } from "react-icons/md";

// @TODO: Change Icons maybe use web3uikit
export const Navigation = [
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
    name: "Communities",
    path: "/Communities",
    icon: <CgCommunity />,
  },
  {
    name: "Messages",
    path: "/Messages",
    icon: <FiMessageSquare />,
  },
];
