import React, { Component } from 'react'

import { Suggestions } from './Suggestions/Suggestions'
import { textInput, serverPath, selectInput, radioInput, textArea, effectTransition, nmStr, getIndividualData, giveSuggestions, createLists, display, noDisplay, resizeWindows, crossClose } from '../../fonctions_front'
import Label from './Label'
import { fields } from './fields'
import Alert from './Alert'


export default class edit_agent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            suggestions: [],
            agent:       {},
            modalities:  {},
            display:  false,
        }
    }

    // handleSubmit = (e) => {
    //     e.preventDefault()
    //     let activeButton = document.querySelector("#edit_agent input[type='submit']").classList.contains("button-active")

    //     if(activeButton) {
    //         fetch("http://localhost:2020/testadd", { 
    //             method: 'POST',
    //             headers: {
    //                 'Accept' : 'application/json, text/plain',
    //                 'Content-Type' : 'application/json'
    //             },
    //             body: JSON.stringify(Field.checkSubmit())
    //         })
    //     .then(response => {
    //         let edit_agent = document.getElementById("edit_agent");
    //         let allInputs = Array.from(edit_agent.querySelectorAll("input[type=text], input[type=radio], select, textarea"))
    //         allInputs.forEach(input => input.value="");
    //         Object.keys(fields).forEach(key => { 
    //             console.log(key)
    //             console.log(fields[key].currentValue)
    //             fields[key].currentValue = ""
    //             fields[key].prevValue = "" })
    //         document.querySelector("#edit_agent input[type='submit']").classList.replace("button-active", "button");
    //         return response.json()
    //     })
    //     .then(response => console.log(response))
       
    //     } else {
    //         alert("Le formulaire est trop incomplet pour être envoyé")
    //     }
        
    // }

    handleChange = ({ name, value }) => {
        fields[name].setCurrentValue(value);
        this.forceUpdate();
    }

    handleSearch = (e) => {

        let nomsRecherchés = e.target.value.split(" ").map(part => nmStr(part));
        fetch(`${serverPath}/get/list`)
        .then(response => response.json())
        .then(jsonResponse => {      
            let { listeNoms, listeBureaux } = createLists(jsonResponse)
            let suggestions = giveSuggestions(listeNoms, nomsRecherchés, 5)             
            let promises = suggestions.map(suggestion => getIndividualData(suggestion))
            Promise.all(promises).then(suggestions => {this.setState({suggestions})})
        })
    }

    handleClickSuggestion = (e) => {

        let idAgent = e.currentTarget.id
        let searchbar = document.getElementsByClassName("searchbar__input")[0]

        searchbar.value=""
       
        fetch(`${serverPath}/edit/informations/${idAgent}`)
        .then(response => response.json())
        .then(x => {console.log("voici ce que je veux"); console.log(x); return x})
        .then(jsonResponse => this.setState({ agent : jsonResponse["row"], modalities : jsonResponse["headers"], suggestions: [], display : true}))
        .then(_ => resizeWindows())
    
    }

    componentDidMount() {
        resizeWindows(1.2, 1.2)
    }

    handleChange = ({ name, value }) => {
        fields[name].setCurrentValue(value);
        this.forceUpdate();
    }

    render() {
        
        return (
            
            <div id="edit_agent" className="whiteBox">
                
                {/* CROIX FERMETURE */}
                <div id="cross" onClick={e => {
                    crossClose(e, fields)
                    this.setState({display: false})}}>✕</div>

                {/* FORMULAIRE */}
                <form id="formulaire_edit" onSubmit={this.handleSubmit}>

                    {/* SEARCHBAR */}
                    <div id="edit_title">
                        <h1> Modifier un agent </h1>
                        <div className="searchbar">
                            <input type="text" onChange={this.handleSearch} className="searchbar__input" placeholder="Recherche par nom..." />   
                                    <svg className="searchbar__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.966 56.966">
                                        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17s-17-7.626-17-17S14.61,6,23.984,6z" />
                                    </svg>
                            {/* SUGGESTION */}
                            <Suggestions listeSuggestions={this.state.suggestions} onClick={this.handleClickSuggestion}/>
                        </div>
                    </div>

                    {this.state.display ? 

                    <div id="main-form-edit">

                        <div className="part-form etatcivil"> 
                        <h2> État Civil </h2>

                            {/* Nom */}
                            <Label data = {fields["agent_nom"]}>
                            {textInput({...fields["agent_nom"], handler: this.handleChange, value: this.state.agent["Nom"], table:"Agents_effectifs"})} 
                            </Label>

                            {/* Prénom */}
                            <Label data = {fields["agent_prenom"]}>
                            {textInput({...fields["agent_prenom"], handler: this.handleChange, value: this.state.agent["Prénom"], table:"Agents_effectifs"})} 
                            </Label>

                            {/* Date de naissance */}
                            <Label data = {fields["agent_date_de_naissance"]}>
                            {textInput({...fields["agent_date_de_naissance"], handler: this.handleChange, value: this.state.agent["Date de naissance"], table:"Agents_effectifs"})} 
                            </Label>

                            {/* Âge */}
                            <Label data = {fields["agent_age"]}>
                            {textInput({...fields["agent_age"], handler: this.handleChange, value: this.state.agent["Age"], table:"Agents_effectifs", readonly:true})} 
                            </Label>

                            {/* Sexe */}
                            <Label data = {fields["agent_sexe"]}>
                            {radioInput({...fields["agent_sexe"], handler: this.handleChange, values:["M", "F"], value: this.state.agent["Sexe"], table:"Agents_effectifs"})} 
                            </Label>

                            {/* Identifiant Sirhius */}
                            <Label data = {fields["agent_sirhius"]}>
                            {textInput({...fields["agent_sirhius"], handler: this.handleChange, value: this.state.agent["Identifiant Sirhius"], table:"Agents_effectifs", disabled:true})} 
                            </Label>

                        </div>
                        
                        <div className="part-form administratif">

                            <h2> Administratif </h2>

                            {/* Date d'arrivée */}
                            <Label data = {fields["agent_date_arrivee"]}>
                            {textInput({...fields["agent_date_arrivee"], handler: this.handleChange, value: this.state.agent["Date arrivée"]})} 
                            </Label>

                            {/* Catégorie */}
                            <Label data = {fields["agent_categorie"]}>
                            {selectInput({...fields["agent_categorie"], handler: this.handleChange, values: this.state.modalities["Catégorie"], value: this.state.agent["Catégorie"], table:"Agents_effectifs"})} 
                            </Label>

                            {/* Direction */}
                            <Label data = {fields["agent_direction"]}>
                            {selectInput({...fields["agent_direction"], handler: this.handleChange, values: this.state.modalities["Direction"], value: this.state.agent["Direction"], table:"Agents_effectifs"})} 
                            </Label>

                            {/* Grade */}
                            <Label data = {fields["agent_grade"]}>
                            {selectInput({...fields["agent_grade"], handler: this.handleChange, values: this.state.modalities["Grade"], value: this.state.agent["Grade"], table:"Agents_effectifs"})} 
                            </Label>

                            {/* Échelon */}
                            <Label data = {fields["agent_echelon"]}>
                            {selectInput({...fields["agent_echelon"], handler: this.handleChange, values: this.state.modalities["Échelon"], value: this.state.agent["Échelon"], table:"Agents_effectifs"})} 
                            </Label>

                            {/* Date échelon */}
                            <Label data = {fields["agent_date_echelon"]}>
                            {textInput({...fields["agent_date_echelon"], handler: this.handleChange, value: this.state.agent["Date échelon"], table:"Agents_effectifs"})} 
                            </Label>

                            {/* Position statutaire */}
                            <Label data = {fields["agent_position_statutaire"]}>
                            {selectInput({...fields["agent_position_statutaire"], handler: this.handleChange, values: this.state.modalities["Position statutaire"], value: this.state.agent["Position statutaire"], table:"Agents_effectifs"})} 
                            </Label>

                            {/* Rang hiérarchique */}
                            <Label data = {fields["agent_rang"]}>
                            {selectInput({...fields["agent_rang"], handler: this.handleChange, values: this.state.modalities["Rang hiérarchique"], value: this.state.agent["Rang hiérarchique"], table:"Bureaux_global"})} 
                            </Label>

                            {/* Unité administrative */}
                            <Label data = {fields["agent_unite_administrative"]}>
                            {selectInput({...fields["agent_unite_administrative"], handler: this.handleChange, values: this.state.modalities["Unité administrative"], value: this.state.agent["Unité administrative"], table:"Agents_effectifs"})} 
                            </Label>

                            {/* Date affectation UA */}
                            <Label data = {fields["agent_date_affectation_UA"]}>
                            {textInput({...fields["agent_date_affectation_UA"], handler: this.handleChange, value: this.state.agent["Date affectation UA"], table:"Agents_effectifs"})} 
                            </Label>

                            {/* Code unité administrative */}
                            <Label data = {fields["agent_code_UA"]}>
                            {textInput({...fields["agent_code_UA"], handler: this.handleChange, value: this.state.agent["Code unité administrative"], table:"Agents_effectifs", disabled:true})} 
                            </Label>

                            {/* Unité opérationnelle */}
                            <Label data = {fields["agent_unite_operationnelle"]}>
                            {selectInput({...fields["agent_unite_operationnelle"], handler: this.handleChange, values: this.state.modalities["Unité opérationnelle"], value: this.state.agent["Unité opérationnelle"],  table:"Agents_effectifs"})} 
                            </Label>

                            {/* Code unité opérationnelle */}
                            <Label data = {fields["agent_code_UO"]}>
                            {textInput({...fields["agent_code_UO"], handler: this.handleChange, values: this.state.modalities["Code unité opérationnelle"], value: this.state.agent["Code unité opérationnelle"],  table:"Agents_effectifs", disabled:true})} 
                            </Label>

                            {/* Timbre unité opérationnelle */}
                            <Label data = {fields["agent_timbre_UO"]}>
                            {textInput({...fields["agent_timbre_UO"], handler: this.handleChange, values: this.state.modalities["Timbre unité opérationnelle"], value: this.state.agent["Timbre unité opérationnelle"],  table:"Agents_effectifs"})} 
                            </Label>

                            {/* Quotité de travail */}
                            <Label data = {fields["agent_quotite_travail"]}>
                            {selectInput({...fields["agent_quotite_travail"], handler: this.handleChange, values: this.state.modalities["Quotité de travail"], value: this.state.agent["Quotité de travail"],  table:"Agents_effectifs"})} 
                            </Label>

                            {/* Présence */}
                            <Label data = {fields["agent_presence"]}>
                            {selectInput({...fields["agent_presence"], handler: this.handleChange, values: this.state.modalities["Présence"], value: this.state.agent["Présence"], table:"Agents_effectifs"})} 
                            </Label>

                            {/* Type de poste */}
                            <Label data = {fields["agent_type_poste"]}>
                            {selectInput({...fields["agent_type_poste"], handler: this.handleChange, values: this.state.modalities["Type de poste"], value: this.state.agent["Type de poste"], table:"Agents_effectifs"})} 
                            </Label>

                        </div>
                        
                        <div className="part-form bureau">
                        <h2> Bureau </h2>

                            {/* Étage */}
                            <Label data = {fields["bureau_etage"]}>
                            {selectInput({...fields["bureau_etage"], handler: this.handleChange, values: this.state.modalities["Etage"], value: this.state.agent["Etage"], table:"Bureaux_globlal"})} 
                            </Label>

                            {/* Numéro */}
                            <Label data = {fields["bureau_numero"]}>
                            {textInput({...fields["bureau_numero"], handler: this.handleChange, values: this.state.modalities["Numéro Pièce arbitré"], value: this.state.agent["Numéro Pièce arbitré"], table:"Bureaux_globlal"})} 
                            </Label>

                            {/* Position */}
                            <Label data = {fields["bureau_position"]}>
                            {selectInput({...fields["bureau_position"], handler: this.handleChange, values: this.state.modalities["Position dans la pièce"], value: this.state.agent["Position dans la pièce"], table:"Bureaux_globlal"})} 
                            </Label>

                            {/* Timbre */}
                            <Label data = {fields["bureau_timbre"]}>
                            {selectInput({...fields["bureau_timbre"], handler: this.handleChange, values: this.state.modalities["Timbre"], value: this.state.agent["Timbre"], table:"Bureaux_globlal"})} 
                            </Label>

                            <Label data = {fields["agent_trames"]}>
                            {selectInput({...fields["agent_trames"], handler: this.handleChange, values: this.state.modalities["Droits à trame(s) par personne"], value: this.state.agent["Droits à trame(s) par personne"], table:"Bureaux_globlal"})} 
                            </Label>
                        </div>

                        <div className="part-form postes">
                        <h2> Postes </h2>

                            {/* Entite */}
                            <Label data = {fields["postes_entite"]}>
                            {selectInput({...fields["postes_entite"], handler: this.handleChange, values: this.state.modalities["Entité (dernier niveau) utilisateur"], value: this.state.agent["Entité (dernier niveau) utilisateur"], table:"Directions_postes"})} 
                            </Label>

                            {/* Catégorie */}
                            <Label data = {fields["postes_categorie"]}>
                            {selectInput({...fields["postes_categorie"], handler: this.handleChange, values: this.state.modalities["Catégorie"], value: this.state.agent["Catégorie"], table:"Directions_postes"})} 
                            </Label>

                            {/* Système d'exploitation */}
                            <Label data = {fields["postes_systeme"]}>
                            {selectInput({...fields["postes_systeme"], handler: this.handleChange, values: this.state.modalities["Système d'exploitation"], value: this.state.agent["Système d'exploitation"], table:"Directions_postes"})} 
                            </Label>

                            {/* Marque */}
                            <Label data = {fields["postes_marque"]}>
                            {selectInput({...fields["postes_marque"], handler: this.handleChange, values: this.state.modalities["Marque"], value: this.state.agent["Marque"], table:"Directions_postes"})} 
                            </Label>

                            {/* Localisation complète */}
                            <Label data = {fields["postes_localisation"]}>
                            {textInput({...fields["postes_localisation"], handler: this.handleChange, values: this.state.modalities["Localisation (complète)"], value: this.state.agent["Localisation (complète)"], table:"Directions_postes"})} 
                            </Label>

                            {/* Statut */}
                            <Label data = {fields["postes_statut"]}>
                            {selectInput({...fields["postes_statut"], handler: this.handleChange, values: this.state.modalities["Statut"], value: this.state.agent["Statut"], table:"Directions_postes"})} 
                            </Label>

                            {/* Code materiel */}
                            <Label data = {fields["postes_code_materiel"]}>
                            {selectInput({...fields["postes_code_materiel"], handler: this.handleChange, values: this.state.modalities["Code matériel"], value: this.state.agent["Code matériel"], table:"Directions_postes"})} 
                            </Label>

                            {/* Commentaire */}
                            <Label data = {fields["postes_commentaire"]}>
                            {textArea({...fields["postes_commentaire"], value: this.state.agent["Commentaire"], handler: this.handleChange, rows: 1, cols: 40, table:"Directions_postes"})}
                            </Label>
                        </div>

                        <div className="part-form telephones">
                        <h2> Téléphones </h2>

                            {/* DEPT/DIV */}
                            <Label data = {fields["telephones_dept"]}>
                            {selectInput({...fields["telephones_dept"], handler: this.handleChange, values: this.state.modalities["DEPT/DIV"], value: this.state.agent["DEPT/DIV"], table:"Bureaux_telephones"})} 
                            </Label>

                            {/* TIMBRE FRAIS GESTION */}
                            <Label data = {fields["telephones_timbre"]}>
                            {selectInput({...fields["telephones_timbre"], handler: this.handleChange, values: this.state.modalities["TIMBRE Frais gestion"], value: this.state.agent["TIMBRE Frais gestion"], table:"Bureaux_telephones"})} 
                            </Label>

                            {/* MATERIEL TEL */}
                            <Label data = {fields["telephones_materiel"]}>
                            {selectInput({...fields["telephones_materiel"], handler: this.handleChange, values: this.state.modalities["MATERIEL TEL"], value: this.state.agent["MATERIEL TEL"], table:"Bureaux_telephones"})} 
                            </Label>

                            {/* Catégorie PTT */}
                            <Label data = {fields["telephones_categorie_ptt"]}>
                            {selectInput({...fields["telephones_categorie_ptt"], handler: this.handleChange, values: this.state.modalities[" Catégorie PTT TEL"], value: this.state.agent[" Catégorie PTT TEL"], table:"Bureaux_telephones"})} 
                            </Label>

                            {/* Numéro */}
                            <Label data = {fields["telephones_tel"]}>
                            {textInput({...fields["telephones_tel"], handler: this.handleChange, values: this.state.modalities["TEL"], value: this.state.agent["TEL"], table:"Bureaux_telephones"})} 
                            </Label>

                            {/* Ligne privée */}
                            <Label data = {fields["telephones_prive"]}>
                            {textInput({...fields["telephones_prive"], handler: this.handleChange, values: this.state.modalities["LIGNE PRIVE"], value: this.state.agent["LIGNE PRIVE"], table:"Bureaux_telephones"})} 
                            </Label>

                            {/* Filtrage */}
                            <Label data = {fields["telephones_filtrage"]}>
                            {selectInput({...fields["telephones_filtrage"], handler: this.handleChange, values: this.state.modalities["FILTRAGE DU"], value: this.state.agent["FILTRAGE DU"], table:"Bureaux_telephones"})} 
                            </Label>

                            

                        </div>


                    </div>
                    :<div></div>}
                    {/* VALIDATION */}
                    <div id="buttons">
                        <input type="submit" className="button" value="Valider" id="validate"/>
                    </div>
                </form> 
            </div>

            
        )
    }
}

