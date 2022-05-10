import { useEffect } from "react"
import { Box, Text, Button } from "@mantine/core";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMoralis } from "react-moralis";


const ProfileSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, 'User name is too short!')
    .max(50, 'User name is too long!'),
  bio: Yup.string()
    .min(10, 'Bio is too Short!')
    .max(50, 'Bio is too Long!')
});

const ProfileEdit = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  useEffect(() => {

  }, [])

  const validateUsername = (value) => {
    let error;

    if (value !== "") {
      error = "User name cannot be empty!";
    }

  }

  return (
    <Box>
      <Text sx={{ fontSize: "24px", fontWeight: "bold" }}>Edit Profile</Text>
      <Formik
        initialValues={{
          userName: user.attributes.userName,
          bio: user.attributes.Bio,
        }}
        onSubmit={values => {
          // same shape as initial values
          console.log(values);
          user.set("userName", values.userName);
          user.set("Bio", values.bio);
          user.save();
        }}
      >
        {({ errors, touched, isValidating }) => (
          <Form>
            <Field name="userName" validate={validateUsername} />
            {errors.userName && touched.userName && <div>{errors.userName}</div>}

            <Field name="bio" />
            {errors.bio && touched.bio && <div>{errors.bio}</div>}

            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </Box >
  );
};

export default ProfileEdit;
