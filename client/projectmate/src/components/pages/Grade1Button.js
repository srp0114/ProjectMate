import React, {useEffect, useState} from 'react'
import Post from '../Post'
import Division from './Division';

const Grade1Button =()=>{
    const [code, setCode]= useState();
    const clickHandler = e=>{
        const c= e.target.value;
        setCode(c);
    }
    
    const num1= ['1반','N반','A반']
    const num2= ['1반','2반','3반']
    
    const selectComponent = {               //배열에 버튼별 컴포넌트를 저장해둔다.
        111 : num1,
        222 : num2,
    };

    //const div_Btns = selectComponent[code].map((name)=>(<Division name={name}/>));

    return(
        <>
            <div className='sub-btn-container'>
                    <button className='sub-btn' onClick={clickHandler} value={111}>웹프로그래밍기초</button>
                    <button className='sub-btn' onClick={clickHandler} value={222}>컴퓨터프로그래밍</button>
            </div>
            <div className='division-container'>
                <Division name={'hi'}/>
            </div>
        </>
    )
}

export default Grade1Button;