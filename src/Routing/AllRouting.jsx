import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Create from "../Pages/Create";
import Edit from "../Pages/Edit";
import Todo from "../Pages/Todo";

function AllRouting() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/task/:id" element={<Todo />} />
    </Routes>
  );
}

export default AllRouting;
