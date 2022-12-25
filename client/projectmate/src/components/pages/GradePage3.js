import React from 'react';
import Post from '../Post.js';

const Home = () =>{
    return(
        <>
        <div className='sub-btn-container'>
            <button className='sub-btn'>웹프레임워크1</button>
            <button className='sub-btn'>가상현실</button>
            <button className='sub-btn'>안드로이드프로그래밍</button>
            <button className='sub-btn'>네트워크프로그래밍</button>
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