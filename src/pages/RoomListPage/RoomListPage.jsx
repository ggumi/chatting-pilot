import React, { useEffect, useState } from "react";
import socket from "../../server";
import { useNavigate } from "react-router-dom";
import "./RoomListPageStyle.css";

const RoomListPage = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([])

    useEffect(()=>{
        socket.on("rooms", (res) => {
            setRooms(res);
        })
    },[])

    // roomController.getAllRooms()

    const moveToChat = (rid) => {
        navigate(`/room/${rid}`);
    };

    const saveRoom = () => {
        const roomName = prompt("채팅방 이름을 입력하세요");
        socket.emit("saveRoom", roomName, (res)=>{
            if(res?.ok){
                setRooms([...rooms, res.data])
            } else {
                console.log('login error==>',res.data)
            }
        })
    }

    return (
        <div className="room-body">
            <div className="room-nav">채팅 ▼</div>
            <button onClick={saveRoom}>채팅방 추가</button>
            {rooms.length > 0
                ? rooms.map((room) => (
                    <div
                        className="room-list"
                        key={room._id}
                        onClick={() => moveToChat(room._id)}
                    >
                        <div className="room-title">
                            <img src="/profile.jpeg" />
                            <p>{room.room}</p>
                        </div>
                        <div className="member-number">{room.members?.length}</div>
                    </div>
                ))
                : null}
        </div>
    );
};

export default RoomListPage;
