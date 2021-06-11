import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { HStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import axios from "../axios";
import { useToast } from "@chakra-ui/toast";

function AddTodo(props) {
  const [todo, setTodo] = useState("");
  const { authToken, setTodos } = props;

  const toast = useToast();

  const sendTask = async () => {
    return axios
      .post(
        "/task/save",
        {
          task: todo,
        },
        {
          headers: {
            authorization: authToken,
          },
        }
      )
      .then((response) => response);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateAddtask()) {
      const response = await sendTask();

      if (response.data.tasks.length > 0) {
        setTodos(response.data.tasks);
        setTodo("");
        toastMessage("Task added", "success");
      }
    }
  };

  const validateAddtask = () => {
    if (todo.trim() === "") {
      toastMessage("Cant in add todo is empty", "error");
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
    <form onSubmit={handleSubmit}>
      <HStack>
        <Input
          variant="filled"
          placeholder="Input todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button colorScheme="blue" px="8" type="submit">
          Add Todo
        </Button>
      </HStack>
    </form>
  );
}

export default AddTodo;
