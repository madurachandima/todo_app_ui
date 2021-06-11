import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { Button, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const toast = useToast();

  const sendData = async () => {
    return axios
      .post("/user/register", {
        userName: userName,
        email: email,
        password: password,
      })
      .then((response) => response);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (validateAlert()) {
      const response = await sendData();
      if (response.data.id) {
        toastMessage("Registration Success ", "success");
      } else {
        toastMessage(response.data, "error");
      }
    }
  };

  const validateAlert = () => {
    if (email.trim() === "") {
      toastMessage("Email cannot be empty ", "error");
      return false;
    }

    if (userName.trim() === "") {
      toastMessage("User name cannot be empty ", "error");
      return false;
    }

    if (password.trim() === "" || conPassword.trim() === "") {
      toastMessage("Password cannot be empty ", "error");
      return false;
    } else {
      if (password.trim() !== conPassword.trim()) {
        toastMessage("Password do not match ", "error");
        return false;
      }
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
        User Registration
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
        <FormLabel>User name</FormLabel>
        <Input
          placeholder="User name"
          onChange={(e) => setUserName(e.target.value)}
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

      <FormControl
        w="md"
        maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
        id="first-name"
        isRequired
        m={3}
      >
        <FormLabel>Conform Password</FormLabel>
        <Input
          type="password"
          placeholder="Conform Password"
          onChange={(e) => setConPassword(e.target.value)}
        />
      </FormControl>

      <Button
        width="100%"
        type="submit"
        colorScheme="blue"
        variant="outline"
        onClick={registerUser}
      >
        Register
      </Button>
      <Link to="/">Already registed click here </Link>
    </VStack>
  );
}

export default Register;
