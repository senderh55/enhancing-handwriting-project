import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import styled from "styled-components";

const StyledSnackbar = styled(Snackbar)`
  && {
    width: 50%; /* change the width as needed */
    margin: auto; /* center the Snackbar horizontally */
    top: 90%; /* center the Snackbar vertically */
    transform: translateY(-50%);

    @media (max-width: 600px) {
      width: 100%; /* adjust the width for smaller screens */
    }
  }
`;

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

const SignupForm = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(7, "Too Short! please use at least 7 characters")
      .max(20, "Too Long! max 20 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      // profileName is a string that is created by combining the firstName and lastName values from the formik form.
      const valueName = values.firstName + " " + values.lastName;
      // The profileName string is then split into an array of strings, each string is capitalized, and then the array is joined back into a string.
      const userName = valueName
        .split(" ")
        .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .join(" ");
      try {
        const data = await signup(userName, values.email, values.password);
        console.log("Signup success:", data);
        // handle successful signup, e.g. redirect user to dashboard page
        navigate("/userVerification", { replace: true });
      } catch (error) {
        // FIXME to be refactored to a error codes and messages
        if (
          // server error
          error.message ===
          "Cannot read properties of undefined (reading 'data')"
        ) {
          error.message = "Something went wrong, please try again";
        } else error.message = "Email already exist";
        setErrors({ signup: error.message });
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
              type="email"
              label="Email address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              {...getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <Icon
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
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
              Sign up
            </LoadingButton>
          </Box>
        </Stack>
      </Form>
      <StyledSnackbar // this is the error message from backend (not from formik)
        open={!!errors.signup}
        message={errors.signup}
        severity="error"
      />
    </FormikProvider>
  );
};

export default SignupForm;
