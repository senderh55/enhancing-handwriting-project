import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// this is the main theme for the app and the components, solution to the problem of the theme not being applied to the components when rendering the app
// implement the theme in the app.js file and then use the components in the pages with themeProvider
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    // Here you can add or customize any MUI component styles
  },
  overrides: {
    // Here you can override any MUI component styles
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    h1: {
      fontSize: "4rem",
      fontWeight: 700,
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
      textAlign: "center",
    },
    h2: {
      fontSize: "3.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
      textAlign: "center",
    },
    h3: {
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1.167,
      letterSpacing: "0em",
      textAlign: "center",
    },
    h4: {
      fontSize: "2.125rem",
      fontWeight: 700,
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
      textAlign: "center",
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: 1.334,
      letterSpacing: "0em",
      textAlign: "center",
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 700,
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
      textAlign: "center",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
      letterSpacing: "0.00714em",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "none",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
    },
    overline: {
      fontSize: "0.625rem",
      fontWeight: 400,
      lineHeight: 2.66,
      letterSpacing: "0.08333em",
      textTransform: "uppercase",
    },
  },
});
// Define the styled-component outside of the theme object
export const ProfileButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  & > * {
    margin: 8px;
  }
`;

// Define the styled-component outside of the theme object
export const PracticeButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  & > * {
    margin: 5px;
  }
`;

export const ProfileButton = styled.button`
  background-color: #e6e9f2;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

export const RootStyle = styled("div")({
  background: "rgb(249, 250, 251)",
  height: "100vh",
  display: "grid",
  placeItems: "center",
});

export const HeadingStyle = styled(Box)({
  textAlign: "center",
});

export const ContentStyle = styled("div")({
  padding: 25,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: "#fff",
});

let easing = [0.6, -0.05, 0.01, 0.99];

export const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const StyledButton = styled(Button)`
  margin: 5px;
  &:first-of-type {
    margin-right: 5px;
  }
  font-size: 1.5rem;
  padding: 10px 20px;
`;

export default theme;
