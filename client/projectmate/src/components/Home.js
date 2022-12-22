import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TotalPage from './pages/TotalPage';
import GradePage1 from './pages/GradePage1';
import GradePage2 from './pages/GradePage2';
import GradePage3 from './pages/GradePage3';
import GradePage4 from './pages/GradePage4';
import NotFound from './pages/NotFound';
import { Link } from 'react-router-dom';

const Home = () =>{
    return(
        <>
        <BrowserRouter> 
            <div className='btn-container'>
                <Link to ="/"><span className='main-btn'>전체</span></Link>
                <Link to ="grade1"><span className='main-btn'>1학년</span></Link>
                <Link to ="grade2"><span className='main-btn'>2학년</span></Link>
                <Link to ="grade3"><span className='main-btn'>3학년</span></Link>
                <Link to ="grade4"><span className='main-btn'>4학년</span></Link>
            </div>
            <div>  
                    <Routes>
                        <Route path = "/" element={<TotalPage/>}></Route>
                        <Route path = "grade1" element={<GradePage1/>}></Route>
                        <Route path = "grade2" element={<GradePage2/>}></Route>
                        <Route path = "grade3" element={<GradePage3/>}></Route>
                        <Route path = "grade4" element={<GradePage4/>}></Route>
                        <Route path = "*" element={<NotFound />}></Route>
                    </Routes>
            </div>
            </BrowserRouter>
        </>
    )
}

export default Home;