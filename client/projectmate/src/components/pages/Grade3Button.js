import React from 'react'
import Post from '../Post'

const Grade3Button =()=>{
    return(
        <>
            <div className='sub-btn-container'>
                    <button className='sub-btn'>네트워크프로그래밍</button>
                    <button className='sub-btn'>웹프레임워크1</button>
            </div>
            <div className='post-container'>
                <Post/>
            </div>
        </>
    )
}

export default Grade3Button;