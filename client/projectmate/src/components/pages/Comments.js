import React, { useState } from 'react'
import Comment from './Comment'
import axios from 'axios';
import {Button} from 'antd';
import '../css/Details.css';

const Comments = (props) =>{
    const [comment, setComment] = useState('');
    const [secret, setSecret] = useState(0);
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
            url: `/comment/${props.postId}`,
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

        if(comment !== ''){
            await axios(config).then((response)=>console.log(response.data)).catch((e) => console.log('something went wrong :(', e));
            setComment('');
            props.getComments();
            setSecret(0);
        }
    }

    const commentHandler = (e) =>{
        setComment(e.target.value);
    }

    return(
        <>
            <div className='comment-input-container'>
                <div>
                    <textarea className='comment-input' placeholder='댓글을 입력하세요...' onChange={commentHandler} value={comment}></textarea>
                </div>
                <div className='comment-btn-container'>
                    <div>
                        <label for='secret-comment' className="changeFont">비밀글</label>
                        <input type='checkbox' className='secret-comment' id='secret-comment' onClick={secretHandler} checked={secret}/>
                    </div>
                    <Button className='comment-btn' onClick={postComment} size="large">댓글 등록</Button>
                </div>
            </div>
            <div className='comments-container'>
                {props.commentList.map((comment)=>(
                    <Comment {...comment} auth={props.auth} getComments={props.getComments} postId={props.postId}/>
                ))}
            </div>
        </>
    )
}

export default Comments