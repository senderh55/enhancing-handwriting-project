import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import ResultsTable from "../components/ResultsTable";

const Results = () => {
  const { selectedProfile, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  // This useEffect is used to redirect the user to the home page if the user is not logged in.
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return <ResultsTable profile={selectedProfile} />;
};

export default Results;
