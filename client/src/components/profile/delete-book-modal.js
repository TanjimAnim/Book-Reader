import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context/authcontext";

function DeleteBookModal({ isOpen, onClose, onSuccessfulUpload, id }) {
  const { getToken } = useAuthContext();
  const navigate = useNavigate();
  const token = getToken();
  const toast = useToast(); // toast hooks for push notification
  const deleteBook = async () => {
    axios
      .post("http://localhost:5000/delete-book", {
        token: `${token}`,
        book_id: `${id}`,
      })
      .then((response) => {
        console.log("delete", response);
        onSuccessfulUpload();
        navigate("/dashboard");
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
  const cancelRef = React.useRef();
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Book
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteBook();
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteBookModal;
