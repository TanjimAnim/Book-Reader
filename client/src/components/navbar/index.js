import { Box, Text, Image, Link } from "@chakra-ui/react";
import axios from "axios";
import bookrdrLogo from "../assets/Vector.png";
import { redirect } from "react-router-dom";

import { useAuthContext } from "../../context/authcontext";

const textStyle = {
  weight: "400",
  size: "20px",
  cursor: "pointer",
};

function Navbar() {
  const { getToken, setIsAuthed } = useAuthContext();
  const token = getToken();

  const logout = async () => {
    axios
      .post("http://localhost:5000/logout", {
        token: `${token}`,
      })
      .then((response) => {
        console.log(response.data);
        setIsAuthed(false);
        localStorage.clear();
        redirect("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box
        position={"sticky" || "-webkit-sticky"}
        height="74px"
        width="100%"
        display="flex"
        justifyContent="space-between"
        background="white"
        padding="1rem"
        alignItems="center"
      >
        <Box marginLeft="88px">
          <Link
            href="/dashboard"
            _focus={{ textDecoration: "none" }}
            _hover={{ textDecoration: "none" }}
            display="flex"
            gap="15px"
            alignItems="center"
          >
            <Image src={bookrdrLogo} width="32px" height="26.21px" />
            <Text fontSize="32px" color="#C92EFF" fontWeight={400}>
              Bookrdr
            </Text>
          </Link>
        </Box>

        <Box display="flex" gap="15px" width="20%">
          <Link
            href="/dashboard"
            _focus={{ textDecoration: "none" }}
            _hover={{ textDecoration: "none" }}
          >
            <Text style={textStyle}>My Books</Text>
          </Link>

          <Link
            href="/dashboard/favorite"
            _focus={{ textDecoration: "none" }}
            _hover={{ textDecoration: "none" }}
          >
            <Text style={textStyle}>Favorites</Text>
          </Link>

          <Text style={textStyle} onClick={logout}>
            Logout
          </Text>
        </Box>
      </Box>
    </>
  );
}
export default Navbar;
