import React from 'react'
import Post from '../Post'

const Grade2Button =()=>{
    return(
        <>
            <div className='sub-btn-container'>
                    <button className='sub-btn'>객체지향언어1</button>
                    <button className='sub-btn'>객체지향언어2</button>
            </div>
            <div className='post-container'>
                <Post/>
            </div>
        </>
    )
}

export default Grade2Button;