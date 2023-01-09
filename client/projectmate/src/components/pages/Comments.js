import React, {useState, useEffect, useCallback} from 'react'
import Comment from './Comment'
import axios from 'axios';

const Comments = (props) =>{
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState(props.list);

    const auth = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxODkxMTk4Iiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY3MzE4ODQxOSwiZXhwIjoxNjczMTkyMDE5fQ.LVST7S_2vDELk8i_ckg4Zo6cBdgWS3VNkJy1qBW4AJY';
    const method = 'get';

    const postComment =()=>{
        const json ={
            "comment" : `${comment}`,
            "parentId" : 1,
            "secret" : 0
        }   
        axios.post(`http://localhost:8080/comment/${props.postId}`,json).then((response)=>console.log(response.data)).catch((e) => console.log('something went wrong :(', e));
        setComment('');
        console.log(json);
    }
    
    var config = {
        method: `${method}`,
        url: '/post/1',
        headers: { 
          'Authorization': `${auth}`,
          'Content-Type': 'application/json'
        },
      };


    //수정
    

    useEffect(()=>{
        axios.get(config.url).then((response)=>{
            setCommentList([response.data])
            console.log(response.data) 
        });
    },[])

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
                {commentList.map((comment, key)=>(
                    <Comment name={comment.name} comment={comment.comment} key={comment}/>          //key값은??
                ))}
            </div>
        </>
    )
}

export default Comments