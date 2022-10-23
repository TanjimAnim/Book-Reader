import { useParams } from "react-router-dom";

import {
  Box,
  Text,
  Image,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  chakra,
  Button,
} from "@chakra-ui/react";

//import icon image
import deleteIconImage from "../assets/delete.png";
import favoriteIconImage1 from "../assets/favorite1.png";
import favoriteIconImage2 from "../assets/favorite2.png";
import editIconImage from "../assets/Frame.png";
//import icon box style
import { boxIconStyle } from "../profile/book-list";

import { useAuthContext } from "../../context/authcontext";
import { useState } from "react";
import axios from "axios";

//delete modal
import DeleteBookModal from "../profile/delete-book-modal";

function SingleBookPage({ listOfBooks, onSuccessfulUpload }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getToken } = useAuthContext();
  const token = getToken();

  const { book_id } = useParams();
  const [id, setId] = useState(null);

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
    <>
      {listOfBooks ? (
        <>
          {listOfBooks
            .filter((item) => item.book_id === parseInt(book_id))
            .map((item) => {
              return (
                <Box
                  marginX="88px"
                  width="86%"
                  key={item.book_id}
                  padding="32px"
                  marginY="35px"
                >
                  <Box
                    display="flex"
                    width="100%"
                    justifyContent="space-between"
                  >
                    <Text fontSize="28px" fontWeight={700}>
                      {item.book_name}
                    </Text>
                    <Box display="flex" gap="15px">
                      {item.favorite ? (
                        <Box
                          style={boxIconStyle}
                          onClick={() => {
                            setId(item.book_id);
                            removeFavorite(item.book_id);
                          }}
                        >
                          <Image src={favoriteIconImage2} />
                        </Box>
                      ) : (
                        <Box
                          style={boxIconStyle}
                          onClick={() => {
                            setId(item.book_id);
                            addFavorite(item.book_id);
                          }}
                        >
                          <Image src={favoriteIconImage1} />
                        </Box>
                      )}

                      <Box
                        style={boxIconStyle}
                        onClick={() => {
                          onOpen();
                          setId(item.book_id);
                        }}
                      >
                        <Image src={deleteIconImage} />
                      </Box>
                      <Box style={boxIconStyle}>
                        <Image src={editIconImage} />
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" gap="79px">
                    <Text fontSize="20px" fontWeight={700}>
                      Author:
                      <chakra.span fontWeight={400}>
                        {" "}
                        {item.book_author}
                      </chakra.span>{" "}
                    </Text>
                    <Text fontSize="20px" fontWeight={700}>
                      Year:
                      <chakra.span fontWeight={400}> {item.year}</chakra.span>
                    </Text>
                  </Box>
                </Box>
              );
            })}
          <Box marginY="37px" width="86%" marginX="88px" padding="32px">
            <form>
              <FormControl id="comment" isRequired>
                <FormLabel color="#6F7482" fontSize="18px">
                  Write a summary of the book
                </FormLabel>
                <Textarea
                  placeholder="write a summary of the book"
                  minLength="150"
                  maxLength="255"
                  _focus={{
                    zIndex: "0",
                    borderColor: "#3182ce",
                  }}
                  size="md"
                  background="white"
                />
              </FormControl>
              <Button
                marginTop="2%"
                background="#ECB7FF"
                color="#C82EFF"
                type="submit"
                value="Submit"
                _hover={{
                  bgGradient: "linear(to-r, red.500, yellow.500)",
                  color: "white",
                }}
                borderRadius="4px"
                width="10%"
              >
                Save summary
              </Button>
            </form>
          </Box>

          <DeleteBookModal
            isOpen={isOpen}
            onClose={onClose}
            onSuccessfulUpload={onSuccessfulUpload}
            id={id}
          />
        </>
      ) : (
        <>Please wait.........</>
      )}
    </>
  );
}

export default SingleBookPage;
