import React from "react";
import { AiFillHome } from "react-icons/ai";
import { CgCommunity, CgProfile } from "react-icons/cg";
import { FiSettings, FiMessageSquare } from "react-icons/fi";
import { SiAzuredataexplorer } from "react-icons/si";
import { MdNotifications } from "react-icons/md";
import { FcAdvertising } from "react-icons/fc";

import { FaGlobe } from "react-icons/fa";
// @TODO: Change Icons maybe use web3uikit
export const Navigation = [
  {
    name: "Home",
    path: "/",
    icon: <AiFillHome />,
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
  {
    name: "Notifications",
    path: "/Notifications",
    icon: <MdNotifications />,
  },
  {
    name: "Rewards",
    path: "/Rewards",
    icon: <SiAzuredataexplorer />,
  },
  {
    name: "Post an Ad",
    path: "/Advertising",
    icon: <FcAdvertising />,
  },
    name: "Explore",
    path: "/Explore",
    icon: <FaGlobe />,
  },
];
