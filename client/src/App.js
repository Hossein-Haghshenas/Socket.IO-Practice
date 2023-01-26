import { useEffect, useState } from "react";
import { connect } from "socket.io-client";

const socket = connect("https://slime-giant-jar.glitch.me/");

const App = () => {
  // Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [sendMessage, setSendMessage] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const send = () => {
    socket.emit("send_message", { userMessage: sendMessage, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessage([...message, data.userMessage]);
    });
  }, [message]);

  return (
    <div className="container">
      <section className="inputs">
        <input type="text" placeholder="Message" onChange={(e) => setRoom(e.target.value)} />
        <button onClick={joinRoom}>Join Room</button>
      </section>

      <section className="messages_container">
        <h1 className="title">Messages</h1>
        <p>{message}</p>
        <section className="inputs send_message">
          <input type="text" placeholder="Message" onChange={(e) => setSendMessage(e.target.value)} />
          <button onClick={send}>Send Message</button>
        </section>
      </section>
      <section>
        <audio id="backgroundMusic" src={require("./Blue.mp3")} autoSave autoPlay />
      </section>
    </div>
  );
};

export default App;
