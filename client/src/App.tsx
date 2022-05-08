import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Account from "./components/Acount/Account";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <div>
        <Account />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
