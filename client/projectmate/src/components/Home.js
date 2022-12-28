import React, { useState, useEffect, useCallback } from 'react';
import TotalButton from './pages/TotalButton';
import Grade1Button from './pages/Grade1Button';
import Grade2Button from './pages/Grade2Button';
import Grade3Button from './pages/Grade3Button';
import Grade4Button from './pages/Grade4Button';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import Post from './Post';

const Home=()=>{
    const [button, setButton] = useState('');
    const [activeButton, setActive] = useState(false);
    const [posts, setPosts] = useState([]);

    const [page, setPage]= useState(0);
    const [loading, setLoading] = useState(false);
    
    const [ref, inView] = useInView();

    const handleClickButton = e => {
        const name = e.target.value;
        setButton(name);
    };

    const selectComponent = {               //배열에 버튼별 컴포넌트를 저장해둔다.
        'total' : <TotalButton/>,
        'grade1': <Grade1Button/>,
        'grade2': <Grade2Button/>,  
        'grade3': <Grade3Button/>,
        'grade4': <Grade4Button/>
    };

    //서버에서 아이템 가져오기
    const getPost = useCallback(async ()=>{
        setLoading(true);
        axios.get(`http://localhost:8080/post/postList/filtering?subject=웹&division=B&is_progress=1&page=${page}&size=1`)
        .then((response)=>{setPosts(prevState=>[...prevState, response.data.content])})
        .catch((error)=>console.log(error.response.data))
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
                <button className='main-btn' onClick={handleClickButton} value={'total'}>전체</button>
                <button className='main-btn' onClick={handleClickButton} value={'grade1'}>1학년</button>
                <button className='main-btn' onClick={handleClickButton} value={'grade2'}>2학년</button>
                <button className='main-btn' onClick={handleClickButton} value={'grade3'}>3학년</button>
                <button className='main-btn' onClick={handleClickButton} value={'grade4'}>4학년</button>
            </div>
            <div className='toggle-btn'>
                <h3 className='toggle-btn-name'>모집중</h3>
                <input type="checkbox" id="toggle" hidden/> 
                <label for="toggle" class="toggleSwitch">
                <span class="toggleButton"></span>   
                </label>
            </div>
            {button &&<div className='sub-btn-container'>{selectComponent[button]}</div>}
            <div className='post-container'>{posts.length}{posts.map((inform)=>(<Post title={inform.title} content={inform.content} writer={inform.writer} view_count={inform.view_count} comment_count={inform.comment_count}/>))}</div>
            <div className='observer' ref={ref}>옵저버</div>
            </>
    )
}

export default Home;