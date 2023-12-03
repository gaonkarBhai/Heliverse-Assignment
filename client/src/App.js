import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
// import Nav from "./components/NavBar/Nav";
import Team from "./pages/Team/Team";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </>
  );
}

export default App;
