import React from 'react'

export default function Suggestion(props) {
        console.log(props)
        let idAgent = props.informations["idAgent"]
        let nom = props.informations["Nom"]
        let prenom = props.informations["Prénom"]
        let direction = props.informations["Direction"]

    return (
        <div className="suggestion" id={idAgent} onClick={props.onClick}> 
                <div className="suggestion_nom">
                    {prenom} {nom}
                </div>

                <div className="suggestion_direction">
                    {direction}
                </div>
            
        </div>
    )
}
