import React from 'react';
import Post from '../Post.js';

const Home = () =>{
    return(
        <>
        <div className='sub-btn-container'>
            <button className='sub-btn'>캡스톤디자인</button>
            <button className='sub-btn'>웹프레임워크2</button>
        </div> <div className='post-header'>게시물</div>
        <div className='post-container'>
            <Post/>
            <Post/>
        </div>
        </>
    )
}

export default Home;