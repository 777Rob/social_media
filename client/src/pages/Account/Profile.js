import { useMoralis } from "react-moralis";
import { Box, Text, Button, Image } from "@mantine/core";
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CopyButton } from "web3uikit";
import Avatar from "components/Common/Avatar";
import { useEffect, useState } from "react";
import NoBannerImage from "data/Images/nobanner.jpg"


//@Description: Profile page is used to display the user's profile
const Profile = () => {
  const { Moralis, account } = useMoralis();
  const profileAddress = useParams();
  // Get current user 
  const user = Moralis.User.current();

  // Get navigate function from react-router-dom to navigate to other pages
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Banner */}
        <Image
          radius="sm"
          src={
            user.attributes.banner
              ? user.attributes.banner
              : NoBannerImage
          }
          sx={{ marginTop: 10, marginBottom: 20 }}
          width={1200}
          align="center"
          height={400}
          alt={account}
        />

        {/* Avatar */}
        <Avatar src={user.attributes.profileImage} />

        {/* Username */}
        <Text>{user.attributes.userName}</Text>

        {/* Wallet with copy button */}
        <Text>
          {account}
          <CopyButton text={account} revertIn={6500} />
        </Text>
        <Text>{user.attributes.bio}</Text>

        {/* Navigate to profile edit page */}
        <Button
          radius="md"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          sx={{
            width: "200px",
            marginLeft: "auto",
            marginRight: "0px",
            marginTop: "10px",
          }}
          onClick={() => {
            navigate("/profile/edit");
          }}
        >
          Edit profile
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
