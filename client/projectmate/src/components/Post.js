import React from 'react';

const Post = (props) =>{
    return(
    <>
    <div className='post'>
        <p className='post-title'>{props.title}</p>
        <p className='post-content'>{props.content}</p>
        <div className='post-footer'>
            <div className='owner'>
                <img src="./logo512.png" className='profile-photo'/><span className='owner-name'>{props.writer}</span>
            </div>
            <div className='icons'>
                <img src= "./eyes.png" width="30px" height="30px"/><span className='etc-num'>{props.view_count}</span>
                <img src= "./comment.png" width="30px" height="30px"/><span className='etc-num'>{props.comment_count}</span>
            </div>
        </div>
    </div>
    </>
    );
}

export default Post;