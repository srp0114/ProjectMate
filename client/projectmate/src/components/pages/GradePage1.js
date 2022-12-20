import React from 'react';
import Post from '../Post.js';

const Home = () =>{
    return(
        <>
        <div className='sub-btn-container'><button className='sub-btn'>컴퓨터프로그래밍</button><button className='sub-btn'>웸프로그래밍기초</button></div>
        <div className='post-header'>게시물</div>
        <div className='post-container'>
            <Post/>
            <Post/>
        </div>
        </>
    )
}

export default Home;