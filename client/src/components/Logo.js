import logo from "../assets/images/logo.png";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp } from "../theme";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Logo = () => {
  return (
    <motion.div variants={fadeInUp}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Link to="/">
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            <img
              src={logo}
              alt="logo"
              style={{ width: "500px", height: "300px" }}
            />
          </Typography>
        </Link>
      </Box>
    </motion.div>
  );
};

export default Logo;
