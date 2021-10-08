

![home](https://user-images.githubusercontent.com/82456534/136569315-68a61ebf-dbdf-4899-b398-b746e40b9dec.png)

## Descripcion:
<hr/>

Villa Tranquila es una Single Page Application (SPA), desarrollada para administrar online la estructura administrativa y comercial de un complejo de alquiler de Cabañas mediante una interfaz de usuario intuitiva y amigable.

La aplicación posee funcionalidades específicas dependiendo de las credenciales ingresadas al sistema, las cuales diferencian al operador en tres categorías: Usuario visitante; Usuario registrado y Administrador.


El Usuario visitante, posee permisos que le permiten visualizar las imágenes del complejo, los servicios ofrecidos, la ubicación del mismo en un mapa interactivo, chatear con un bot interactivo, subscribirse al Newsletter del complejo, enviar consultas específicas via e-mail, y consultar la disponibilidad de las Cabañas en determinadas fechas pudiendo aplicar filtros de búsqueda tales como fechas, rango de precios, capacidad de las Cabañas o servicios.
Si este Usuario utiliza la opción de registrarse, puede acceder a los permisos de Usuario registrado; Donde además de acceder a las funcionalidades de un visitante, podrá reservar Cabañas y realizar pagos. 

Los Usuarios que posean credenciales de Administrador, tienen la capacidad para crear/modificar Cabañas, Usuarios, Tarifas,etc.



### Technical Description:
<hr/>

La aplicación fué construída mediante una arquitectura Cliente (Frontend) - Servidor (Backend) utilizando ExpressJS en la creación del Servidor, Sequelize en la creación de la Base de Datos y sus respectivas tablas, y
Jason Web Tokens en la administración de credenciales del Backend.
En el Frontend se utilizaron componentes funcionales de React para el renderizado de las distintas Interfases, 
Redux en la configuración del estado global de los componentes, que a su vez fueron optimizados mediante el uso de Hooks. Los estilos fueron implementados en su mayoría a través de CSS Styled Components, utilizando React Bootstrap en casos específicos.
Villa Tranquila utiliza además librerías externas: NodeMailer para la funcionalidad con correos electrónicos, Cloudinary en el almacenamiento de Imágenes en la nube, Axios en la comunicación Cliente - Servidor, React Icons para el renderizado de Iconos, DatePicker para la representación de calendarios y Checkout de Mercado Pago.




### API Data Management:
<hr/>
El servidor, comunmente conocido como API ( Interfaz de Programación de Aplicaciones ) administra el flujo de datos de la aplicación, a través de la siguiente estructura :


- Carpeta Models :
  Cabins, Payments, Pictures, Reservations, Services y Users son archivos .js que contienen los modelos de cada entidad utilizada en la aplicación, desde donde Sequelize adquiere los tipos específicos de datos para crear las Tablas de la Base de Datos.
 
  
- Carpeta Routes:
  Un archivo Index.js es el encargado de integrar las diferentes rutas contenidas en los archivos Cabins, Index,Login, Payments, Pictures, Reservations, SendEmails, Services, ShowGallery y Users. Estas rutas son las encargadas de escuchar  los requerimientos asincronos del cliente: GET / POST y PUT mediante el uso de Axios.
  
- Carpeta Utils:
  Contiene el archivo cloudinary.js encargado de conectar la Galería de imágenes almacenada remotamente en la nube con la aplicación.

  
- Los archivos App y DB.js encargados de configurar los Middlewares que Express utiliza en la construcción de   
  la aplicación, además de la conexión con el host remoto Heroku donde esta montada la aplicación. 

- Un archivo Index.js es el encargado de inicializar la Base de Datos.


### Interfaz de Usuario
<hr/>
El cliente o Frontend de Villa Tranquila posee la siguiente estructura:

- Carpeta Actions:
 Un archivo index.js configura cada una de las 35 Acciones encargadas de comunicarle al Reducer los cambios necesarios que debe tomar el estado global de Redux.
 
- Reducer folder:
  Un archivo index.js que administra las mencionadas Acciones, además de configurar el estado inicial de Redux y actualizarlo según corresponda. 
 
  
- Store folder:
  Un archivo index.js que contiene la configuración del Store de Redux, referente al estado global de la aplicación, además de los datos necesarios para conectar Redux DevTools al Navegador utilizado.
 
 
- Components folder:
  Cada componente relativo a la interfaz del Usuario tienen lugar en esta carpeta: Admin, BannerIntro, Contacto, Footer, Home, Login, NavBar, Nosotros, Registrarse, Reserva, SearchBar, Slider y Gallery. Muchos de estos componentes contienen la lógica relativa a la funcionalidad de la aplicación.
