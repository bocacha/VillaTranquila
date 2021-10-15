import { createChatBotMessage } from 'react-chatbot-kit';



const botName = 'Asesor virtual';

const config = {
    initialMessages: [createChatBotMessage(`Hola soy tu ${botName}`)],
    
  };

export default config;