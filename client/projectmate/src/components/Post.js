import React from 'react';

const Post =() =>{
    return(
    <>
    <div className='post'>
        <p className='post-title'>게시물 명</p>
        <p className='post-content'>게시글</p>
        <div className='post-footer'>
            <div className='owner'>
                <img src="./logo512.png" className='profile-photo'/><span className='owner-name'>작성자</span>
            </div>
            <div className='icons'>
                <img src= "./eyes.png" width="30px" height="30px"/><span className='etc-num'>1</span>
                <img src= "./comment.png" width="30px" height="30px"/><span className='etc-num'>2</span>
            </div>
        </div>
    </div>
    </>
    );
}

export default Post;