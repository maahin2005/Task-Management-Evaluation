import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Todo() {
  const { id } = useParams();

  const handleNavigation = useNavigate("");

  const handleEdit = () => {
    handleNavigation(`/edit/${id}`);
  };

  const [data, setData] = useState({});

  const getTodos = async () => {
    try {
      let response = await axios.get(`http://localhost:8080/tasks/${id}`);

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Box textAlign="center" width="60%" p={20} margin="auto">
      <Heading my={5}>Your Todo View</Heading>
      <Heading size="md">{data.title}</Heading>
      <Text> {data.description}</Text>
      <Text color="purple.500" fontWeight={600}>
        Status: {data.status ? "Completed" : "Pending"}
      </Text>
      <Flex justifyContent="center" gap={3} mt={2}>
        <Button onClick={handleEdit}>Edit</Button>
      </Flex>
    </Box>
  );
}

export default Todo;
