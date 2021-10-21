import React, {useState} from 'react';
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css'
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import styles from "./Chat.module.css"
import { AiFillRobot } from 'react-icons/ai';

function Chat() {
  const [mostrar, setMostrar] = useState(true)
  return (
    <div className={styles.container}>
      {mostrar?
        <button onClick={()=>setMostrar(false)} className={styles.li} > <AiFillRobot className={styles.items} /></button>
        :
        <div className={styles.containerChat}>
         <button onClick={()=>setMostrar(true)} className={styles.li} > <AiFillRobot className={styles.items} /></button>
          {/* <button onClick={()=>setMostrar(true)} className={styles.items}> X </button> */}
         <div className={styles.Chatbot}>
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            headerText='Villa Tranquila'
            placeholderText='Tu consulta Aqui...'
            />
            </div>
         
        </div>
       }
    </div>
  );
}

export default Chat;
