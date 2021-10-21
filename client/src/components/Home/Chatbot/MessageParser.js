class MessageParser {
    constructor(ActionProvider, state) {
      this.ActionProvider = ActionProvider;
      this.state = state;
    }
  
    parse(message) {
        const lowerCase = message.toLowerCase();
        

        if (lowerCase.includes('precio')||lowerCase.includes('sale')||lowerCase.includes('cuesta')) {
            this.ActionProvider.handlePrecios();
            return;
        }
        if(lowerCase.includes('reser')||lowerCase.includes('disponi')||lowerCase.includes('fecha')){
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
        if(lowerCase.includes('gracia')){
            this.ActionProvider.handleDespedida()
            return;
        }
        if(lowerCase.includes('paga')||(lowerCase.includes('tarjeta'))){
            this.ActionProvider.handlePaga()
            return;
        }
        if(lowerCase.includes('animal')||(lowerCase.includes('perro'))||(lowerCase.includes('gato'))){
            this.ActionProvider.handleAnimales()
            return;
        }
        if(lowerCase.includes('visa')||(lowerCase.includes('mastercard'))||(lowerCase.includes('american'))){
            this.ActionProvider.handleCredito()
            return;
        }
        if(lowerCase){
            this.ActionProvider.handleNext()
        }
        
       
    }
  }

  export default MessageParser;