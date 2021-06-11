import React from "react";
import { IconButton } from "@chakra-ui/button";
import { HStack, Spacer, Text } from "@chakra-ui/layout";
import { FaTrash } from "react-icons/fa";
import axios from "../axios";
import { useToast } from "@chakra-ui/toast";

function Todo(props) {
  const { task, _id, setTodos, authToken } = props;
  const toast = useToast();

  const deleteTask = (id) => {
    axios
      .post(
        "task/delete",
        {
          id: id,
        },
        {
          headers: {
            authorization: authToken,
          },
        }
      )
      .then((response) => {
        setTodos(response.data.tasks);
        toastMessage("Task removed", "success");
      });
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
    <HStack>
      <Text>{task}</Text>
      <Spacer />
      <IconButton
        icon={<FaTrash />}
        isRound="true"
        alignSelf="flex-end"
        onClick={() => deleteTask(_id)}
      />
    </HStack>
  );
}

export default Todo;
