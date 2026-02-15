import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [pseudo, setPseudo] = useState("");
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  const [UUIDState, setUUIDState] = useState(uuidv4());

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Connected");
        stompClient.subscribe("/topic/client/"+UUIDState, (msg) => {
          const body = JSON.parse(msg.body)

          console.log("CLIENT MESSAGE TOPIC :", body)

          setRoomId(body.id);
          setMessages(body)
        })
        if (roomId) {
          console.log("ROOM ID :", roomId)
          stompClient.subscribe(`/topic/room/${roomId}`, (msg) => {
            const body = JSON.parse(msg.body);
            
            console.log("MESSAGE RECU", body);
            if(body.inProgress === true) {
              console.log(body.predictions);
              console.log(body.step);
              console.log(body.predictions[body.step]);
              console.log(body.predictions[body.step].category_name);
              setMessages(`LA GAME COMMENCE !!! PREDICTION EN COURS : ${body.predictions[body.step].category_name}`);
            } else {
              setMessages(body);
            }
          });
        }
      }
    });

    stompClient.activate();
    setClient(stompClient);

    return () => stompClient.deactivate();
  }, [roomId]);

  const send = (type) => {
    client.publish({
      destination: "/app/game",
      body: JSON.stringify({ type, roomId, pseudo, clientId: UUIDState }),
    });
  };

  return (
    <div>
      <input placeholder="Pseudo" onChange={e => setPseudo(e.target.value)} />
      <input placeholder="Room ID" onChange={e => setRoomId(e.target.value)} />

      <button onClick={() => send("CREATE_ROOM")}>Créer</button>
      <button onClick={() => send("JOIN_ROOM")}>Rejoindre</button>
      <button onClick={() => send("PLAYER_READY")}>Prêt</button>
      <button onClick={() => send("START_GAME")}>Start</button>
      <button onClick={() => send("SEND_PREDICTION")}>Skip Prediction</button>

      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </div>
  );
}

export default App;
