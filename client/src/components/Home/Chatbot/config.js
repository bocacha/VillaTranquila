import { createChatBotMessage,  } from 'react-chatbot-kit';



const botName = 'Asesor virtual';

const config = {
    initialMessages: [createChatBotMessage(`Hola soy tu ${botName}`),
    createChatBotMessage('antes de comenzar alguna palabras que pueden ayudarte en tu consulta'),
    createChatBotMessage(`Precio`, {
      delay: 1500,
      loading: false,
    }),
    createChatBotMessage(`Reserva`, {
      delay: 2500,
    }),
    createChatBotMessage(`registro`, {
      delay: 3500,
    }),
   ],
    customStyles: {
      botMessageBox: {
        backgroundColor: '#6e48aa',
      },
      chatButton: {
        backgroundColor: '#6e48aa',
      }, 
    },
  };

export default config;