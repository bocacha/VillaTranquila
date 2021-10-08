  export const steps=[
    {
      id: '1',
      message: 'Hola Soy tu ascesor virtual ¿como te llamas? ',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'hola {previousValue},  ¿ en que podemos Ayudarte? ',
      trigger: '4',
    },
    {
      id:'4',
      user:true,
      trigger:'5'

    },
    {
      id: '5',
      message: 'Nos pone muy feliz que visites nuestra pagina',
      trigger: '6',
    },
    {
      id: '6',
      message: 'Te invito a que elijas la opcion que mas se adecua a tu consulta ',
      trigger: '7',
    },
     {
      id: '7',
      options: [
        { value: 1, label: 'Precios', trigger: '8' },
        { value: 2, label: 'Reservas', trigger: '10' },
        { value: 3, label: 'Registrarte', trigger: '12' },
        { value: 4, label: 'Contacto', trigger: '14' },
        
      ],
    },
    {
      id: '8',
      message: 'Para consultar los precios ve al menu de arriba y verifica en en el boton reservar o ingresa al link acontinuacion ',
      trigger: '9',
    },
    {
      id: '9',
      component: (
        <div>
          <a target="_blank" href="http://localhost:3000/reserva"> Precios </a>
        </div>
      ),
      trigger: '20',
    },

    {
      id: '10',
      message: 'Para consultar por la disponibilidad ve a comenzar reserva  o ingresa al link acontinuacion ',
      trigger: '11',
    },
    {
      id: '11',
      component: (
        <div>
          <a target="_blank" href="http://localhost:3000/reserva"> Reservas </a>
        </div>
      ),
      trigger: '20',
    },
    
    {
      id: '12',
      message: 'Para poder registrarte tienen que ir a nuestro menu en la parte derecha al boton registrar o ingresa al link acontinuacion ',
      trigger: '13',
    },
    {
      id: '13',
      component: (
        <div>
          <a target="_blank" href="http://localhost:3000/registrarse"> Registrarse </a>
        </div>
      ),
      trigger: '20',
    },
    {
      id: '14',
      message: 'Para comunicarte con nosotros puede ir al boton contacto y llenar el formulario o bien al link acontinuacion ',
      trigger: '15',
    },
    {
      id: '15',
      component: (
        <div>
          <a target="_blank" href="http://localhost:3000/contacto"> Contacto </a>
        </div>
      ),
      trigger: '20',
    },
    {
      id: '20',
      message: '¿Tienes alguna consulta mas?',
      trigger: '21',
    },
    {
      id: '21',
      options: [
        { value: 1, label: 'si', trigger: '7' },
        { value: 2, label: 'no', trigger: '22' },
      ],
    },
    {
      id: '22',
      message: 'Muchas gracias por tu consulta',
      end: true
    }
];


