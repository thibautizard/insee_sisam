import React from 'react'
import { mouseOverError } from '../../fonctions_front'


export default function Label(props) {
    const { name, caption, errorMessages } = props.data;
    let listeErrors;
    if(errorMessages !== []) listeErrors = errorMessages.map(errorMessage => <div> {errorMessage} </div>)
    return (
       
        <label for={name}> 
            <span className="label_caption"> {caption}
            
                <div className="form_alert" name={`label_${name}`} onMouseOver={mouseOverError}>

                    {/* MESSAGES D'ERREUR */}
                    <div className="form_errormessage">
                        <div> {listeErrors} </div>
                    </div>

                    {/* POINT D'EXCLAMATION */} 
                    <div className="exclamation_mark"> ! </div>

                </div>
            </span> 

            <div className="add_box_input"> {props.children} </div>
            
        </label>
    )
}
