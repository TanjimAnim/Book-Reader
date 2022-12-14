import { Box, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import axios from "axios";

import { useAuthContext } from "../../context/authcontext";
import BookList from "./book-list";

//hooks from chakraUI
import { useDisclosure } from "@chakra-ui/react";
import AddBookModal from "./add-book-modal";

function Profile({ listOfBooks, onSuccessfulUpload }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const { getToken } = useAuthContext();
  const token = getToken();

  const { isOpen, onOpen, onClose } = useDisclosure(); //chakraUI hooks
  useEffect(() => {
    axios
      .get("http://localhost:5000/fetch-data", {
        headers: {
          "x-access-token": `${token}`,
        },
      })
      .then(function (response) {
        setUsername(response.data[0].username);
      })
      .catch(function (error) {
        setError(error.response.statusText);
      });
  });

  return (
    <>
      {error ? (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            marginX="88px"
            marginY="34px"
            width="86%"
          >
            <Text>{error}</Text>
          </Box>
        </>
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            marginX="88px"
            marginY="34px"
            width="86%"
          >
            <Text fontWeight={400} fontSize="20px">
              Hi {username}! Here is your reading list
            </Text>
            <Box
              width="130px"
              cursor="pointer"
              background="rgba(201, 46, 255, 0.08)"
              border="1px solid #ECB7FF"
              borderRadius=" 8px"
              color="#C92EFF"
              onClick={onOpen}
              fontWeight={500}
              textAlign="center"
            >
              Add Book
            </Box>
          </Box>
          <AddBookModal
            isOpen={isOpen}
            onClose={onClose}
            onSuccessfulUpload={onSuccessfulUpload}
          />
          <BookList
            listOfBooks={listOfBooks}
            onSuccessfulUpload={onSuccessfulUpload}
          />
        </>
      )}
    </>
  );
}

export default Profile;
