import React, { Component } from 'react'
import { fields } from './fields'
import { Field } from './Field'
import Label from './Label'
import { textInput, selectInput, radioInput, textArea, resizeWindows, postRequest, crossClose , changeAlertMessage} from '../../fonctions_front'

export default class add_agent extends Component {


    componentDidMount() {
        resizeWindows()
    }

    handleChange = ({ name, value }) => {
        fields[name].setCurrentValue(value);
        this.forceUpdate();
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let activeButton = document.querySelector("#add_agent input[type='submit']").classList.contains("button-active")
        if(activeButton) postRequest("/ajouter/agent", Field.checkSubmit(), fields)
        else changeAlertMessage("Ce formulaire est trop incomplet pour être envoyé !")
    }

    render() {
        
        return (

            <div id="add_agent" className="whiteBox">
                
                {/* CROIX FERMETURE */}
                <div id="cross" onClick={e => crossClose(e, fields)}>✕</div>

                {/* FORMULAIRE */}
                <form id="formulaire_add" onSubmit={this.handleSubmit}>

                    <h1> Ajouter un agent </h1>

                    <div id="main-form-add">

                        <div className="part-form etatcivil">

                            <h2> État Civil </h2>

                                {/* Nom */}
                                <Label data = {fields["agent_nom"]}>
                                    {textInput({...fields["agent_nom"], handler: this.handleChange})} 
                                </Label>

                                {/* Prénom */}
                                <Label data = {fields["agent_prenom"]}>
                                    {textInput({...fields["agent_prenom"], handler: this.handleChange})} 
                                </Label>

                                {/* Date de naissance */}
                                <Label data = {fields["agent_date_de_naissance"]}>
                                    {textInput({...fields["agent_date_de_naissance"], handler: this.handleChange})} 
                                </Label>

                                {/* Sexe */}
                                <Label data = {fields["agent_sexe"]}>
                                    {radioInput({...fields["agent_sexe"], handler: this.handleChange, values:["M", "F"]})} 
                                </Label>
                        
                        </div>

                        <div className="part-form administratif">

                            <h2> Administratif </h2>

                            {/* Date d'arrivée */}
                            <Label data = {fields["agent_date_arrivee"]}>
                                {textInput({...fields["agent_date_arrivee"], handler: this.handleChange})} 
                            </Label>

                            {/* Catégorie */}
                            <Label data = {fields["agent_categorie"]}>
                                {selectInput({...fields["agent_categorie"], handler: this.handleChange, values: ["A+", "A", "B", "C"]})} 
                            </Label>

                            {/* Position statutaire */}
                            <Label data = {fields["agent_position_statutaire"]}>
                                {selectInput({...fields["agent_position_statutaire"], handler: this.handleChange, values: ["Apprenti", "Contractuel", "Stagiaire", "Titulaire", "Titulaire détaché"]})} 
                            </Label>

                            {/* Direction */}
                            <Label data = {fields["agent_direction"]}>
                                {selectInput({...fields["agent_direction"], handler: this.handleChange, values: ["SG", "DDAR", "DESE", "DMCSI", "DSDS", "DSE", "DSI", "DG", "IG", "SEL", "SEM", "SEP", "SYND"]})} 
                            </Label>

                            {/* Sirhius */}
                            <Label data = {fields["agent_sirhius"]}>
                                {textInput({...fields["agent_sirhius"], handler: this.handleChange})} 
                            </Label>

                        </div>
                        
                        <div className="part-form bureau">

                            <h2> Bureau </h2>

                            {/* Étage */}
                            <Label data = {fields["bureau_etage"]}>
                                {selectInput({...fields["bureau_etage"], handler: this.handleChange, values: ["-1", "RJ", "RC", "1", "2", "3", "4", "5"]})} 
                            </Label>

                            {/* Numéro */}
                            <Label data = {fields["bureau_numero"]}>
                                {textInput({...fields["bureau_numero"], handler: this.handleChange})} 
                            </Label>

                            {/* Position */}
                            <Label data = {fields["bureau_position"]}>
                                {selectInput({...fields["bureau_position"], handler: this.handleChange, values: ["A", "B", "C", "D", "E", "F", "G", "H", "I"]})} 
                            </Label>

                            {/* Forcer attribution */}
                            <Label data = {{ name:"attribution", caption: "", errorMessages: []}}>
                                <div className="checkwrapper">
                                    <input type="checkbox"></input>
                                    <p> Forcer l'attribution du bureau </p>
                                </div>
                            </Label>

                        </div>

                        <div className="part-form observations">

                            <h2> Observations Sesam </h2>          
                                {textArea({...fields["agent_observations"], handler: this.handleChange, rows: 8, cols: 50})}
                        </div>

                    </div>
                    

                    {/* VALIDATION */}
                    <div id="buttons">
                        <input type="submit" className="button" value="Valider" id="validate"/>
                    </div>
                </form> 
            </div>

            
        )
    }
}

