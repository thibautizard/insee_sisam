import {testResults, nmStr, changeAlertMessage, serverPath} from '../../fonctions_front'
import { testsChange } from './testsChange'
import { testsSubmit } from './testsSubmit'
import { fields } from './fields'

export class Field {

    constructor(name, caption, placeholder) {

        this.name        = name;
        this.caption     = caption;
        this.placeholder = placeholder; 

        this.testChange = testsChange[name];
        this.testSubmit = testsChange[name];
        
        this.currentValue  = "";
        this.prevValue     = "";
        this.errorMessages = [];
    }

    setCurrentValue(value) {
        
        let { errors, output, type } = this.testChange(value, this.currentValue);
        let errorMessages = (value < this.currentValue ? "" : errors.filter(_ => _))
        this.errorMessages = [];

        let input    = document.getElementById(`input_${this.name}`);
        let errorBox = document.getElementsByName(`label_${this.name}`)[0];

        let check = true;

        if(!errorMessages.length) {
            if(type === "input" || type === "select") input.value = output;
            if(type === "radio") document.getElementsByName(`${this.name}`).forEach(radio => output === radio.value ? radio.checked = true : radio.checked = false)
            this.prevValue = this.currentValue;
            this.currentValue = output;
            if(type === "input") input.classList.remove("shaking-error");
            if(errorBox) errorBox.style.display="none";
        } 
        
        else {   
            input.value = this.currentValue;   
            input.classList.remove("shaking-error")
            void input.offsetWidth
            input.classList.add("shaking-error")
                     
            errorMessages.forEach(errorMessage => this.errorMessages.push(errorMessage))
            if(errorBox) errorBox.style.display="flex"; 

        }

        

        // LANCE UNE REQUÊTE POUR VÉRIFIER SI L'AGENT ET LE BUREAU RENSEIGNÉS EXISTENT DANS LA BASE DE DONNÉES
        fetch(`${serverPath}/get/list`)
        .then(response => response.json())
        .then(jsonResponse => {   

        // NAME
        let listeNoms = jsonResponse["listeAgents"].map(entry => Object.values(entry)[0]).filter(_ => _);
        let listeSirhius = jsonResponse["listeSirhius"].map(entry => Object.values(entry)[0]).filter(_ => _);
        let nomRecherché = nmStr(fields["agent_nom"].currentValue + fields["agent_prenom"].currentValue);
        if(listeNoms.includes(nomRecherché) && ["agent_nom", "agent_prenom"].includes(this.name)) {
            let alertMessage = `L'agent ${fields["agent_prenom"].currentValue} ${fields["agent_nom"].currentValue} existe déjà dans la base de données !`
            changeAlertMessage(alertMessage)
            fields["agent_prenom"].setCurrentValue("")
            fields["agent_nom"].setCurrentValue("")
            check = false;
        }

        if(listeSirhius.includes(fields["agent_sirhius"].currentValue)) { 
            let alertMessage = `L'identifiant Sirhius ${fields["agent_sirhius"].currentValue} est déjà utilisé`;
            changeAlertMessage(alertMessage)
            check = false;
        }
        
        // BUREAU

        let listeBureaux = jsonResponse["listeBureaux"].filter(bureau => bureau["idBureau"] !== "/")
        let bureauxSimpleArray = listeBureaux.map(bureau => bureau["idBureau"].replace(/-\w/,"") + `-${bureau["Position dans la pièce"]}`);            
        let currentBureau = `${fields["bureau_etage"].currentValue}-${fields["bureau_numero"].currentValue}-${fields["bureau_position"].currentValue}`

        // On regarde d'abord si ce bureau existe dans la base
        if(["bureau_etage", "bureau_numero", "bureau_position"].includes(this.name)) {
            if(bureauxSimpleArray.includes(currentBureau)) {

                // Si le bureau existe, on regarde s'il est occupé
                bureauxSimpleArray.forEach((bureau, index) => {
                    if(bureau === currentBureau && listeBureaux[index]["NOM"] !== "/") {
                        let alertMessage = `Le bureau meuble ${listeBureaux[index]["idBureau"]} (position ${listeBureaux[index]["Position dans la pièce"]}) est occupé par ${listeBureaux[index]["Prénom"]} ${listeBureaux[index]["NOM"]} (${listeBureaux[index]["DIR"]})`
                        changeAlertMessage(alertMessage)
                        fields["bureau_aile"].currentValue = listeBureaux[index]["idBureau"].split('-')[1]
                        check = false;

                    } else if(bureau === currentBureau && listeBureaux[index]["NOM"] === "/") {
                        fields["bureau_aile"].currentValue = listeBureaux[index]["idBureau"].split('-')[1]
                        let alertMessage = `Le bureau meuble ${listeBureaux[index]["idBureau"]} (position ${listeBureaux[index]["Position dans la pièce"]}) est actuellement disponible !`
                        changeAlertMessage(alertMessage)
                    }
                })
            
            // Sinon on indique à l'utilisateur qu'il n'existe pas
            } else if(/\w+-\d{3}-[^\d]/.test(currentBureau)) {
                let alertMessage = `Le bureau ${currentBureau} n'existe pas !`
                changeAlertMessage(alertMessage)
                fields["bureau_etage"].setCurrentValue("")
                fields["bureau_position"].setCurrentValue("")
                fields["bureau_numero"].setCurrentValue("")
                check = false;
            }
        }   
        }).then(() => Field.checkLabels(testsSubmit, check))

    }

    static checkLabels(testsSubmit, check) {
        let test = testResults(testsSubmit, fields)
        if(test && check) document.querySelector("#add_agent input[type='submit']").classList.replace("button", "button-active")
        else document.querySelector("#add_agent input[type='submit']").classList.replace("button-active", "button")
    }

    static checkSubmit() {
        let newAgent = {
            Nom: fields["agent_nom"].currentValue,
            Prenom: fields["agent_prenom"].currentValue,
            Sexe: fields["agent_sexe"].currentValue,
            Naissance: fields["agent_date_de_naissance"].currentValue,
            Arrivee: fields["agent_date_arrivee"].currentValue,
            Categorie: fields["agent_categorie"].currentValue,
            Position_statutaire: fields["agent_position_statutaire"].currentValue,
            Direction: fields["agent_direction"].currentValue,
            Sirhius: fields["agent_sirhius"].currentValue,
            Observations : fields["agent_observations"].currentValue,

            Etage: fields["bureau_etage"].currentValue,
            Numero: fields["bureau_numero"].currentValue,
            Position: fields["bureau_position"].currentValue,
            Aile: fields["bureau_aile"].currentValue,
        }



        return newAgent;
    }

}