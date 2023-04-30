import React, { useContext } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Snackbar } from "@mui/material";
import sendFill from "@mui/icons-material/Send";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

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

const UserVerificationSchema = Yup.object().shape({
  verificationCode: Yup.string()
    .required("Verification code is required")
    .length(6, "Verification code must be exactly 6 digits"),
});

const UserVerificationForm = () => {
  const navigate = useNavigate();
  const { userEmailVerification } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      verificationCode: "",
    },
    verificationSchema: UserVerificationSchema,

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await userEmailVerification(values.verificationCode);
        // handle successful signup, e.g. redirect user to dashboard page
        navigate("/login", { replace: true });
      } catch (error) {
        setErrors({ userVerification: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <Box
          component={motion.div}
          animate={{ transition: { staggerChildren: 0.55 } }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <TextField
              fullWidth
              autoComplete="off"
              type="text"
              label="Verification code"
              {...getFieldProps("verificationCode")}
              error={Boolean(
                touched.verificationCode && errors.verificationCode
              )}
              helperText={touched.verificationCode && errors.verificationCode}
            />
          </Box>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loadingPosition="start"
            startIcon={<Icon icon={sendFill} />}
            sx={{ mt: 3 }}
          >
            Submit
          </LoadingButton>
        </Box>
      </Form>
      <StyledSnackbar // this is the error message from backend (not from formik)
        open={!!errors.userVerification}
        autoHideDuration={3000}
        message={errors.userVerification}
        severity="error"
      />
    </FormikProvider>
  );
};

export default UserVerificationForm;
