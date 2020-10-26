import React, { Component } from 'react'
import { fields } from './fields'
import { Field } from './Field'
import Label from './Label'
import { textInput, selectInput, radioInput, textArea, resizeWindows, postRequest, crossClose , changeAlertMessage, serverPath} from '../../fonctions_front'

export default class create_table extends Component {


    componentDidMount() {
        resizeWindows()
    }

    handleSubmit = e => {
        let table = e.currentTarget.parentNode.getAttribute("table")
        const element = document.createElement('a')
        element.setAttribute('href', `${serverPath}/download/${table}`)
        element.style.display = "none"
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    render() {

        
        return (

            <div id="create_table" className="whiteBox">
                
                {/* CROIX FERMETURE */}
                <div id="cross" onClick={e => crossClose(e)}>✕</div>

                {/* FORMULAIRE */}
                <form id="formulaire_create" onSubmit={e => e.preventDefault()}>

                    <h1> Gérer les tables </h1>

                    <div id="main-form-create">

                        <div className="part-form agents-tables">

                            <h2> Agents </h2>

                                <div class="table-bloc" table="Agents_effectifs">
                                    <p> Effectifs </p>
                                    <button onClick={this.handleSubmit}> Télécharger </button>
                                    <button> Mettre à jour </button>
                                    <input type="checkbox"></input>
                                    <p class="modification-date"> Dernière modification le {}</p>
                                </div>

                                <div class="table-bloc" table="Agents_bureaux">
                                    <p> Bureaux </p>
                                    <button onClick={this.handleSubmit}> Télécharger </button>
                                    <button> Mettre à jour </button>
                                    <input type="checkbox"></input>
                                </div>

                                <div class="table-bloc" table="Agents_postes">
                                    <p> Postes </p>
                                    <button onClick={this.handleSubmit}> Télécharger </button>
                                    <button> Mettre à jour </button>
                                    <input type="checkbox"></input>
                                </div>

                                <div class="table-bloc" table="Agents_telephones">
                                    <p> Téléphones </p>
                                    <button onClick={this.handleSubmit}> Télécharger </button>
                                    <button> Mettre à jour </button>
                                    <input type="checkbox"></input>
                                </div>

                                <div class="table-bloc" table="Agents_teletravail">
                                    <p> Télétravail </p>
                                    <button onClick={this.handleSubmit}> Télécharger </button>
                                    <button> Mettre à jour </button>
                                    <input type="checkbox"></input>
                                </div>
                        
                        </div>

                        <div className="part-form bureaux-tables">

                            <h2> Bureaux </h2>

                                <div class="table-bloc" table="Bureaux_meubles">
                                    <p> Meubles </p>
                                    <button onClick={this.handleSubmit}> Télécharger </button>
                                    <button> Mettre à jour </button>
                                    <input type="checkbox"></input>
                                </div>

                                <div class="table-bloc" table="Bureaux_pieces">
                                    <p> Pièces </p>
                                    <button onClick={this.handleSubmit}> Télécharger </button>
                                    <button> Mettre à jour </button>
                                    <input type="checkbox"></input>
                                </div>

                                <div class="table-bloc" table="Bureaux_equipements">
                                    <p> Équipements </p>
                                    <button onClick={this.handleSubmit}> Télécharger </button>
                                    <button> Mettre à jour </button>
                                    <input type="checkbox"></input>
                                </div>

                                <div class="table-bloc" table="Bureaux_telephones">
                                    <p> Téléphones </p>
                                    <button onClick={this.handleSubmit}> Télécharger </button>
                                    <button> Mettre à jour </button>
                                    <input type="checkbox"></input>
                                </div>
                        
                        </div>

                         <div className="part-form bureaux-tables">

                            <h2> Personnalisé </h2>

                                
                        
                        </div>

                        

                    </div>
                
                </form> 
            </div>

            
        )
    }
}

