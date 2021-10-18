class MessageParser {
    constructor(ActionProvider, state) {
      this.ActionProvider = ActionProvider;
      this.state = state;
    }
  
    parse(message) {
        const lowerCase = message.toLowerCase();
        

        if (lowerCase.includes('precio') ||lowerCase.includes('paga')) {
            this.ActionProvider.handlePrecios();
            setTimeout(() => {
                this.ActionProvider.handlePreciosLink();
            }, 3000);
            return;
        }

        if(lowerCase.includes('reserva')||lowerCase.includes('disponi')||lowerCase.includes('fecha')){
            this.ActionProvider.handleReservas();
            setTimeout(() => {
                this.ActionProvider.handleReservasLink();
            }, 3000);
            return;
        }
        if(lowerCase.includes('contac')||lowerCase.includes('email')||lowerCase.includes('telefono')||lowerCase.includes('comunic')){
            this.ActionProvider.handleContacto()
            setTimeout(() => {
                this.ActionProvider.handleContactoLink();
            }, 3000);
            return;
        }
        if(lowerCase.includes('registr')){
            this.ActionProvider.handleRegistro()
            setTimeout(() => {
                this.ActionProvider.handleRegistroLink();
            }, 3000);
            return;
        }
        if(lowerCase){
            this.ActionProvider.handleNext()
        }
        
       
    }
  }

  export default MessageParser;