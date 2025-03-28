import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Builder } from "./pages/Builder";
// import { parseXml } from "./steps";
import { HeroSectionOne } from "./components/Home/HeroSection";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroSectionOne />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Home />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/builder" element={<Builder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
