import { useParams } from "react-router-dom";

import {
  Box,
  Text,
  Image,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  chakra,
  Button,
  useToast,
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

//update book modal
import EditBookModal from "./edit-book-modal";

function SingleBookPage({ listOfBooks, onSuccessfulUpload }) {
  const toast = useToast(); // toast hooks for push notification
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  //gettoken from context
  const { getToken } = useAuthContext();
  const token = getToken();

  const { book_id } = useParams();
  const [id, setId] = useState(null);

  const [input, setInput] = useState({
    book_summary: "",
  });
  const handleChange = (event) => {
    input[event.target.name] = event.target.value;
    setInput(input);
  };

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
        toast({
          title: `${response.data.message}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: `${error.response.statusText}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
        toast({
          title: `${response.data.message}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: `${error.response.statusText}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/update-summary", {
        token: `${token}`,
        book_id: `${book_id}`,
        book_summary: `${input.book_summary}`,
      })
      .then((response) => {
        console.log("update", response);
        onSuccessfulUpload();
        toast({
          title: `${response.data.message}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error.response.statusText);
        toast({
          title: `${error.response.statusText}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
                          onDeleteOpen();
                          setId(item.book_id);
                        }}
                      >
                        <Image src={deleteIconImage} />
                      </Box>
                      <Box
                        style={boxIconStyle}
                        onClick={() => {
                          onEditOpen();
                          setId(item.book_id);
                        }}
                      >
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
                  <Box>
                    <form onSubmit={handleSubmit}>
                      <FormControl id="comment" isRequired>
                        <FormLabel color="#6F7482" fontSize="18px">
                          Book Summary
                        </FormLabel>
                        <Textarea
                          placeholder={`${item.book_summary}`}
                          minLength="150"
                          maxLength="255"
                          _focus={{
                            zIndex: "0",
                            borderColor: "#3182ce",
                          }}
                          size="md"
                          background="white"
                          name="book_summary"
                          value={input.summary}
                          onChange={handleChange}
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
                </Box>
              );
            })}

          <DeleteBookModal
            isOpen={isDeleteOpen}
            onClose={onDeleteClose}
            onSuccessfulUpload={onSuccessfulUpload}
            id={id}
          />
          <EditBookModal
            isOpen={isEditOpen}
            onClose={onEditClose}
            onSuccessfulUpload={onSuccessfulUpload}
            book_id={id}
          />
        </>
      ) : (
        <>Please wait.........</>
      )}
    </>
  );
}

export default SingleBookPage;
