import React, { useEffect, useState } from "react";
import { VStack, StackDivider } from "@chakra-ui/react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import axios from "../axios";

function TodoList(props) {
  const { authToken } = props;
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .post(
        "task/getTasks",
        {},
        {
          headers: {
            authorization: authToken,
          },
        }
      )
      .then((response) => {
        if (response.data.data !== null) {
          setTodos(response.data.data.tasks);
        }
      });
  }, []);

  return (
    <>
      <VStack
        divider={<StackDivider />}
        borderColor="gray.100"
        borderWidth="2px"
        padding="4"
        borderRadius="lg"
        w="100%"
        maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
        alignItems="stretch"
      >
        {todos.length > 0 ? (
          todos.map((todo) => (
            <Todo
              key={todo._id}
              {...todo}
              setTodos={setTodos}
              authToken={authToken}
            />
          ))
        ) : (
          <h3>No todo found</h3>
        )}
        ;
      </VStack>
      <AddTodo {...props} setTodos={setTodos} />
    </>
  );
}

export default TodoList;
