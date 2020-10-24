import React from 'react';
import { Route, Router } from 'react-router-dom';
import { resizeWindows } from '../../fonctions_front'


/*
##########################
##     COMPONENTS       ##
##########################
*/

import Navbar from '../Navbar/Navbar';
import Accueil from '../Accueil/Accueil';
import Agents from '../Agents/Agents';
import Directions from '../Directions/Directions';
import Detail from '../Directions/Detail';

/*
##########################
##         APP          ##
##########################
*/

export default class App extends React.Component {

  state = {
      checked:false
    }
  
    
  render() {
    
    window.addEventListener("resize", () => resizeWindows(1.2, 1.2))

    document.addEventListener("keypress", e => {
      if(e.key === "Enter") e.preventDefault()
    })

    


    return (
      <div id="global-container">
          <Navbar/>      
          <Route exact path="/"                     component={Accueil}/> 
          <Route exact path="/agents"               render={_ => <Agents famille="Agents" defaultTable="Agents_effectifs"/>}/>
          <Route exact path="/bureaux"              render={_ => <Agents famille="Bureaux" defaultTable="Bureaux_meubles"/>}/>
          <Route exact path="/directions"           component={Directions}/>
          <Route path="/directions/informations"    component={Detail}/> 
      </div>  
    )

    }
}

