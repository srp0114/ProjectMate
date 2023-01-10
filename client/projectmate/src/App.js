import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Home from './components/Home'
import Banner from './components/Banner'
import LoginHeader from './components/LoginHeader'
import Details from "./components/pages/Details"
import Register from "./components/pages/Register"
import './App.css';
import './style.css'

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/post/:id" element={<Details/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  )
}

export default App;