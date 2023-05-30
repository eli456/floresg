import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import FloresList from "../componentes/flores-list.component";
import { Alumno, Imagen } from "./Inicio";
import Header from "./Header";
import {Switch } from "react-router-dom/cjs/react-router-dom.min";
import AddFlores from "../componentes/add-flores.component";
import Login from '../componentes/Login.component';

const App = () => {
  return (
    <div>
      <Header />
      <Imagen />
      <div className="container mt-3">
        <h2>Aplicación React para almacenar en Firestore y Storage!</h2>
          <Switch>
          <Route exact path={["/", "/login"]} component={Login}/>
            <Route exact path={["/", "/Inicio"]} component={Alumno } />
            <Route exact path={["/", "/dinosaurios"]} component={FloresList} />
            <Route exact path="/add" component={AddFlores} />
          </Switch>
      </div>
    </div>
  );
};

export default App;
