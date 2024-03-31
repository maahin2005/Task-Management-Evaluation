import { Button, Heading, SimpleGrid, Text, Flex } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function TodoItem({ status, description, title, id, render, setRender, date }) {
  const handleNavigation = useNavigate("");

  const handleEdit = () => {
    handleNavigation(`/edit/${id}`);
  };
  const handleView = () => {
    handleNavigation(`/task/${id}`);
  };

  const deleteRequest = async () => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = () => {
    deleteRequest();
    setRender(!render);
  };

  return (
    <SimpleGrid
      boxShadow="xl"
      p={5}
      bg={status ? "green.100" : "red.100"}
      borderRadius={10}
    >
      <Heading size="md">{title}</Heading>
      <Text> {description}</Text>
      <Text color="purple.500" fontWeight={600}>
        Status: {status ? "Completed" : "Pending"}
      </Text>
      <Text>Created At: {date}</Text>
      <Flex justifyContent="center" gap={3} mt={2}>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleView}>View</Button>
      </Flex>
      <Button colorScheme="red" my={5} onClick={handleDeleteTodo}>
        DELETE
      </Button>
    </SimpleGrid>
  );
}

export default TodoItem;
