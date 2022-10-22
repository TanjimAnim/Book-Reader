import { Box, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import axios from "axios";

import { useAuthContext } from "../../context/authcontext";
import BookList from "./book-list";

function Profile() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const { getToken } = useAuthContext();
  const token = getToken();

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
          <Text>{error}</Text>
        </>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between">
            <Text>Hi {username}! Here is your reading list</Text>
            <Box
              background="rgba(201, 46, 255, 0.08)"
              border="1px solid #ECB7FF"
              borderRadius=" 8px"
              color="#C92EFF"
            >
              Add Book
            </Box>
          </Box>
          <BookList />
        </>
      )}
    </>
  );
}

export default Profile;
