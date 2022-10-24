import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Spinner,
  Image,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";

//import context
import { useAuthContext } from "../../context/authcontext";

//import redirect react router
import { redirect } from "react-router-dom";

//import image
import bookrdrLogo from "../assets/Vector.png";

import axios from "axios";

//importing icons
import { MdOutlineError } from "react-icons/md";

export default function SignUpForm() {
  //destructuring auth context
  const { setIsAuthed, setToken } = useAuthContext();
  const [input, setInput] = useState({
    user_username: "",
    user_email: "",
    user_password: "",
  });
  const [error, setError] = useState({});
  const [isLoading, setIsloading] = useState(false);

  const handleChange = (event) => {
    input[event.target.name] = event.target.value;
    setInput(input);
  };

  //validating form inputs
  function validate() {
    let checkInput = input;
    let errors = {};
    let isValid = true;

    if (checkInput["user_username"].length < 8) {
      isValid = false;
      errors["name"] = "Username should be minimum 8 characters long.";
    }

    if (typeof checkInput["user_email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(input["user_email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }

    if (checkInput["user_password"].length < 8) {
      isValid = false;
      errors["password"] = "Password should be minimum 8 characters long";
    }

    if (checkInput["user_password"].length > 36) {
      isValid = false;
      errors["password"] = "Password should be of maximum 36 characters long";
    }

    setError(errors);
    return isValid;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
      setIsloading(true);

      const response = axios
        .post("http://localhost:5000/signup", {
          username: `${input.user_username}`,
          email: `${input.user_email}`,
          password: `${input.user_password}`,
        })
        .then(function (response) {
          setToken(response.data.token);
          setIsAuthed(true);
          setIsloading(false);
          redirect("/dashboard");
        })
        .catch(function (error) {
          setError({ error: `${error.response.data}` });
          setIsAuthed(false);
          setIsloading(false);
          redirect("/");
        });
    }
  };
  return (
    <>
      {isLoading ? (
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          height="100vh"
        >
          <Box marginLeft="auto" marginRight="auto">
            <Box>
              <Text fontSize="xl" fontWeight={700}>
                {" "}
                Please Wait....
              </Text>
            </Box>
            <Box paddingLeft="33px">
              <Spinner size="xl" />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          height="100vh"
        >
          <Box
            boxShadow="md"
            borderRadius="sm"
            padding="32px"
            width={{ base: "90%", md: "50%", lg: "50%", xl: "50%" }}
            marginLeft="auto"
            marginRight="auto"
          >
            <Box display="flex" gap="15px" alignItems="center">
              <Image src={bookrdrLogo} width="32px" height="26.21px" />
              <Text fontSize="32px" color="#C92EFF" fontWeight={400}>
                Bookrdr
              </Text>
            </Box>
            <Box marginY="24px">
              <Text fontSize="26px" fontWeight={400}>
                Create free account
              </Text>
            </Box>
            <Box marginY="24px">
              <Text>
                Already have an account?{" "}
                <Link href="/signin" color="#339AF0">
                  Sign In here!
                </Link>
              </Text>
            </Box>
            <Box width="100%">
              <form onSubmit={handleSubmit}>
                <FormControl id="username" isRequired>
                  <FormLabel fontSize="18px">Full name</FormLabel>
                  <Input
                    type="text"
                    placeholder="type your full name here"
                    _focus={{
                      zIndex: "0",
                      borderColor: "#3182ce",
                    }}
                    name="user_username"
                    value={input.username}
                    onChange={handleChange}
                  />
                  <Text color="red" fontSize="18px" fontWeight={700}>
                    {error.name}
                  </Text>
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel fontSize="18px">Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="type your email here"
                    _focus={{
                      zIndex: "0",
                      borderColor: "#3182ce",
                    }}
                    name="user_email"
                    value={input.email}
                    onChange={handleChange}
                  />
                  <Text color="red" fontSize="18px" fontWeight={700}>
                    {error.email}
                  </Text>
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel fontSize="18px">Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="type your password here"
                    _focus={{
                      zIndex: "0",
                      borderColor: "#3182ce",
                    }}
                    name="user_password"
                    value={input.password}
                    onChange={handleChange}
                  />
                  <Text color="red" fontSize="18px" fontWeight={700}>
                    {error.password}
                  </Text>
                </FormControl>
                <Text fontSize="14px" fontWeight={400} marginY="16px">
                  By signing in, you agree with our privacy and usage terms
                </Text>
                <Box
                  width="100%"
                  as="button"
                  mt="2%"
                  p={2}
                  color="white"
                  fontWeight="bold"
                  borderRadius="8px"
                  background="#C92EFF"
                  _hover={{
                    bgGradient: "linear(to-r, red.500, yellow.500)",
                  }}
                  type="submit"
                  value="Submit"
                >
                  Sign Up
                </Box>
              </form>
            </Box>
            {error.error ? (
              <Box
                display="flex"
                justifyContent="space-between"
                marginTop="5px"
                padding="1rem"
                backgroundColor=" #c21a0e"
                color="white"
                fontSize="lg"
                fontWeight={600}
                borderRadius="6px"
              >
                <Box display="flex" flexDirection="row" alignItems="center">
                  <MdOutlineError />
                  <Text marginLeft="6px">{error.error}</Text>
                </Box>
                <Box display="flex" flexDirection="row"></Box>
              </Box>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
