import * as Yup from "yup";

import { useFormik, Form, FormikProvider } from "formik";
import { Stack, Box, TextField, Snackbar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

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

const ForgotPasswordEmailForm = () => {
  const { resendVerificationCode } = useContext(AuthContext);
  const ForgotPasswordEmailSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordEmailSchema,

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        // true argument is to indicate that this is a forgot password email
        await resendVerificationCode(values.email, true);
      } catch (error) {
        setErrors({ sendEmail: "Email not exist" });
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
              Send Email
            </LoadingButton>
          </Box>
        </Stack>
      </Form>
      <StyledSnackbar // this is the error message from backend (not from formik)
        open={!!errors.sendEmail}
        message={errors.sendEmail}
        severity="error"
      />
    </FormikProvider>
  );
};

export default ForgotPasswordEmailForm;
