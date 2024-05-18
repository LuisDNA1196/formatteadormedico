import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { FormularioEmpleo } from "./components/FormularioEmpleo";
import { ChakraProvider } from "@chakra-ui/react";
import { FormularioPresent } from "./components/FormularioPresent";

function App() {
  return (
    <Router>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="FormularioPresent" element={<FormularioPresent />} />
          <Route path="FormularioEmpleo" element={<FormularioEmpleo />} />
        </Routes>
      </ChakraProvider>
    </Router>
  );
}

export default App;
