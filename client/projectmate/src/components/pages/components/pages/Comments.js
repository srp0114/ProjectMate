import React, {useEffect, useState} from 'react'
import Comment from './Comment'
import axios from 'axios';

const Comments = (props) =>{
    const [comment, setComment] = useState('');
    const [secret, setSecret] = useState(0);
    const [commentList, setCommentList] = useState([]);
    
    const auth = props.auth;

    const secretHandler = e =>{
        if(e.target.checked){
            setSecret(1);
        }
        else{
            setSecret(0);
        }
    }

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
            "secret" : `${secret}`
            }
          };

        await axios(config).then((response)=>console.log(response.data)).catch((e) => console.log('something went wrong :(', e));
        setComment('');
    }

    const getComments=async()=>{
        var config = {
            method: `get`,
            url: '/post/1',
            headers: { 
              'Authorization': `${auth}`,
              'Content-Type': 'application/json'
            },
        };
        //답글
        await axios(config).then((response)=>{
            setCommentList(response.data.commentList)
        })
    }

    useEffect(()=>{
        getComments();
    },[getComments])

    const commentHandler = (e) =>{
        setComment(e.target.value);
        console.log(e.target.value)
    }
    return(
        <>
            <div className='comment-input-container'>
                <div>
                    <textarea className='comment-input' placeholder='댓글을 입력하세요...' onChange={commentHandler} value={comment}></textarea>
                </div>
                <label for='secret-comment'>비밀글</label>
                <input type='checkbox' className='secret-comment' id='secret-comment' onClick={secretHandler}/>
                <button className='comment-btn' onClick={postComment}>댓글 등록</button>
            </div>
            <div className='comments-container'>
                {commentList.map((comment)=>(
                    <Comment {...comment} auth={props.auth} getComments={getComments}/>

                ))}
            </div>
        </>
    )
}

export default Comments