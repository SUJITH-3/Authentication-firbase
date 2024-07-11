import Register from "./Register";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>


    </div>

  )
}

export default App;
