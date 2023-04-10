import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const Container = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const Link = styled(motion.a)`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  text-decoration: none;
  margin-right: ${(props) => props.theme.spacing};
`;

const Icon = styled.span`
  margin-right: ${(props) => props.theme.spacing};
`;

const Text = styled.span`
  font-size: 18px;
  font-weight: normal;
  color: #555;
  line-height: 1.5;
  margin-top: 4px;
  margin-right: 10px;
  margin-left: 10px;
`;
const ContentTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
`;

const Contact = ({ contacts }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      <ContentTitle>Contact Us</ContentTitle>
      {contacts.map((contact) => (
        <Container
          key={contact.email}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Link
            href={`https://www.linkedin.com/in/${contact.linkedin}`}
            variants={linkVariants}
          >
            <Icon>
              <LinkedInIcon />
            </Icon>
            <Text>{contact.name}</Text>
          </Link>
          <Link href={`mailto:${contact.email}`} variants={linkVariants}>
            <Icon>
              <EmailIcon />
            </Icon>
            <Text>{contact.email}</Text>
          </Link>
        </Container>
      ))}
    </>
  );
};

export default Contact;
