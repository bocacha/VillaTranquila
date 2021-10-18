

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage =createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
      
    }
    
    handleNext(){
        const message = this.createChatBotMessage('Su consulta es poco especifica, seleccione alguna de las palabras clave que se le proporciono al comienzo');
        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
          }));
    }
    handlePrecios() {
        const message = this.createChatBotMessage('Si quieres saber de nuestros precios o pagar ve al menu principal - Reservaciones o bien ingresa al link');
    
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
      handlePreciosLink() {
        const message = this.createChatBotMessage('https://app-villa-tranquila.vercel.app/reserva');
    
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
      handleReservas() {
        const message = this.createChatBotMessage('Si deseas ver nuestra disponibilidad ve a Reservas o bien ingresa al link');
    
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
      handleReservasLink() {
        const message = this.createChatBotMessage('https://app-villa-tranquila.vercel.app/reserva');
    
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
      handleContacto() {
        const message = this.createChatBotMessage('Si quieres contactarnos puedes ir al menu, contacto o bien ingresa al link');
    
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
      handleContactoLink() {
        const message = this.createChatBotMessage('https://app-villa-tranquila.vercel.app/contacto');
    
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
      handleRegistro() {
        const message = this.createChatBotMessage('Si quieres registrarte y hacer tu reserva ve al boton registrarse en el menu o directamente al link');
    
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
      handleRegistroLink() {
        const message = this.createChatBotMessage('https://app-villa-tranquila.vercel.app/registrarse');
    
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }

      
  }

  
export default ActionProvider;