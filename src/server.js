const { io } = require("socket.io-client");
const socket = io("http://localhost:3010");
// const socket = io("http://localhost:3011");

socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
});

socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
});

module.exports = socket;
