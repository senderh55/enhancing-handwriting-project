import explanation from "../assets/images/explanation.jpg";
import parameterExplanation from "../assets/images/parameterExplanation.png";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp } from "../theme";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export const Explanation = () => {
  return (
    <motion.div variants={fadeInUp}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Link to="/">
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            <img
              src={explanation}
              alt="explanation"
              style={{ width: "220px", height: "240px" }}
            />
          </Typography>
        </Link>
      </Box>
    </motion.div>
  );
};


export const ParameterExplanation = () => {
  return (
    <motion.div variants={fadeInUp}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Link to="/">
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            <img
              src={parameterExplanation}
              alt="parameterExplanation"
              style={{ width: "220px", height: "260px" }}
            />
          </Typography>
        </Link>
      </Box>
    </motion.div>
  );
};

