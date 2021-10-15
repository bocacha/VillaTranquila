class MessageParser {
    constructor(ActionProvider, state) {
      this.ActionProvider = ActionProvider;
      this.state = state;
    }
  
    parse(message) {
        const lowerCase = message.toLowerCase();


        switch (lowerCase){
            case lowerCase.inculdes('precio') :
                this.ActionProvider.handlePrecios();
                setTimeout(() => {
                    this.ActionProvider.handlePreciosLink();
                }, 3000);
                break;
            case lowerCase.inculdes('paga') :
                this.ActionProvider.handlePrecios();
                setTimeout(() => {
                    this.ActionProvider.handlePreciosLink();
                }, 3000);
                break;
            case lowerCase.includes('reserva') : 
                this.ActionProvider.handleReservas();
                setTimeout(() => {
                    this.ActionProvider.handleReservasLink();
                }, 3000);
                break;
            case lowerCase.includes('disponi') : 
                this.ActionProvider.handleReservas();
                setTimeout(() => {
                    this.ActionProvider.handleReservasLink();
                }, 3000);
                break;
            case lowerCase.includes('disponi') : 
                this.ActionProvider.handleReservas();
                setTimeout(() => {
                    this.ActionProvider.handleReservasLink();
                }, 3000);
                break; 
        }

       /*  if (lowerCase.includes('precio') ||lowerCase.includes('paga')) {
            this.ActionProvider.handlePrecios();
            setTimeout(() => {
                this.ActionProvider.handlePreciosLink();
            }, 2000);
        } */
        if(lowerCase.includes('reserva')||lowerCase.includes('disponi')||lowerCase.includes('fecha')){
            this.ActionProvider.handleReservas();
            setTimeout(() => {
                this.ActionProvider.handleReservasLink();
            }, 2000);
            return;
        }
        if(lowerCase.includes('contac')||lowerCase.includes('email')||lowerCase.includes('telefono')||lowerCase.includes('comunic')){
            this.ActionProvider.handleContacto()
            setTimeout(() => {
                this.ActionProvider.handleContactoLink();
            }, 2000);
        }
        if(lowerCase.includes('registr')){
            this.ActionProvider.handleRegistro()
            setTimeout(() => {
                this.ActionProvider.handleRegistroLink();
            }, 2000);
        }
        
       
    }
  }

  export default MessageParser;