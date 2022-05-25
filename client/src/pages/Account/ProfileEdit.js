import { useEffect } from "react";
import { Box, Text, Button } from "@mantine/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useMoralis } from "react-moralis";
import UploadButton from "components/Common/UploadFileButton";

// @Description: Page for editing profile
const ProfileEdit = () => {
  const { Moralis } = useMoralis();

  // Get current user
  const user = Moralis.User.current();

  const updateProfilePicture = async (ipfsUrl) => {
    // Function to update the user's profile picture
    // This function is called by UploadButton component
    // after user selects and uploads the image
    // when the user uploads a new profile picture
    // UploadButton component will call this function 
    // passing the image url from ipfs as a parameter

    // Set profile image to the ipfsUrl
    user.set("profilePicture", ipfsUrl)

    // Save user in Moralis database
    await user.save();
  }

  return (
    <Box>
      <Text sx={{ fontSize: "24px", fontWeight: "bold" }}>Edit Profile</Text>
      <UploadButton fileAction={updateProfilePicture} />
    </Box>
  );
};

export default ProfileEdit;
