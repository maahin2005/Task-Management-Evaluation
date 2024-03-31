import { Box } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TodoItem from "./../components/TodoItem";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [todos, setTodos] = useState([]);
  const [render, setRender] = useState(false);
  const [seconds, setSeconds] = useState(true);

  const handleNavigation = useNavigate();

  const fetchingTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tasks");
      console.log(response);
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingTodos();
    if (!seconds) {
      setTimeout(() => {
        setSeconds(true);
      }, 30000);
    }
  }, [render]);

  return (
    <Box p={10} textAlign="center">
      <Heading py={10}>Your Todos List</Heading>
      {seconds ? (
        <Button
          mb={10}
          onClick={() => {
            handleNavigation("/create");
            setSeconds(false);
          }}
        >
          Create New Todo
        </Button>
      ) : (
        <Heading size={"md"} mb={10}>
          Wait for 20 seconds
        </Heading>
      )}

      <SimpleGrid width="70%" margin="auto" columns={3} gap={5}>
        {todos.map((el) => (
          <TodoItem key={el.id} {...el} setRender={setRender} render={render} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Home;
