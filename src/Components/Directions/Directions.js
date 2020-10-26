import React, { Component } from 'react'
import Bloc from './Bloc'; 
import Loader from '../Loader/Loader';
import { serverPath } from "../../fonctions_front";

export default class Directions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            directions: ["SG", "DSDS", "DDAR", "DSE", "DSI", "DESE", "DMCSI", "IG"],
            isLoaded: false
        }
    }

    componentDidMount() {

        fetch(`${serverPath}/directions`)
        .then(response => {
            if(response.ok) {
                return response.json();
            } throw new Error ('Échec de la requête')
        }, networkError => console.log(networkError.message))
        .then(jsonResponse => this.setState({rows: jsonResponse, isLoaded: true}));
    }

    render() {
        return (
            this.state.isLoaded ?
            
                <div id="liste_blocs"> 
                    {this.state.rows.map(row => this.state.directions.includes(row["Direction"]) ? 
                    <Bloc direction={row["Direction"]} agents={row["Agents"]} bureaux={row["Bureaux"]} directeur={row["Nom"] ? row["Prénom"] + ' ' + row["Nom"] : ""}/> 
                    : null)}
                </div>
            
            :<Loader/>
        )
    }
}