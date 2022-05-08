import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginButton from "./components/LoginButton";

const App = () => {
  return (
    <div>
      <LoginButton />
    </div>
  );
};

export default App;
