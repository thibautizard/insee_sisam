import React from 'react'
import Minibloc from './Minibloc';
import { Link } from 'react-router-dom';


export default function Bloc(props) {
    return (
        
        <Link to={`directions/informations/${props.direction}`} style={{textDecoration: "none", color: "black"}}>

            <div id="bloc_direction" className="fade-in-down">

                <div id="bloc_direction_titre"> 
                    {props.direction} 
                </div>

                <div id="bloc_direction_directeur">
                    <h3> {props.directeur} </h3>
                </div>

                <div id="bloc_direction_informations">

                    <div id="denombrement">
                        <Minibloc name="Agents" image="effectifs"  count={props.agents}/>
                        <Minibloc name="Bureaux" image="bureaux" count={props.bureaux}/>
                    </div>
                    
                    <div id="mobilite">
                        <Minibloc name="Arrivées" image="arrivées" count={0}/>
                        <Minibloc name="Départs" image="départs" count={0}/>
                    </div>

                </div>

            </div>
        </Link>
    )
}
