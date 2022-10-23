import { Box, Text, Image, useDisclosure, Link } from "@chakra-ui/react";
import deleteIconImage from "../assets/delete.png";
import favoriteIconImage1 from "../assets/favorite1.png";
import favoriteIconImage2 from "../assets/favorite2.png";

//modal component
import DeleteBookModal from "./delete-book-modal";

import { useState } from "react";
import axios from "axios";

import { useAuthContext } from "../../context/authcontext";

export const boxIconStyle = {
  padding: "0.5rem",
  width: "33px",
  height: "37px",
  background: "rgba(201, 46, 255, 0.08)",
  border: "1px solid #ECB7FF",
  borderRadius: "8px",
  cursor: "pointer",
};

function BookList({ listOfBooks, onSuccessfulUpload }) {
  const { isOpen, onOpen, onClose } = useDisclosure(); //chakraUI hooks
  const [id, setId] = useState(null);
  const { getToken } = useAuthContext();
  const token = getToken();
  console.log(listOfBooks);

  const addFavorite = async (id) => {
    console.log(id);
    axios
      .post("http://localhost:5000/add-favorite", {
        token: `${token}`,
        book_id: `${id}`,
      })
      .then((response) => {
        console.log(response.data);
        onSuccessfulUpload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeFavorite = async (id) => {
    console.log(id);
    axios
      .post("http://localhost:5000/remove-favorite", {
        token: `${token}`,
        book_id: `${id}`,
      })
      .then((response) => {
        console.log(response.data);
        onSuccessfulUpload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="books-list">
      {listOfBooks.length === 0 ? (
        <Box>
          {" "}
          <Text> You have no books for now. Please click on add books. </Text>
        </Box>
      ) : (
        <>
          {listOfBooks.map((items) => (
            <div>
              <Box width="1024px" key={items.book_id}>
                <Link href={`/dashboard/${items.book_id}/${items.book_slug}`}>
                  <Text fontSize="28px" fontWeight={700}>
                    {items.book_name}
                  </Text>
                </Link>

                <Text fontSize="20px">Author:{items.book_author}</Text>
                <Text fontSize="28px">Year:{items.year}</Text>
                <Box display="flex" gap="15px">
                  {items.favorite ? (
                    <Box
                      style={boxIconStyle}
                      onClick={() => {
                        setId(items.book_id);
                        removeFavorite(items.book_id);
                      }}
                    >
                      <Image src={favoriteIconImage2} />
                    </Box>
                  ) : (
                    <Box
                      style={boxIconStyle}
                      onClick={() => {
                        setId(items.book_id);
                        addFavorite(items.book_id);
                      }}
                    >
                      <Image src={favoriteIconImage1} />
                    </Box>
                  )}

                  <Box
                    style={boxIconStyle}
                    onClick={() => {
                      onOpen();
                      setId(items.book_id);
                    }}
                  >
                    <Image src={deleteIconImage} />
                  </Box>
                </Box>
              </Box>
            </div>
          ))}
          <DeleteBookModal
            isOpen={isOpen}
            onClose={onClose}
            onSuccessfulUpload={onSuccessfulUpload}
            id={id}
          />
        </>
      )}
    </div>
  );
}

export default BookList;
