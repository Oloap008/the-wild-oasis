import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import FullPage from "./FullPage";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // Load authenticated user
  const { isGettingUser, isAuthenticated } = useUser();

  // If there is NO authenticated user, redirect to /login
  useEffect(
    function () {
      if (!isAuthenticated && !isGettingUser) return navigate("/login");
    },
    [isAuthenticated, navigate, isGettingUser]
  );

  // If loading, show a spinner
  if (isGettingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // If there IS a user, render app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
