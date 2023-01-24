import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import Details from "./components/pages/Details"
import Register from "./components/pages/Register"
import Edit from "./components/pages/Edit"
import Upload from "./components/pages/Upload"
import MyPage from "./components/pages/MyPage"
import './App.css';
import './style.css'

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/post/:id" element={<Details/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
        <Route path="/upload" element={<Upload/>}/>
        <Route path="/mypage" element={<MyPage/>}/>
      </Routes>
    </Router>
  )
}

export default App;