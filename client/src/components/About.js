import { motion } from "framer-motion";
import styled from "styled-components";

const AboutContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-top: 120px;
  margin-bottom: 40px;
`;

const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.1);
  padding: 24px;
  width: 80%;
  max-width: 800px;
  text-align: center;
`;

const AboutTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: #333;
  margin-bottom: 24px;
`;

const AboutContent = styled.p`
  font-size: 20px;
  font-weight: normal;
  color: #666;
  line-height: 1.5;
`;

const About = () => {
  return (
    <AboutContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      <CardStyle>
        <AboutTitle>Welcome to ScribbleBoost!</AboutTitle>
        <AboutContent>
          ScribbleBoost is an academic final project developed by Sender Hodik
          and Idan Brauner, supervised by Dr. Anat Dahan and Dr. Navit Roth.
        </AboutContent>
        <AboutContent>
          We aim to provide occupational therapists a tool for tracking
          handwriting practices. By using our system, therapists can provide
          their patients with interactive writing practice while monitoring data
          and changing parameters.
        </AboutContent>
      </CardStyle>
    </AboutContainer>
  );
};

export default About;
