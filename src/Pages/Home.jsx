import { Box } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TodoItem from "./../components/TodoItem";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Select } from "@chakra-ui/react";

function Home() {
  const [todos, setTodos] = useState([]);
  const [render, setRender] = useState(false);
  const [seconds, setSeconds] = useState(true);
  const [sorted, setSorted] = useState("all");

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

  const handleSorting = () => {
    if (sorted === "completed") {
      return todos.filter((el) => el.status === true);
    } else if (sorted === "pending") {
      return todos.filter((el) => el.status === false);
    } else {
      return todos;
    }
  };

  useEffect(() => {
    fetchingTodos();
    if (!seconds) {
      setTimeout(() => {
        setSeconds(true);
      }, 30000);
    }
  }, [render, todos]);

  return (
    <Box p={10} textAlign="center">
      <Heading py={10}>Your Todos List</Heading>
      <Select
        onChange={(e) => setSorted(e.target.value)}
        width="20%"
        margin="auto"
      >
        <option value="all">all</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </Select>
      {seconds ? (
        <Button
          my={5}
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
        {handleSorting().map((el) => (
          <TodoItem key={el.id} {...el} setRender={setRender} render={render} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Home;
