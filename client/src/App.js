import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home";
import RecipeCreate from "./components/RecipeCreate/RecipeCreate.jsx";
import Detail from "./components/Detail/Detail.jsx";

function App() {
  return (
    <div className="App">
      {/* <h1>Food APP</h1> */}
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/recipe" element={<RecipeCreate />} />
        <Route path="home/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
