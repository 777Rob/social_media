import { useEffect } from "react";
import { Box, Text, Button } from "@mantine/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useMoralis } from "react-moralis";
import UploadButton from "components/UploadFileButton";

// const ProfileSchema = Yup.object().shape({
//   userName: Yup.string()
//     .min(2, "User name is too short!")
//     .max(50, "User name is too long!"),
//   bio: Yup.string().min(10, "Bio is too Short!").max(50, "Bio is too Long!"),
// });

const ProfileEdit = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  useEffect(() => {}, []);

  const validateUsername = (value) => {
    let error;

    if (value !== "") {
      error = "User name cannot be empty!";
    }
  };

  return (
    <Box>
      <Text sx={{ fontSize: "24px", fontWeight: "bold" }}>Edit Profile</Text>
      <UploadButton />
    </Box>
  );
};

export default ProfileEdit;
