import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import Post from './Post';
import TestPost from './TestPost'

const TestHome=()=>{
    const [button, setButton] = useState('');

    const [posts, setPosts] = useState([]);

    const [page, setPage]= useState(0);
    const [loading, setLoading] = useState(false);
    
    const [ref, inView] = useInView();

    const [subject, setSubject] = useState('');
    const [s_btn, setS_btn] = useState(false);
    const [division, setDivision] = useState('');
    const [is_progress, setProgress] = useState(1);

    const div =['A','B','N','1'];

    const Button = (props) =>{          //props.name,  props.func
        return(
            <>
                <button className='sub-btn' onClick={props.func} value={props.name}>{props.name}</button>
            </>
        )
    }
    //학년버튼
    const handleClickButton = e => {
        const name = e.target.value;
        setButton(name);
        setS_btn(false);
    };
    //전체버튼
    const handleClickTotalButton = e =>{
        setS_btn(false);
    }
    //서브젝트 버튼
    const handleClickSubjectButton = e =>{
        setSubject(e.value);
        setS_btn(true);
    }

    //분반 버튼
    const handleClickDivisionButton = e =>{
        setDivision(e.value);
    }

    //모집중 버튼 : 토글버튼 이용
    const handleClickProgressButton = e =>{
        if(e.target.checked){
            setProgress(1);
        }
        else{
            setProgress(0);
        }
    }

    const selectComponent = {               //배열에 버튼별 컴포넌트를 저장해둔다.
        'grade1': ['웹프로그래밍기초', '컴퓨터프로그래밍'],
        'grade2': ['컴퓨터구조', '자료구조', '객체지향언어1'],
        'grade3': ['웹프웤1', '가상현실'],
        'grade4': ['웹프웤2', '캡스톤디자인']
    };

    //서버에서 아이템 가져오기
    const getPost = useCallback(async ()=>{
        setLoading(true);
        await axios.get(`http://localhost:8080/post/postList/filtering?subject=${subject}&division=${division}&is_progress=${is_progress}`)
        .then((response)=>{
            setPosts(prevState=>[...prevState, response.data.content])
        })
        .catch((error)=>console.log(error.response.data));
        setLoading(false);
    },[page])

    useEffect(()=>{
        getPost()   
    },[getPost])

    useEffect(()=>{
        if(inView&&!loading){
            setPage(prevState => prevState+1)
        }
    },[inView, loading])

    return(
        <>
            <div className='btn-container'>
                <button className='main-btn' onClick={handleClickTotalButton}>전체</button>
                <button className='main-btn' onClick={handleClickButton} value={'grade1'}>1학년</button>
                <button className='main-btn' onClick={handleClickButton} value={'grade2'}>2학년</button>
                <button className='main-btn' onClick={handleClickButton} value={'grade3'}>3학년</button>
                <button className='main-btn' onClick={handleClickButton} value={'grade4'}>4학년</button>
            </div>

            <div className='sub-btn-container'>
                <div>
                    {button &&<>{selectComponent[button].map((btn)=>(<Button name={btn} func={handleClickSubjectButton}/>))}</>}
                </div>
                <div className='toggle-btn'>
                    <h3 className='toggle-btn-name'>모집중</h3>
                    <input type="checkbox" id="toggle" hidden/> 
                    <label for="toggle" class="toggleSwitch">
                    <span class="toggleButton"></span>   
                    </label>
                </div>
            </div>
            <div className='division-btn'>
                {s_btn&&
                <div className='division-btn'>
                    {div.map((div)=>(<Button name={div} func={handleClickDivisionButton}/>))}
                </div>}
            </div>
            <div className='post-container'><TestPost/><TestPost/><TestPost/><TestPost/>{posts.map((inform)=>(<TestPost title={inform.title} content={inform.content} writer={inform.writer} view_count={inform.view_count} comment_count={inform.comment_count}/>))}</div>

            </>
    )
}
export default TestHome;