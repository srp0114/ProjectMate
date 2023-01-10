import React, {useState, useEffect, useCallback} from 'react'
import Comment from './Comment'
import axios from 'axios';

const Comments = (props) =>{
    const [comment, setComment] = useState('');

    const auth = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxODkxMTk5Iiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY3MzM1MzQ2OSwiZXhwIjoxNjczMzU3MDY5fQ.sLUK11lByaPftQG1hrKfkz_I56NizY3VJDPbGmHqGpA';

    const postComment =async()=>{
        var config = {
            method: `post`,
            url: `/comment/1`,
            headers: { 
              'Authorization': `${auth}`,
              'Content-Type': 'application/json'
            },
            data : {
            "content" : `${comment}`,
            "parentId" : null,
            "secret" : 0
            }
          };

        await axios(config).then((response)=>console.log(response.data)).catch((e) => console.log('something went wrong :(', e));
        setComment('');
        console.log(' !!?!');
    }

    //수정

    useEffect(()=>{
        var config = {
            method: `get`,
            url: '/comment/1',
            headers: { 
              'Authorization': `${auth}`,
              'Content-Type': 'application/json'
            },
          };

        axios.get(config.url).then((response)=>{
            console.log(response.data) 
        });
    },[comment])

    const commentHandler = (e) =>{
        setComment(e.target.value);
        console.log(e.target.value)
    }

    return(
        <>
            <div className='comment-input-container'>
                <input type='text' className='comment-input' placeholder='댓글을 입력하세요...' onChange={commentHandler} value={comment}></input>
                <button className='comment-btn' onClick={postComment}>댓글 등록</button>
            </div>
            <div className='comments-container'>
                {props.commentList.map((comment)=>(
                    <Comment {...comment}/>          //key값은??
                ))}
            </div>
        </>
    )
}

export default Comments