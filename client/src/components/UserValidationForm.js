import React from "react";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Snackbar } from "@mui/material";
import sendFill from "@mui/icons-material/Send";
import { Icon } from "@iconify/react";

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

const UserValidationSchema = Yup.object().shape({
  validationCode: Yup.string()
    .required("Validation code is required")
    .length(6, "Validation code must be exactly 6 digits"),
});

const UserValidationForm = () => {
  const formik = useFormik({
    initialValues: {
      validationCode: "",
    },
    validationSchema: UserValidationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        console.log("values", values);
      } catch (error) {
        console.log("error", error);
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
              label="Validation code"
              {...getFieldProps("validationCode")}
              error={Boolean(touched.validationCode && errors.validationCode)}
              helperText={touched.validationCode && errors.validationCode}
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
    </FormikProvider>
  );
};

export default UserValidationForm;
