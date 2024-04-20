import { Outlet } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import FullPage from "./FullPage";

function RootLayout() {
  const { isGettingUser } = useUser();

  if (isGettingUser)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  return <Outlet />;
}

export default RootLayout;
