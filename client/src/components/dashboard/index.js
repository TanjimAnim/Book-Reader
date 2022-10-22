import { Box } from "@chakra-ui/react";

//importing components
import Navbar from "../navbar";
import Profile from "../profile";

export default function Dashboard() {
  return (
    <>
      <Box height="100vh" background="#F9F9F9">
        <Navbar />
        <Profile />
      </Box>
    </>
  );
}
