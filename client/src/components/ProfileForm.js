import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import { Stack, Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

/////////////////////////////////////////////////////////////
let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

const ProfileForm = () => {
  const { ProfileFormOperation, selectedProfile, isEditingProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const CreateProfileSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    age: Yup.number()
      .typeError("age must be a number")
      .positive("age must be greater than zero")
      .required("age is required"),
    description: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("description is required"),
  });

  // isEditingProfile is a boolean value from authContext.js that is set to true when the user clicks the edit profile button on the ProfileDashboard component.
  const formik = useFormik({
    initialValues: {
      firstName: isEditingProfile ? selectedProfile.name.split(" ")[0] : "",
      lastName: isEditingProfile ? selectedProfile.name.split(" ")[1] : "",
      age: isEditingProfile ? selectedProfile.age : "",
      description: isEditingProfile ? selectedProfile.description : "",
    },
    validationSchema: CreateProfileSchema,

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      // profileName is a string that is created by combining the firstName and lastName values from the formik form.
      const valueName = values.firstName + " " + values.lastName;
      // The profileName string is then split into an array of strings, each string is capitalized, and then the array is joined back into a string.
      const profileName = valueName
        .split(" ")
        .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .join(" ");
      try {
        await ProfileFormOperation(profileName, values.age, values.description);
        // handle successful signup, e.g. redirect user to dashboard page
        navigate("/userDashboard", { replace: true });
      } catch (error) {
        setErrors({ ProfileFormOperation: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack
            component={motion.div}
            initial={{ opacity: 0, y: 60 }}
            animate={animate}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />

            <TextField
              fullWidth
              label="Age"
              {...getFieldProps("age")}
              error={Boolean(touched.age && errors.age)}
              helperText={touched.age && errors.age}
            />
          </Stack>

          <Stack
            spacing={3}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <TextField
              fullWidth
              autoComplete="username"
              type="description"
              label="description"
              {...getFieldProps("description")}
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
            />
          </Stack>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {isEditingProfile ? "Update Profile" : "Create Profile"}
            </LoadingButton>
          </Box>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default ProfileForm;
