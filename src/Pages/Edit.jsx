import { Box } from "@chakra-ui/react";
import { SimpleGrid, Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Heading, Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TITLE_INPUT = "TITLE_INPUT";
const DESC_INPUT = "DESC_INPUT";
const CHECKBOX_INPUT = "CHECKBOX_INPUT";

const initialState = {
  title: "",
  description: "",
  status: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case TITLE_INPUT:
      return { ...state, title: payload };
    case DESC_INPUT:
      return { ...state, description: payload };
    case CHECKBOX_INPUT:
      return { ...state, status: payload };
    default:
      return state;
  }
};

function Edit() {
  const { id } = useParams();

  const handleNavigation = useNavigate("");
  const [formData, dispatch] = useReducer(reducer, initialState);

  const makePatchRequest = async () => {
    try {
      await axios.patch(`http://localhost:8080/tasks/${id}`, {
        title: formData.title,
        description: formData.description,
        status: formData.status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    makePatchRequest();

    handleNavigation("/");
  };

  return (
    <Box p={10} textAlign="center">
      <Heading>Update Your Task</Heading>
      <SimpleGrid width="50%" margin="auto" gap={5} mt={10}>
        <form onSubmit={handleSubmit}>
          <Flex gap={5} alignItems="center">
            <Input
              placeholder="Enter Todo"
              width="30%"
              onChange={(e) => {
                dispatch({ type: TITLE_INPUT, payload: e.target.value });
              }}
            />
            <label>
              Status:{" "}
              <input
                type="checkbox"
                onChange={(e) => {
                  dispatch({ type: CHECKBOX_INPUT, payload: e.target.checked });
                }}
              />
            </label>
            <Input
              placeholder="Add Description"
              width="40%"
              onChange={(e) => {
                dispatch({ type: DESC_INPUT, payload: e.target.value });
              }}
            />
            <Button type="submit">Add</Button>
          </Flex>
        </form>
      </SimpleGrid>
    </Box>
  );
}

export default Edit;
