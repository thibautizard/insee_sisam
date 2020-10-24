/*
                                        ####### FONCTIONS POUR LE FRONT END #######

Description
–––––––––––

Ce module contient l'ensemble des fonctions utilisées à travers Sisam,  elles-mêmes rangées ici en sous-groupes 
selon le type de traitement qu'elles effectuent.


Sommaire
––––––––

1 - Chaînes de caractères
Fonctions pour reformater des chaînes de caractères

2 - Searchbar

3 - Tables

4 - Requests

5 - Events

6 - Form


*/

import React from 'react'

export const serverPath = "https://limitless-sea-21607.herokuapp.com"


/*

############################
##  CHAINES DE CARACTERES ##
############################

*/

export function keepNumbersOnly(string) {
    return /\d*/.exec(string.replace(/\D/g, ""))[0]
}

export function nmStr(str){

    if(str) return String(str).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "").replace(/\W/, "").trim();
    else    return "";
}

export function nmDate(string) {

// On élimine les caractères spéciaux pour ne conserver qu'une chaîne de chiffres
string = keepNumbersOnly(string)

// On découpe cete chaîne de chiffres en segments représentant le jour, le mois et l'année séparés par un "/"
let jour  =  string.slice(0,2)
let mois  =  string.slice(2,4) && ("/" + string.slice(2,4))
let annee =  string.slice(4,8) && ("/" + string.slice(4,8))

return `${jour}${mois}${annee}`
}

export function firstLetterCapitalizeThenNormal(string) {

    // On casse la chaîne en tableau de mots en repérant les espaces vides ou les caractères spéciaux qui les séparent
    let wordArray = string.replace(/-/g, "- ").replace(/'/g, "' ").split(" ")
    // On modifie la casse de la première lettre de chaque mot
    let newArray = wordArray.map(word => word && (word[0].toUpperCase() + word.slice(1)))
    // Puis on recolle en une nouvelle chaîne
    return newArray.join(" ").replace(/- /g, "-").replace(/' /g, "'").replace(/\s/g, "-");
 }


/*

########################
##     SEARCHBAR      ##
########################

*/

export function tablesAndLabels (famille) {
    
    let tables, etiquettes

    switch(famille) {

        case 'Agents': 
        tables = [{name:"Effectifs", table:"Agents_effectifs", path:"effectifs"}, 
                  {name:"Bureaux", table:"Agents_bureaux", path:"bureaux"}, 
                  {name:"Postes", table:"Agents_postes", path:"postes"},
                  {name: "Téléphones", table:"Agents_telephones", path:"telephones"},
                  {name: "Télétravail", table:"Agents_teletravail", path:"teletravail"}]
                   
        etiquettes = [{name: "Ajouter un agent", action: "add_agent"}, 
                      {name: "Modifier un agent", action: "edit_agent"}, 
                      {name: "Générer une table", action: "create_table"}];
        break;

        case 'Bureaux': 
        tables = [{name:"Meubles", table:"Bureaux_meubles", path:"meubles"}, 
                  {name:"Pièces", table:"Bureaux_pieces", path:"pieces"}, 
                  {name:"Équipements", table:"Bureaux_equipements", path:"equipements"},
                  {name: "Téléphones", table:"Bureaux_telephones", path:"telephones"}]
                   
        etiquettes = [{name: "Ajouter un agent", action: "add_agent"}, 
                      {name: "Modifier un agent", action: "edit_agent"}, 
                      {name: "Générer une table", action: "create_table"}];
        break; 

        default: 
        break;
    }

    return { tables, etiquettes }
}

export function handleSearchBar(e) {
    let search = e.target.value.split(" ")
    let rows = document.querySelectorAll("tbody tr")
    for(let row of rows) {
        const [idAgent, idBureau] = row.classList
        if(search.every(term => idAgent.includes(nmStr(term)) || idBureau.includes(term.toUpperCase())) || !search) display(row)
        else noDisplay(row)
    } 
}

export function handleClickLabel(action) {

    const greyCover = document.getElementById("grey_cover")
    console.log(greyCover)
    greyCover.style.visibility = "visible"

    const whiteBox = document.getElementById(action)
    whiteBox.style.visibility = "visible"

    effectTransition(whiteBox, "fade-in-down")
   
}


/*
########################
##       TABLES       ##
########################
*/

export function decideSubTables(table, join=false) {

    const tables = [
        "Agents_effectifs",
        "Agents_bureaux",
        "Agents_postes",
        "Agents_telephones",
        "Agents_teletravail"
    ]

    const subHeaders = {
        "État Civil" : ["Nom", "Prénom", "Sexe", "Date de naissance", "Age"],
        "Administratif" : ["Nom", "Prénom", "Identifiant Sirhius", "Catégorie", "Grade", "Date échelon", "Échelon", "Position statutaire"],
        "Unités" : ["Nom", "Prénom", "Direction", "Unité administrative", "Unité opérationnelle", "Code unité administrative", "Code unité opérationnelle", "Date affectation UA", "Timbre unité opérationnelle"],
        "Matériel" : [ "Utilisateur principal", "direction", "Entité (dernier niveau) utilisateur", "Catégorie", "Système d'exploitation", "Marque", "Localisation (complète)", "Statut", "Code matériel", "Commentaire"],
        "Téléphone" : ["NOM-PRÉNOM", "PRÉNOM", "ETAGE/AILE/BUREAU", "DEPT/DIV", "TIMBRE", "MATERIEL TEL", "Catégorie PTT TEL", "TEL", "LIGNE PRIVE", "FILTRAGE DU"]
    }
    
    const colors = {
        green : "#009879",
        red : "#ac0404",
        blue : "#0088a9",
    }

    if(join===false) {
        switch(table) {

            // Tables Agents
            case "Agents_effectifs" :
            return [{name: "État Civil", subheaders: subHeaders["État Civil"], color: colors.green}, 
                    {name: "Administratif", subheaders: subHeaders["Administratif"],color: colors.red},
                    {name:"Unités", subheaders:subHeaders["Unités"], color:colors.blue}]
                    
            case "Agents_bureaux" :
            return [{
                        name: "Bureaux",
                        subheaders:[ "NOM", "Prénom", "Etage", "Numéro Pièce arbitré", "Position dans la pièce", "Timbre", "DIR", "Matricule", "Rang hiérarchique", "Droits à trame(s) par personne"],
                        color: colors.green}]
    
            case "Agents_postes" :
            return [{ name: "Matériel", subheaders:subHeaders["Matériel"], color: colors.red}]
    
            case "Agents_telephones" : 
            return [{name: "Téléphone", subheaders:subHeaders["Téléphone"], color: colors.blue}]
    
            case "Agents_teletravail" : 
            return [{
                name: "Télétravail",
                subheaders:["Nom usuel", "Prénom usuel", "Matricule SIRHIUS", "Libellé UO administrative", "Libellé UO operationnelle", "Motif de l'absence", "Date de début", "Date de fin", "Nombre de jours absence"],
                color: colors.green}]
    
    
    
            // Tables Bureaux
            case "Bureaux_meubles" :
            return [{
                name: "Situation",
                subheaders:["Etage", "Numéro Pièce arbitré", "Position dans la pièce"],
                color: colors.green}, 
                {
                name: "Occupant",
                subheaders:["NOM","Prénom", "DIR", "Timbre", "Matricule", "Rang hiérarchique", "Droits à trame(s) par personne"],
                color: colors.red}]
    
            case "Bureaux_pieces" : 
            return [{
                name: "Trames",
                subheaders:["Etage", "Numéro Pièce arbitré", "DIR", "Occupants", "Trames", "Trames utilisées", "Trames libres", "Taux d'occupation par bureau"],
                color: colors.blue}, 
                {
                name: "Équipements de sécurité et divers",
                subheaders:["Bureau","Baie accessible","Ouvrant de façade","documents","cafetière","Pot de fleur","divers"],
                color: colors.green}]
    
            case "Bureaux_equipements" :
            return [{
                name: "Équipements de sécurité et divers",
                subheaders:["Bureau","Baie accessible","Ouvrant de façade","documents","cafetière","Pot de fleur","divers"],
                color: colors.red}];
    
            case "Bureaux_telephones" :
            return [{
                name: "Téléphones",
                subheaders:["ETAGE/AILE/BUREAU", "NOM-PRÉNOM", "PRÉNOM", "DEPT/DIV", "TIMBRE", "MATERIEL TEL", "Catégorie PTT TEL", "TEL", "LIGNE PRIVE", "FILTRAGE DU"],
                color: colors.green}];
    
            
            // Tables Directions
            case "Directions_bureaux" : 
            return [{
                name: "Directions",
                subheaders:["DIR", "Etage", "Numéro Pièce arbitré", "Position dans la pièce", "Timbre", "NOM", "Prénom", "Matricule", "Rang hiérarchique", "Droits à trame(s) par personne"],
                color: colors.green}]
    
            case "Directions_postes" : 
            return [{
                name: "Postes",
                subheaders:["direction", "Entité (dernier niveau) utilisateur", "Catégorie", "Utilisateur principal", "Système d'exploitation", "Marque", "Localisation (complète)", "Statut", "Code matériel", "Commentaire"],
                color: colors.red}]
    
            default :
            return
    
        }
    }

    if(join===true) {       
        let joins = [...decideSubTables(table)]
        tables.filter(t => t !== table).forEach(table => joins.push(...decideSubTables(table)))
        return joins
    }
}

export function handleSearchBar2(e) {

    let recherche = nmStr(e.target.value);
    let tables    = Array.from(document.querySelectorAll("table tbody"));
    let rows      = Array.from(document.querySelectorAll("tbody tr"));
    let headers   = Array.from(document.querySelectorAll("thead tr th")).map(header => nmStr(header.textContent));

    if (!recherche) {
        rows.forEach(row => row.style.display = "");
        return
    }

    rowTurn:
    for(let row of rows) {

        let cells = Array.from(row.childNodes).filter((_, index) => ["nom", "prenom", "utilisateurprincipal"].includes(headers[index]))
        
        for(let cell of cells) {
            let cellContent = nmStr(cell.textContent)

            if(cellContent.startsWith(recherche)) {
                // let sameRows = Array.from(tables.forEach(table => Array.from(table).filter((_,index) => index === rows.indexOf(row))))
                let sameRows = Array.from(document.getElementsByClassName(`${row.classList[0]}`));
                sameRows.forEach(twinRow => display(twinRow));
                // break rowTurn;
            }

            else noDisplay(row);
            
        }
    }


    
}

export function filterHeaders (e, headers, header) {
    const headerOrder = document.querySelector(".header-order")
    const liste = headerOrder.querySelector("ul")

    liste.innerHTML = ""
    if(headers[header].length) {
        display(headerOrder, "bloc")
        effectTransition(headerOrder, "fade-left-in-quick",  "flex")
    }
    else noDisplay(headerOrder, true)
    
   
    headers[header].sort().forEach(modalityToAdd => {
        let modality = document.createElement("li")
        modality.textContent = modalityToAdd
        liste.appendChild(modality)
        modality.addEventListener("click", (e) => {

            let rows = document.querySelectorAll("tbody tr")

            for(let row of rows) {
                let filter= row.querySelector(`td[header=${header}]`) ? row.querySelector(`td[header=${header}]`).textContent : ""
                if(filter === e.target.textContent) document.querySelectorAll(`tbody tr[data-key="${row.dataset.key}"]`).forEach(row2 => {console.log(row2); display(row2, true)})
                else noDisplay(row, true)
            } 

            alert(`click sur ${e.target.textContent} de ${header}`)
   
    })
    })

    headerOrder.style.top = `${e.clientY - (headerOrder.offsetHeight / 2)}px`
    headerOrder.style.left = `${e.clientX + 20}px`
}

export function clickFilter(e) {

}

/*

########################
##      REQUESTS      ##
########################

*/

export async function getTables(table, join = false) {
    return fetch(`${serverPath}/get/${join ? "jointure" : "table"}/${table}`)
            .then(response => {
                if(response.ok) return response.json();
                throw new Error (`Échec lors de la récupération de la table ${table}`)}, networkError => console.log(networkError.message))
            .then(data => ({data, tables : decideSubTables(table, join)}))
}


export function createLists(jsonResponse) {
    return {
        listeNoms : jsonResponse["listeAgents"].map(entry => Object.values(entry)[0]).filter(_ => _),
        listeBureaux : jsonResponse["listeBureaux"].filter(bureau => bureau["idBureau"] !== "/")
    }
}

export function giveSuggestions(liste, nomsRecherchés, nombre) {
    let suggestions = liste.filter(idAgent => nomsRecherchés.every(recherche => nomsRecherchés[0] && idAgent.includes(recherche)))
    return suggestions.slice(0,nombre) 
}

export function getIndividualData(idAgent) {
    return new Promise((resolve, reject) => {
        resolve(fetch(`${serverPath}/edit/suggestion/${idAgent}`).then(response => response.json()))
    })
}

export function getAllIndividualData(idAgent) {
    return new Promise((resolve, reject) => {
        resolve(fetch(`${serverPath}/edit/informations/${idAgent}`).then(response => response.json()))
    })
}

export function getAllAgents() {

}

export function getAllBureaux() {
    
}

export function postRequest(url, body, fields) {
    fetch(`${serverPath}${url}`, { 
                method: 'POST',
                headers: {
                    'Accept' : 'application/json, text/plain',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(body)
            })
    .then(response => {
        console.log(`Requête suivante envoyée à l'adresse ${url} : ${body}`)
        clearInputs("add_agent", fields)
        document.querySelector("#add_agent input[type='submit']").classList.replace("button-active", "button")
        if(response.ok) {
            return response.text()
        } throw new Error("La requête d'ajout a échoué")
    })
    .then(textResponse => {
        alert(textResponse)
    })
}


/*

#############
##  EVENTS ##
#############

*/

const historyCells = {};

export function changeAlertMessage(message) {
    document.querySelector(".whiteBox").style.zIndex = 5;
    document.querySelector("#alert-form p").textContent = message;
    let alertForm = document.getElementById("alert-form")
    alertForm.classList.remove("pop-up-reverse")
    void alertForm.offsetWidth
    alertForm.classList.add("pop-up")
}

export function closeAlert() {
    document.querySelector(".whiteBox").style.zIndex = 100
    let alertForm = document.getElementById("alert-form")
    alertForm.classList.remove("pop-up")
    void alertForm.offsetWidth
    alertForm.classList.add("pop-up-reverse")
}

/*
TABLE
*/


export function clickCell(e) {
    e.stopPropagation();

    let cell = e.target;
    let oldValue = cell.textContent;
    console.log(oldValue)
    sessionStorage.setItem("historique", {test : 12})
    
    console.log(sessionStorage.getItem("historique").test)
    
    cell.innerHTML = `<input type="text" size=${oldValue.length} placeholder=${String(oldValue)} autofocus>`;
    
    cell.childNodes[0].addEventListener("blur", () => {
      cell.innerHTML = `${oldValue}`;
    });
    
    cell.childNodes[0].addEventListener("keydown", e => {
      if(e.code === "Enter") {
        let newValue = e.target.value;
        cell.innerHTML = newValue ? `${newValue}` : `${oldValue}`;
      }

     else if(e.code === "ArrowUp") {
        
    console.log(cell);
        cell.innerHTML = `<input type="text" size=${oldValue.length} value="EE"} autofocus>`
        cell.blur();
     }
    });
}

export function selectSameRows(e) {
    return Array.from(document.querySelectorAll("tr"))
           .filter(row => row.dataset.key === e.currentTarget.dataset.key)
}

export function selectOrDeselectRows(e) {
    selectSameRows(e)
    .forEach(row => row.classList.toggle('selected'))
}

export function changeRowsColor(e) {
    selectSameRows(e)
    .forEach(row => row.style.color = e.type === "mouseout" ? "black": row.dataset.color)

}

export function deselectAllRowsWhenClickingDocument() {
    document.addEventListener("click", (e) => {
        if(e.target.parentNode.id.startsWith("scroll")) {
            Array.from(document.querySelectorAll("tr"))
            .forEach(row => row.classList.remove("selected"))
        }

        if(e.target.nodeName !== "TH") noDisplay(document.querySelector(".header-order"))
    })
}

export function resizeWindows () {

    let boxes = Array.from(document.getElementsByClassName("whiteBox"));
    let cover = document.getElementById("grey_cover");

    // boxes.forEach(whiteBox => {
    //     whiteBox.style.left = `${(window.innerWidth/2) - (parseFloat(getComputedStyle(whiteBox).width)/2)}px`;
    //     whiteBox.style.top  = `${(window.innerHeight/2) - (parseFloat(getComputedStyle(whiteBox).height)/2)}px`;
    // })
    
    cover.style.width = `${window.innerWidth}px`;
    cover.style.height = `${window.innerHeight}px`;
}

export function crossClose(e, fields) {

    clearInputs(e.target.parentNode.id, fields)
    const cover = document.getElementById("grey_cover");
    document.querySelector("#add_agent input[type='submit']").classList.replace("button-active", "button")
    effectTransition(e.target.parentNode, 'fade-right-out');
    cover.style.visibility = "hidden"
}

/*
##############
##   FORM   ##
##############
*/
                                                                                                /*
####### INPUTS
                                                                                                */

export function textInput({ name, placeholder, currentValue, handler, length, value, table, disabled }) {
    return (
        <input 
            type="text" 
            id={`input_${name}`}
            name={name}
            value={value ? value : currentValue}
            placeholder={placeholder}
            onChange={(e) => handler(e.currentTarget)}
            maxlength="30"
            size={length ? `${String(length)}` : "17"}
            data-table = {table}
            disabled = {disabled ? true : false}
        />
    )
}

export function selectInput({name, values, currentValue, handler, value, disabled}) {
    return (
        <select 
            id={`input_${name}`}
            value={value ? value : currentValue}
            name={name} 
            onChange={(e) => handler(e.currentTarget)}
            disabled = {disabled ? true : false}
            >
            <option value=""> </option>
            {values.map((newValue, index) => <option value={newValue} key={index}>{newValue}</option>)}
        </select>
    )
}

export function radioInput({name, values, handler, value, disabled}) {

        return values.map(val => {
            
            if(value === val) {
                return (<React.Fragment>
                    <input 
                        type="radio" 
                        value={val}
                        name={name}
                        checked
                        onChange={(e) => handler(e.currentTarget)}
                        disabled = {disabled ? true : false}
                    />
                    <span> {val} </span>
                    </React.Fragment>)
            } else {
                return (<React.Fragment>
                    <input 
                        type="radio" 
                        value={val}
                        name={name}
                        onChange={(e) => handler(e.currentTarget)}
                        disabled = {disabled ? true : false}
                    />
                    <span> {val} </span>
                    </React.Fragment>)
            }
            
        })
}

export function textArea({name, currentValue, handler, rows, cols, value}) {
    return( <textarea 
            name={name} 
            rows={String(rows)}
            cols={String(cols)}
            value={value ? value : currentValue}
            onChange={(e) => handler(e.currentTarget)}>
            </textarea>)
}

                                                                                                /*
####### EVENTS
                                                                                                */


export function mouseOverError(e) {

    let target = e.currentTarget;
    let errorMessage = target.getElementsByClassName("form_errormessage")[0]

        if(errorMessage.style.display !== "flex") display(errorMessage,"flex");

        target.addEventListener("mousemove", (e2) => {
            errorMessage.style.left = `${e2.offsetX - 22}px`
            errorMessage.style.top  = `${e2.offsetY + 18}px`
        })
        
        target.addEventListener("mouseout", () => noDisplay(errorMessage));
}

                                                                                                /*
####### CONTROLS
                                                                                                */
export function noControl(value, type) {
    return {  errors: [""],
              output: value,
              type: type }
}

export function testString(value) {
    return /[a-zA-Z-'\sçùàéèìùò]/.test(value[value.length - 1]) ? "" : "• Les nombres et les caractères spéciaux autres que - et ' ne sont pas autorisés."
}

export function testNumber(value) {
    return /\d/.test(value[value.length - 1]) ? "" : "• Les lettres ne sont pas autorisées."
}

export function testValidDate(value) {
    return /^\d{0,2}(\/)?(\d{0,2})?(\/)?(\d{0,4})?$/.test(value) ? "" : "• La date doit être au format JJ/MM/AAAA."
}

export function testExistingDate(value) {

    if(/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {

        const [day, month, year] = value.split("/").map(s => Number(s))
        let testDate = new Date()
        testDate.setFullYear(year, month - 1, day)

        if(testDate.getDate() === day && (testDate.getMonth() + 1) === month && testDate.getFullYear() === year) return ""

        return `• La date ${value} n'existe pas dans le calendrier.`
       
    } else return ""
    
}

export function testDate(value, part) {
    let [jour, mois, annee] = nmDate(value).split("/")
    let actualYear = new Date().getFullYear()

    switch(part) {
        case "jour" :
        return (jour <= 31 && jour !== "00") || jour === undefined ? "" :  "• Vous devez rentrer un jour valide.";

        case "mois" :
        return (mois <= 12 && mois !== "00") || mois === undefined ? "" :  "• Vous devez rentrer un mois valide.";

        case "annee_de_naissance" :
        return (annee <= actualYear - 16) || annee === undefined ? "" :  "• Vous devez rentrer une année valide."

        case "annee_arrivee" :
        return (/\d{4}/.test(annee) ? annee > actualYear - 2 : true) || annee === undefined  ? "" :  "• Vous devez rentrer une année valide."

        default:
        break;

    }
}

export function testLength(value, length) {
    return value.length <= length ? "" : `• Vous devez rentrer moins de ${length} caractères.`
}

export function testSirhius(value) {
    return value.length <= 12 ? "" : "• L'identifiant doit être composé de 12 chiffres (par ex. 000003001443)"
}

export function testSirhiusExists(value) {
    return value.length <= 12 ? "" : "• Cet identifiant Sirhius est déjà utilisé"
}

export function testBureau(value) {
    return /^\d{0,3}$/.test(value) ? "" : "• Le numéro de bureau doit être composé de trois chiffres"
}

export function testBureauRequest(fields) {

    fetch(`${serverPath}/formulaire/listes`)
        .then(response => response.json())
        .then(jsonResponse => {   
        
        let listeBureaux = jsonResponse["listeBureaux"].filter(bureau => bureau["idBureau"] !== "/")
        let bureauxSimpleArray = listeBureaux.map(bureau => bureau["idBureau"].replace(/-\w/,"") + `-${bureau["Position dans la pièce.Bureaux_global"]}`);            
        let currentBureau = `${fields["bureau_etage"].currentValue}-${fields["bureau_numero"].currentValue}-${fields["bureau_position"].currentValue}`

            // On regarde d'abord si ce bureau existe dans la base
            if(bureauxSimpleArray.includes(currentBureau)) {

                // Si le bureau existe, on regarde s'il est occupé
                bureauxSimpleArray.forEach((bureau, index) => {
                    if(bureau === currentBureau && listeBureaux[index]["NOM.Bureaux_global"] !== "/") {
                        return `Le bureau ${bureau} est occupé par ${listeBureaux[index]["Prénom.Bureaux_global"]} ${listeBureaux[index]["NOM.Bureaux_global"]} (${listeBureaux[index]["DIR.Bureaux_global"]})`                        
                    } else {
                        return `Le bureau ${currentBureau} est actuellement disponible !`;
                    }
                })
            
            // Sinon on indique à l'utilisateur qu'il n'existe pas
            } 
            else if(/\d-\d{3}-[^\d]/.test(currentBureau)) return `Le bureau ${currentBureau} n'existe pas !`
            else return ""
        })
}

export function testResults(listeTests, fields) {
    return Object.keys(listeTests).every(field => listeTests[field](fields[field].currentValue) === true)
}

export function checkList() {
    
}

export function clearInputs(form, fields) {
    document.querySelector(`#${form} input[type='submit']`).classList.replace("button-active", "button");
    form = document.getElementById(form);
    let allInputs = Array.from(form.querySelectorAll("input[type=text], input[type=radio], select, textarea"))
    allInputs.forEach(input => input.value="");
    Object.keys(fields).forEach(key => { 
        fields[key].currentValue = ""
        fields[key].prevValue = "" })
}



/*

##############
##  EFFECTS ##
##############

*/

// Fade
export function effectTransition(node, effect, display, delay) {

    node.classList.forEach(classFade => {
        if(classFade.startsWith("fade")) node.classList.remove(classFade)
    })
    node.visibility = "visible"
    void node.offsetWidth;
    node.classList.add(effect);
    if(display) setTimeout(_ => node.style.display = display, delay ? delay : 0);

}

// Awaits for a delay
export function later(delay) {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    });
}

export function waitForDisappearing(scrollX) {
    return new Promise(function(resolve) {
        resolve(scrollX.style.opacity === 0)
    });
}

// Color range
export const colors = {
    red: "#ac0404",
    green: "#009879",
    blue: "#0088a9",

}

// Scroll captions effect

export function scrollCaptionEffect(e) {
    if(e.target.scrollTop < 50) {
        for (let caption of document.querySelectorAll("caption")) {
            let newOpacity = String((1 - (e.target.scrollTop / 30)).toFixed(2));
            caption.style.opacity = newOpacity;
        }; 
    }
    const headerOrder = document.querySelector(".header-order")
    if(headerOrder.style.display) noDisplay(headerOrder)
}

// Greyscreen

export function greyScreenToggle() {
    let blur = document.getElementById("global-container");
    blur.classList.toggle("active");
}

export function greyScreen(state) {
    let global = document.getElementById("global-container");
    let root = document.getElementById("root");

    if(state === 'on') {

        global.style.filter= "blur(10px)";
        
        let greyscreen  = document.createElement("div");

        greyscreen.setAttribute("id", "greyscreen");
        greyscreen.style.position = "absolute";
        greyscreen.style.width=`${window.innerWidth}px`;
        greyscreen.style.height=`${window.innerHeight}px`;

        root.appendChild(greyscreen);
    

    } else if (state === 'off') {
        global.style.filter="blur(0px)";
        global.removeChild(document.getElementById("greyscreen"));
    }

    
}

// Display

export function display(element, none) {
    if(element && !none) element.style.visibility = "visible"
    else element.style.display = ""
}

export function noDisplay(element, none) {
    if(element && !none) element.style.visibility = "hidden"
    else element.style.display = "none"
}