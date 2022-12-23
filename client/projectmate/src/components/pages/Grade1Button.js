import React from 'react'
import Post from '../Post'

const Grade1Button =()=>{
    return(
        <>
            <div className='sub-btn-container'>
                    <button className='sub-btn'>웹프로그래밍기초</button>
                    <button className='sub-btn'>컴퓨터프로그래밍</button>
            </div>
            <div className='post-container'>
                <Post/>
            </div>
        </>
    )
}

export default Grade1Button;