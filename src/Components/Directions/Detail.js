import React, { Component } from 'react'

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            informations:[],
            bureauxLibres: [],

            isLoaded: false,
        }
    }

    componentDidMount() {
        let direction = window.location.href.split("/")[5];

        fetch(`http://localhost:2020/directions/${direction}`)
        .then(response => {
            if(response.ok) {
                return response.json();
            } throw new Error ('Échec de la requête')
        }, networkError => console.log(networkError.message))
        .then(jsonResponse => {

            this.setState((prevState, props) => {

                let informations = jsonResponse.informations;
                let bureauxLibres = jsonResponse.bureauxLibres;
                
                return {informations, bureauxLibres, isLoaded: true}
            })    
  
        });
    }
    

    render() {
        return (
            this.state.isLoaded ?
            <div id="cartouche">
                
                <div id="liste_informations">

                    <h3> {this.state.informations[0]["Direction"]} </h3>
                  
                    <div id="informations">

                        <div id="menus" className="colonne">
                            {Object.keys(this.state.informations[0]).map(header => <p>{`${header}`}</p>)}
                        </div>

                        <div id="données" className="colonne">
                            {Object.keys(this.state.informations[0]).map(header => <p>{`${this.state.informations[0][header]}`}</p>)}
                        </div>

                    </div>

                </div>

                <div id="liste_bureaux_libres">
                    <table id="table_bureaux">
                    <caption> <div style={{color:"lightgray", backgroundColor:"lightgray"}}>|</div><span className="titleTable"> Liste des bureaux disponibles </span> </caption>
                        <thead>
                            <tr>
                                {Object.keys(this.state.bureauxLibres[0]).slice(0,4).map(header => <th> {header.split(".")[0]} </th>)}
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.bureauxLibres.map(bureau => <tr> {Object.values(bureau).slice(0,4).map(value => <td>{value}</td>)} </tr>)}
                        </tbody>                   
                    </table>    
                </div> 

            </div>  

            :<div className="loadingspinner"></div>  
        )
    }
}