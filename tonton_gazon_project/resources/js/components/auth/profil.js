import React from 'react'
import Nav from '../navbar'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

import MesInfos from './MesInfos';
import MesJardins from './MesJardins';
import MesAnnonces from './MesAnnonces';



  

  

export default function Profil() {
  let { path, url } = useRouteMatch();
    return (

      <Router>
          <div>

            <Nav/>

            <h2>Votre profil</h2>

            <ul>
              <li>
                <Link to={`${url}`}>Mes informations</Link>
              </li>
              <li>
                <Link to={`${url}/jardins`}>Mes jardins</Link>
              </li>
              <li>
                <Link to={`${url}/annonces`}>Mes annonces</Link>
              </li>
            </ul>

            <Switch>
                <Route exact path={path}>
                  <MesInfos />
                </Route>
                <Route path={`${path}/jardins`}>
                  <MesJardins />
                </Route>
                <Route path={`${path}/annonces`}>
                  <MesAnnonces />
                </Route> 
                
              </Switch>
            
          
          </div>
        </Router>
           )};


         