import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {AiFillLock} from 'react-icons/ai'
import '../css/Details.css';

const SubComment =(props) =>{
    const [isHover, setIsHover] = useState(false);
    const [modComment, setModComment]= useState(props.content);
    const [secret, setSecret] = useState(0);
    const [modState, setModState] = useState(false);

    const auth=props.auth;

    //비밀글 설정
    const secretHandler = e =>{
        if(e.target.checked){
            setSecret(1);
        }
        else{
            setSecret(0);
        }
    }

    //수정하기
    const ModifyComment = (e) => {
        setModState(true);
    }

    const ModCommentText = e =>{
        setModComment(e.target.value)
        console.log(modComment)
    }
  
    //수정 메시지 보내기
    const sendModComment=(e)=>{
        var config = {
            method: `put`,
            url: `/comment/${props.id}`,
            headers: { 
                'Authorization': `${auth}`,
                'Content-Type': 'application/json'
            },
            data : {
            "content" : `${modComment}`,
            "parentId" : `${props.parentId}`,
            "secret" : `${secret}`
            }
            };
            axios(config)
            .then(response => console.log('게시글 수정 성공'))
            .catch(error => {
                console.error(error);
            });
            setModState(false);
            setSecret(0);
            props.getComments();
    }

    //삭제
    const DeleteComment = e =>{
        var config={
            method: `delete`,
            url: `/comment/${props.id}`,
            headers: { 
                'Authorization': `${auth}`,
                'Content-Type': 'application/json'
            },
        }
        axios(config)
        .then(response => console.log('게시글 삭제 성공'))
        .catch(error => {
            console.error(error);
        });
        props.getComments();
    }

    return(
        <>
            {modState ? 
            <>
                <div className='mod-state'>
                    <textarea className='comment-mod-input' onChange={ModCommentText} value={modComment} />
                    <label for='secret-mod-comment2'>비밀글</label>
                    <input type='checkbox' className='secret-comment' id='secret-mod-comment2' onClick={secretHandler} checked={secret}/>
                    <button onClick={sendModComment} className='comment-btn'>수정하기</button>
                </div>
            </> 
            :
            <div className='sub-comment'>
                <div onMouseOver={()=>setIsHover(true)} onMouseOut={()=>setIsHover(false)}>
                    <p className='writer-content'><span className='writer'>{props.writer_nickname}</span>
                    {isHover && <div className='comment-sub-btn-container'>
                        {props.isWriter && <>
                            <button className='comment-btns' onClick={ModifyComment}>수정</button>
                            <button className='comment-btns' onClick={DeleteComment}>삭제</button>
                        </>
                        }
                        </div>}</p>
                    <p className='comment-content'>{props.secret ? <AiFillLock size="14"/> : <></>}<span>{props.content}</span></p>
                </div>
            </div>}         
        </>   
    )
}

export default SubComment;