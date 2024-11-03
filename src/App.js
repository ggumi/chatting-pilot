import "./App.css";
import socket from "./server";
import {useEffect, useState} from "react";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ChatPage from "./pages/Chatpage/ChatPage";
import RoomListPage from "./pages/RoomListPage/RoomListPage";

function App() {
    const [user, setUser] = useState(null)
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        askUserName();
    }, []);

    const askUserName=()=>{
        const userName = prompt("당신의 이름을 입력하세요");

        socket.emit("login", userName, (res)=>{
           //콜백 = .emit이 잘 처리가 되면 마지막에 콜백함수로 응답 받음
            if(res?.ok){
                setUser(res.data)
            } else {
                console.log('login error==>',res.data)
            }
        })
    }

  return (
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<RoomListPage />} />
              <Route exact path="/room/:id" element={<ChatPage user={user} />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
