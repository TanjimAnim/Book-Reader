import { useParams } from "react-router-dom";

import { Box, Text, Image, useDisclosure } from "@chakra-ui/react";

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

  const { book_id, slug } = useParams();
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
                <Box width="1024px">
                  <Text fontSize="28px" fontWeight={700}>
                    {item.book_name}
                  </Text>

                  <Text fontSize="20px">Author:{item.book_author}</Text>
                  <Text fontSize="28px">Year:{item.year}</Text>
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
              );
            })}
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
