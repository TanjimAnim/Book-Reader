//redirect user to homepage if the user is not logged in

import { useAuthContext } from "./authcontext";
import { useLocation, Navigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

export default function RequireAuth({ children }) {
  let { isAuthed } = useAuthContext();
  let location = useLocation();
  if (isAuthed === null) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!isAuthed) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
