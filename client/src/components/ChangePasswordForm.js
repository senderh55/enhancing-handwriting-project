import React, { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Snackbar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import styled from "styled-components";

import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

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

const ChangePasswordForm = () => {
  const { changePassword, logout } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(7, "Password must be at least 7 characters"),
    confirmPassword: Yup.string()
      .required("Confirm new password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  // formik form state and handlers for change password form submission and validation errors
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values, { setErrors }) => {
      if (values.oldPassword === values.newPassword) {
        setErrors({
          changePassword: "New password must be different from old password",
        });
        return;
      }
      try {
        await changePassword(values);
        logout(); // log user out after changing password to force them to login with new password
      } catch (error) {
        setErrors({ changePassword: error.message }); // set error message to be displayed in snackbar
        // error.error is the error message returned from the server
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
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Old Password"
              {...getFieldProps("oldPassword")}
              error={Boolean(touched.oldPassword && errors.oldPassword)}
              helperText={touched.oldPassword && errors.oldPassword}
            />

            <TextField
              fullWidth
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              label="New Password"
              {...getFieldProps("newPassword")}
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              label="Confirm New Password"
              {...getFieldProps("confirmPassword")}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Change Password
              </LoadingButton>
            </Stack>
          </Box>
        </Box>
      </Form>
      <StyledSnackbar // this is the error message from backend (not from formik)
        open={!!errors.changePassword}
        message={errors.changePassword}
        severity="error"
      />
    </FormikProvider>
  );
};

export default ChangePasswordForm;
