import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import AllRouting from "./Routing/AllRouting";

function App() {
  return (
    <ChakraProvider>
      <AllRouting />
    </ChakraProvider>
  );
}

export default App;
