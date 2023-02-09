import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Modal, Switch } from 'antd';
import axios from 'axios';
import Header from './Header'
import LoginHeader from './LoginHeader'
import PostThumbnail from './PostThumbnail'
import Banner from './Banner'
import NonFound from './NonFound';
import { AiOutlineArrowUp} from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import "./css/Home.css"

const Home=()=>{
    const [grade, setGrade] = useState('전체');
    const [isLogin, setIsLogin] = useState(false);

    const [posts, setPosts] = useState([]);
    const [page, setPage]= useState(0);
    const [loading, setLoading] = useState(false);    
    const [ref, inView] = useInView();


    const [subject, setSubject] = useState('');
    const [s_btn, setS_btn] = useState(false);      //과목 버튼이 눌렸는지에 대한 상태 정보 저장 값
    const [division, setDivision] = useState('');
    const [is_progress, setProgress] = useState(1);
    const [isTotal, setIsTotal] = useState(true);

    const [ScrollY, setScrollY] = useState(0);
    const [BtnStatus, setBtnStatus] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    //학년
    const gradeComponent = ['전체','1학년','2학년','3학년','4학년']

    //과목
    const subjectComponent = {
        '전체' : [],
        '1학년': ['웹프로그래밍기초', '컴퓨터프로그래밍'],
        '2학년': ['컴퓨터구조', '자료구조', '객체지향언어1'],
        '3학년': ['웹프레임워크1', '가상현실'],
        '4학년': ['웹프레임워크2', '캡스톤디자인']

    };

    //분반
    const divComponent =['A','B','N','1'];

    const Button = (props) =>{          //props.name,  props.func
        return(
            <>
                <button className={props.style} onClick={props.func} value={props.name}>{props.name}</button>
            </>
        )
    }

    const DivButton = (props) =>{          //props.name,  props.func
        return(
            <>
                <button className={props.style} onClick={props.func} value={props.name}>{props.name}</button>
            </>
        )
    }
    
    //학년버튼
    const handleClickButton = e => {
        const name = e.target.value;
        if(name=='total'){
            setIsTotal(true);
            setPage(0);
            setPosts([]);
        }
            setGrade(name);
            setS_btn(false);
            setDivision('');
    };
    
    //서브젝트 버튼
    const handleClickSubjectButton = e =>{
            setSubject(e.target.value);
            setS_btn(true);
            setDivision('');
    }

    //분반 버튼
    const handleClickDivisionButton = e =>{
            setDivision(e.target.value);
            setIsTotal(false);
            setPosts([]);
            setPage(0);
    }

    //모집중 버튼 : 토글버튼 이용
    const handleClickProgressButton = e =>{
        setPosts([]);
        setPage(0);
        if(e.target.checked){
            setProgress(1);
        }
        else{
            setProgress(0);
        }
    }

    //top 버튼
    const handleFollow = () => {
        setScrollY(window.pageYOffset);
        if (ScrollY > 100) {
          // 100 이상이면 버튼이 보이게
          setBtnStatus(true);
        } else {
          // 100 이하면 버튼이 사라지게
          setBtnStatus(false);
        }
      };
    
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
      const handleTop = () => {
        // 클릭하면 스크롤이 위로 올라가는 함수
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setScrollY(0); // ScrollY 의 값을 초기화
        setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
      };

      const goToUpload = useNavigate();

      const upload = () => {
        if(isLogin){
            goToUpload('/upload')
        }
        else{
            //로그인 경고 모달창 띄우기.
            setIsModalOpen(true)
        }
        }
        const handleOk = () => {
            setIsModalOpen(false);
        }

      useEffect(() => {
        const watch = () => {
          window.addEventListener("scroll", handleFollow);
        };
        watch();
        return () => {
          window.removeEventListener("scroll", handleFollow);
        };
      });
/*
    const setLogin = () => {
        if(localStorage.length>=4)
            setIsLogin(true)
    }
*/
    const logOut = () =>{
        localStorage.clear();
        setIsLogin(false);
    }

    //서버에서 아이템 가져오기
    const getPost = useCallback(async ()=>{
        if(isTotal){
            setLoading(true)
            await axios.get(`http://localhost:8080/post/postList?page=${page}&size=6&is_progress=${is_progress}`)
            .then((response)=>{
                setPosts((prevState)=>prevState.concat(response.data.content))
                console.log(posts)
            })
            .catch((error)=>console.log(error.response.data))
            setLoading(false);
        }
        else{
            setLoading(true);
            await axios.get(`http://localhost:8080/post/postList/filtering?is_progress=${is_progress}&subject=${subject}&division=${division}&page=${page}&size=6`)
            .then((response)=>{
                setPosts((prevState)=>prevState.concat(response.data.content))
                console.log(posts)
            })
            .catch((error)=>console.log(error.response.data));
            setLoading(false);
        }
    },[page,isTotal,is_progress,division,subject])

    useEffect(()=>{
        getPost()
    },[getPost])
    
    useEffect(()=>{
            if(inView && !loading){
                setLoading(true);
                    setPage(prevState => prevState+1)
                setLoading(false);
            }
    },[inView])

    useEffect(()=>{
        if(localStorage.length>=2){
            setIsLogin(true);
        }
    })

    return(
        <>
            <div className='header'>
                {isLogin ? <LoginHeader nickname={localStorage.getItem('nickname')}  logOut={logOut}/> : <Header/>}
            </div>
            <div className='banner'>
                <Banner/>
            </div>
            <div className='btn-container'>
                {
                    gradeComponent.map((grd,i)=>(<button className={grd == grade ? 'main-btn-selected' : 'main-btn'} onClick={handleClickButton} value={grd}>{grd}</button>))
                }
            </div>
              <div className='sub-btn-container'>
                <div>
                    {grade &&
                    <>
                    {subjectComponent[grade].map((grd)=>(<Button name={grd} func={handleClickSubjectButton} style={subject == grd ? 'sub-btn-selected' : 'sub-btn'}/>))}
                    </>}
                </div>
                <div className='toggle-btn'>
                    <h3 className='toggle-btn-name'>모집중</h3>
                    <input type="checkbox" id="toggle" onClick={handleClickProgressButton} hidden checked={is_progress}/> 
                    <label for="toggle" class="toggleSwitch">
                    <span class="toggleButton"/>   
                    </label>
                </div>
            </div>
                {s_btn &&
                <div className='division-btn-container'>
                    {divComponent.map((div)=>(<DivButton name={div} func={handleClickDivisionButton}  style={division == div ? 'div-btn-selected' : 'div-btn'}/>))}
                </div>}
            {posts.length==0 && <NonFound/>}
            <div className='post-container'>
            {posts.map((post,i)=>   
                        (<PostThumbnail {...post} isLogin={isLogin}/>)
            )}
            </div>
            <div>
            <button className='adder-btn' onClick={upload}><BsPlusLg size="33"/></button>
            {isModalOpen &&
                <Modal open={isModalOpen} onOk={handleOk}>
                    <p>로그인 후 사용할 수 있는 기능입니다..</p>
                </Modal>
            }
            <button className='top-btn' onClick={handleTop}><AiOutlineArrowUp size="40"/></button>
            </div>
            <div ref={ref} className='observer'/>
            </>
    )
}
export default Home;