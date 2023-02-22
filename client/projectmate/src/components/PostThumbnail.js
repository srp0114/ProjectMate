import { React } from 'react';
import { Link } from 'react-router-dom'
import { AiOutlineEye } from 'react-icons/ai';
import { Typography, Card, Divider, Tag, Avatar } from 'antd';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import { UserOutlined } from '@ant-design/icons';
import "./css/Home.css"

const { Title, Text } = Typography;
const { Meta } = Card;

const PostThumbnail = (props) =>{
    const auth = localStorage.getItem("token");

    const TagDs = () =>{
        return(
            <>
                <Tag color="#2db7f5" style={{fontSize:16, padding: 3}}># {props.subject}</Tag>
                <Tag color="#2db7f5" style={{fontSize:16, padding: 3}}># {props.division}</Tag>
            </>
        )
    }

    return(
        <>
            <Card hoverable style={{ width: 380, height : 415, marginBottom : 30}} className="post">
                <Link to={`/post/${props.id}`} style={{ textDecoration: "none" }}>
                <Meta title={<Title level={3} className="changeTitle">{props.title}</Title>}/>
                <Meta description={props.createdDate}/>
                <Divider style={{'background-color':'rgb(213, 218, 223)'}}/>
                <p className='post-content' dangerouslySetInnerHTML = { {  __html : props.content } }></p>
                <div className='tag-container'>
                    <TagDs/>
                </div>
                <Divider style={{'background-color':'rgb(213, 218, 223)', 'margin-bottom' : '20px'}}/>
                <div className='post-footer'>
                    <div className='owner'>
                    <Avatar size={32} icon={<UserOutlined/>}/><Text style={{ fontSize: 20, marginLeft : 5 }} className="changeTitle">{props.writer_nickname}</Text>
                    </div>
                    <div className='icons'>
                        <AiOutlineEye size="30" color='gray'/><span className='etc-num'>{props.view_count}</span>
                        <HiOutlineChatBubbleLeftRight size="30" color='gray'/><span className='etc-num'>{props.comment_count}</span>
                    </div>
                </div>
                </Link>
            </Card>
        </>
    );
}

export default PostThumbnail;