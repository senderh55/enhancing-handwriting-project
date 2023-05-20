import motivation from "../assets/images/motivation.jpg";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp } from "../theme";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Motivation = () => {
  return (
    <motion.div variants={fadeInUp}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Link to="/">
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            <img
              src={motivation}
              alt="motivation"
              style={{ width: "220px", height: "240px" }}
            />
          </Typography>
        </Link>
      </Box>
    </motion.div>
  );
};

export default Motivation;
