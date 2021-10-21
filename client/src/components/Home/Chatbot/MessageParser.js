class MessageParser {
    constructor(ActionProvider, state) {
      this.ActionProvider = ActionProvider;
      this.state = state;
    }
  
    parse(message) {
        const lowerCase = message.toLowerCase();
        

        if (lowerCase.includes('precio') ||lowerCase.includes('paga')||lowerCase.includes('sale')||lowerCase.includes('cuesta')) {
            this.ActionProvider.handlePrecios();
            return;
        }
        if(lowerCase.includes('reserva')||lowerCase.includes('disponi')||lowerCase.includes('fecha')){
            this.ActionProvider.handleReservas();
            return;
        }
        if(lowerCase.includes('contac')||lowerCase.includes('email')||lowerCase.includes('telefono')||lowerCase.includes('comunic')){
            this.ActionProvider.handleContacto()
            return;
        }
        if(lowerCase.includes('registr')){
            this.ActionProvider.handleRegistro()
            return;
        }
        if(lowerCase.includes('Gracias')){
            this.ActionProvider.handleDespedida()
            return;
        }
        if(lowerCase){
            this.ActionProvider.handleNext()
        }
        
       
    }
  }

  export default MessageParser;