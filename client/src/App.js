import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Nosotros from './components/Nosotros/Nosotros';
import Contacto from './components/Contacto/Contacto';
import Reserva from './components/Reserva/Reserva';
import Login from './components/Login/Login';
import Admin from "./components/Admin/Admin";
import Cabañas from "./components/Admin/Cabañas/Cabañas";
import Reservaciones from "./components/Admin/Reservaciones/Reservaciones";
import Servicios from "./components/Admin/Servicios/Servicios";
import Pagos from "./components/Admin/Pagos/Pagos";
import Fotos from "./components/Admin/Fotos/Fotos";
import Usuarios from "./components/Admin/Usuarios/Usuarios";
import Registro from "./components/Registrarse/Registro";
import LinkReserva from"./components/Reserva/Linkreserva/LinkReserva"
import Gallery from './components/Gallery/Gallery';
import Profile from './components/Profile/Profile';
import { useSelector } from 'react-redux';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/nosotros" component={Nosotros} />
          <Route path="/contacto" component={Contacto} />
          <Route exact path="/reserva" component={Reserva} />
          <Route path="/reserva/reservar" component={LinkReserva} />
          <Route path="/galeria" component={Gallery} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/cabañas" component={Cabañas} />
          <Route exact path="/admin/reservaciones" component={Reservaciones} />
          <Route exact path="/admin/servicios" component={Servicios} />
          <Route exact path="/admin/pagos" component={Pagos} />
          <Route exact path="/admin/fotos" component={Fotos} />
          <Route exact path="/admin/usuarios" component={Usuarios} />
          <Route path='/iniciarsesion' component={Login} />
          <Route path='/registrarse' component={Registro} />
          <Route path='/perfil' component={Profile} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
