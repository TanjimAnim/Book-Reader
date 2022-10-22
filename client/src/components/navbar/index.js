import { Box, Text, Image } from "@chakra-ui/react";
import bookrdrLogo from "../assets/Vector.png";

const textStyle = {
  weight: "400",
  size: "20px",
};

function Navbar() {
  return (
    <>
      <Box
        position={"sticky" || "-webkit-sticky"}
        height="74px"
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        background="white"
      >
        <Box display="flex" gap="15px" alignItems="center">
          <Image src={bookrdrLogo} width="32px" height="26.21px" />
          <Text fontSize="32px" color="#C92EFF" fontWeight={400}>
            Bookrdr
          </Text>
        </Box>
        <Box display="flex">
          <Text style={textStyle}>My Books</Text>
          <Text style={textStyle}>Favorites</Text>
          <Text style={textStyle}>Logout</Text>
        </Box>
      </Box>
    </>
  );
}
export default Navbar;
