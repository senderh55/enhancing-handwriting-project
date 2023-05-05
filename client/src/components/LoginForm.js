import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import { AuthContext } from "../context/authContext";

import * as Yup from "yup";

import {
  Box,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Snackbar,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
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
// easing animation
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

const LoginForm = () => {
  const { login } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Provide a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // formik form state and handlers for login form submission and validation errors
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        // login is a function from AuthContext that will send a request to the server to login the user, navigate to the userDashboard page when login is successful
        const isValidate = await login(values.email, values.password);
        if (isValidate) {
          navigate("../UserDashboard", { replace: true });
        } else {
          navigate("../UserVerification", { replace: true });
        }
      } catch (error) {
        // if there is an error, set the error message to the login field
        setErrors({ login: error.message });
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          component={motion.div}
          animate={{
            transition: {
              staggerChildren: 0.55,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email Address"
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
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <Icon icon="eva:eye-fill" />
                      ) : (
                        <Icon icon="eva:eye-off-fill" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <Link
                component={RouterLink}
                variant="subtitle2"
                to="/ForgotPassword"
                underline="hover"
              >
                Forgot password?
              </Link>
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {isSubmitting ? "loading..." : "Login"}
            </LoadingButton>
          </Box>
        </Box>
      </Form>
      <StyledSnackbar // this is the error message from backend (not from formik)
        open={!!errors.login}
        message={errors.login}
        severity="error"
      />
    </FormikProvider>
  );
};

export default LoginForm;
