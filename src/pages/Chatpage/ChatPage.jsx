import React, { useEffect, useState } from 'react'
import socket from "../../server";
import InputField from "../../components/InputField/InputField";
import MessageContainer from "../../components/MessageContainer/MessageContainer";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "@mui/base/Button";

const ChatPage = ({user}) => {
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])
    const {id} = useParams() //유저가 조인한 방의 아이디를 url에서 가져온다
    const navigate = useNavigate()

    useEffect(()=>{
        socket.on("message", (res)=>{
            setMessageList((prevState)=>prevState.concat(res))
        })
        socket.emit("joinRoom",id,(res) => {
            if(res && res.ok){
                console.log("successfully join",res)
            } else {
                console.log("fail to join",res)
            }
        })

    },[])

    const sendMessage = (event) => {
        event.preventDefault()         //onSubmit 이벤트는 웹페이지를 자꾸 새로고침 함
        socket.emit("sendMessage", message, (res) => {
            console.log("sendMessage res", res)
        } )
    }

    const leaveRoom=()=>{
        socket.emit("leaveRoom",user,(res)=>{
            if(res.ok) {
                navigate("/")
            } else {
                console.log("leaveroom error",res.error)
            }
        })
    }

    return (
        <div>
            <div className="App">
                <nav>
                    <Button onClick={leaveRoom} className='back-button'>←</Button>
                    <div className='nav-user'>{user.name}</div>
                </nav>
                <div>
                    {messageList.length > 0 ? (
                        <MessageContainer messageList={messageList} user={user}></MessageContainer>
                    ) : null}
                </div>
                <InputField message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    )
}

export default ChatPage