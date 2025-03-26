import { Routes, Route } from "react-router-dom";
import Home from "./src/Frontend/components/home";
import NavBar from "./src/Frontend/components/navbar";
import PromptPage from "./src/Frontend/components/prompt";
const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prompt" element={<PromptPage/>} />
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
