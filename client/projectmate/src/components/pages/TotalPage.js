import React from 'react';
import Post from '../Post';

const Home = () =>{
    return(
        <>
            <div className='sub-btn-container'><button className='sub-btn'>웹프레임워크1</button></div>
            <div className='post-header'>게시물</div>
            <div className='post-container'>
                <Post/>
                <Post/>
            </div>
        </>
    )
}

export default Home;