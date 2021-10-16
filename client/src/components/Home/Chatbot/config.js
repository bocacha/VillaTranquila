import { createChatBotMessage,  } from 'react-chatbot-kit';



const botName = 'Asesor virtual';

const config = {
    initialMessages: [createChatBotMessage(`Hola soy tu ${botName}`),
    createChatBotMessage('antes de comenzar alguna palabras que pueden ayudarte en tu consulta'),
    createChatBotMessage(`Precio`, {
      withAvatar: true,
      delay: 1500,
      loading: false,
    }),
    createChatBotMessage(`Reserva`, {
      withAvatar: true  ,
      delay: 2500,
    }),
    createChatBotMessage(`registro`, {
      withAvatar: true,
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