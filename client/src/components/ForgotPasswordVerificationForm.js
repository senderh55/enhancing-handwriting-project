import React, { useState, useContext } from "react";
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
import { useNavigate } from "react-router-dom";

const StyledSnackbar = styled(Snackbar)`
  && {
    width: 50%;
    margin: auto;
    top: 90%;
    transform: translateY(-50%);

    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;

const ForgotPasswordVerificationForm = (props) => {
  const { resetPassword } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const ChangePasswordSchema = Yup.object().shape({
    verificationCode: Yup.string()
      .required("Verification code is required")
      .length(6, "Verification code must be exactly 6 digits"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(7, "Password must be at least 7 characters"),
    confirmPassword: Yup.string()
      .required("Confirm new password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      verificationCode: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const { email } = props;
        await resetPassword(values.newPassword, values.verificationCode, email);
        navigate("/login", { replace: true });
      } catch (error) {
        setErrors({ resetPassword: error.message });
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
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          >
            <TextField
              fullWidth
              type="text"
              label="Verification Code"
              {...getFieldProps("verificationCode")}
              error={Boolean(
                touched.verificationCode && errors.verificationCode
              )}
              helperText={touched.verificationCode && errors.verificationCode}
            />
            <TextField
              fullWidth
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
                      <Icon
                        icon={showPassword ? eyeFill : eyeOffFill}
                        width={20}
                        height={20}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
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
                      <Icon
                        icon={showPassword ? eyeFill : eyeOffFill}
                        width={20}
                        height={20}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ mt: 3 }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Change Password
            </LoadingButton>
          </Stack>
        </Box>
        <StyledSnackbar
          open={Boolean(errors.resetPassword)}
          message={errors.resetPassword}
          autoHideDuration={6000}
        />
      </Form>
    </FormikProvider>
  );
};

export default ForgotPasswordVerificationForm;
