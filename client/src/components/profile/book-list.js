import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../context/authcontext";

function BookList() {
  const { getToken } = useAuthContext();
  const token = getToken();
  const [listOfBooks, setListOfBooks] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/get-books", {
        headers: {
          "x-access-token": `${token}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setListOfBooks(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  });
  return (
    <div id="books-list">
      {listOfBooks.map((items) => (
        <Box width="1024px" key={items.id}>
          <Text fontSize="28px" fontWeight={700}>
            {items.book_name}
          </Text>
          <Text fontSize="20px">Author:{items.book_author}</Text>
          <Text fontSize="28px">Year:{items.year}</Text>
        </Box>
      ))}
    </div>
  );
}

export default BookList;
