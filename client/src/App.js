import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      {/* <h1>Food APP</h1> */}
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
