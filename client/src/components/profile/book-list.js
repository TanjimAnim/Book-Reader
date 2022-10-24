import {
  Box,
  Text,
  Image,
  useDisclosure,
  Link,
  chakra,
  useToast,
} from "@chakra-ui/react";
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
  const toast = useToast(); // toast hooks for push notification,hook of chakraUI
  const { isOpen, onOpen, onClose } = useDisclosure(); //chakraUI hooks
  const [id, setId] = useState(null);
  const { getToken } = useAuthContext();
  const token = getToken();

  const addFavorite = async (id) => {
    axios
      .post("http://localhost:5000/add-favorite", {
        token: `${token}`,
        book_id: `${id}`,
      })
      .then((response) => {
        onSuccessfulUpload();
        toast({
          title: `${response.data.message}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: `${error.response.statusText}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const removeFavorite = async (id) => {
    axios
      .post("http://localhost:5000/remove-favorite", {
        token: `${token}`,
        book_id: `${id}`,
      })
      .then((response) => {
        onSuccessfulUpload();
        toast({
          title: `${response.data.message}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: `${error.response.statusText}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <div id="books-list">
      {listOfBooks.length === 0 ? (
        <Box
          display="flex"
          justifyContent="space-between"
          marginX="88px"
          marginY="34px"
          width="86%"
          fontSize="20px"
        >
          <Text>You have no books for now. Please click on add books.</Text>
        </Box>
      ) : (
        <>
          {listOfBooks.map((items) => (
            <div>
              <Box
                marginX="88px"
                key={items.book_id}
                background="white"
                width="86%"
                padding="32px"
                marginY="35px"
              >
                <Box display="flex" width="100%" justifyContent="space-between">
                  <Box>
                    <Link
                      href={`/dashboard/${items.book_id}/${items.book_slug}`}
                    >
                      <Text fontSize="28px" fontWeight={700}>
                        {items.book_name}
                      </Text>
                    </Link>
                  </Box>

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
                <Box display="flex" gap="79px">
                  <Text fontSize="20px" fontWeight={700}>
                    Author:
                    <chakra.span fontWeight={400}>
                      {" "}
                      {items.book_author}
                    </chakra.span>{" "}
                  </Text>
                  <Text fontSize="20px" fontWeight={700}>
                    Year:
                    <chakra.span fontWeight={400}> {items.year}</chakra.span>
                  </Text>
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
