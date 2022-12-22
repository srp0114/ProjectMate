import React from 'react';
import Post from '../Post.js';

const Home = () =>{
    return(
        <>
        <div className='sub-btn-container'>
            <button className='sub-btn'>자료구조</button>
            <button className='sub-btn'>프로그래밍랩</button>
            <button className='sub-btn'>웹프로그래밍</button>
            <button className='sub-btn'>데이터통신</button>
        </div>
        <div className='post-header'>게시물</div>
        <div className='post-container'>
            <Post/>
            <Post/>
        </div>
        </>
    )
}

export default Home;