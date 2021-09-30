import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Nosotros from './components/Nosotros/Nosotros';
import Contacto from './components/Contacto/Contacto';
import Reserva from './components/Reserva/Reserva';
import Admin from "./components/Admin/Admin";
import Cabañas from './components/Admin/Cabañas/Cabañas';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/nosotros' component={Nosotros} />
          <Route path='/contacto' component={Contacto} />
          <Route path='/reserva' component={Reserva} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/cabañas" component={Cabañas} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
