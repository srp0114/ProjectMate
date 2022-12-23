import React from 'react'
import Post from '../Post'

const totalButton =()=>{
    return(
        <>
            <div className='sub-btn-container'>
                    <button className='sub-btn'>캡스톤디자인</button>
                    <button className='sub-btn'>웹프레임워크2</button>
            </div>
            <div className='post-container'>
                <Post/>
            </div>
        </>
    )
}

export default totalButton;