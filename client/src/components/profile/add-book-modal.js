import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

import { useAuthContext } from "../../context/authcontext";
import { useState } from "react";

import axios from "axios";

function AddBookModal(props) {
  const { getToken } = useAuthContext();
  const token = getToken();
  const [input, setInput] = useState({
    book_name: "",
    year: "",
    book_author: "",
  });
  const toast = useToast(); // toast hooks for push notification
  const handleChange = (event) => {
    input[event.target.name] = event.target.value;
    setInput(input);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    const response = await axios
      .post("http://localhost:5000/add-books", {
        token: `${token}`,
        book_author: `${input.book_author}`,
        book_name: `${input.book_name}`,
        year: input.year,
      })
      .then(function (response) {
        toast({
          title: `${response.data.message}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        props.onSuccessfulUpload();
        props.onClose();
      })
      .catch(function (error) {
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
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a book</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl id="book-name" isRequired>
                <FormLabel fontSize="14px">Book name</FormLabel>
                <Input
                  placeholder="book name"
                  type="text"
                  _focus={{
                    zIndex: "0",
                    borderColor: "#3182ce",
                  }}
                  name="book_name"
                  value={input.name}
                  onChange={handleChange}
                  maxLength={100}
                  minLength={8}
                />
              </FormControl>

              <FormControl mt={4} id="author" isRequired>
                <FormLabel fontSize="14px"> Author</FormLabel>
                <Input
                  placeholder="author name"
                  type="text"
                  _focus={{
                    zIndex: "0",
                    borderColor: "#3182ce",
                  }}
                  name="book_author"
                  value={input.author}
                  onChange={handleChange}
                  maxLength={50}
                  minLength={4}
                />
              </FormControl>

              <FormControl mt={4} id="year" isRequired>
                <FormLabel>Year</FormLabel>
                <Input
                  placeholder="year"
                  type="number"
                  min="-999"
                  max="9999"
                  _focus={{
                    zIndex: "0",
                    borderColor: "#3182ce",
                  }}
                  name="year"
                  value={input.bookyear}
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                marginTop="2%"
                background="#C92EFF"
                color="white"
                type="submit"
                value="Submit"
                _hover={{
                  bgGradient: "linear(to-r, red.500, yellow.500)",
                }}
                borderRadius="4px"
                width="100%"
              >
                Add book
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddBookModal;
