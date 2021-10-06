<p align='left'>
    <img src='https://github.com/IgnaC02/VillaTranquila/blob/main/logo.png' </img>
</p>


## Descripcion:


Villa Tranquila es una Single Page Application (SPA), desarrollada para administrar online la estructura administrativa y comercial de un complejo de alquiler de Cabañas mediante una interfaaz de usuario intuitiva y amigable.
La aplicación posee funcionalidades específicas dependiendo de las credenciales ingresadas al sistema, las cuales diferencian al operador en tres categorías: Usuario visitante; Usuario registrado y Administrador.

 ________________________________________________________________________________
|___ Permisos ____ |_Administrador_|____Premium____|__Registrado__|___Visitante____|\
| --------------------------------------------------------------------------------
|_Navegar sitio__|      X        |       X       |      X        |      X        | 
|---------------------------------------------------------------------------------
| Chat bot
|---------------------------------------------------------------------------------
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|


El Usuario visitante, posee permisos que le permiten visualizar las imágenes del complejo, los servicios ofrecidos, la ubicación del mismo en un mapa interactivo, chatear con un bot interactivo, subscribirse al Newsletter del complejo, enviar consultas específicas via e-mail, y consultar la disponibilidad de las Cabañas en determinadas fechas pudiendo aplicar filtros de búsqueda tales como fechas, rango de precios, capacidad de las Cabañas o servicios.
Si este Usuario utiliza la opción de registrarse, puede acceder a los permisos de Usuario registrado; Donde además de acceder a las funcionalidades de un visitante, podrá reservar Cabañas y realizar pagos. 

Los Usuarios que posean credenciales de Administrador, tienen la capacidad para crear/modificar Cabañas, Usuarios, Tarifas,etc.










### Technical Description:

Dogs Parade was build developing a Server in Express, wich mount and configure a Data base through Sequelize. The stored data is then renderized on the Client side of Dogs Parade making use of React to build the necessary functional components; Then use Redux to set your data ready in your components Global State, and CSS Styled components to bring you a pleasant view.


### API Data Management:

The Server ( or commonly known as Application Programming Interface - API ) contains:

- Models folder:
  Raza & Temperamento .js files to allow Sequelize build Data tables.
  
- Routes folder:
  An index.js file containing paths where the API will listen Client asynchronous requests like GET / POST utilizing axios.
  
- Middlewares folder:
  errorHandlers & setHeaders .js files to allow the API run smoothly.
  
- App & BD .js files where middlewares are set, and load Data base Tables relationship. 

- An .env file store Data base variables for later connection.

- An Index.js file is in charge of start the Data base, forcing it to erase all records before every run.


### Client User Interface

The Client side of Dogs Parade has the following structure:

- Actions folder:
 An index.js file that describe Action creators, instructions that will be send to Reducer. Mandatory steps to Redux store can work.
 
- Reducer folder:
  An index.js file that manage every action request to the Redux store, declaring its initial state and updating it.
  
- Store folder:
 An index.js file that contains Store configuration. Besides Redux dev tools middleware.
 
- Components folder:
  Every UI component has its place in this folder: Page, Home, Nav, Form, DogDetails & Cards. Most of the logic it's implemented here.
  
- Images folder:
  Storage of the Dog.png, the main logo of Dogs Parade. Was designed using PIXLR site, same as the background and the icon.
  
- App.js :  This file set up the url's to communicate with API, rendering each respective component according to the received path.

- Index.js : Is the file in charge of App.js render inside root tag of Index.Html; wrapping it between Provider & BrowserRouter for the Store & Links to be available in every     React component.
  