import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { Stack, Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";

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

const PracticeInputForm = ({ setStartingLine, setMaxDistance }) => {
  const CreatePracticeInputSchema = Yup.object().shape({
    startingLine: Yup.number()
      .typeError("Starting Line must be a number")
      .positive("Starting Line must be greater than zero")
      .required("Starting Line is required")
      .max(15, "Too Long!"), // ACCORDING TO NUMBER OF ROWS
    maxDistance: Yup.number()
      .typeError("max Distance must be a number")
      .positive("max Distance must be greater than zero")
      .required("max Distance is required")
      .max(1000, "Too Long!"), // ACCORDING TO WIDTH OF THE CANVAS
  });

  // isEditingProfile is a boolean value from authContext.js that is set to true when the user clicks the edit profile button on the ProfileDashboard component.
  const formik = useFormik({
    initialValues: {
      startingLine: 1,
      maxDistance: 100,
    },
    validationSchema: CreatePracticeInputSchema,

    onSubmit: async (values) => {
      setStartingLine(values.startingLine);
      setMaxDistance(values.maxDistance);
      console.log("values", values);
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
              label="Starting Line"
              {...getFieldProps("startingLine")}
              error={Boolean(touched.startingLine && errors.startingLine)}
              helperText={touched.startingLine && errors.startingLine}
            />
          </Stack>
          <Stack
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <TextField
              fullWidth
              label="Max Distance"
              {...getFieldProps("maxDistance")}
              error={Boolean(touched.maxDistance && errors.maxDistance)}
              helperText={touched.maxDistance && errors.maxDistance}
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
              Update parameters
            </LoadingButton>
          </Box>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default PracticeInputForm;
