import "./App.css";
import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import CardsDetail from "./Components/CardsDetail";
import Cards from "./Components/Cards";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/cart/:id" element={<CardsDetail />} />
      </Routes>
    </>
  );
}

export default App;
