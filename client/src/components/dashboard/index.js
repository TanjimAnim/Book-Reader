import { Box } from "@chakra-ui/react";
import { useEffect, useCallback, useState } from "react";

import axios from "axios";
import { useAuthContext } from "../../context/authcontext";
//importing components
import Navbar from "../navbar";
import Profile from "../profile";
import SingleBookPage from "../single-book";

import { Routes, Route } from "react-router-dom";
import FavoriteBookList from "../favorites";
import NotFound from "../../notfound";

//import redirect react router
import { redirect } from "react-router-dom";

export default function Dashboard() {
  const [listOfBooks, setListOfBooks] = useState([]);
  const { getToken, setIsAuthed, setToken } = useAuthContext();
  const token = getToken();
  const refreshBooksList = useCallback(() => {
    axios
      .get("http://localhost:5000/get-books", {
        headers: {
          "x-access-token": `${token}`,
        },
      })
      .then(function (response) {
        setListOfBooks(response.data);
      })
      .catch(function (error) {
        if (error.response.data === "Invalid token") {
          setIsAuthed(false);
          setToken(null);
          redirect("/");
        }
        console.log(error.response);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refreshBooksList();
  }, [refreshBooksList]);

  return (
    <>
      <Box minHeight="100vh" background="#F9F9F9">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Profile
                listOfBooks={listOfBooks}
                onSuccessfulUpload={refreshBooksList}
              />
            }
          />

          <Route
            path="/:book_id/:slug"
            element={
              <SingleBookPage
                listOfBooks={listOfBooks}
                onSuccessfulUpload={refreshBooksList}
              />
            }
          />
          <Route
            path="/favorite"
            element={
              <FavoriteBookList
                listOfBooks={listOfBooks}
                onSuccessfulUpload={refreshBooksList}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard/*" element={<NotFound />} />
        </Routes>
      </Box>
    </>
  );
}
