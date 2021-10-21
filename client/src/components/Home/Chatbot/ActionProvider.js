

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage =createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
      
    }
    
    handleNext(){
        const message = this.createChatBotMessage('Su consulta es poco especifica, si necesita algo en particular puede ir al boton CONTACTO');
        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
          }));
    }
    handlePrecios() {
        const message = this.createChatBotMessage('Si quieres saber de nuestros precios ve a COMENZAR RESERVA y puedes filtrar nuestras cabañas por PRECIO');
    
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
      
      handleReservas() {
        const message = this.createChatBotMessage('Si deseas ver nuestra disponibilidad ve a COMENZAR RESERVA, alli podras filtrar por fecha o cantidad de personas y luego en la cabaña ir al boton RESERVA YA');
    
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
      
      handleContacto() {
        const message = this.createChatBotMessage('Para contactarnos puedes ir al Menu Principal, al boton CONTACTO y llenar el FORMULARIO, luego nosotros nos pondremos en contacto');
    
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
     
      handleRegistro() {
        const message = this.createChatBotMessage('Para poder REGISTRARTE y hacer tu reserva ve al boton REGISTRARME y llena el FORMULARIO');
    
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }

      handleDespedida() {
        const message = this.createChatBotMessage('Esperamos haber podido responder todas tus respuestas');
    
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
      handlePaga() {
        const message = this.createChatBotMessage('Puede Pagar con su tarjeta de credito o debito y Si quiere PAGAR luego de comenzar con su reserva, ingresa los dias, RESERVAR y podras abonar con  mercado pago ');
    
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }

      handleAnimales() {
        const message = this.createChatBotMessage('No se reciben Animales de ningun tipo');
    
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
      
      handleCredito() {
        const message = this.createChatBotMessage('Recibimos todas las Tarjetas, con el interes que mercadopago tiene');
    
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
           
  }

  
export default ActionProvider;