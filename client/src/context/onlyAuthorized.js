//for checking if user is already logged in

import { useAuthContext } from "./authcontext";
import { useLocation, Navigate } from "react-router-dom";
import { Spinner, Box } from "@chakra-ui/react";
export default function OnlyAuthorized({ children }) {
  let { isAuthed } = useAuthContext();
  let location = useLocation();
  if (isAuthed === null) {
    return (
      <Box height="100%" display="flex" flexDir="column" alignItems="center">
        <Spinner size="md" />
      </Box>
    );
  }

  if (isAuthed) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  return children;
}
