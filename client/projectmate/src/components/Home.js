import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import Header from './Header'
import LoginHeader from './LoginHeader'
import PostThumbnail from './PostThumbnail'
import Banner from './Banner'

const Home=()=>{
    const [button, setButton] = useState('');

    const [posts, setPosts] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [page, setPage]= useState(0);
    const [loading, setLoading] = useState(false);
    
    const [ref, inView] = useInView();
    const [subject, setSubject] = useState('');
    const [s_btn, setS_btn] = useState(false);
    const [division, setDivision] = useState('');
    const [is_progress, setProgress] = useState(0);

    const [ScrollY, setScrollY] = useState(0);
    const [BtnStatus, setBtnStatus] = useState(false);

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
        getTotalPost();
    }
    //서브젝트 버튼
    const handleClickSubjectButton = e =>{
        setSubject(e.target.value);
        setS_btn(true);
    }

    //분반 버튼
    const handleClickDivisionButton = e =>{
        setDivision(e.target.value);
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
    
      useEffect(() => {
        const watch = () => {
          window.addEventListener("scroll", handleFollow);
        };
        watch();
        return () => {
          window.removeEventListener("scroll", handleFollow);
        };
      });

    const setLogin = () => {
        if(localStorage.length>=2)
            setIsLogin(true)
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
            setPosts(response.data.content)
            console.log(posts)
        })
        .catch((error)=>console.log(error.response.data));
        setLoading(false);
    },[subject,division,is_progress,page])

    const getTotalPost = useCallback(async ()=>{
        setLoading(true);
        await axios.get(`http://localhost:8080/post/postList?page=${page}&size=4&is_progress=${is_progress}`)
        .then((response)=>{
            setPosts(response.data.content)
            console.log(posts)
        })
        .catch((error)=>console.log(error.response.data));
        setLoading(false);
    },[page])

    useEffect(()=>{
        getPost()
    },[getPost])

    useEffect(()=>{
        getTotalPost()
    },[getTotalPost])

    useEffect(()=>{
        setLoading(true);
            if(inView && !loading){
                setPage(prevState => prevState+1)
            }
        setLoading(false);
    },[inView])


    useEffect(()=>{
        if(localStorage.length>=2){
            setIsLogin(true);
        }
    })

    return(
        <>
            <div className='header'>
                {isLogin ? <LoginHeader nickname={localStorage.getItem('nickname')}  setIsLogin={setIsLogin}/> : <Header/>}
            </div>
            <div className='banner'>
                <Banner/>
            </div>
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
                    <input type="checkbox" id="toggle" onClick={handleClickProgressButton} hidden/> 
                    <label for="toggle" class="toggleSwitch">
                    <span class="toggleButton"/>   
                    </label>
                </div>
            </div>
            <div className='division-btn'>
                {s_btn&&
                <div className='division-btn'>
                    {div.map((div)=>(<Button name={div} func={handleClickDivisionButton}/>))}
                </div>}
            </div>
            <div className='post-container'>
            {posts.map((post,i)=><PostThumbnail {...post}/>)}
            </div>
            <div><button className='adder-btn'>플러스</button><button className='top-btn' onClick={handleTop}><span className='top-text'>TOP</span></button></div>
            <div ref={ref}>옵저버</div>
            </>
    )
}
export default Home;