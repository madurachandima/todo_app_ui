import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Text, VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = props;

  const toast = useToast();

  const sendData = async () => {
    return axios
      .post("/user/login", {
        email: email,
        password: password,
      })
      .then((response) => response);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    if (validateAlert()) {
      const response = await sendData();
      if (response.data.token !== "") {
        setToken(response.data.token);
      } else {
        toastMessage("Username or Password incorrect.", "error");
      }
    }
  };

  const validateAlert = () => {
    console.log(email);
    if (email.trim() === "") {
      toastMessage("Email cannot be empty ", "error");
      return false;
    }
    if (password.trim() === "") {
      toastMessage("Password cannot be empty ", "error");
      return false;
    }
    return true;
  };

  const toastMessage = (titile, status) => {
    toast({
      title: titile,
      status: status,
      duration: 1000,
      isClosable: true,
    });
  };
  return (
    <VStack>
      <Text m={3} fontSize="20pt">
        User Login
      </Text>

      <FormControl
        w="md"
        maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
        isRequired
        m={3}
      >
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl
        w="md"
        maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
        isRequired
        m={3}
      >
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <Button
        width="100%"
        type="submit"
        colorScheme="blue"
        variant="outline"
        onClick={loginUser}
      >
        Login
      </Button>
      <Link to="/register">Dont have a account click here </Link>
    </VStack>
  );
}

export default Login;
